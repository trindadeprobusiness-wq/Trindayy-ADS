# Moovi — ficha da marca

> **Correção (23/10/2026, áudios 04–06 e prints):** os gastos são lançados no **Assistente dentro do painel** (texto ou áudio); o **WhatsApp só avisa** (contas a vencer, compromissos e resumo semanal aos domingos). Onde abaixo estiver "pelo WhatsApp" para registrar gasto, vale esta correção. Preço e planos agora são conhecidos (seção nova no fim).

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

## Dados confirmados nos áudios 04–06 (23/10/2026)
- **O que é:** assistente financeiro; painel no celular ou computador com o que entrou, o que saiu, contas, cartões, o que tem para pagar e metas. Sem planilha.
- **Assistente (painel):** "gastei 50 no mercado" por texto ou áudio → lança na categoria certa. Responde perguntas com os números do usuário ("quanto gastei com delivery este mês?"). Lê extrato, mostra antes e lança só quando o usuário diz "sim".
- **WhatsApp:** só avisos — conta para vencer, compromisso e resumo da semana todo domingo.
- **Planos (anuais):** Básico **R$ 14,90/mês**, Pro **R$ 19,90/mês**, Premium **R$ 24,90/mês**. Parcela em até 2× no cartão ou Pix. Assistente com IA e leitura de extrato **a partir do Pro**.
- **Garantia:** 7 dias, dinheiro de volta.
- **Segurança:** não guarda o número do cartão; nada do extrato é lançado sem confirmação; login por código no e-mail (sem senha para decorar).
- **App:** por enquanto web, instalável na tela inicial; app iPhone/Android "está vindo" (não prometer data).

| Áudio | Duração | Ângulo |
|---|---|---|
| `audio/MOOVI_04_aline-urgente.mp3` | 38,5 s | "Em 1 minuto te explico o que é a Moovi" (explicativo) |
| `audio/MOOVI_05_aline-urgente.mp3` | 39,7 s | Demo do painel + assistente (pede os prints) |
| `audio/MOOVI_06_aline-urgente.mp3` | 47,7 s | Perguntas frequentes: preço, planos, segurança, app |
(Transcrição Whisper tiny, revisar antes de legendar. Trechos finais de 05 incertos.)

## Prints reais do produto (enviados pelo usuário, 23/10/2026)
`prints/` — celular, tema claro, conta real com dados (Out/2026):
| Arquivo | Tela |
|---|---|
| `01_transacoes.jpg` | Transações: saldo, receitas/despesas, busca, filtro mensal, lista |
| `02_dashboard.jpg` | Dashboard: cards Saldo/Receitas/Despesas/Resultado, previsão do fim do mês |
| `03_composicao_saldo.jpg` | Tooltip "Composição do saldo" por banco + gráfico de evolução |
| `04_gastos_categoria.jpg` | Rosca "Gastos por Categoria" (Moradia 44%) |
| `05_comparacao_mensal.jpg` | Barras "Comparação Mensal" por categoria |

Uso em anúncio: são dados pessoais reais (saldos, nomes de bancos). **Antes de pôr em vídeo, borrar/substituir valores e bancos** ou recriar a UI com números fictícios sinalizados ("valores ilustrativos").
UI observada: fundo branco, cards com cantos arredondados, verde de receita, vermelho de despesa, botão primário verde "+ Adicionar", barra inferior Início · Transações · Assistente · Compromissos · Menu, fonte sem serifa arredondada.
| `06_metas.jpg` | Metas: total guardado, barras de progresso por meta, data-alvo |
| `07_assistente_chat.jpg` | Assistente: "Recebi 200 reais de serviço" → pergunta a conta (Bradesco/Nubank/dinheiro) → "Prontinho! Receita registrada na categoria Serviços" 💚; campo com microfone |
| `08_lancamentos_bradesco.jpg` | Lançamentos por conta (Bradesco) |
| `09_cartoes.jpg` | Cartões: limite usado, fatura aberta/fechada, fechamento e vencimento, botão "Pagar fatura" |
| `10_lancamentos_nubank.jpg` | Lançamentos por conta (Nubank), receitas e despesas por categoria |

Funcionalidades confirmadas por esses prints: metas com progresso, cartões de crédito com controle de fatura, várias contas/bancos, assistente que pergunta o que falta antes de lançar. Mesmo cuidado: dados reais (finais de cartão, bancos, valores) — borrar ou recriar antes de usar em anúncio.
| `11_compromissos.jpg` | Compromissos: agenda financeira e pessoal, **Google Agenda conectado**, calendário mensal |
| `12_relatorios.jpg` | Relatórios: filtros por período, **exportar CSV/Excel/PDF**, abas Geral/Categoria/Conta/Detalhado |
| `13_despesas_categoria.jpg` | Relatório: barras de despesas por categoria + detalhamento em % |
| `14_categorias.jpg` | Categorias editáveis (11 de despesa, 6 de receita) |
| `15_atalhos.jpg` | Personalizar atalhos da barra (Assistente, Cartões, Receitas, Recorrentes, Contas, Orçamento, Metas, **Open Finance**, Investimentos…) |

Funcionalidades vistas no menu (confirmar quais estão ativas antes de anunciar): Recorrentes, A pagar/receber, Orçamento, **Open Finance**, Investimentos.

## Gravações de tela (`telas/`, enviadas 23/10/2026)
Celular, 590×1276, ~60 fps, sem áudio. Mesmo cuidado com dados reais.
| Arquivo | Duração | Conteúdo |
|---|---|---|
| `01_dashboard.mp4` | 23,0 s | Dashboard |
| `02_transacoes.mp4` | 11,0 s | Transações |
| `03_assistente_ia.mp4` | 8,0 s | Assistente com IA |
| `04_cartoes_contas.mp4` | 16,0 s | Cartões e contas |
| `05_orcamento_metas.mp4` | 19,0 s | Orçamento e metas |

## Vídeos prontos (23/10/2026) — `renders/`, todos sem metadados
MOOVI_DEMO05 (sem o selo "Valores ilustrativos"), MOOVI_01, MOOVI_02, MOOVI_03, MOOVI_04, MOOVI_06.
Fonte: `motion-studio/src/projects/moovi-kit/` (kit) + `moovi-0N/`; notas em `moovi-kit/BRIEF.md`.
