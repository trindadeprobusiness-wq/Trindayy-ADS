# Nexools — Estratégia de Criativos v1

Data: 20/10/2026 · Método: `motion-library/strategy/PROMPT_MESTRE_CREATIVE_STRATEGY.md`
Base: `offers.json`, `ESTRATEGIA_META_ADS.md`, os 15 criativos já produzidos e uma pesquisa na Biblioteca de Anúncios da Meta (BR, anúncios ativos, 20/10/2026).

Legenda: **[C]** confirmada · **[U]** informada pelo usuário · **[I]** inferência · **[H]** hipótese · **[P]** pendente de verificação

---

## 01 — Resumo executivo

1. **O Gemini não deve abrir os testes com o argumento de preço.** Na Biblioteca da Meta há cerca de 200 a 270 anúncios ativos de "Google AI Pro / Gemini 18 meses", com preços de R$ 19,90, R$ 29,90 e R$ 44,90 no título **[C]**. A R$ 47, a Nexools é a mais cara entre as que mostram preço. Ali, "barato" não diferencia; o que pode diferenciar é a confiança (ativação oficial no e-mail do cliente) **[H]**.
2. **O Coursera é a melhor primeira aposta.** É a única comparação de preço validada **[U]**. Não encontramos revendedores anunciando Coursera no Brasil **[C]**, e a margem é de R$ 71 por venda **[U]**.
3. **ElevenLabs tem a prova mais forte que temos hoje:** a narração dos próprios anúncios é feita no ElevenLabs **[C]**. Também não há revendedores visíveis **[C]**.
4. **A principal lacuna de todos os produtos é a prova de entrega.** Não temos print, gravação de ativação nem depoimento real **[P]**. A peça nova mais importante é uma gravação real de ativação na conta do cliente.
5. **Com R$ 25/dia [U], teste no máximo 2 criativos por vez.** Ciclo 1: COU-A × COU-B (teste de ângulo), por 7 a 10 dias.
6. **Antes de gastar, resolva três bloqueios:** autorização de revenda e termos das plataformas, rastreamento de compra (pixel/CAPI) e destino de cada anúncio **[P]**.

## 02 — Raio-X do mercado

| Produto | Anúncios de revenda no BR (ativos) | Preços vistos | Ângulos repetidos | Sofisticação [H] |
|---|---|---|---|---|
| Gemini / Google AI Pro 18m | ~200–270 [C] | R$ 19,90 · R$ 29,90 · R$ 44,90 [C] | 5 TB no Drive ("Chega de apagar fotos", "Seu Google merece 5 TB"), preço, WhatsApp | 4–5: saturado e cético |
| Coursera Plus | nenhum revendedor encontrado (só a própria Coursera e páginas estrangeiras) [C] | — | a Coursera anuncia cursos e carreira (IBM, IA) | 2 |
| ElevenLabs Creator | nenhum revendedor encontrado; a ElevenLabs anuncia direto (7,5 mi de usuários) [C] | — | infoprodutos de "IA sem aparecer" | 2 |
| n8n Starter | nenhum revendedor encontrado [C] | — | cursos de automação usam a dor ("Pare de perder horas no trabalho manual") [C] | 3 |
| Manus Pro | nenhum revendedor encontrado (a busca traz muitos resultados sem relação) [C] | — | — | 2 (categoria pouco conhecida) |

**Limites da pesquisa:** vimos só os títulos dos anúncios. Não vimos os vídeos nem dados de desempenho. Tempo de veiculação não prova que um anúncio está vendendo.

- **O que o mercado repete:** preço baixo e armazenamento (Gemini).
- **O que o público provavelmente ignora [H]:** mais um "Gemini barato".
- **Oportunidade de diferenciação:** transparência na entrega ("a conta é sua, a ativação é oficial") e produtos sem concorrência de revenda (Coursera, ElevenLabs).

## 03 — Mapa da persona

