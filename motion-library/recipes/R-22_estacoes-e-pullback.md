# R-22 — Estações de câmera + pull-back final

**Linguagens:** Minimalismo premium · Animação de interface  
**Implementação:** documentada (combina R-03 + R-08 + R-06)  
**Equivalente no HyperFrames:** blueprints: `spatial-pan-stations`, `zoom-out-workspace-reveal`, `camera-journey`

## Objetivo
Apresentar um conjunto (produto com vários recursos) visitando cada parte e terminando com a visão geral.

## Elementos necessários
Layout completo (grid/bento) + R-08.

## Sequência de movimentos
1. Montar o layout (R-03) e segurar.
2. Visitar 3–5 estações (R-08), animando os dados de cada uma (R-06).
3. Pull-back até ver o conjunto inteiro, com pouso longo.
4. Hold final com micro-animações vivas → corte para logo.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Estações | ≈6 em 12 s (REF-007) | 3–5 em 10–15 s |
| Pull-back | ≈1,1 s com desaceleração longa (REF-007 12,6–13,7 s) | 1,0–1,4 s power4.out |
| Hold final | ≈1,9 s | 1,5–2 s |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-007 (estrutura completa)

## Cuidados
Cada estação precisa de um dado legível. Câmera sem conteúdo vira screensaver.
