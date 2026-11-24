# Prompt Motion · como usar como "cérebro" dos motions (pedido do usuário, 24/11/2026)

Fonte: `PROMPT_MOTION_INDEX.md`, um índice de 240 prompts do prompt-motion.com enviado pelo usuário. Só 13 prompts estão completos (com `<inputs>`, `<direction>`, `<structure>` e `<build>`); os demais têm título, tags e link. O índice cita `prompts_database.json` e `SONORIZACAO_E_AUDIO_DESIGN.md`, que **não vieram**: peça ao usuário se precisar do prompt integral.

## Quando usar
Em todo vídeo, motion ou anúncio, na fase 3 (direção de arte) e 4 (storyboard) da `premium-motion-director`:
1. Defina o objetivo da peça (anúncio de performance, demo de produto, tipografia cinética).
2. Escolha 1 a 3 prompts do índice pela categoria e leia `<direction>`, `<structure>` e as regras "Banned".
3. Use os **princípios** (ritmo por compasso, morph de um único elemento, câmera, regras de proibição) no roteiro de cenas. Não copie a peça, a marca, a música nem os assets de terceiros (regra 6 do CLAUDE.md).
4. Registre na entrega quais IDs (PM-xxx) inspiraram cada cena.
5. Render continua no HyperFrames/Remotion, sem metadados, com `analyze.py --qa`.

## Mapa rápido para a Nexools (Coursera, WhatsApp)
| Necessidade da peça | Categoria do índice | Prompts para olhar primeiro |
|---|---|---|
| Prova em gravação de tela (T1–T3: conta ativa, CNPJ, matrícula) | SaaS & Product UI | PM-002 / PM-105 (morph de estados de UI, cursor com clique real) |
| Âncora de preço R$ 1.200 → R$ 297 → R$ 903 | Charts, Data & Diagrams | categoria inteira: contador de ~1 s e barra que encolhe |
| Hook de objeção "É golpe?" e frases-chave | Kinetic Typography | PM-028 (bumper de tipografia cinética) |
| Anúncio UGC com depoimentos | UGC, Anúncios & Performance Ads | PM-016 (UGC ad promo), PM-011 (comparação antes/depois) |
| Celular com WhatsApp no CTA | Mobile & App Experience | PM-005 (app no celular, ritmo por batida) |

Regra de escolha: 1 linguagem dominante por peça. A fluidez segue a `launch-motion` (easing, overshoot leve, nada parado), e a segurança da tela 9:16 segue a `premium-motion-director`.
