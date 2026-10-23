#!/usr/bin/env bash
# Build a .zip of this skill for claude.ai upload / manual sharing: bash package-skill.sh [out.zip]  (default ./premium-motion-director.zip)
set -euo pipefail
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${1:-$PWD/premium-motion-director.zip}"
mkdir -p "$(dirname "$OUT")"; OUT="$(cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"
python3 "$SKILL_DIR/scripts/validate-skill.py" >/dev/null
rm -f "$OUT"
(cd "$SKILL_DIR/.." && python3 - "$OUT" <<'PY'
import os, sys, zipfile
out = sys.argv[1]
skip_dirs = {"node_modules", "__pycache__", "out", ".git"}
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk("premium-motion-director"):
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        for f in files:
            if not f.endswith(".pyc"):
                z.write(os.path.join(root, f))
print(out, os.path.getsize(out), "bytes")
PY
)
