# R-08 — Câmera 3D (estado único, pernas de movimento)

**Linguagens:** Minimalismo premium · Animação de interface  
**Implementação:** `MotionRecipes.camera(tl, world, startPose, legs[])`  
**Equivalente no HyperFrames:** rules: `3d-camera-flight`, `multi-phase-camera`; blueprints `camera-journey`, `spatial-pan-stations`, `zoom-out-workspace-reveal`

## Objetivo
Percorrer um layout (grid de widgets, UI) como plano-sequência com profundidade real, inclinando e aproximando.

## Elementos necessários
`.stage` com `perspective` fixa; `.world` com `preserve-3d` contendo o layout em tamanho 1×.

## Sequência de movimentos
1. Definir poses de câmera (x, y, z, rx, ry) por estação, a olho, e fixá-las como constantes.
2. Cada perna: interpolar a pose anterior → a próxima.
3. Reposicionar com easing simétrico. Pousos com desaceleração longa.
4. Enquanto a câmera está parada, animar o conteúdo da estação.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Perspectiva | — | 1600–2000 px (9:16 1080 px) |
| Inclinação | leve, ≈10–20° [estimado a olho] | rx 10–20°, ry −12–12° |
| Duração da perna | ≈0,6–1,5 s (REF-007) | 0,9–1,2 s |
| Easing | onda suave de aceleração/desaceleração (curva de energia REF-007) | move: power2.inOut · pouso: power4.out |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-007 (peça inteira); REF-003 8,3 s (player entra inclinado)

## Cuidados
Nunca aplicar `filter` no `.world` (achata o 3D). Blur vai nos tiles. Não medir DOM durante a animação.
