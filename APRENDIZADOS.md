# Aprendizados consolidados · Motion, edição e tráfego pago (nov/2026)

O que deu certo, o que quebrou e como foi resolvido nos projetos Nexools, Floway e Moovi. Leia junto com o `CLAUDE.md` (ou `AGENTS.md`). As skills ficam em `.claude/skills/` (Claude Code) e `.agent/skills/` (Antigravity).

## 1. Fluxo de um vídeo (do roteiro à entrega)
1. **Briefing**: até 6 perguntas por rodada, cada uma com uma recomendação (`motion-library/BRIEFING_PERGUNTAS.md`).
2. **Roteiro e voz**: o roteiro fica num `.txt` por vídeo. A voz vem da ElevenLabs (o Paulo funcionou bem) ou é gravada.
3. **Transcrição local**: `node motion-library/tools/asr/words.mjs voz.mp3` usa o Whisper tiny, sem internet.
4. **Alinhamento**: `python3 motion-studio/scripts/tools/align-script.py roteiro.txt asr.txt saida.json --total <segundos>`. Dá o tempo de cada palavra; legenda e animação seguem esse JSON. Nunca invente tempo de áudio.
5. **Trilha**: `python3 motion-library/tools/audio/bed_vsl.py trilha.wav <dur> mapa.json`. O mapa tem seções `[início, energia, clima]` (tenso, motivador ou calmo).
6. **Efeitos sonoros**: os sets são `public/nexools-ads/sfx_*` e `public/nexools-vsl/pro/*`. Cada efeito leva um `why`, e são no máximo 6 a cada 10 s.
7. **Produção**: Remotion em `motion-studio/src/projects/<projeto>/`, reaproveitando o kit (`akit.tsx`, `ckit.tsx`).
8. **Render com correção de pisca**: `python3 scripts/tools/render-and-fix.py <Id> --export renders/<NOME>.mp4`. Ele renderiza, conserta os quadros cinzas, masteriza em −14 LUFS e tira os metadados.
9. **Revisão**: olhe os quadros (folha de contato) e dê nota pela rubrica da skill `premium-motion-director`. Meta: 90/100 ou mais.
10. **Entrega**: sempre **sem metadados** (`export-final.sh`) e sempre mandando o arquivo no chat.

## 2. Padrão visual que funcionou (anúncios 9:16)
- **Formato**: 1080×1920, 30 ou 60 qps. Área segura: 12% livre em cima, 20% embaixo e a faixa direita dos botões do Reels.
- **Tema claro da Nexools**: fundo `#F4F7FC`, texto `#0B162A`, azul `#005AFC`. Brilho sutil e sombras macias passam confiança. Fundo escuro e neon pareceram "golpe".
- **Legenda palavra a palavra**: tinta escura com contorno branco, sempre legível sobre qualquer fundo.
- **Prova real vale mais que ilustração**: logos oficiais (simple-icons, CC0) quando a fala cita empresas, prints reais de WhatsApp enviados pelo usuário e gravação da tela.
- **Metáforas que funcionaram**: recibo carimbado "PREÇO CHEIO", balança que equilibra, carteira com "+ R$ 903", café × R$ 0,81 por dia, calendário 30/11, relógio, conta compartilhada × conta sua, cursor que trava no botão "Assinar".
- **Urgência**: barra fixa "VAGAS LIMITADAS · ATÉ 30/11" e um carimbo no CTA.
- **Movimento** (skill `launch-motion`): nada linear, entradas com leve passada do ponto (~0,5 s), saídas 60% mais rápidas, clique com "press", cursor em arco e nada 100% parado.