| Persona | Contexto | Dor dominante | Desejo | Objeção principal | Consciência |
|---|---|---|---|---|---|
| P1 Estudante / profissional em qualificação (Coursera) | quer certificado e carreira | curso bom é caro e em dólar [I] | crescer na carreira | "é oficial? o certificado vale?" | consciente da solução |
| P2 Criador / social media / agência (ElevenLabs) | produz vídeo e anúncio | narração custa tempo e equipamento [I] | voz profissional rápida | "a voz soa artificial?" | consciente do problema |
| P3 Empreendedor / operação pequena (n8n) | tarefas repetitivas | horas perdidas em trabalho manual [I] | recuperar tempo | "é difícil de configurar?" | consciente do problema |
| P4 Profissional liberal / consultor (Manus) | relatórios, pesquisas, apresentações | trabalho em várias etapas consome horas [I] | delegar execução | "mais uma IA?" / R$ 597 | inconsciente da categoria |
| P5 Usuário de IA/Google (Gemini) | já conhece o Gemini | pagar caro por mês, falta de armazenamento [I] | IA + 5 TB por pouco | "é golpe / conta compartilhada?" | muito consciente |

Os gatilhos legítimos de decisão são economia verificável, segurança na entrega e facilidade de ativação. Não usar urgência falsa nem medo.

**Voz do consumidor:** ainda não temos comentários, conversas nem avaliações reais **[P]**. Todas as dores acima são inferências. **Ação:** exportar as perguntas mais comuns do WhatsApp comercial e transformar em ângulos.

## 04 — Diagnóstico da oferta

| Produto | Preço [U] | Lucro bruto por venda (CPA de equilíbrio) [U] | Mecanismo | Prova disponível | Ponto fraco |
|---|---|---|---|---|---|
| Gemini 18m | R$ 47 | R$ 42,00 | licença ativada no e-mail do cliente [U][P] | nenhuma | mais caro que os concorrentes; comparação com R$ 96,99/mês não validada |
| Coursera 12m | R$ 89,90 | R$ 71,21 | cupom/acesso oficial [U] | comparação US$ 399 validada [U] | sem print de ativação |
| ElevenLabs 3m | R$ 149,90 | R$ 89,27 | plano Creator na conta do cliente [U][P] | os próprios anúncios são feitos com ElevenLabs [C] | limites do plano a confirmar |
| n8n 12m | R$ 297 | R$ 211,11 | cupom aplicado na conta do cliente [U] | nenhuma | equivalência com o Cloud Starter e permissão de revenda [P] |
| Manus 12m | R$ 597 | R$ 369,63 | cupom na área do plano Pro [U] | nenhuma | ticket alto para tráfego frio; créditos a confirmar |

Pela equação de valor, o maior fator fraco é a **confiança na entrega**, não o resultado desejado. O preço já é atrativo, exceto no Gemini.

## 05 — Big Ideas

| # | Nome | Tese | Crença questionada | Prova necessária | Risco |
|---|---|---|---|---|---|
| BI-1 | **A conta é sua** | o preço é baixo, mas a ativação é oficial e fica no seu próprio e-mail/conta | "barato assim só pode ser conta compartilhada" | gravação real da ativação [P] | só vale se a autorização de revenda estiver confirmada |
| BI-2 | **Faz a conta** | o mesmo plano por uma fração do preço oficial | "curso internacional é caro" | comparação validada (Coursera ✔) | nos outros produtos a comparação ainda não está validada |
| BI-3 | **O anúncio é a prova** | a voz que você está ouvindo foi feita no ElevenLabs | "voz de IA soa robótica" | o próprio áudio do anúncio [C] | precisa ser verdade em cada versão |
| BI-4 | **O custo de repetir** | a tarefa manual de todo dia custa mais que a automação | "automação é para empresa grande" | demonstração real de um fluxo no n8n [P] | público de curso de automação pode clicar sem comprar |
| BI-5 | **Não é mais um chat** | o Manus executa o trabalho, não só responde | "toda IA é igual" | gravação real de uma tarefa no Manus [P] | categoria nova exige educação antes do preço |

## 06 — Matriz de ângulos (mapeada nos 15 criativos)

