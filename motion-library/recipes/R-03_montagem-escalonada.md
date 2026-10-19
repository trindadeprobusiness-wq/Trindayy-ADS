# R-03 — Montagem escalonada (pop / grid / convergência)

**Linguagens:** Minimalismo premium · Animação de interface  
**Implementação:** `MotionRecipes.staggerPop(tl, items, {at, dur, stagger, from, ease})`  
**Equivalente no HyperFrames:** rules: `center-outward-expansion`, `depth-scatter-assemble`; blueprint `grid-card-assemble`

## Objetivo
Construir um layout (bento grid, conjunto de pills/ícones) peça por peça, apresentando o palco antes do conteúdo.

## Elementos necessários
N elementos já posicionados no layout final.

## Sequência de movimentos
1. Cada peça: escala pequena→1 e opacidade 0→1.
2. Escalonar por índice ou por proximidade do centro.
3. Variação convergência: em vez de escala, deslocar de fora do quadro até a posição (REF-008 10 s).
4. Segurar o layout montado ≥ 0,5 s antes do próximo movimento.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Escala inicial | quase zero (REF-007 0,1–0,4 s) | 0,4–0,6 |
| Duração por peça | ≈0,3–0,4 s | 0,55 s |
| Escalonamento total | todas montadas em ≈0,7 s (REF-007) | ≤ 0,6 s no grupo (stagger 0,05–0,08) |
| Easing | assentamento com leve overshoot [H] | back.out(1.4–1.8) |
| Hold após montar | ≈0,6 s (REF-007 0,8–1,4 s) | 0,5–0,8 s |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-007 0,1–0,8 s; REF-008 9,9–10,2 s (pills convergindo)

## Cuidados
Escalonamento total acima de ~0,6 s parece lento. Overshoot grande (back > 2) fica infantil no premium.
