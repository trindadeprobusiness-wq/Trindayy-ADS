# R-20 — Escurecer antes de revelar

**Linguagens:** Tipografia cinética · Minimalismo  
**Implementação:** documentada (tween de backgroundColor + R-12 + R-09)  
**Equivalente no HyperFrames:** —

## Objetivo
Criar tensão antes da palavra-chave: o fundo escurece aos poucos enquanto a frase se constrói, e corta para claro na revelação.

## Elementos necessários
Fundo com cor animável. Frase de preparação ('Pra deixar seu projeto ainda mais...').

## Sequência de movimentos
1. A frase de preparação entra (digitação/blur).
2. O fundo vai de claro a escuro em ≈0,6–1 s.
3. Corte seco para claro + palavra-chave com ênfase (R-09).

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Escurecimento | ≈0,6 s (REF-006 7,5–8,1 s) / ≈1,0 s (REF-008 13,6–14,6 s) | 0,6–1,0 s power1.in |
| Revelação | corte no ataque | R-12 + R-09 |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-006 7,5–8,2 s; REF-008 13,6–14,7 s

## Cuidados
Funciona uma vez por peça: é o clímax.
