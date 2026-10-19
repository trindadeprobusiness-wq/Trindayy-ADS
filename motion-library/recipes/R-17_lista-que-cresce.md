# R-17 — Lista que cresce no ritmo da fala

**Linguagens:** Tipografia cinética · Humor  
**Implementação:** documentada  
**Equivalente no HyperFrames:** rules: `dynamic-content-sequencing`, `anchored-layout-expand`

## Objetivo
Enumerar atributos (serviços, benefícios) somando um item por fala, criando acúmulo.

## Elementos necessários
Lista com marcadores e linha vertical conectando. Bloco âncora acima (card/título).

## Sequência de movimentos
1. Cada item entra (fade + x curto) quando é falado.
2. O conjunto sobe para manter o centro visual.
3. Hold enquanto o último item é lido.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Entrada por item | ≈0,2 s (REF-004 3,4–10,3 s) | 0,25 s expo.out |
| Itens | 5 | 3–6 |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-004 3,4–10,3 s

## Cuidados
Texto da lista ≥ 40 px em 1080×1920 (no REF-004 está pequeno demais).
