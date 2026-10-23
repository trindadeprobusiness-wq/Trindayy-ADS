# Moovi — ficha da marca

Materiais recebidos em 23/10/2026. Cliente/projeto separado da Nexools: não misture ativos, rodapé legal nem ofertas das duas marcas.

## O que é (pelo que as narrações dizem — confirmar com o usuário)
Assistente de finanças pessoais que funciona pelo **WhatsApp** e tem um **painel** web.
- Registra gastos por texto ("gastei 30 no almoço") ou **áudio**, escolhe a categoria e atualiza o painel na hora.
- Lê **print do extrato do banco**, separa cada lançamento por categoria e mostra antes de salvar; o usuário confirma com "sim". Não duplica lançamento que já existe.
- Painel: quanto entrou, quanto saiu e para onde foi.
- **Lembra as contas no WhatsApp** antes de vencer (cadastro da conta uma vez).
- **Resumo semanal**: quanto gastou na semana e o que vai vencer.
- Garantia: **7 dias, dinheiro de volta** se não gostar.
- CTA das narrações: "Link aqui embaixo".
- Painel/login: `https://dash.moovi.chat/` (conta do usuário: o e-mail dele; a senha **não** é guardada no repositório).

Ainda não sabemos (perguntar antes de pôr em vídeo): preço e planos, nome oficial do produto ("Moovi" com ou sem complemento), público-alvo exato, se existe app além do WhatsApp, prints reais do painel. Regra: nada de número ou funcionalidade que não esteja nesta ficha.

## Identidade visual
| Ativo | Arquivo |
|---|---|
| Símbolo (porquinho) | `assets/moovi-simbolo-porquinho.png` (1024×1024, fundo transparente) |
| Logo completo (porquinho + "moovi") | `assets/moovi-logo-completo.webp` (2000×2000, fundo branco) |

Cores medidas nos arquivos:
- Verde-escuro do porquinho: `#116530` (no símbolo isolado `#196733`)
- Verde da palavra "moovi": `#15803C`
- Fundo do logo: branco

Detalhes do logotipo: os dois "o" formam um símbolo de infinito; o pingo do "i" é um círculo cheio. Use o arquivo como imagem, sem redesenhar.

Sugestão de tema para os vídeos (a validar): fundo claro ou verde muito escuro, verde da marca como acento, um tom de alerta (âmbar/vermelho) só para "conta vencendo" e "juros".

## Narrações recebidas (ElevenLabs)
Transcrição automática com o Whisper tiny, que erra palavras; o texto abaixo é a **leitura provável**. Confirme com o roteiro original antes de gerar legendas.

| Arquivo | Voz | Duração | Ângulo |
|---|---|---|---|
| `audio/MOOVI_01_aline-urgente.mp3` | Aline Mota (urgente) | 23,6 s | Dinheiro acaba antes do mês → registrar gasto por texto/áudio |
| `audio/MOOVI_02_audrey-energica.mp3` | Audrey (enérgica, comercial) | 28,3 s | Juros por esquecer conta → lembrete no WhatsApp |
| `audio/MOOVI_03_aline-urgente.mp3` | Aline Mota (urgente) | 29,6 s | Preguiça de anotar gasto a gasto → print do extrato |

**MOOVI_01** — "Se o seu dinheiro aperta lá pelo dia 20, você está olhando para o mês tarde demais. Na Moovi você escreve 'gastei 30 no almoço' ou manda um áudio, e ela anota, escolhe a categoria e atualiza o seu painel na hora. Quanto entrou, quanto saiu e para onde foi tudo, num relance. E as contas, ela te lembra no WhatsApp. Se não gostar, em 7 dias você pede o dinheiro de volta. Link aqui embaixo."

**MOOVI_02** — "Você já pagou juros numa conta que tinha dinheiro para pagar? Não faltou dinheiro. Faltou lembrar. Aí vem aquela planilha que dura duas semanas. Na Moovi você cadastra a conta uma vez e ela já avisa no WhatsApp antes de vencer. Todo domingo ainda chega um resumo: quanto você gastou na semana e o que está para vencer. O resto fica no seu painel, organizado. Se não gostar, em 7 dias você pede o dinheiro de volta. Link aqui embaixo."
(Trecho incerto: "Todo domingo" saiu como "Todo mundo" na transcrição.)

**MOOVI_03** — "Você não largou o controle financeiro por preguiça. Largou porque é chato anotar gasto por gasto. Cansa. Na Moovi você tira um print do extrato do banco e manda. Ela lê cada lançamento, separa por categoria e te mostra antes de salvar. Você confere, fala 'sim' e está tudo lançado. Se alguma coisa já estava lá, ela não repete. Depois é só abrir o painel e ver para onde foi cada real. Se não gostar, em 7 dias você pede o dinheiro de volta. Link aqui embaixo."
(Primeiras frases incertas: confirmar o texto exato.)

## Para produzir vídeos da Moovi
Siga o `CLAUDE.md` (skill `premium-motion-director`, 10 fases). Destino provável: link (landing/checkout), não WhatsApp da Nexools. Telas do produto: só prints reais enviados pelo usuário; sem eles, interface ilustrativa sinalizada como demonstração.
