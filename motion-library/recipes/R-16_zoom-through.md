# R-16 — Zoom-through (atravessar o elemento)

**Linguagens:** Minimalismo premium · Tipografia cinética  
**Implementação:** documentada  
**Equivalente no HyperFrames:** rules: `viewport-change`, `coordinate-target-zoom`; transitions `css-scale.md`

## Objetivo
Transição em que a câmera avança 'através' de uma palavra ou card para a próxima cena.

## Elementos necessários
Elemento de saída grande o bastante para cobrir o quadro ao escalar.

## Sequência de movimentos
1. Elemento escala rápido (1 → 6–10×) com motion blur.
2. No pico, a nova cena entra pequena e desfocada e cresce até o normal (R-01 em escala).

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração | ≈0,15–0,25 s (REF-003 2,5 s; REF-004 2,7–2,8 s) | 0,25 s expo.in + 0,4 s expo.out |
| Motion blur | forte | ver `references/motion-blur.md` |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-003 2,53 s; REF-004 2,7 s

## Cuidados
Uma vez por peça. Escala extrema de texto rasterizado pode pixelizar: preferir SVG ou texto vetorial.
