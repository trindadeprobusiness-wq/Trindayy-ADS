# R-18 — Whip (chicote lateral) com motion blur

**Linguagens:** Edição de ritmo  
**Implementação:** documentada  
**Equivalente no HyperFrames:** transitions: `css-push.md`; `references/motion-blur.md`

## Objetivo
Trocar de assunto com energia, num chicote lateral rápido.

## Elementos necessários
Cena atual e próxima lado a lado (ou saída/entrada sincronizadas).

## Sequência de movimentos
1. Saída acelera para o lado com blur direcional.
2. Entrada vem do lado oposto e desacelera.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração | ≈0,2 s (REF-004 10,8–11,0 s) | 0,2–0,3 s |
| Easing | — | expo.in / expo.out |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-004 10,8 s; REF-008 7,4–8,2 s (carrossel)

## Cuidados
Em minimalismo premium, usar com moderação.
