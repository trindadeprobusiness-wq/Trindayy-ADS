# R-06 — Contador (count-up) com barra

**Linguagens:** Animação de interface · Dados  
**Implementação:** `MotionRecipes.countUp(tl, el, {at, dur, from, to, prefix, suffix, decimals})`  
**Equivalente no HyperFrames:** rules: `counting-dynamic-scale`, `stat-bars-and-fills`; blueprint `dataviz-countup`

## Objetivo
Provar um dado (%, R$, quantidade) com um número que sobe até o valor e uma barra que acompanha.

## Elementos necessários
Elemento de texto com fonte tabular. Opcional: barra (scaleX) ou anel.

## Sequência de movimentos
1. Número sobe do inicial ao final via proxy (seek-safe).
2. Barra/anel cresce na mesma curva e duração.
3. Segurar o valor final ≥ 0,8 s.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração | ≈0,4–0,9 s (REF-007 3,0–3,4 s; 6,6–7,4 s) | 0,8–1,1 s |
| Easing | desacelera no fim | power2.out |
| Formato | inteiro + % | pt-BR: vírgula decimal, prefixo R$ |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-007 3,0 s, 6,6 s; REF-008 4,8 s (preço)

## Cuidados
Usar só dados reais e autorizados do cliente. Nunca inventar métricas.
