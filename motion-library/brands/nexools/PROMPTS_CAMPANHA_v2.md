# Campanha TESTE 7D — v2 (nova conta de anúncios)

22/10/2026 · 7 vídeos com trilha nova (pulso constante, subida antes do botão, batida no CTA), sem metadados.
Arquivos: `NEXOOLS_COU-A.mp4`, `NEXOOLS_COU-B.mp4`, `NEXOOLS_ELV-A.mp4`, `NEXOOLS_ELV-B.mp4`, `NEXOOLS_N8N-B.mp4`, `NEXOOLS_N8N-C.mp4`, `NEXOOLS_GEM-B.mp4` + capas `CAPA_<código>.jpg`.

---

## Prompt A — Claude da extensão do navegador (Gerenciador de Anúncios)

```
Você vai montar do zero uma campanha no Gerenciador de Anúncios da Meta, na conta de anúncios NOVA da Nexools: [NOME OU ID DA CONTA].

REGRAS
- Crie tudo DESLIGADO/RASCUNHO. Não clique em "Publicar" nem ative nada. Eu publico.
- Não mexa em nenhuma outra conta ou campanha.
- Se algum campo não existir, se a Meta sugerir outra configuração ou se um arquivo não carregar, PARE e me pergunte.
- Os 7 vídeos e as 7 capas estão na minha pasta Downloads com estes nomes:
  NEXOOLS_COU-A.mp4, NEXOOLS_COU-B.mp4, NEXOOLS_ELV-A.mp4, NEXOOLS_ELV-B.mp4, NEXOOLS_N8N-B.mp4, NEXOOLS_N8N-C.mp4, NEXOOLS_GEM-B.mp4
  CAPA_COU-A.jpg … CAPA_GEM-B.jpg (mesma lógica de nome)

CAMPANHA
- Nome: NEXOOLS | WHATSAPP | TESTE 7D | V2
- Objetivo: Engajamento → local da conversão: Apps de mensagem → WhatsApp
- Orçamento de campanha Advantage+: DESLIGADO (orçamento por conjunto)

CONFIGURAÇÃO DE TODOS OS CONJUNTOS
- Página do Facebook + Instagram da Nexools; WhatsApp: [NÚMERO]
- Meta de desempenho: maximizar o número de conversas
- Estratégia de lance: "Maior volume" (Highest volume) — sem valor de lance/ROAS
- Local: Brasil · Público Advantage+ sem interesses · Posicionamentos Advantage+
- Início: [DD/MM] 00:00 · Término: [DD/MM + 6 dias] 23:59 (horário de Brasília)

CONJUNTOS (orçamento diário)
1) COURSERA | BR | 18-54 — R$ 18
2) ELEVENLABS | BR | 18-54 — R$ 12
3) N8N | BR | 22-55 — R$ 12
4) GEMINI | BR | 18-54 — R$ 8
Total R$ 50/dia

ANÚNCIOS
- Vídeo do arquivo de mesmo código; capa = CAPA_<código>.jpg
- Botão: "Enviar mensagem" (WhatsApp)
- Desligar: aprimoramentos Advantage+ de criativo, mídia gerada por IA, "Multi-advertiser ads"
- Ignorar sugestão "Duplicate ad / adicionar imagem"
- Descrição: vazia
- Todo texto principal termina com: "Nexools é revendedora independente. Marcas citadas pertencem aos seus respectivos donos."
- Nome do anúncio = código

COURSERA — mensagem de boas-vindas: "Olá! Quero o Coursera 12 meses."
- COU-A — Texto: "12 meses de Coursera Plus por R$ 89,90 à vista. Cursos e certificados de universidades e empresas, ativados na sua conta." — Título: "Coursera 12 meses — R$ 89,90"
- COU-B — Texto: "O próximo curso pode ser o começo de uma nova habilidade. 12 meses de Coursera Plus por R$ 89,90." — Título: "Estude o ano inteiro"

ELEVENLABS — boas-vindas: "Olá! Quero o ElevenLabs Creator."
- ELV-A — Texto: "A voz deste anúncio foi feita com ElevenLabs. 3 meses do plano Creator por R$ 149,90." — Título: "Vozes com IA para seus vídeos"
- ELV-B — Texto: "Narração que não ficou boa? Gere novas versões a partir do roteiro. ElevenLabs Creator, 3 meses, R$ 149,90." — Título: "Sem regravar"

N8N — boas-vindas: "Olá! Quero o n8n Starter 12 meses."
- N8N-B — Texto: "Lead novo, planilha, aviso à equipe… todo dia. Automatize com o n8n Starter: 12 meses por R$ 297, cupom na sua conta." — Título: "Automatize sua rotina"
- N8N-C — Texto: "Cupom oficial aplicado na sua própria conta do n8n. 12 meses do plano Starter por R$ 297 à vista." — Título: "n8n Starter 12 meses"

GEMINI — boas-vindas: "Olá! Quero o Gemini Pro 18 meses."
- GEM-B — Texto: "Gemini Pro por 18 meses, com licença ativada no seu próprio e-mail. R$ 47 à vista." — Título: "Gemini Pro 18 meses"

AO FINAL
- Confirme que nenhum conjunto ou anúncio tem ícone de erro.
- Abra a prévia de 1 anúncio por produto e confira se o vídeo é o certo.
- Me mostre um resumo: conjunto → orçamento → datas; anúncio → vídeo → título → boas-vindas.
```

