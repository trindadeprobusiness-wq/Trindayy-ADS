#!/usr/bin/env bash
# Runs every automated check of the skill.
#   bash tests/run-all.sh [studio_dir] [--render]
# studio_dir: a scaffolded motion studio (with node_modules) to typecheck/render; default ./motion-studio if present.
set -euo pipefail
SKILL="$(cd "$(dirname "$0")/.." && pwd)"
STUDIO=""; RENDER=0
for a in "$@"; do [[ "$a" == "--render" ]] && RENDER=1 || STUDIO="$a"; done
[[ -z "$STUDIO" && -d motion-studio ]] && STUDIO="motion-studio"
echo "== skill structure";  python3 "$SKILL/scripts/validate-skill.py" >/dev/null && echo pass
echo "== script tests";     (cd "$SKILL" && python3 -m unittest tests/test_scripts.py 2>&1 | tail -1)
if [[ -z "$STUDIO" ]]; then echo "(no studio found — skipping typecheck/renders; create one with scripts/init-studio.sh)"; exit 0; fi
STUDIO="$(cd "$STUDIO" && pwd)"
echo "== typecheck ($STUDIO)"; (cd "$STUDIO" && npx tsc --noEmit && echo pass)
[[ $RENDER -eq 1 ]] && (cd "$STUDIO" && node scripts/render.mjs all)
echo "== renders"
for spec in "PremiumProduct 1920x1080@30 15" "DynamicAd 1080x1920@30 18" "SaasShowcase 1920x1080@30 18"; do
  set -- $spec
  for f in "$STUDIO/renders/$1.mp4" "$STUDIO/out/$1.mp4"; do
    if [[ -f "$f" ]]; then
      python3 "$SKILL/scripts/validate-render.py" "$f" --expect "$2" --duration "$3" --expect-audio --allow-black-edges >/dev/null && echo "$1 pass"; break
    fi
  done
done
