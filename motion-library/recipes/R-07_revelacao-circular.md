# R-07 — Revelação circular (wipe radial)

**Linguagens:** Animação de interface · Transição  
**Implementação:** `MotionRecipes.circleReveal(tl, disc, {at, dur, ease})`  
**Equivalente no HyperFrames:** transitions: `css-radial.md`

## Objetivo
Trocar de cena a partir de um ponto de interesse (bolha, botão, badge), mantendo o olhar onde ele já está.

## Elementos necessários
Disco full-frame (diâmetro ≥ 2× a diagonal) centrado no ponto de origem, na cor da cena seguinte.

## Sequência de movimentos
1. Disco começa em escala 0 no ponto de origem.
2. Escala até cobrir o quadro, acelerando.
3. A cena seguinte começa por baixo do disco (mesma cor de fundo).

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração | ≈0,5 s (REF-005 7,07–7,6 s) | 0,45–0,6 s |
| Easing | acelera (começa lento) | power3.in |
| Origem | o elemento em foco | centro do elemento clicado/falado |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-005 7,07 s; REF-001 7,6 s (variação: onda curva subindo); REF-006 5,47 s (disco + anéis)

## Cuidados
Origem no centro do quadro sem motivo perde o sentido: o círculo precisa nascer de algo.