---

## Prompt B — Claude com o MCP da Meta (cria pela API)

```
Use as ferramentas do Meta Ads (MCP) para criar uma campanha de teste de 7 dias na conta de anúncios NOVA da Nexools.

REGRAS
- Crie TUDO PAUSADO. Só ative depois que eu disser "pode ativar".
- Antes de criar, me mostre o plano (conta, página, orçamentos em centavos, datas) e espere meu OK.
- Não altere nem leia campanhas de outras contas além do necessário.
- Se uma ferramenta der erro, me mostre a mensagem e a correção que você propõe antes de repetir.

PASSO 1 — CONTA E PÁGINA
- ads_get_ad_accounts: liste as contas e me pergunte qual é a nova conta da Nexools [NOME/ID se eu já souber]. Leia a moeda (BRL) e o orçamento diário mínimo.
- ads_get_ad_account_pages: identifique a Página da Nexools e a conta do Instagram ligada a ela. Confirme que a Página tem o WhatsApp [NÚMERO] conectado; se não tiver, pare e me avise.

PASSO 2 — CAMPANHA
- ads_create_campaign: nome "NEXOOLS | WHATSAPP | TESTE 7D | V2", objetivo OUTCOME_ENGAGEMENT, sem categoria especial, SEM orçamento de campanha (orçamento por conjunto/ABO), status PAUSED.

PASSO 3 — CONJUNTOS (ads_create_ad_set, um por produto)
Comum a todos:
- optimization_goal: CONVERSATIONS · destination_type: WHATSAPP · billing_event: IMPRESSIONS
- bid_strategy: LOWEST_COST_WITHOUT_CAP (maior volume, sem lance)
- promoted_object: {"page_id": "<PAGE_ID>"}
- Advantage+ Audience ligado (não desligar), sem interesses, posicionamentos Advantage+
- start_time: [AAAA-MM-DD]T00:00:00-03:00 · end_time: [AAAA-MM-DD + 6 dias]T23:59:00-03:00
Conjuntos:
1) "COURSERA | BR | 18-54" — daily_budget 1800 — targeting {"geo_locations":{"countries":["BR"]},"age_min":18,"age_max":54}
2) "ELEVENLABS | BR | 18-54" — daily_budget 1200 — mesmo targeting
3) "N8N | BR | 22-55" — daily_budget 1200 — {"geo_locations":{"countries":["BR"]},"age_min":22,"age_max":55}
4) "GEMINI | BR | 18-54" — daily_budget 800 — mesmo targeting do 1
(se o orçamento mínimo da conta for maior que algum valor, me avise antes de ajustar)

PASSO 4 — MÍDIA (ads_creative_upload_media)
- Envie os 7 vídeos com upload_source LOCAL_FILE (eu escolho os arquivos no seu app de upload):
  NEXOOLS_COU-A.mp4, NEXOOLS_COU-B.mp4, NEXOOLS_ELV-A.mp4, NEXOOLS_ELV-B.mp4, NEXOOLS_N8N-B.mp4, NEXOOLS_N8N-C.mp4, NEXOOLS_GEM-B.mp4
- Envie as 7 capas (imagens) CAPA_COU-A.jpg … CAPA_GEM-B.jpg da mesma forma.
- Use ads_get_ad_videos até cada vídeo ficar com status "ready". Anote video_id e image_hash de cada código.

PASSO 5 — CRIATIVOS (ads_create_creative, um por código)
Comum: page_id da Nexools; instagram_user_id da conta ligada; video_id + image_hash da capa do mesmo código; call_to_action_type WHATSAPP_MESSAGE (sem link_url); advantage_plus_creative false; nome do criativo = código.
Todo "message" termina com: "Nexools é revendedora independente. Marcas citadas pertencem aos seus respectivos donos."
- COU-A — message: "12 meses de Coursera Plus por R$ 89,90 à vista. Cursos e certificados de universidades e empresas, ativados na sua conta." — headline: "Coursera 12 meses — R$ 89,90"
- COU-B — message: "O próximo curso pode ser o começo de uma nova habilidade. 12 meses de Coursera Plus por R$ 89,90." — headline: "Estude o ano inteiro"
- ELV-A — message: "A voz deste anúncio foi feita com ElevenLabs. 3 meses do plano Creator por R$ 149,90." — headline: "Vozes com IA para seus vídeos"
- ELV-B — message: "Narração que não ficou boa? Gere novas versões a partir do roteiro. ElevenLabs Creator, 3 meses, R$ 149,90." — headline: "Sem regravar"
- N8N-B — message: "Lead novo, planilha, aviso à equipe… todo dia. Automatize com o n8n Starter: 12 meses por R$ 297, cupom na sua conta." — headline: "Automatize sua rotina"
- N8N-C — message: "Cupom oficial aplicado na sua própria conta do n8n. 12 meses do plano Starter por R$ 297 à vista." — headline: "n8n Starter 12 meses"
- GEM-B — message: "Gemini Pro por 18 meses, com licença ativada no seu próprio e-mail. R$ 47 à vista." — headline: "Gemini Pro 18 meses"
- self_ai_disclosure: me pergunte antes (a narração foi gerada com IA no ElevenLabs; a decisão é minha).

PASSO 6 — ANÚNCIOS (ads_create_ad, PAUSED)
- COU-A e COU-B no conjunto COURSERA · ELV-A e ELV-B no ELEVENLABS · N8N-B e N8N-C no N8N · GEM-B no GEMINI. Nome do anúncio = código.

PASSO 7 — MENSAGEM DE BOAS-VINDAS DO WHATSAPP
- Se as ferramentas permitirem definir a mensagem inicial, use:
  Coursera: "Olá! Quero o Coursera 12 meses." · ElevenLabs: "Olá! Quero o ElevenLabs Creator." · n8n: "Olá! Quero o n8n Starter 12 meses." · Gemini: "Olá! Quero o Gemini Pro 18 meses."
- Se não for possível pela API, me diga em quais anúncios eu preciso colocar à mão no Gerenciador.

PASSO 8 — REVISÃO
- ads_get_ad_entities: confira campanha, 4 conjuntos e 7 anúncios (status, orçamento, datas, video_id certo em cada anúncio).
- ads_get_ad_preview: me mostre a prévia de 1 anúncio por produto.
- Me entregue uma tabela: conjunto → orçamento → datas | anúncio → vídeo → título.
- Espere eu dizer "pode ativar". Aí use ads_activate_entity na campanha, nos 4 conjuntos e nos 7 anúncios.

DEPOIS DE ATIVAR (acompanhamento)
- No dia 3 e no dia 7, puxe por anúncio: gasto, impressões, CPM, CTR, conversas iniciadas e custo por conversa.
- Regras de pausa (só sugira; eu aprovo):
  Coursera: gastou R$ 107 sem venda que eu informe → pausar
  ElevenLabs: custo por conversa > R$ 12 após R$ 50 gastos
  n8n: custo por conversa > R$ 20 após R$ 60 gastos
  Gemini: custo por conversa > R$ 8 após R$ 30 gastos
  Dentro de cada conjunto, depois de 3 dias, sugerir pausar o anúncio com custo por conversa 30% pior.
```

