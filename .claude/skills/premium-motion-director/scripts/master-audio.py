#!/usr/bin/env python3
"""Master the audio of a rendered video to a loudness target (EBU R128, two-pass loudnorm).

The video stream is copied untouched; only audio is re-encoded (AAC 192k, 48 kHz).

Usage:
  python3 master-audio.py in.mp4 [--out out.mp4] [--lufs -14] [--tp -1.5] [--lra 11]
Without --out the input file is replaced atomically.
Targets: -14 LUFS social (Instagram/TikTok/YouTube), -16 LUFS web/podcast-like, -23 broadcast.
"""
import argparse
import json
import os
import re
import subprocess
import sys
import tempfile


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("video")
    ap.add_argument("--out")
    ap.add_argument("--lufs", type=float, default=-14)
    ap.add_argument("--tp", type=float, default=-1.5)
    ap.add_argument("--lra", type=float, default=11)
    a = ap.parse_args()
    if not os.path.exists(a.video):
        sys.exit(f"file not found: {a.video}")

    target = f"I={a.lufs}:TP={a.tp}:LRA={a.lra}"
    p = subprocess.run(["ffmpeg", "-nostats", "-hide_banner", "-i", a.video, "-vn", "-af",
                        f"loudnorm={target}:print_format=json", "-f", "null", "-"], capture_output=True, text=True)
    m = re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", p.stderr, re.S)
    if not m:
        sys.exit("loudnorm analysis failed (does the file have audio?)\n" + p.stderr[-800:])
    meas = json.loads(m.group(0))
    second = (f"loudnorm={target}:measured_I={meas['input_i']}:measured_TP={meas['input_tp']}:"
              f"measured_LRA={meas['input_lra']}:measured_thresh={meas['input_thresh']}:offset={meas['target_offset']}:linear=true")
    # loudnorm can pad the tail; trim audio to the exact video-stream duration so A/V lengths match.
    vd = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=duration", "-of", "csv=p=0", a.video],
                        capture_output=True, text=True).stdout.strip()
    vd = vd.splitlines()[0].strip(",") if vd else ""
    trim = ["-t", vd] if vd and vd != "N/A" else ["-shortest"]
    out = a.out or a.video
    fd, tmp = tempfile.mkstemp(suffix=".mp4", dir=os.path.dirname(os.path.abspath(out)))
    os.close(fd)
    r = subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", a.video, "-c:v", "copy", "-af", second, "-ar", "48000",
                        "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", *trim, tmp], capture_output=True, text=True)
    if r.returncode:
        os.remove(tmp)
        sys.exit("encode failed: " + r.stderr[-800:])
    os.chmod(tmp, 0o644)
    os.replace(tmp, out)
    print(json.dumps({"file": out, "input_lufs": float(meas["input_i"]), "input_tp": float(meas["input_tp"]),
                      "target_lufs": a.lufs, "target_tp": a.tp}, indent=2))


if __name__ == "__main__":
    main()
