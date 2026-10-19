# Nexools · lote 1 (out/2026) — 5 criativos em motion

| ID | Produto | Take | Voz | Duração | Arquivo |
|---|---|---|---|---|---|
| GEM-A | Gemini Pro | Contraste de preço + licença oficial + Drive/Flow | Ana Alice | 37,9 s | `renders/NEXOOLS_GEM-A.mp4` |
| GEM-B | Gemini Pro | Identificação (chat → entregáveis) | Ana Alice | 37,5 s | `renders/NEXOOLS_GEM-B.mp4` |
| GEM-C | Gemini Pro | Objeção + conta 96,99 × 18 | Diego | 29,1 s | `renders/NEXOOLS_GEM-C.mp4` ⚠️ comparação não validada |
| COU-A | Coursera Plus | Economia e valor (US$ 399 → R$ 89,90) | Aline Mota | 26,3 s | `renders/NEXOOLS_COU-A.mp4` |
| COU-B | Coursera Plus | Aspiração profissional | Aline Mota | 25,6 s | `renders/NEXOOLS_COU-B.mp4` |

Formato: 9:16 · 1080×1920 · 30 fps · H.264 + AAC · áudio masterizado em ~−14 LUFS.

## Como foi feito
- **Cenas:** `shared/nexo.js` (biblioteca) + `shared/nexo.css` (visual Nexools: claro premium, azul #005AFC, navy #0B162A, Inter Display).
- **Roteiro de cada vídeo:** `videos/<ID>.js`, com os tempos das palavras tirados do áudio (`audio/<ID>.words.txt`, Whisper offline).
- **Som:** trilha e efeitos sintetizados (`tools/audio/synth.py`, 100% originais); as cenas registram os efeitos e o `tools/build.py` mixa locução + trilha (com ducking) + efeitos.
- **Build/render:** `python3 tools/build.py <ID>` → `build/<ID>/` (HyperFrames) → `renders/NEXOOLS_<ID>.mp4`.
- **Logo:** `brands/nexools/assets/` (versões transparentes extraídas do arquivo enviado).

## Regras aplicadas
- Sem logos, telas ou fontes oficiais de Google/Coursera; produtos citados em texto com a tipografia Nexools.
- Custo/lucro nunca aparecem. Comparação do Gemini (R$ 96,99 × 18) só publicar após validação.
