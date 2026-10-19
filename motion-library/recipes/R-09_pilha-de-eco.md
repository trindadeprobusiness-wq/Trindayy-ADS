# R-09 — Pilha de eco (palavra repetida)

**Linguagens:** Tipografia cinética  
**Implementação:** `MotionRecipes.echoStack(tl, layers, {at, dur, stagger, y})`  
**Equivalente no HyperFrames:** rules: `3d-text-depth-layers`

## Objetivo
Dar ênfase e 'volume' a uma palavra-chave com cópias empilhadas de opacidade decrescente.

## Elementos necessários
3 cópias da palavra empilhadas (offset vertical ≈ 0,7× a altura da linha) + elemento de destaque (pill/balão).

## Sequência de movimentos
1. Cópias entram em sequência de cima para baixo.
2. Opacidade: 1 → 0,6 → 0,25 (aprox.).
3. Pill/balão com a mesma palavra entra girando levemente e assenta.
4. Opcional: brilho varrendo o pill (R-10).

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Cópias | 3 (REF-006 8,2 s; REF-008 14,7 s) | 3 |
| Opacidades | ≈1 / 0,5 / 0,25 [a olho] | 1 / 0,62 / 0,24 |
| Duração total | ≈0,6 s | 0,5–0,7 s |
| Rotação do pill | ≈−8° → 0° | −6 a −10°, back.out |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-006 8,2–8,8 s; REF-008 14,7–15,3 s; variação em REF-002 ("da sua" eco grande atrás)

## Cuidados
Usar 1–2 vezes por peça, na palavra mais importante. Mais que isso vira tique.
