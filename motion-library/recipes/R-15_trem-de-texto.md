# R-15 — Trem de texto (frase que desliza enquanto cresce)

**Linguagens:** Minimalismo premium  
**Implementação:** documentada (combina R-01 + translação do contêiner)  
**Equivalente no HyperFrames:** rules: `dynamic-content-sequencing`

## Objetivo
Construir uma frase longa mantendo a palavra nova sempre perto do centro.

## Elementos necessários
Linha única de texto, palavras como spans.

## Sequência de movimentos
1. A linha translada para a esquerda continuamente.
2. Cada palavra nova entra pela direita com blur-in (R-01).
3. A primeira palavra sai pela esquerda do quadro.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração | ≈1,5 s para 4 palavras (REF-003 0,9–2,4 s) | 0,35 s por palavra |
| Movimento da linha | constante, lento | linear ou power1.inOut |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-003 0,9–2,4 s

## Cuidados
Só para frases de efeito curtas. Texto saindo do quadro não pode ser informação essencial.
