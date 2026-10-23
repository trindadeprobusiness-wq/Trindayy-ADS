#!/usr/bin/env python3
"""Validate a motion-timeline JSON before rendering.

Checks (each failure is an automatic blocker):
  * required fields, positive fps / dimensions
  * scenes are ordered, inside the total duration, no unplanned gaps/overlaps
    (overlap allowed only up to the scene's declared transition length)
  * every referenced asset (sfx cues, music, narration, images, fonts) exists
    under --public (default: ./public)
  * cues fall inside the composition
  * sfx density: warns when more than --max-sfx-per-10s cues per 10 s

Usage:
  python3 validate-assets.py timeline.json [--public public] [--max-sfx-per-10s 6]
Exit code 0 = pass, 1 = blockers found.
"""
import argparse
import json
import os
import sys


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("timeline")
    ap.add_argument("--public", default="public")
    ap.add_argument("--max-sfx-per-10s", type=float, default=6)
    a = ap.parse_args()
    with open(a.timeline, encoding="utf-8") as f:
        tl = json.load(f)
    errors, warnings = [], []

    for key in ("id", "fps", "width", "height", "scenes"):
        if key not in tl:
            errors.append(f"missing field '{key}'")
    if errors:
        return finish(errors, warnings)
    fps = tl["fps"]
    if fps <= 0 or tl["width"] <= 0 or tl["height"] <= 0:
        errors.append("fps/width/height must be positive")

    scenes = tl["scenes"]
    total = tl.get("durationInFrames") or (scenes[-1]["from"] + scenes[-1]["duration"] if scenes else 0)
    cursor = 0
    for i, s in enumerate(scenes):
        sid = s.get("id", f"#{i}")
        for k in ("id", "from", "duration", "intent"):
            if k not in s:
                errors.append(f"scene {sid}: missing '{k}'")
        if "from" not in s or "duration" not in s:
            continue
        if s["duration"] <= 0:
            errors.append(f"scene {sid}: duration must be > 0")
        overlap_ok = s.get("transitionIn", {}).get("frames", 0)
        if s["from"] > cursor:
            errors.append(f"scene {sid}: unplanned gap of {s['from'] - cursor} frames before it")
        elif cursor - s["from"] > overlap_ok:
            errors.append(f"scene {sid}: overlaps previous by {cursor - s['from']} frames (transitionIn allows {overlap_ok})")
        cursor = s["from"] + s["duration"]
    if cursor != total:
        errors.append(f"scenes end at frame {cursor} but durationInFrames is {total}")

    def check_file(rel, ctx):
        if not rel:
            return
        if os.path.isabs(rel):
            errors.append(f"{ctx}: absolute path not allowed ({rel})")
            return
        if not os.path.exists(os.path.join(a.public, rel)):
            errors.append(f"{ctx}: asset not found: {os.path.join(a.public, rel)}")

    audio = tl.get("audio") or {}
    check_file((audio.get("music") or {}).get("src"), "music")
    check_file((audio.get("narration") or {}).get("src"), "narration")
    cues = audio.get("sfx") or []
    for c in cues:
        check_file(c.get("src"), f"sfx@{c.get('at')}")
        if not (0 <= c.get("at", -1) < total):
            errors.append(f"sfx cue at frame {c.get('at')} outside composition (0..{total})")
        if not c.get("why"):
            warnings.append(f"sfx cue at {c.get('at')} has no 'why' — every sound needs an intention")
    for asset in tl.get("assets", []):
        check_file(asset, "asset")

    seconds = total / fps if fps else 0
    if seconds and len(cues) / seconds * 10 > a.max_sfx_per_10s:
        warnings.append(f"sfx density {len(cues) / seconds * 10:.1f}/10s exceeds {a.max_sfx_per_10s} — likely overdesigned")
    return finish(errors, warnings, tl, total)


def finish(errors, warnings, tl=None, total=0):
    report = {"timeline": tl.get("id") if tl else None, "durationInFrames": total,
              "pass": not errors, "errors": errors, "warnings": warnings}
    print(json.dumps(report, indent=2, ensure_ascii=False))
    sys.exit(0 if not errors else 1)


if __name__ == "__main__":
    main()