| Criativo | Persona | Ângulo | Big Idea | Formato | Variável principal |
|---|---|---|---|---|---|
| GEM-A | P5 | economia + 5 TB + Flow | BI-2 | motion oferta direta | preço/benefícios |
| GEM-B | P5 | uso prático (dúvida → entregas) | — | motion demonstração | uso |
| GEM-C | P5 | objeção "bom demais?" | BI-1 | motion objeção | confiança |
| COU-A | P1 | comparação US$ 399 × R$ 89,90 | BI-2 | motion comparação | economia |
| COU-B | P1 | aspiração / carreira | — | motion aspiração | desejo |
| ELV-A | P2 | demonstração ("a voz deste anúncio") | BI-3 | motion demonstração | prova |
| ELV-B | P2 | dor: narração ruim / regravar | BI-3 | motion problema/solução | dor |
| ELV-C / C2 | P2 | sem estúdio + conta em dólar | BI-2 | motion comparação | **só muda a voz entre C e C2** |
| N8N-A | P3 | comparação R$ 1.358 × R$ 297 | BI-2 | motion comparação | economia |
| N8N-B | P3 | dor da rotina manual | BI-4 | motion problema/solução | dor |
| N8N-C | P3 | simplicidade + "não é link compartilhado" | BI-1 | motion objeção | confiança |
| MAN-A | P4 | resposta × execução | BI-5 | motion educativo | categoria |
| MAN-B | P4 | tarefa em várias etapas | BI-5 | motion demonstração | processo |
| MAN-C | P4 | "Mais uma IA? Calma." + comparação | BI-5 + BI-2 | motion objeção | ceticismo |

**Diagnóstico do lote:** são 15 conceitos **exploratórios**. Produto e ângulo mudam ao mesmo tempo, então comparar criativos de produtos diferentes não ensina qual ângulo é melhor. Todos usam o mesmo formato (motion narrado). A única variação realmente controlada do lote é ELV-C × ELV-C2.

## 07 — Priorização

Nota = 20 × Σ(nota × peso). Pesos: relevância 25% · argumento/oferta 25% · prova 20% · diferenciação 15% · viabilidade 15%. Todos já estão produzidos, então a viabilidade é 5 para todos. Esta nota é editorial e **não prevê conversão**.

| Criativo | Relev. | Oferta | Prova | Difer. | Viab. | **Nota** |
|---|---|---|---|---|---|---|
| COU-A | 4 | 5 | 3 | 4 | 5 | **84** |
| COU-B | 4 | 4 | 3 | 4 | 5 | **79** |
| ELV-A | 4 | 3 | 4 | 4 | 5 | **78** |
| N8N-B | 4 | 4 | 2 | 3 | 5 | **72** |
| ELV-B | 4 | 3 | 3 | 3 | 5 | **71** |
| GEM-C | 4 | 3 | 2 | 4 | 5 | **70** |
| N8N-A | 3 | 4 | 2 | 3 | 5 | 67 |
| N8N-C | 3 | 4 | 2 | 3 | 5 | 67 |
| MAN-A | 3 | 3 | 2 | 4 | 5 | 65 |
| MAN-C | 3 | 3 | 2 | 4 | 5 | 65 |
| GEM-A | 4 | 3 | 2 | 2 | 5 | 64 |
| GEM-B | 3 | 3 | 2 | 3 | 5 | 62 |
| MAN-B | 3 | 3 | 2 | 3 | 5 | 62 |
| ELV-C / C2 | 3 | 3 | 2 | 3 | 5 | 62 |

- **Prioridade 01 — Coursera (COU-A × COU-B):** oferta validada, sem concorrência de revenda e margem que tolera um CPA de até R$ 71.
- **Prioridade 02 — ElevenLabs (ELV-A):** a prova está embutida no próprio anúncio.
- **Prioridade 03 — n8n (N8N-B):** maior margem por venda (R$ 211). Exige um destino que explique bem a ativação.
- **Gemini:** fica em espera até você decidir o posicionamento: ajustar o preço ou disputar por confiança, com GEM-C e a nova peça CR-017.
- **Manus:** vem depois, com uma demonstração real. Vender R$ 597 em tráfego frio sem prova é a aposta mais fraca [H].

