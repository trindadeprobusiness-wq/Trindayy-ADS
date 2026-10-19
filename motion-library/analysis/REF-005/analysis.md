# REF-005 — Concept Uber: história contada só por interface

| Campo | Valor |
|---|---|
| Arquivo | `references/REF-005_uber-concept-ui-story.mp4` |
| Nome original | `iwkii_tt.mp4` |
| Duração / formato | 23,0 s · 16:9 · 1024×576 · 30 fps · AAC |
| Assinatura | "made by kas" (tela final, 21,5 s). **Correção:** a nota v1 atribuía a "iwkii", que era só o nome do arquivo |
| Linguagens | **Animação de interface (UI storytelling)** · Minimalismo |

Legenda: **[V]** observado/medido · **[H]** hipótese.

> Marca Uber e padrões visuais do iMessage são de terceiros: só estudo.

## Conceito e objetivo
[V] Conta o uso do app como uma micro-história sem narração: convite por mensagem → "book an uber" → pedido → motorista chegando → notificação.

## Linha do tempo (frames a cada 0,067 s nos trechos críticos)
| t (s) | Evento [V] |
|---|---|
| 0–1,4 | Fundo preto, "Now 5:46", bolha cinza "heyy, wanna go out tonight ?" entra |
| 1,4–2,4 | Indicador de digitação (3 pontos) → bolha azul "sure, why not" |
| 3,3–4,3 | Digitação → "can you pick me up ?" |
| 5,2–6,6 | Digitação → bolha cinza "book an uber" |
| 6,6–7,0 | A bolha "book an uber" pulsa/alterna clara↔escura (destaque) |
| 7,07–7,6 | **Revelação circular branca nasce da bolha e cobre o quadro** (≈0,5 s, acelerando) |
| 7,6–7,74 | A bolha preta **vira o tile do logo "Uber"** (morph com motion blur) |
| 7,8–8,3 | Hold do tile |
| 8,34 | Tile **estica e vira a barra "Where to?"** (morph com motion blur) |
| 9–11 | Busca → endereço "Everyman Espresso" → item "Birch Coffee" com toggle |
| 12,0 | Card "UberX · USD 1.99 · Choose UberX" |
| 12,9 | "Ride requested" com barra de progresso enchendo |
| 13,9 | "Driver is arriving" |
| 14,73 | **Corte** para mapa top-down: ponto azul com cone de direção, rua, área verde |
| 14,8–17,8 | Carro desce pela rua até o ponto (câmera fixa, o carro se move) |
| 18,6 | Notificação "UBER · Message from Driver" (glassmorphism) sobre o mapa |
| 18,7–20,6 | Tela branca com "Uber" (logo em texto) |
| 20,67 | **Corte** para preto "made by kas" → fade |

## Linguagem visual
- **Tipografia [V]:** UI pura (sans-serif de sistema), pequena, sem título de marketing. A mensagem está nas ações, não em slogans.
- **Paleta [V]:** preto → branco (virada na revelação circular), azul de mensagem, mapa em cinza com verde menta. Muito espaço vazio.
- **Composição [V]:** um componente centrado por vez. O olho nunca precisa procurar.

## Movimento
- [V] Continuidade por **objeto-ponte**: a bolha origina o círculo, vira o logo, que vira a barra de busca. O mesmo elemento muda de função.
- [V] Bolhas entram com escala a partir do lado do remetente [H: com leve overshoot, típico do iOS].
- [V] É a peça mais parada do acervo (energia p50 = 0,0004): muito hold, movimentos curtos e precisos.

## Som e sincronia
- [V] Sem locução. Trilha com pulso claro: autocorrelação 0,48, a mais forte do acervo, ~129 BPM [estimativa com resolução de ±3 BPM].
- [V] **100% dos cortes caem a até 2 frames de um ataque sonoro** (acaso: 50%). É a peça com edição mais "no tempo".
- [H] Há SFX de UI (envio de mensagem, toque). A densidade de ataques sugere isso, mas não foram isolados.

## O que torna sofisticado
Narrativa sem texto de marketing, transições que nascem do elemento em foco, ritmo cravado na música e contenção total de paleta.

## O que poderia melhorar
16:9 com UI pequena: ilegível em feed vertical. Precisaria de reenquadramento 9:16 com componentes a ~2–3× o tamanho.

## Receitas extraídas
R-07 Revelação circular · R-04 Morph de forma (bolha→tile→barra) · R-19 Sequência de mensagens/chat (documentada) · R-12 Corte no tempo da música
