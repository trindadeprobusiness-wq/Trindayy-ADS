#!/usr/bin/env bash
# Prepara o ambiente da motion-library numa sessão nova (idempotente).
set -euo pipefail
LIB="$(cd "$(dirname "$0")/.." && pwd)"
echo "== Python (análise)"; python3 -c "import numpy, scipy, PIL" 2>/dev/null || pip install -q numpy scipy pillow
echo "== Motor HyperFrames"; (cd "$LIB/engine" && npm install --no-audit --no-fund >/dev/null && npx hyperframes telemetry disable >/dev/null 2>&1 || true)
echo "== Skills HyperFrames (ficam em ~/.claude/skills, fora do repo)"; (cd "$LIB/engine" && HYPERFRAMES_SKIP_SKILLS=1 npx hyperframes skills update >/dev/null 2>&1 && echo ok || echo "falhou: rode 'npx hyperframes skills update' manualmente")
echo "== Transcrição offline"; (cd "$LIB/tools/asr" && npm install --ignore-scripts --no-audit --no-fund >/dev/null && echo ok)
echo "== NullMotion (submódulo)"; (cd "$LIB/.." && git submodule update --init vendor/NullMotion >/dev/null 2>&1 && echo ok || echo "falhou: rode git submodule update --init vendor/NullMotion")
echo "== Verificação"; (cd "$LIB/engine" && npx hyperframes doctor 2>&1 | grep -E "✓|✗" | head -20)
echo "Pronto. Leia motion-library/INDEX.md"