## 3. Problemas técnicos e soluções
| Problema | Causa | Solução |
|---|---|---|
| Quadros cinzas (1 a 3 seguidos) | Chromium no render | `render-and-fix.py`: acha a queda de luminância que volta em até 4 quadros, renderiza esses quadros como PNG e sobrepõe com ffmpeg |
| Pisca no fundo | `mask-image` CSS no fundo | Não usar máscara CSS em fundo animado |
| Disco cheio (ENOSPC) | Cada render deixa ~313 MB em `/tmp/remotion-webpack-bundle-*` | Apagar esses bundles depois de cada lote |
| ffmpeg sem memória ao cortar e juntar | Filtro trim+concat grande | Cortar em partes e juntar com o concat demuxer (`-f concat`) |
| Texto cortado ou sobreposto | Componentes sem limite de largura | Conferir os quadros-chave com a máscara de área segura (`--safe`) |
| Sinal invertido / número errado na tela | Erro de digitação no componente | Conferir cada número da tela contra a lista de fatos permitidos |

## 4. Regras de copy e oferta (evitam problema com Procon e Meta)
- **Só fatos confirmados.** Exemplo Coursera: 12 meses, R$ 297 uma vez, R$ 0,81 por dia, ~R$ 1.200 no site oficial, economia **R$ 903** ("mais de novecentos", nunca "mais de mil"), conta no nome do cliente, 7 dias para desistir.
- **Preço "de/por"** só se o preço "de" foi cobrado de verdade (CDC, art. 37).
- **Quem vende não é cliente**: nunca escreva "eu paguei R$ 297" na voz de quem vende.
- **Peças conceito** (marcas fictícias) nunca são "cliente" nem "case".
- **Escassez**: "vagas limitadas" sem número inventado.
- **Senhas** nunca vão para o repositório.

## 5. Estrutura e operação de mídia paga (Meta)
- **Postura**: decidir por lucro e vendas, não por CTR ou CPL. Poucos criativos, ângulos realmente diferentes. Classificar cada informação como [CONFIRMADA], [INFERÊNCIA], [HIPÓTESE] ou [PENDENTE]. Ver `motion-library/strategy/`.
- **Clique para o WhatsApp**: objetivo Engajamento, conjunto com `CONVERSATIONS` e destino `WHATSAPP`. Cada anúncio leva uma mensagem pronta com código, por exemplo "(A)", "(B)". A planilha do atendimento registra o código e diz qual vídeo vende, porque o Gerenciador só mede até a conversa.
- **Mensagem pronta pela API**: `video_data.page_welcome_message` com `customer_action_type: autofill_message` e `call_to_action: WHATSAPP_MESSAGE`.
- **Orçamento**: o usuário prefere a verba no conjunto (ABO). A API não troca CBO por ABO em campanha que já existe; nesse caso, recrie a campanha e pause a antiga.
- **Ativação pela API**: ative campanha, depois conjunto, depois cada anúncio. Depois confira se ficou "IN_PROCESS" ou "ACTIVE".
- **Reaproveitar criativo**: use `{"creative_id": "..."}`.
- **Regra de corte**: nenhum anúncio sai antes de gastar 2× o custo por conversa aceitável. Pouco volume é resultado inconclusivo, não anúncio perdedor.
- **Antes de criar algo novo**, confira o que já está ativo na conta. Uma campanha antiga esquecida mudou o gasto diário total.
- **Sem pixel**, a campanha de tráfego para site só mede clique. Instale o pixel antes de decidir por venda.

## 6. Referências e criativos vencedores
- **COU-A** (Coursera R$ 89,90): o único que performou, com R$ 2,26 por conversa. O A1 "Âncora" (comparação de preço) é o mais parecido.
- **REF-009** "3 hooks": as fórmulas "presta atenção antes de…", "a maioria das pessoas paga…" e "o motivo de…". Viraram os vídeos C1 a C3.
- **Floway**: a demonstração do próprio site no notebook (A) e o teste do Google (B) estão em teste desde 14/11.

## 7. Onde está cada coisa
| Caminho | Conteúdo |
|---|---|
| `.claude/skills/` e `.agent/skills/` | Skills de motion, HyperFrames e as skills próprias do usuário |
| `motion-library/` | Playbook, receitas, análises de referências, estratégia, marcas, roteiros e ferramentas de áudio e ASR |
| `motion-studio/` | Estúdio Remotion: biblioteca, projetos Nexools e Floway, scripts de render e exportação |
| `HANDOFF_CLAUDE_CODE.md` | Como preparar o Mac e continuar o trabalho |
