#!/usr/bin/env bash
# Final delivery export: H.264 yuv420p CRF 16 (aq-mode 3 against gradient banding) + AAC, no metadata, no x264 SEI.
#   bash scripts/tools/export-final.sh <in.mp4> <out.mp4>
set -euo pipefail
IN="$1"; OUT="$2"; TMP="$(mktemp --suffix=.mp4)"
ffmpeg -v error -y -i "$IN" -map 0:v -map 0:a -c:v libx264 -crf 16 -preset slow -x264-params aq-mode=3:deblock=-1,-1 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -map_metadata -1 -map_chapters -1 -fflags +bitexact -flags:v +bitexact -flags:a +bitexact "$TMP"
mkdir -p "$(dirname "$OUT")"
ffmpeg -v error -y -i "$TMP" -map 0 -c copy -bsf:v filter_units=remove_types=6 -map_metadata -1 -fflags +bitexact -flags:v +bitexact -flags:a +bitexact -movflags +faststart "$OUT"
rm -f "$TMP"
if strings "$OUT" | grep -qi "x264 - core"; then echo "metadata leak: x264 SEI still present" >&2; exit 1; fi
echo "exported $OUT (no metadata)"
