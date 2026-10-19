# R-12 — Flash de corte (pontuação claro↔escuro)

**Linguagens:** Tipografia cinética · Edição de ritmo  
**Implementação:** `MotionRecipes.flashCut(tl, veil, {at, frames, fps})`  
**Equivalente no HyperFrames:** transitions: `css-light.md`

## Objetivo
Marcar uma virada do argumento com um flash de 1–3 frames entre cenas de luminância diferente, no ataque da música.

## Elementos necessários
Camada full-frame na cor do flash (cinza médio ou branco).

## Sequência de movimentos
1. Corte coincide com um ataque sonoro (verificar com `hyperframes audio` ou `tools/analyze.py`).
2. 1–3 frames de cor intermediária.
3. Nova cena já composta no frame seguinte.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Frames | 2 (REF-006 5,33 s; REF-008 3,20 s e 5,27 s) | 2 a 30 fps |
| Cor | cinza médio entre branco e preto | #8e8e96 ou branco puro |
| Sincronia | 80% dos cortes a ≤ 2 frames de um ataque (REF-006) | sempre no ataque |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-006 5,33 / 8,13 / 20,97 s; REF-008 3,20 / 5,27 s; REF-004 2,80 s

## Cuidados
No máximo 3–4 por peça de 30 s. Atenção a fotossensibilidade: nunca vários flashes seguidos (>3 por segundo).
