#!/usr/bin/env python3
"""Convert narration timing data into a frame-accurate word/phrase map.

Accepted inputs (auto-detected):
  1. ElevenLabs "with-timestamps" response, or just its `alignment` /
     `normalized_alignment` object:
       {"characters": [...], "character_start_times_seconds": [...],
        "character_end_times_seconds": [...]}
  2. Word list (Whisper-style / generic):
       [{"word"|"text": "...", "start": 0.0, "end": 0.3}, ...]  or {"words": [...]}
  3. Phrase-level fallback (no word timings): {"phrases": [{"text","start","end"}]}

Output JSON (stdout or --out):
  {fps, duration_s, duration_frames, precision: "word"|"phrase",
   words: [{text, start, end, startFrame, endFrame}],
   phrases: [{text, start, end, startFrame, endFrame, words:[...indices]}],
   pauses: [{start, end, dur}]}

Phrases are split on gaps >= --pause (default 0.28 s) or on . ! ? terminators.
Timing is never modified — only converted. Frames use floor(start*fps) and
ceil(end*fps) so a word is visible for its whole spoken span.

Usage:
  python3 alignment-to-timeline.py alignment.json --fps 30 [--pause 0.28] [--out map.json]
"""
import argparse
import json
import math
import sys

TERMINATORS = (".", "!", "?", "…")


def from_characters(al):
    chars = al["characters"]
    st = al["character_start_times_seconds"]
    en = al["character_end_times_seconds"]
    if not (len(chars) == len(st) == len(en)):
        sys.exit("alignment arrays have different lengths")
    words, cur, cs, ce = [], "", None, None
    for c, s, e in zip(chars, st, en):
        if c.isspace():
            if cur:
                words.append({"text": cur, "start": cs, "end": ce})
            cur, cs, ce = "", None, None
            continue
        if cs is None:
            cs = s
        cur += c
        ce = e
    if cur:
        words.append({"text": cur, "start": cs, "end": ce})
    return words


def load(path):
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, dict):
        for key in ("alignment", "normalized_alignment"):
            if isinstance(data.get(key), dict) and "characters" in data[key]:
                return from_characters(data[key]), "word"
        if "characters" in data:
            return from_characters(data), "word"
        if "words" in data:
            data = data["words"]
        elif "phrases" in data:
            return [{"text": p["text"], "start": p["start"], "end": p["end"]} for p in data["phrases"]], "phrase"
    if isinstance(data, list):
        return [{"text": (w.get("word") or w.get("text") or "").strip(), "start": float(w["start"]),
                 "end": float(w["end"])} for w in data], "word"
    sys.exit("unrecognized alignment format")


def build(words, precision, fps, pause):
    for w in words:
        if w["end"] < w["start"]:
            sys.exit(f"word ends before it starts: {w}")
        w["startFrame"] = math.floor(w["start"] * fps + 1e-6)
        w["endFrame"] = max(w["startFrame"] + 1, math.ceil(w["end"] * fps - 1e-6))
    pauses, phrases, cur = [], [], []
    for i, w in enumerate(words):
        cur.append(i)
        nxt = words[i + 1] if i + 1 < len(words) else None
        gap = (nxt["start"] - w["end"]) if nxt else 0
        if nxt and gap >= pause:
            pauses.append({"start": round(w["end"], 3), "end": round(nxt["start"], 3), "dur": round(gap, 3)})
        if not nxt or gap >= pause or w["text"].endswith(TERMINATORS):
            first, last = words[cur[0]], words[cur[-1]]
            phrases.append({"text": " ".join(words[j]["text"] for j in cur), "start": first["start"],
                            "end": last["end"], "startFrame": first["startFrame"],
                            "endFrame": last["endFrame"], "words": cur})
            cur = []
    dur = words[-1]["end"] if words else 0
    return {"fps": fps, "duration_s": round(dur, 3), "duration_frames": math.ceil(dur * fps),
            "precision": precision, "words": words if precision == "word" else [],
            "phrases": phrases, "pauses": pauses,
            "notes": [] if precision == "word" else ["Phrase-level alignment only: sync per phrase, not per word."]}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("file")
    ap.add_argument("--fps", type=float, default=30)
    ap.add_argument("--pause", type=float, default=0.28)
    ap.add_argument("--out")
    a = ap.parse_args()
    words, precision = load(a.file)
    if not words:
        sys.exit("no words found")
    result = build(words, precision, a.fps, a.pause)
    text = json.dumps(result, indent=2, ensure_ascii=False)
    if a.out:
        with open(a.out, "w", encoding="utf-8") as f:
            f.write(text + "\n")
        print(f"wrote {a.out}: {len(result['words'])} words, {len(result['phrases'])} phrases, {len(result['pauses'])} pauses")
    else:
        print(text)


if __name__ == "__main__":
    main()
