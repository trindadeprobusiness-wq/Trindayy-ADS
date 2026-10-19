# Tokens de movimento

Nomes usados em `engine/lib/recipes.js` (`MotionRecipes.ease`). As curvas foram **escolhidas para reproduzir o perfil observado** nas referências. Não são medições: o acervo não permite extrair curvas exatas.

| Token | GSAP | Perfil observado | Onde |
|---|---|---|---|
| `enter` | `expo.out` | chega rápido, assenta longo, sem overshoot | blur-in REF-003/008, entradas de card |
| `exit` | `power3.in` | acelera para fora | saídas por blur |
| `move` | `power2.inOut` | aceleração e desaceleração simétricas | pernas de câmera REF-007 (ondas na curva de energia) |
| `land` | `power4.out` | pouso firme com cauda longa | pull-back final REF-007 12,6–13,7 s |
| `pop` | `back.out(1.6)` | pequeno overshoot | tiles/pills REF-007, REF-008 |
| `snap` | `expo.inOut` | rápido no meio | morphs REF-004/005, whips |

## Durações base (sugestão)
| Token | s | Uso |
|---|---|---|
| `micro` | 0,15 | cliques, toggles |
| `quick` | 0,35 | saídas, morphs curtos |
| `base` | 0,6 | entradas de texto/cards |
| `scene` | 1,0 | pernas de câmera, tickers |
| `hold-read` | 0,25 × palavras + 0,5 (mín. 1,0) | tempo de leitura |

## Escalonamento
- Palavras: 0,09–0,12 s sem locução; com locução, o tempo de cada palavra no ASR.
- Grupos (tiles, pills): total ≤ 0,6 s (`n × stagger`).

## Frames
Produção a 30 fps (todas as referências são 29,97/30). Flash = 2 frames (0,067 s).