## 08 — Arquitetura dos conceitos prioritários

| ID | Persona | Ângulo | Hook atual | Narrativa | Prova | CTA | Hipótese |
|---|---|---|---|---|---|---|---|
| COU-A | P1 | comparação | "Um ano de Coursera Plus" + US$ 399 | preço oficial → oferta Nexools → catálogo → certificado | comparação validada | Saiba Mais → página Coursera | o contraste de preço gera clique qualificado de quem já conhece a Coursera |
| COU-B | P1 | aspiração | "O próximo curso pode ser o começo de uma nova habilidade" | habilidade → áreas → universidades → preço | marcas de universidades/empresas (verificar uso) | Saiba Mais | o desejo de carreira atrai quem ainda não conhece a oferta |
| ELV-A | P2 | demonstração | "A voz que você está ouvindo…" | voz → este anúncio → editor → 3 meses R$ 149,90 | o próprio áudio | Saiba Mais → página ElevenLabs | provar a qualidade da voz vende mais que o desconto |

## 09 — Matriz de hooks (para testar no criativo vencedor, mantendo o resto igual)

**COU-A**
1. Contraste: "US$ 399 por ano… ou R$ 89,90?"
2. Afirmação específica: "12 meses de Coursera Plus por menos de R$ 7,50 por mês."
3. Pergunta contextual: "Você ainda paga curso avulso?"

**COU-B**
1. Descoberta: "Os cursos de Google, IBM e universidades num só acesso."
2. Benefício direto: "Um certificado novo por mês durante um ano."
3. História em andamento: "Comecei com um curso de IA e…" (só com depoimento real).

**ELV-A**
1. Demonstração: "Esta voz não é de ninguém." (o áudio prova)
2. Quebra de crença: "Voz de IA não precisa soar robótica."
3. Comparação: "Antes: estúdio, microfone, regravação. Agora: digitar."

## 10 — Estratégia visual

A linguagem atual (motion premium claro, azul Nexools e logos oficiais) funciona para comparação e demonstração. **O que falta é variar o formato:**

- **CR-016:** gravação de tela real da ativação (formato M: screen recording) com motion leve por cima. É a principal prova de BI-1.
- **CR-018:** carrossel ou estático do Coursera (formatos O/P): é barato e testa a mesma comparação em outro formato.
- Depoimento real (formato H), com print e dados ocultos, colocado logo depois da oferta e antes do CTA (receita R-19).

## 11 — Briefings para o conceito novo CR-016 "A conta é sua — ativação ao vivo"

**A — Copy**
- Produto: Coursera (o primeiro a ser testado); depois replicar para os outros.
- Persona: P1. Big Idea: BI-1. Crença: "barato assim é conta compartilhada".
- Emoção: alívio e segurança.
- Mecanismo: o código é aplicado e a ativação acontece na conta do próprio cliente.
- Promessa: 12 meses de Coursera Plus na sua conta por R$ 89,90.
- Prova: a gravação real.
- Hooks: "Vou ativar na sua frente." / "Não é conta compartilhada: olha o e-mail." / "Do pagamento ao acesso em X minutos." (só com o tempo medido de verdade)
- Duração: 20–30 s. CTA: Saiba Mais.
- Restrições: sem prometer "oficial/autorizado" além do que estiver comprovado; manter o rodapé de revendedora independente.

**B — Motion**
- Conceito: a tela real é o herói; o motion só guia o olhar (zoom no e-mail, destaque no "12 meses", selo "na sua conta").
- Hook visual: o cursor clicando em "Ativar" logo no primeiro segundo.
- Prova visual: a tela real, sem recriação, com dados pessoais borrados.
- Ritmo: cortes a cada 1,5–2 s.
- CTA visual: o mesmo do lote (catálogo + Saiba Mais + rodapé).
- Restrições: não alterar a interface gravada; não simular telas.

## 12 — Matriz de testes