---

## Execução via MCP (22/10/2026)

Conta: **Trindade** (1118522067814410), negócio Segredos do Silício · Página: **Gabriel Trindade** (1269240469594904, com WhatsApp; a Expert Trindade não tem WhatsApp conectado) · Instagram: @trindayy

| Objeto | ID | Orçamento | Status |
|---|---|---|---|
| Campanha NEXOOLS \| WHATSAPP \| TESTE 7D \| V2 (Engajamento, ABO) | 120248746777380765 | — | pausada |
| COURSERA \| BR \| 18-54 | 120248746781190765 | R$ 18/dia | pausado |
| ELEVENLABS \| BR \| 18-54 | 120248746783030765 | R$ 12/dia | pausado |
| N8N \| BR \| 22-55 | 120248746783510765 | R$ 12/dia | pausado |
| GEMINI \| BR \| 18-54 | 120248746783870765 | R$ 8/dia | pausado |

Todos: otimização para conversas no WhatsApp, maior volume, Brasil, Advantage+, término 29/10/2026 23:59.
Pendente: subir os 7 vídeos na biblioteca de mídia da conta → criar criativos e anúncios.

### Anúncios criados via MCP (23/10/2026) — todos PAUSADOS
Identidade: página Gabriel Trindade (1269240469594904) + Instagram @trindayy (17841479648607267). Botão WhatsApp. Texto + rodapé legal.

