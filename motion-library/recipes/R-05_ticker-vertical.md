# R-05 — Ticker vertical (roleta de números/anos)

**Linguagens:** Tipografia cinética · Institucional  
**Implementação:** `MotionRecipes.slotTicker(tl, col, {at, dur, rowH, fromIndex, toIndex})`  
**Equivalente no HyperFrames:** rules: `vertical-spring-ticker`

## Objetivo
Dar peso a um número (ano, valor, contagem) com uma roleta que desacelera e trava no valor.

## Elementos necessários
Coluna com os valores empilhados, máscara com degradê em cima e embaixo, valor final destacado por cor.

## Sequência de movimentos
1. Coluna começa no 1º valor.
2. Translada em y até o valor final com desaceleração forte.
3. Vizinhos (anterior/seguinte) ficam visíveis e esmaecidos.
4. Ao travar, entra um selo/badge complementar (R-03 ou R-06).

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração do giro | ≈1,0 s (REF-002 15,6–16,6 s) | 1,0–1,3 s |
| Easing | rápido com motion blur → trava suave | expo.out |
| Vizinhos visíveis | 1 acima e 1 abaixo, esmaecidos | máscara 3 linhas |
| Selo após travar | ≈1,4 s depois (REF-002 18,0 s, junto com a fala) | no tempo da palavra na VO |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-002 15,6–18,1 s

## Cuidados
Fonte tabular (font-variant-numeric: tabular-nums) para não tremer. Sem motion blur real o giro rápido pode serrilhar: limitar a velocidade ou usar `references/motion-blur.md`.
