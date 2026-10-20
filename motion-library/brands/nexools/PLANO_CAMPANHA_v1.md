# Nexools — Plano de campanha v1 (Meta Ads, WhatsApp)

Data: 20/10/2026 · Base: `ESTRATEGIA_CRIATIVOS_v1.md` + relatório "Untitled-report_1.xlsx" (01–20/10/2026)
Legenda: [C] confirmado · [U] informado pelo usuário · [I] inferência · [H] hipótese · [P] pendente

## 1. O que o relatório da semana passada mostra

| Métrica | Valor |
|---|---|
| Investimento | R$ 236,14 [C] |
| Impressões | 8.206 [C] |
| Alcance | 6.669 [C] |
| Frequência | 1,23 [C] |
| CPM | ≈ R$ 28,78 [C, calculado] |

- **Campanhas:** "IA PREMIUM \| WHATSAPP \| OUT26 - Oficial" (conjunto "Vídeos", AD01–AD05, de 15 a 19/10) e "OUT26 \| WHATSAPP \| VIDEO IA \| ANAPOLIS" (conjunto Anápolis/Goiânia, 23–55, AD01-V2, de 3 a 5/10) [C].
- **AD01 "Gemini Pro: manter em revisão"**: o nome indica que o anúncio estava em revisão ou foi reprovado [I].
- **Limitação:** o relatório não tem conversas, cliques nem custo por resultado. As linhas por anúncio, idade e sexo vieram sem números. **Não dá para saber se algum anúncio funcionou.** Com 8 mil impressões, não existe ainda um vencedor comprovado.
- **CPM alto [H]:** R$ 28,78 é alto para um público aberto no Brasil. As causas prováveis são a região restrita (Anápolis/Goiânia) e a verba dividida em 5 anúncios.
- **Para o próximo relatório, incluir:** Resultados, Custo por resultado, Conversas por mensagem iniciadas, Cliques no link, CTR, ThruPlays e Retenção de vídeo, por anúncio.

## 2. Campanha nova ou reaproveitar?

**Crie uma campanha nova e pause a antiga, sem apagar.**
- Não há prova de que a campanha antiga "deu certo" (faltam resultados) e o volume foi baixo. Por isso não existe aprendizado de algoritmo a preservar.
- Adicionar ou trocar anúncios num conjunto existente reinicia o aprendizado do mesmo jeito.
- O que a Meta aprende sobre quem conversa e compra fica na conta e no pixel, não na campanha. Você não perde isso ao criar uma nova.
- Pause em vez de apagar, para manter o histórico.
- **Exceção:** se no Gerenciador algum anúncio antigo tiver custo por conversa baixo e vendas no WhatsApp, leve esse anúncio para a campanha nova com "usar publicação existente". Assim ele mantém curtidas e comentários.

## 3. Estrutura recomendada

**1 campanha → 1 conjunto por ferramenta → 2 anúncios por conjunto.**

| Opção | Veredito | Por quê |
|---|---|---|
| 1 conjunto com todos os anúncios | ✗ | A Meta concentra a verba em 1–2 anúncios (provavelmente os do Gemini, que é o mais barato) e você não descobre qual produto vende. |
| 1 conjunto por anúncio | ✗ | Divide R$ 40 em 6–15 partes, nenhum conjunto aprende e o custo sobe. |
| **1 conjunto por ferramenta** | ✓ | Cada produto tem público, margem e custo máximo por venda diferentes. Você controla a verba por produto e compara 2 ângulos dentro de cada um. |

**Campanha:** NEXOOLS | WHATSAPP | OUT26 | TESTE
- Objetivo: Engajamento → Mensagens (WhatsApp) → maximizar conversas
- Orçamento por conjunto (Advantage+ de orçamento desligado)

| Fase | Conjunto | Anúncios | Verba/dia |
|---|---|---|---|
| 1 (dias 1–7) | COURSERA \| BR \| 18-54 \| ABERTO | COU-A, COU-B | R$ 25 |
| 1 (dias 1–7) | ELEVENLABS \| BR \| 18-54 \| ABERTO | ELV-A, ELV-B | R$ 15 |
| 2 (dias 8–21) | N8N \| BR \| 22-55 \| ABERTO | N8N-B, N8N-C | R$ 20 |
| espera | GEMINI | — | 0 (decidir preço ou posicionamento; há ~200 concorrentes mais baratos) |
| espera | MANUS | — | 0 (precisa de demonstração real; R$ 597 em público frio é arriscado) |

