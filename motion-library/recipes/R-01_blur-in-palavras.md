# R-01 — Blur-in por palavra

**Linguagens:** Minimalismo premium · Tipografia cinética  
**Implementação:** `MotionRecipes.blurWordsIn(tl, el, {at, dur, stagger, blur, y, fromOpacity})`  
**Equivalente no HyperFrames:** rules: `asr-keyword-glow` (sincronizar a palavras do ASR)

## Objetivo
Revelar uma frase palavra a palavra com foco progressivo, guiando a leitura no ritmo da fala.

## Elementos necessários
Elemento de texto (uma frase curta, ≤ 7 palavras). Fundo limpo.

## Sequência de movimentos
1. Dividir em palavras (spans inline-block) no build.
2. Cada palavra: opacidade 0→1, blur alto→0, deslocamento y curto→0.
3. Escalonar as palavras no ritmo da locução (ou fixo se não houver VO).
4. Segurar a frase completa o tempo de leitura antes de sair.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração por palavra | ≈0,3–0,5 s até ficar nítida (REF-003 1,7–2,1 s; REF-008 9,2–9,6 s) | 0,6 s |
| Intervalo entre palavras | acompanha a fala (≈0,15–0,4 s) | 0,09–0,12 s sem VO; com VO usar o tempo da palavra |
| Blur inicial | forte, a palavra fica ilegível no 1º frame | 10–16 px a 1080 px de largura |
| Deslocamento | pequeno ou nenhum | y 12–24 px |
| Easing | chega rápido, assenta longo, sem overshoot | expo.out |
| Opacidade inicial | 0 | 0; 0,2–0,3 se for o 1º quadro do vídeo |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-003 (0,9–2,4 s, 2,6–3,1 s), REF-006 (quase todas as frases), REF-008 (2,8 s, 9,2 s), REF-004 (1,8–2,5 s)

## Cuidados
Mais de 7 palavras vira espera. Blur alto + texto fino em fundo claro perde contraste no meio da animação. Não combinar com outro efeito na mesma palavra.
