#!/usr/bin/env python3
"""Technical QA for a rendered video. Separates hard blockers from observations.

Blockers (automatic fail):
  * file missing / unreadable, no video stream
  * resolution or fps differ from --expect WxH@FPS
  * duration differs from --duration (seconds) by more than 1 frame
  * unplanned black frames (blackdetect) longer than --black-max seconds,
    except at the very start/end when --allow-black-edges is set
  * audio true peak > -1.0 dBTP (clipping risk) when audio exists
  * expected audio (--expect-audio) but no audio stream

Observations (reported, judged by a human/critic):
  * integrated loudness vs. target (-14 LUFS social / -16 web; ±2 LU)
  * frozen stretches (freezedetect) — may be intentional holds
  * contact sheet of N frames for visual review (--sheet out.jpg)

Usage:
  python3 validate-render.py out.mp4 --expect 1920x1080@30 [--duration 15]
        [--expect-audio] [--sheet sheet.jpg --frames 12] [--lufs-target -14]
Exit code 0 = no blockers.
"""
import argparse
import json
import os
import re
import subprocess
import sys


def run(cmd):
    p = subprocess.run(cmd, capture_output=True, text=True)
    return p.returncode, p.stdout, p.stderr


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("video")
    ap.add_argument("--expect", help="WxH@FPS, e.g. 1920x1080@30")
    ap.add_argument("--duration", type=float)
    ap.add_argument("--expect-audio", action="store_true")
    ap.add_argument("--black-max", type=float, default=0.2)
    ap.add_argument("--allow-black-edges", action="store_true")
    ap.add_argument("--lufs-target", type=float, default=-14)
    ap.add_argument("--sheet")
    ap.add_argument("--frames", type=int, default=12)
    a = ap.parse_args()

    blockers, notes = [], []
    if not os.path.exists(a.video):
        print(json.dumps({"pass": False, "blockers": [f"file not found: {a.video}"]}))
        sys.exit(1)
    code, out, err = run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", a.video])
    if code:
        print(json.dumps({"pass": False, "blockers": [f"ffprobe failed: {err.strip()}"]}))
        sys.exit(1)
    data = json.loads(out)
    v = next((s for s in data["streams"] if s["codec_type"] == "video"), None)
    au = next((s for s in data["streams"] if s["codec_type"] == "audio"), None)
    duration = float(data["format"].get("duration", 0))
    report = {"file": a.video, "duration_s": round(duration, 3)}
    if not v:
        blockers.append("no video stream")
    else:
        n, d = v["avg_frame_rate"].split("/")
        fps = float(n) / float(d)
        report.update({"width": v["width"], "height": v["height"], "fps": round(fps, 3), "codec": v["codec_name"],
                       "pix_fmt": v.get("pix_fmt")})
        if a.expect:
            m = re.match(r"(\d+)x(\d+)@([\d.]+)", a.expect)
            ew, eh, ef = int(m.group(1)), int(m.group(2)), float(m.group(3))
            if (v["width"], v["height"]) != (ew, eh):
                blockers.append(f"resolution {v['width']}x{v['height']} != expected {ew}x{eh}")
            if abs(fps - ef) > 0.01:
                blockers.append(f"fps {fps:.3f} != expected {ef}")
            if a.duration and abs(duration - a.duration) > 1.5 / ef:
                blockers.append(f"duration {duration:.3f}s != expected {a.duration:.3f}s")
        if v.get("pix_fmt") not in ("yuv420p", "yuvj420p"):
            notes.append(f"pix_fmt {v.get('pix_fmt')} may not play on all social platforms (prefer yuv420p)")

        _, _, e = run(["ffmpeg", "-nostats", "-i", a.video, "-an", "-vf", "blackdetect=d=0.05:pix_th=0.06", "-f", "null", "-"])
        blacks = [(float(s), float(t), float(dd)) for s, t, dd in
                  re.findall(r"black_start:([\d.]+) black_end:([\d.]+) black_duration:([\d.]+)", e)]
        report["black_segments"] = [{"start": s, "end": t, "dur": dd} for s, t, dd in blacks]
        for s, t, dd in blacks:
            at_edge = s < 0.05 or t > duration - 0.05
            if dd > a.black_max and not (a.allow_black_edges and at_edge):
                blockers.append(f"unplanned black segment {s:.2f}-{t:.2f}s ({dd:.2f}s)")
        _, _, e = run(["ffmpeg", "-nostats", "-i", a.video, "-an", "-vf", "freezedetect=n=0.001:d=1.5", "-f", "null", "-"])
        freezes = re.findall(r"freeze_start: ([\d.]+).*?freeze_duration: ([\d.]+)", e, re.S)
        report["frozen_holds"] = [{"start": float(s), "dur": float(dd)} for s, dd in freezes]
        if freezes:
            notes.append(f"{len(freezes)} static hold(s) >1.5s — confirm they are intentional")

    if au:
        _, _, e = run(["ffmpeg", "-nostats", "-i", a.video, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"])
        tail = e[e.rfind("Summary:"):]
        i = re.search(r"I:\s+(-?[\d.]+) LUFS", tail)
        p = re.search(r"Peak:\s+(-?[\d.]+|-inf) dBFS", tail)
        lufs = float(i.group(1)) if i else None
        peak = float(p.group(1)) if p and p.group(1) != "-inf" else None
        report["audio"] = {"integrated_lufs": lufs, "true_peak_dbtp": peak, "sample_rate": int(au["sample_rate"])}
        if peak is not None and peak > -1.0:
            blockers.append(f"true peak {peak} dBTP > -1.0 (clipping risk)")
        if lufs is not None and abs(lufs - a.lufs_target) > 2:
            notes.append(f"loudness {lufs} LUFS is outside target {a.lufs_target}±2")
    elif a.expect_audio:
        blockers.append("expected an audio stream but none found")

    if a.sheet and v:
        cols = 4
        rows = (a.frames + cols - 1) // cols
        run(["ffmpeg", "-y", "-v", "error", "-i", a.video, "-vf",
             f"fps={a.frames}/{duration:.3f},scale=480:-2,tile={cols}x{rows}", "-frames:v", "1", a.sheet])
        report["contact_sheet"] = a.sheet if os.path.exists(a.sheet) else None

    report.update({"pass": not blockers, "blockers": blockers, "observations": notes,
                   "scope": "Technical validation only. Artistic quality must be scored separately with the rubric."})
    print(json.dumps(report, indent=2, ensure_ascii=False))
    sys.exit(0 if not blockers else 1)


if __name__ == "__main__":
    main()
