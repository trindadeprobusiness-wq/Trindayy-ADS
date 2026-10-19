# R-19 — Sequência de mensagens (chat)

**Linguagens:** Animação de interface · Storytelling  
**Implementação:** documentada  
**Equivalente no HyperFrames:** blueprints: `prompt-type-submit-generate`, `typewriter-reveal`

## Objetivo
Contar uma situação de uso ou prova social com mensagens chegando.

## Elementos necessários
Bolhas (remetente à esquerda, você à direita), indicador de digitação, horário.

## Sequência de movimentos
1. Indicador de digitação (3 pontos) ≈0,8–1 s.
2. A bolha substitui o indicador com escala a partir do canto do remetente.
3. Mensagens anteriores sobem para abrir espaço.
4. A última mensagem vira ponte para a próxima cena (R-07).

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Ciclo por mensagem | ≈1,5–2 s (REF-005 0–6,6 s) | 1,4–1,8 s |
| Digitação | ≈0,8 s | 0,6–0,9 s |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-005 0–7 s; REF-008 16–17,8 s

## Cuidados
Não imitar a UI do iMessage/WhatsApp com marca: criar um estilo de chat próprio.