| Anúncio | Conjunto | Vídeo | Ad ID |
|---|---|---|---|
| COU-A | COURSERA | 1436634284547477 | 120248753030610765 |
| COU-B | COURSERA | 2352593018821559 | 120248753039580765 |
| ELV-A | ELEVENLABS | 1830649831296356 | 120248753039990765 |
| ELV-B | ELEVENLABS | 1670400971311686 | 120248753040260765 |
| N8N-B | N8N | 4736237556604345 | 120248753040720765 |
| N8N-C | N8N | 1122266400550020 | 120248753041330765 |
| GEM-B | GEMINI | 1112552381541885 | 120248753042160765 |

Pendências manuais no Gerenciador:
- ELV-A: marcar a declaração de conteúdo com IA (decisão do usuário: só no ELV-A). A conta não permitiu criar o criativo separado, onde esse campo existe.
- Trocar a miniatura pelas capas `renders/capas/CAPA_<ID>.jpg` (a automática é o 1º quadro, quase vazio).
- Mensagem de boas-vindas por produto (modelo de mensagem do WhatsApp).
- Vídeo COU-B duplicado na biblioteca (1786703519208224), não usado.

### Conferência e projeção com R$ 40/dia (23/10/2026)
Conferido via API: os 7 anúncios passaram na análise (PAUSED, sem reprovação), botão WhatsApp, textos e rodapé corretos. Orçamentos atuais: 18/12/12/8 = R$ 50/dia, fim em 29/10 23:59.

Projeção de 7 dias (hipóteses, mesmas do PROMPT_EXTENSAO_META_v1; lucro bruto do offers.json):

| Verba | Divisão | Pessimista | Realista | Otimista |
|---|---|---|---|---|
| R$ 50/dia (R$ 350) | 18/12/12/8 | 39 conv · 2–3 vendas · −R$ 148 | 63 conv · 7–8 vendas · +R$ 286 | 102 conv · 21 vendas · +R$ 1.474 |
| R$ 40/dia (R$ 280) A | 15/10/10/5 | 31 conv · 2 vendas · −R$ 116 | 49 conv · 6 vendas · +R$ 237 | 80 conv · 17 vendas · +R$ 1.205 |
| R$ 40/dia (R$ 280) B | 18/11/11/0 (Gemini pausado) | 29 conv · 2 vendas · −R$ 106 | 47 conv · 6 vendas · +R$ 271 | 77 conv · 17 vendas · +R$ 1.299 |

### Decisão (23/10/2026): R$ 50/dia sem Gemini
Orçamentos aplicados via MCP: Coursera R$ 22 · ElevenLabs R$ 14 · n8n R$ 14. GEMINI fica pausado (não ativar).
Projeção 7 dias (R$ 350): pessimista 36 conv · ~2 vendas · −R$ 133 | realista 58 conv · ~7–8 vendas · +R$ 338 | otimista 95 conv · ~21 vendas · +R$ 1.622.
