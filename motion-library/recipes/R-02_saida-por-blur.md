# R-02 — Saída por blur (dissolve com desfoque)

**Linguagens:** Minimalismo premium · Tipografia cinética  
**Implementação:** `MotionRecipes.blurOut(tl, targets, {at, dur, blur, scale, y})`  
**Equivalente no HyperFrames:** transitions: `css-blur.md`

## Objetivo
Tirar um bloco da tela sem corte seco, mantendo a sensação de continuidade e foco.

## Elementos necessários
Qualquer grupo que sai. Opcional: o próximo elemento entrando por R-01 no mesmo instante (cross-blur).

## Sequência de movimentos
1. Opacidade 1→0 e blur 0→alto ao mesmo tempo.
2. Opcional: escala 1→1,03–1,05 (afasta para a câmera) ou y para cima.
3. Sobrepor 0,1–0,2 s com a entrada seguinte para virar cross-blur.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração | ≈0,2–0,4 s (REF-003 6,1–6,3 s; REF-008 11,0 s) | 0,35 s |
| Blur final | alto | 14–20 px |
| Escala | leve ou nenhuma | 1,04 |
| Easing | acelera para fora | power3.in |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-003 6,1 s; REF-004 14,1 s; REF-006 7,2 s, 8,9 s; REF-008 11,0 s, 15,4 s

## Cuidados
Não usar blur-out em toda troca: alternar com cortes no tempo e morphs para não ficar monótono.
