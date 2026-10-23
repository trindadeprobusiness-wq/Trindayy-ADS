# Moovi — Demo 05 ("Deixa eu te mostrar a Moovi funcionando")

## Brief
| Campo | Valor | Fonte |
|---|---|---|
| Objetivo | Mostrar o produto funcionando: painel → gráfico → comparação → assistente → extrato | roteiro/proposta do usuário |
| CTA | moovi.chat · 7 dias de garantia (narração não tem CTA; cartela final) | ficha da marca |
| Público | Pessoas que querem controlar gastos sem planilha | premissa |
| Produto | Real (Moovi). Interface recriada a partir dos prints; **valores ilustrativos** (os prints têm dados pessoais) | usuário |
| Canal / formato | Reels/Stories/TikTok · 9:16 1080×1920 · 30 fps · 43 s | premissa |
| Áudio | `MOOVI_05_aline-urgente.mp3` (ElevenLabs, 39,7 s) + trilha procedural de retenção + SFX procedurais | usuário / gerado |
| Estilo | C (SaaS cinematic) + A (contenção): palco escuro com verde da marca, app claro fiel ao real | escolhido |

## Ideia-mestra
Um único celular atravessa a peça inteira. Ele acende, mostra o painel, gira para o assistente e termina com o extrato virando lançamentos: causa e efeito sempre na mesma tela.

## Storyboard (frames @30)
| Cena | Frames | Fala | Visual / animação | Som (why) |
|---|---|---|---|---|
| Hook | 0–96 | "Deixa eu te mostrar a Moovi funcionando." | Celular em isometria → câmera mergulha; tela acende com o logo | whoosh_soft (mergulho) |
| Painel | 84–288 | "Esse é o painel… resultado do mês." | Swipe do splash; 4 cards em cascata (spring); cada valor conta no frame da palavra | whoosh_fast (swipe), counter_roll ×2 |
| Gráfico | 282–498 | "Logo abaixo… você toca na fatia e vê o valor." | Câmera desce; rosca desenha; toque em Alimentação: fatia destaca, centro troca o valor | pop_soft (toque) |
| Comparação | 498–638 | "Aqui é a comparação… com o quê?" | Barras crescem; selo verde −16% em Alimentação; celular gira 180° | whoosh_soft (giro) |
| Assistente | 638–818 | "Agora o assistente… em alimentação." | Digita "gastei 30 no almoço"; resposta; card flutuante de Alimentação sobe +R$ 30 | msg_send, msg_recv, tick |
| Pergunta | 818–953 | "Pergunto: quanto gastei com delivery…" | Digita a pergunta; "digitando…" pulsa; resposta com número | msg_send, msg_recv |
| Extrato | 953–1206 | "E se der preguiça… quando eu digo sim." | Print do extrato enviado → varredura verde → lista categorizada para conferir → "sim" → checks + "Prontinho!" | msg_send, scan, msg_recv, msg_send, ding |
| Assinatura | 1196–1290 | — | Celular sai em blur; logo branco; "Seu dinheiro, organizado."; garantia; botão moovi.chat (hold 1,8 s) | shimmer + drop da trilha |

## Desvios da proposta (e por quê)
- **Cena 5 — "chat estilo WhatsApp":** usei o Assistente do próprio painel da Moovi (print 07). Os áudios 04–06 confirmam que o lançamento é feito ali e que o WhatsApp só avisa. Mostrar WhatsApp seria prometer uma função que não existe.
- **Cena 6 — micro-card com gráfico no chat:** a resposta virou um balão de texto com o número em negrito, igual ao assistente real (print 07). Não há prova de que o app responde com gráfico.
- **Cena 3 — tooltip com linha:** o app real mostra o valor no centro da rosca e marca o chip da categoria; segui o real.
- **Cena 7 — linha azul neon / botão "Confirmar":** a varredura é verde (cor da marca), e a confirmação é o "sim" no chat, como diz a fala e como o app funciona.
- **Extrato:** fictício e sem marca de banco (não temos um extrato real sem dados pessoais).

## Validação técnica (validate-render.py, arquivo final)
1080×1920 @30 · 43,0 s · H.264 yuv420p + AAC 48 kHz · −13,9 LUFS · pico −3,6 dBTP · sem pretos · sem congelamentos (o hold de 1,5 s no gráfico foi corrigido com push-in lento) · metadados e SEI do x264 removidos → **PASS**.
Arquivo: `motion-library/brands/moovi/renders/MOOVI_DEMO05.mp4`.

## Rubrica — 87/100 (abaixo da meta de 90)
| Critério | Nota | Evidência |
|---|---|---|
| Direção criativa | 18/20 | Celular persistente atravessa as 7 cenas; causa→efeito visível (card de Alimentação sobe +30 no frame da resposta) |
| Clareza narrativa | 14/15 | Legendas + UI contam a história sem som |
| Composição/tipografia | 12/15 | Texto do app ~25–30 px no vídeo (legível, mas pequeno); legenda cobre o topo do chat na cena do extrato (35–39 s) |
| Movimento | 13/15 | Springs, count-up sincronizado, giro 180°; no meio do giro o celular fica de perfil por ~3 frames |
| Ritmo/sync | 9/10 | Eventos presos ao tempo das palavras (Whisper); sync conferido nos stills, não quadro a quadro |
| Sound design | 7/10 | Trilha e SFX procedurais; mix voz×trilha não medido por trecho |
| Consistência | 5/5 | Tokens da marca do início ao fim |
| Acabamento | 9/10 | Validação limpa, grain/vinheta sutis |

**Para passar de 90:** aproximar ainda mais a câmera nas cenas de chat (ou dividir a legenda em linha menor), trilha licenciada, e revisar o giro.

## Correções de integridade visual (v2, a pedido do usuário)
Varredura quadro a quadro (8–16 fps nas transições) encontrou e corrigiu:
1. Balões novos subiam por baixo do campo de digitar (texto fantasma sobre o input) → mensagens recortadas acima do input.
2. "Digitando…" sumia de uma vez e a conversa pulava → recolhe suave em 9 frames.
3. Legenda sobre o texto do chat (cenas de pergunta/extrato) → máscara de fade no topo do chat; a faixa da legenda fica limpa.
4. Partículas da confirmação caíam em cima do avatar/texto → removidas.
5. Logo branco aparecia sobre o celular borrado (dupla exposição) → celular some em 12 frames, logo entra só depois.
6. Corpo do celular sumia no fundo escuro → aro claro sutil.
7. Faixas/retângulos de compressão no degradê escuro → grain 6% + encode CRF 16 com aq-mode 3.
8. Legendas longas encostavam na borda → divididas em duas.
Validação: PASS, sem congelamentos, −13,9 LUFS, pico −3,6 dBTP, yuv420p, sem metadados.

## v3 — piscadas de 1 frame (blocos pretos)
Causa: o Chromium fotografava alguns frames antes de rasterizar todos os tiles da camada 3D do celular (7 frames: 122, 219, 303, 556, 627, 669, 1054 na v2).
Correção: 3D só durante o mergulho (0–70) e o giro (606–648), com uma face só e transform 2D no resto; o giro pula o ângulo de 90° (plano de espessura zero). `repair-glitches.py` agora roda dentro do `render.mjs` e re-renderiza qualquer frame que destoe dos dois vizinhos (reparou 27, 36, 44 na abertura).
Varredura final dos 1.290 frames: nenhum bloco/sumiço; único frame marcado (627) é o celular de perfil no giro, movimento legítimo conferido visualmente.