| Teste | Hipótese | Controle × variação | Preservar | Métrica primária | Janela | Regra de decisão |
|---|---|---|---|---|---|---|
| T1 Ângulo Coursera | a comparação converte melhor que a aspiração | COU-A × COU-B | público, página, orçamento, CTA | custo por compra (ou por início de checkout, se houver menos de 10 compras) | 7–10 dias, R$ 25/dia | só declarar vencedor com diferença ≥ 30% e volume mínimo; senão é inconclusivo e o teste continua |
| T2 Hook | um hook novo aumenta a retenção sem piorar o custo por compra | vencedor de T1 × hook 1/2/3 | todo o corpo do vídeo | thumb-stop e custo por compra | 7 dias | manter o hook que melhorar a atenção sem piorar a compra |
| T3 Prova | a gravação real de ativação reduz o custo por compra | vencedor × CR-016 | oferta e página | custo por compra | 7–10 dias | adotar se reduzir de forma consistente |
| T4 Voz (barato) | a voz influencia a retenção | ELV-C × ELV-C2 | todo o resto | retenção a 50% | 5 dias | informativo; só se sobrar orçamento |

**Limitação:** com R$ 25/dia, poucas compras não dão confiança estatística. O algoritmo da Meta distribui o orçamento de forma desigual entre anúncios. Para dividir a verba de forma justa, usar o recurso de Teste A/B da Meta. Resultados observados aqui não provam causa.

## 13 — Backlog de produção

| ID | Ângulo | Formato | Complexidade | Ativos necessários | Status | Prioridade |
|---|---|---|---|---|---|---|
| COU-A, COU-B | comparação / aspiração | motion | — | — | pronto | alta (T1) |
| ELV-A | demonstração | motion | — | — | pronto | alta |
| CR-016 | BI-1 ativação ao vivo | gravação de tela + motion | média | gravação real da ativação (você) | ideia | **alta** |
| CR-017 | Gemini: confiança × preço | motion objeção | baixa | decisão de preço + prova de ativação | ideia | média |
| CR-018 | comparação Coursera | carrossel/estático | baixa | — | ideia | média |
| N8N-B | dor | motion | — | — | pronto | média (ciclo 3) |
| CR-019 | BI-5 Manus executando tarefa real | gravação de tela | média | gravação real (você) | ideia | baixa |
| demais 9 | — | motion | — | — | prontos | reserva |

## 14 — Riscos e incertezas

1. **Autorização de revenda e termos** (Coursera, n8n, Google) e as políticas de anúncio da Meta para revenda de assinaturas e uso de marcas **[P]**. Se um anúncio for reprovado, a conta pode ser restringida. **Bloqueante.**
2. **Gemini mais caro que os concorrentes [C].** Sem uma diferenciação provada, o custo por compra tende a ser alto [H].
3. **Sem rastreamento confirmado** (pixel/CAPI, evento de compra) **[P]**. Sem ele, não há como avaliar nenhum teste.
4. **Sem prova social real [P]**, justamente no ponto mais sensível (confiança).
5. **Comparações não validadas** (Gemini, ElevenLabs, n8n, Manus) estão nos vídeos GEM-A/C, ELV-C/C2, N8N-A e MAN-C. Não publicar essas versões antes de validar.
6. **Valores falados** em N8N-C e MAN-B: confirmar no áudio que a locução diz 297 e 597.

## 15 — Próximas ações (por importância)

1. Confirmar autorização de revenda e as políticas da Meta, e instalar pixel + CAPI com o evento de compra.
2. Definir o destino de cada produto (página no Elementor ou WhatsApp) e garantir que a página repita a promessa do anúncio.
3. Gravar uma ativação real do Coursera (com dados ocultos) para eu montar o CR-016.
4. Subir o T1 (COU-A × COU-B) com R$ 25/dia usando o Teste A/B da Meta, por 7 a 10 dias.
5. Decidir o posicionamento do Gemini (preço ou confiança) antes de investir nele.

---

## Banco de aprendizados (preencher a cada teste)

| Criativo | Período | Persona | Ângulo | Formato | Hook | Oferta | Resultado | Interpretação | Confiança | Próxima hipótese | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | | |

Status possíveis: validado / sinal promissor / inconclusivo / iterando / arquivado. Uma observação isolada não vira regra.
