# R-13 — Demonstração guiada por cursor

**Linguagens:** Demonstração de produto · Animação de interface  
**Implementação:** documentada (sem função própria). Combina R-04/R-07  
**Equivalente no HyperFrames:** blueprint `cursor-ui-demo`

## Objetivo
Mostrar como o produto funciona: um cursor/mão clica e cada clique dispara a próxima tela.

## Elementos necessários
Telas de UI do cliente (reais ou recriadas em HTML), cursor em SVG.

## Sequência de movimentos
1. Cursor entra e vai até o alvo com desaceleração.
2. Clique: cursor encolhe e o botão pressiona (escala 0,96).
3. O botão dispara a transição (R-04 ou R-07).

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Viagem do cursor | ≈0,4–0,6 s [a olho, REF-001] | 0,5 s power2.inOut |
| Clique | rápido | 0,12 s |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-001 1,7 s, 8,0–8,4 s; REF-006 2,8 s

## Cuidados
Usar a UI real do cliente: UI inventada vira promessa falsa.
