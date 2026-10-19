# R-21 — Linha que se desenha (arcos, sublinhados, traços)

**Linguagens:** Tipografia cinética · Minimalismo  
**Implementação:** documentada  
**Equivalente no HyperFrames:** rules: `svg-path-draw`; `hyperframes-keyframes` (SVG draw)

## Objetivo
Sublinhar, conectar ou emoldurar com um traço que nasce em tempo real, dando acabamento artesanal.

## Elementos necessários
Path SVG (arco, sublinhado, anel, logo em traço).

## Sequência de movimentos
1. stroke-dashoffset do comprimento total → 0.
2. Opcional: a ponta do traço com cap arredondado.
3. A palavra associada entra junto ou logo depois.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração | ≈0,3–0,5 s (REF-006 6,3 s; REF-008 3,3 s) | 0,4–0,6 s power2.inOut |
| Espessura | fina (1–3 px a 576 px) | 3–6 px a 1080 px |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-006 0,5 s, 6,3 s, 17,4 s, 34,2 s (logo); REF-008 3,3 s; REF-002 20,7 s (seta)

## Cuidados
Medir o comprimento do path no build, nunca durante a animação.
