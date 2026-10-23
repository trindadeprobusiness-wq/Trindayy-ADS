#!/usr/bin/env python3
"""Inspect a video or audio file with ffprobe/ffmpeg and print a JSON report.

Covers what tools can actually observe — nothing is guessed:
  * container/stream metadata (duration, resolution, fps, codecs)
  * loudness (EBU R128 integrated LUFS, true peak dBTP, LRA)
  * silences (pauses in narration)        --silence-db / --silence-min
  * cut / scene-change timestamps (video)  --scene-threshold
  * average cut rhythm (shots per second, median shot length)
  * optional frame extraction + contact sheet  --frames N --out DIR

Usage:
  python3 inspect-media.py <file> [--frames 12 --out DIR] [--scene-threshold 0.3]
"""
import argparse
import json
import os
import re
import shutil
import statistics
import subprocess
import sys


def run(cmd):
    p = subprocess.run(cmd, capture_output=True, text=True)
    return p.returncode, p.stdout, p.stderr


def need(binary):
    if not shutil.which(binary):
        sys.exit(f"'{binary}' not found in PATH")


def probe(path):
    code, out, err = run(["ffprobe", "-v", "error", "-show_format", "-show_streams", "-of", "json", path])
    if code:
        sys.exit(f"ffprobe failed: {err.strip()}")
    data = json.loads(out)
    fmt = data.get("format", {})
    info = {"file": os.path.basename(path), "duration_s": float(fmt.get("duration", 0) or 0),
            "size_bytes": int(fmt.get("size", 0) or 0), "video": None, "audio": None}
    for s in data.get("streams", []):
        if s.get("codec_type") == "video" and info["video"] is None and s.get("disposition", {}).get("attached_pic") != 1:
            num, den = (s.get("avg_frame_rate") or "0/1").split("/")
            fps = float(num) / float(den) if float(den) else 0
            info["video"] = {"codec": s.get("codec_name"), "width": s.get("width"), "height": s.get("height"),
                             "fps": round(fps, 3), "pix_fmt": s.get("pix_fmt"),
                             "frames": int(s["nb_frames"]) if s.get("nb_frames", "").isdigit() else None}
        if s.get("codec_type") == "audio" and info["audio"] is None:
            info["audio"] = {"codec": s.get("codec_name"), "sample_rate": int(s.get("sample_rate", 0)),
                             "channels": s.get("channels")}
    return info


def loudness(path):
    code, _, err = run(["ffmpeg", "-nostats", "-i", path, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"])
    tail = err[err.rfind("Summary:"):] if "Summary:" in err else ""
    def grab(label):
        m = re.search(label + r":\s+(-?[\d.]+|-inf)", tail)
        return None if not m or m.group(1) == "-inf" else float(m.group(1))
    return {"integrated_lufs": grab("I"), "loudness_range_lu": grab("LRA"), "true_peak_dbtp": grab("Peak")}


def silences(path, db, min_s):
    _, _, err = run(["ffmpeg", "-nostats", "-i", path, "-vn", "-af", f"silencedetect=n={db}dB:d={min_s}", "-f", "null", "-"])
    starts = [float(x) for x in re.findall(r"silence_start: (-?[\d.]+)", err)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    return [{"start": round(max(0, s), 3), "end": round(e, 3), "dur": round(e - max(0, s), 3)} for s, e in zip(starts, ends)]


def scene_cuts(path, threshold):
    _, _, err = run(["ffmpeg", "-nostats", "-i", path, "-an", "-vf",
                     f"select='gt(scene,{threshold})',showinfo", "-f", "null", "-"])
    return [round(float(x), 3) for x in re.findall(r"pts_time:([\d.]+)", err)]


def rhythm(cuts, duration):
    bounds = [0.0] + cuts + [duration]
    shots = [b - a for a, b in zip(bounds, bounds[1:]) if b - a > 0.04]
    if not shots:
        return None
    return {"shots": len(shots), "median_shot_s": round(statistics.median(shots), 3),
            "shortest_s": round(min(shots), 3), "longest_s": round(max(shots), 3),
            "cuts_per_10s": round(len(cuts) / duration * 10, 2) if duration else None}


def extract_frames(path, duration, n, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    files = []
    for i in range(n):
        ts = duration * (i + 0.5) / n
        f = os.path.join(out_dir, f"frame_{i:02d}_{ts:06.2f}s.jpg")
        run(["ffmpeg", "-y", "-v", "error", "-ss", f"{ts:.3f}", "-i", path, "-frames:v", "1", "-q:v", "3", f])
        if os.path.exists(f):
            files.append(f)
    sheet = os.path.join(out_dir, "contact_sheet.jpg")
    cols = 4
    rows = (len(files) + cols - 1) // cols
    if files:
        run(["ffmpeg", "-y", "-v", "error", "-i", path, "-vf",
             f"fps={n}/{duration:.3f},scale=480:-2,tile={cols}x{rows}", "-frames:v", "1", sheet])
    return {"frames": files, "contact_sheet": sheet if os.path.exists(sheet) else None}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("file")
    ap.add_argument("--frames", type=int, default=0)
    ap.add_argument("--out", default=None)
    ap.add_argument("--scene-threshold", type=float, default=0.3)
    ap.add_argument("--silence-db", type=float, default=-35)
    ap.add_argument("--silence-min", type=float, default=0.25)
    a = ap.parse_args()
    need("ffprobe"); need("ffmpeg")
    if not os.path.exists(a.file):
        sys.exit(f"file not found: {a.file}")
    report = probe(a.file)
    if report["audio"]:
        report["loudness"] = loudness(a.file)
        report["silences"] = silences(a.file, a.silence_db, a.silence_min)
    if report["video"]:
        cuts = scene_cuts(a.file, a.scene_threshold)
        report["scene_cuts_s"] = cuts
        report["rhythm"] = rhythm(cuts, report["duration_s"])
        if a.frames:
            report["extracted"] = extract_frames(a.file, report["duration_s"], a.frames,
                                                 a.out or os.path.splitext(a.file)[0] + "_frames")
    report["limitations"] = [
        "Scene cuts come from pixel-difference thresholds: slow dissolves/match-cuts may be missed, fast motion may add false cuts.",
        "Easing curves, typography and composition must be judged by looking at extracted frames, not from this report.",
    ]
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
