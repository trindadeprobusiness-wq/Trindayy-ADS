# R-10 — Brilho que varre (light sweep)

**Linguagens:** Minimalismo premium  
**Implementação:** `MotionRecipes.lightSweep(tl, sheen, {at, dur, fromX, toX})`  
**Equivalente no HyperFrames:** rules: `gradient-text-sweep` (variação no texto)

## Objetivo
Chamar atenção para um pill/botão/logo já parado com um reflexo de luz que atravessa.

## Elementos necessários
Faixa com gradiente branco transparente dentro do elemento (overflow hidden).

## Sequência de movimentos
1. Faixa começa fora do elemento, à esquerda.
2. Atravessa até sair pela direita.
3. Uma passada só.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração | ≈0,4 s (REF-006 8,3–8,7 s) | 0,5–0,7 s |
| Largura da faixa | estreita | 15–20% do elemento |
| Opacidade de pico | sutil | 0,3–0,4 |
| Easing | — | power2.inOut |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-006 8,3–8,7 s

## Cuidados
Marcar a faixa com `data-layout-allow-overflow`. Não repetir em loop.
