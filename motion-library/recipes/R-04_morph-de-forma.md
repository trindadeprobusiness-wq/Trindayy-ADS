# R-04 — Morph de forma (pill → card, bolha → tile, botão → tela)

**Linguagens:** Animação de interface · Tipografia cinética  
**Implementação:** `MotionRecipes.shapeMorph(tl, el, {at, dur, fromScaleX, fromScaleY, fromRadius, toRadius})`  
**Equivalente no HyperFrames:** rules: `anchored-layout-expand`; blueprint `cta-morph-press`

## Objetivo
Fazer a cena seguinte nascer de um elemento da cena atual: o mesmo objeto muda de forma e de função.

## Elementos necessários
Elemento autorado no tamanho FINAL (card/tela). O estado inicial é uma versão comprimida dele (scaleX/scaleY menores + raio maior).

## Sequência de movimentos
1. Partir do tamanho e raio do elemento de origem (pill/bolha/botão).
2. Interpolar scaleX/scaleY até 1 e o raio até o valor final.
3. Conteúdo interno entra só depois que a forma assentou (≥ 70% da animação).
4. Opcional: motion blur na direção do esticamento (REF-005 8,34 s).

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração | ≈0,1–0,4 s (REF-005 7,6–7,74 s; REF-004 1,1–1,5 s; REF-001 6,8–6,9 s) | 0,4–0,55 s |
| Raio | pill (total) → card | 999 → 32–48 px |
| Easing | rápido no meio, suave nas pontas | expo.inOut |
| Atraso do conteúdo | depois do morph | +0,3–0,4 s do início |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-004 1,1–1,5 s; REF-005 7,6 s e 8,34 s; REF-001 6,8 s

## Cuidados
Nunca animar width/height (proibido no HyperFrames): usar scale. Texto dentro do elemento esticado deforma, então faça o texto entrar depois ou fique em camada separada.