**Ainda não usar:** GEM-A, GEM-C, ELV-C, ELV-C2, N8N-A e MAN-C. Esses vídeos têm comparações de preço não validadas.

## 4. Quanto investir com segurança

- **Fase 1:** R$ 40/dia ≈ **R$ 280 na semana**. É o máximo que você perde se nada vender. Trate como custo de aprendizado.
- **Fase 2:** R$ 60/dia (com o n8n) ≈ R$ 420/semana, mas só se a fase 1 mostrar custo por conversa ≤ R$ 8.
- **Escala:** +20% a cada 3–4 dias no conjunto cujo custo por venda ficar abaixo do limite.

**Regras para pausar (por conjunto):**

| Produto | Limite (lucro bruto) | Pausar se gastar sem nenhuma venda | Ou se o custo por conversa passar de |
|---|---|---|---|
| Coursera | R$ 71 | R$ 107 | R$ 10 (após R$ 50 gastos) |
| ElevenLabs | R$ 89 | R$ 134 | R$ 12 (após R$ 50 gastos) |
| n8n | R$ 211 | R$ 317 | R$ 20 (após R$ 80 gastos) |

Antes de pausar um conjunto, pause primeiro o anúncio mais fraco dele, com pelo menos 3 dias de dados.

## 5. Configuração passo a passo

1. **Campanha:** Criar → Engajamento → Apps de mensagem → WhatsApp. Desligar o orçamento de campanha. Nome com o padrão acima.
2. **Conjunto:**
   - Local: Brasil (não só a cidade).
   - Idade: 18–54 (n8n: 22–55). Público Advantage+ sem interesses.
   - Posicionamentos: Advantage+, porque os vídeos são 9:16 e rendem em Reels e Stories.
   - Meta: maximizar conversas. Orçamento diário da tabela.
3. **Anúncio:**
   - Subir o vídeo. Botão: "Enviar mensagem". Número do WhatsApp.
   - **Mensagem de boas-vindas diferente por produto** (ex.: "Quero o Coursera 12 meses"), para saber de qual anúncio veio cada conversa.
   - Nome do anúncio = ID do criativo (COU-A, ELV-B…).
4. **No WhatsApp:** marcar cada conversa com etiqueta de produto e se virou venda. Anotar diariamente: gasto, conversas e vendas por produto.
5. **Política:** antes de publicar, confirmar que a revenda é permitida. O AD01 do Gemini parado "em revisão" é um alerta.

## 6. Textos dos anúncios (texto principal + título)

- **COU-A:** "12 meses de Coursera Plus por R$ 89,90 à vista. Cursos e certificados de universidades e empresas, ativados na sua conta." · Título: "Coursera 12 meses — R$ 89,90"
- **COU-B:** "O próximo curso pode ser o começo de uma nova habilidade. 12 meses de Coursera Plus por R$ 89,90." · Título: "Estude o ano inteiro"
- **ELV-A:** "A voz deste anúncio foi feita com ElevenLabs. 3 meses do plano Creator por R$ 149,90." · Título: "Vozes com IA para seus vídeos"
- **ELV-B:** "Narração que não ficou boa? Gere novas versões a partir do roteiro. ElevenLabs Creator, 3 meses, R$ 149,90." · Título: "Sem regravar"
- **N8N-B:** "Lead novo, planilha, aviso à equipe… todo dia. Automatize com o n8n Starter: 12 meses por R$ 297, cupom na sua conta." · Título: "Automatize sua rotina"
- **N8N-C:** "Cupom oficial aplicado na sua própria conta do n8n. 12 meses do plano Starter por R$ 297 à vista." · Título: "n8n Starter 12 meses"
- **Rodapé em todos:** "Nexools é revendedora independente. Marcas citadas pertencem aos seus respectivos donos."

## 7. Como decidir depois de 7 dias

| Situação | Ação |
|---|---|
| custo por venda < limite | manter e escalar +20% |
| conversas baratas, poucas vendas | o problema está no atendimento ou na oferta (cenário E): revisar o roteiro do WhatsApp antes de trocar o criativo |
| conversas caras (> limite da tabela) | trocar o hook (teste de hook) no melhor anúncio |
| entrega muito baixa | verificar se o anúncio foi reprovado ou está limitado |
| volume baixo para decidir | inconclusivo: manter mais 3–4 dias, sem cortar |
