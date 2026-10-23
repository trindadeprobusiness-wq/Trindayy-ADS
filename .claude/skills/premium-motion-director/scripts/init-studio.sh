#!/usr/bin/env bash
# Scaffold (or update) a Remotion "motion studio" in any project from the engine bundled with this skill.
#
#   bash init-studio.sh [target_dir] [--update] [--no-install] [--no-examples]
#
# target_dir   default: ./motion-studio (relative to the current directory = your project root)
# --update     target exists: refresh only the reusable parts (src/lib, scripts/, configs, tools).
#              Your compositions (src/Root.tsx, src/examples, src/projects, public/) are never touched.
# --no-install skip `npm install`
# --no-examples scaffold without the three demo compositions (empty Root you fill in)
set -euo pipefail
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENGINE="$SKILL_DIR/engine"
TARGET="motion-studio"; UPDATE=0; INSTALL=1; EXAMPLES=1
for a in "$@"; do
  case "$a" in
    --update) UPDATE=1 ;; --no-install) INSTALL=0 ;; --no-examples) EXAMPLES=0 ;;
    -h|--help) sed -n '2,12p' "$0"; exit 0 ;;
    -*) echo "unknown option $a" >&2; exit 2 ;;
    *) TARGET="$a" ;;
  esac
done
command -v node >/dev/null || { echo "Node.js 18+ is required" >&2; exit 1; }
command -v ffmpeg >/dev/null || echo "warning: ffmpeg not found — needed for mastering/validation" >&2
python3 -c "import numpy" 2>/dev/null || echo "warning: python3 numpy not found — needed for SFX generation (pip install numpy)" >&2

copy_tools() {
  mkdir -p "$TARGET/scripts/tools"
  cp "$SKILL_DIR/scripts/synth-sfx.py" "$SKILL_DIR/scripts/master-audio.py" "$SKILL_DIR/scripts/repair-glitches.py" "$TARGET/scripts/tools/"
}

if [[ -e "$TARGET/package.json" ]]; then
  if [[ $UPDATE -eq 0 ]]; then
    echo "$TARGET already exists. Use --update to refresh src/lib, scripts and configs." >&2; exit 1
  fi
  rm -rf "$TARGET/src/lib"
  cp -R "$ENGINE/src/lib" "$TARGET/src/lib"
  cp "$ENGINE/scripts/"*.mjs "$ENGINE/scripts/"*.mts "$TARGET/scripts/"
  cp "$ENGINE/remotion.config.ts" "$ENGINE/tsconfig.json" "$TARGET/"
  copy_tools
  echo "updated reusable engine parts in $TARGET (compositions untouched)"
else
  mkdir -p "$TARGET"
  (cd "$ENGINE" && tar cf - .) | (cd "$TARGET" && tar xf -)
  mkdir -p "$TARGET/public" "$TARGET/src/projects"
  if [[ $EXAMPLES -eq 0 ]]; then
    rm -rf "$TARGET/src/examples"
    cat > "$TARGET/src/Root.tsx" <<'TSX'
import React from 'react';
import {ensureFonts} from './lib';

ensureFonts();

// Register one <Composition> per video, sized from its timeline.json (see the skill's rendering-pipeline.md).
export const RemotionRoot: React.FC = () => <></>;
TSX
  fi
  copy_tools
  echo "created $TARGET"
fi
if [[ $INSTALL -eq 1 ]]; then (cd "$TARGET" && npm install --no-audit --no-fund); fi
echo "next: cd $TARGET && npx tsc --noEmit && node scripts/render.mjs <CompositionId> --stills 0,60 --safe"
