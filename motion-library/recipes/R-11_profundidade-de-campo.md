# R-11 — Profundidade de campo (rack focus)

**Linguagens:** Minimalismo premium  
**Implementação:** `MotionRecipes.depthBlur(tl, targets, {at, dur, blur, dim})`  
**Equivalente no HyperFrames:** rules: `depth-of-field-blur`

## Objetivo
Separar planos: o que importa fica nítido, o resto desfoca e escurece levemente.

## Elementos necessários
Camadas não focais separadas do elemento focal.

## Sequência de movimentos
1. Desfocar e reduzir a opacidade das camadas não focais.
2. Manter o focal nítido (nunca desfocar o pai do focal).
3. Devolver o foco no reposicionamento seguinte.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Blur fora de foco | moderado (REF-008 5,3 s; REF-003) | 6–12 px |
| Opacidade fora de foco | levemente reduzida | 0,55–0,7 |
| Duração | acompanha o movimento de câmera | 0,6–0,8 s |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-008 5,3–5,6 s; REF-003 3,6–5,0 s; REF-007 (vinheta + foco)

## Cuidados
`filter` é caro no render: limitar o número de camadas desfocadas ao mesmo tempo.
