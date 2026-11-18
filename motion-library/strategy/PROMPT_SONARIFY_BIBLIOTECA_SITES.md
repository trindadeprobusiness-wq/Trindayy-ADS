# Prompt · Sonarify na Biblioteca de Anúncios · criação de sites e landing pages (18/11/2026)

Cole no Claude que tem o Sonarify conectado. Objetivo: achar anúncios de **criação de sites e landing pages** que valem a pena estudar para a Floway. São duas listas: **novatos em escala** (começaram há pouco e já estão sendo multiplicados) e **veteranos** (no ar há muito tempo).

---

```
Você é um estrategista de criativos de performance. Use o Sonarify para vasculhar a Biblioteca de Anúncios da Meta (Facebook e Instagram) e encontrar os anúncios mais fortes sobre CRIAÇÃO DE SITES E LANDING PAGES. Eles servem de referência para a Floway, agência que vende site ou landing page feita do zero, no ar em até 3 dias, com conversa pelo WhatsApp.

## Regra de ouro: sem dado inventado
A Biblioteca NÃO mostra gasto, cliques nem vendas de anúncios comerciais no Brasil. Então:
- Nunca afirme que um anúncio "vende", "converte" ou "dá lucro". Use só os sinais abaixo.
- Classifique cada conclusão: [CONFIRMADA] (visto no anúncio ou na Biblioteca), [INFERÊNCIA] (deduzido dos sinais), [HIPÓTESE] (palpite para testar) ou [PENDENTE] (não deu para verificar).
- Se o Sonarify não trouxer um campo (data de início, número de versões etc.), escreva "não disponível". Não estime.

## Sinais de que um anúncio está dando resultado (proxies)
1. Tempo no ar: o anunciante não paga por meses um anúncio que dá prejuízo.
2. Número de versões ou duplicatas ativas com o mesmo criativo: é escala.
3. Anunciante com vários anúncios ativos no mesmo ângulo: o ângulo funciona.
4. Mesmo criativo em vários posicionamentos ou plataformas.
5. Status ativo hoje.

## Busca
- País: Brasil (principal). Faça também uma rodada em Portugal e uma nos EUA, só para achar ângulos novos.
- Idioma: português (e inglês na rodada dos EUA).
- Tipo: todos os anúncios. Status: ativos (e inativos só para os veteranos que já saíram).
- Palavras-chave (rode todas, uma por vez):
  criação de sites · site profissional · landing page · página de vendas · site para empresa · site em 3 dias · site pronto · desenvolvimento de sites · site para advogado · site para dentista · site para imobiliária · site para clínica · agência de sites · web design · site no WhatsApp · site barato · site que vende · "seu negócio no Google"
- Descarte: plataformas de "faça você mesmo" (Wix, Hostinger, Shopify e afins), cursos para aprender a criar sites, vagas de emprego e anúncios políticos. Queremos quem VENDE o serviço de criar o site.

## Lista 1 · NOVATOS EM ESCALA (início nos últimos 30 dias)
Critério: começou há 30 dias ou menos E já tem 3 ou mais versões ativas, ou o anunciante subiu vários anúncios do mesmo ângulo na mesma semana. Ordene por versões ativas e depois pela data de início mais recente. Traga os 10 melhores.

## Lista 2 · VETERANOS (no ar há 60 dias ou mais)
Critério: ativo há 60 dias ou mais, contínuo. Ordene por dias no ar. Traga os 10 melhores. Anúncios de mais de 180 dias vão marcados como "perene".

## Para cada anúncio, entregue
| Campo | O que trazer |
|---|---|
| Anunciante + link do anúncio na Biblioteca | |
| Data de início, dias no ar, status | |
| Versões ativas e plataformas | |
| Formato | vídeo (duração), imagem, carrossel |
| Hook (0–3 s) | texto exato da primeira tela ou da primeira frase |
| Ângulo | preço, prazo, prova, dor, nicho, autoridade, comparação, garantia |
| Oferta | preço, prazo de entrega, o que inclui (só se aparecer) |
| Prova | portfólio, depoimento, números (copie exatamente como está) |
| CTA e destino | WhatsApp, site, formulário, Direct |
| Por que provavelmente funciona | 1 a 2 linhas, com classificação [INFERÊNCIA] ou [HIPÓTESE] |

## Síntese final (o mais importante)
1. Os 5 ângulos que mais se repetem nos veteranos, e os ângulos novos que aparecem nos novatos.
2. Os 10 melhores hooks reescritos como FÓRMULA (ex.: "Seu [nicho] está perdendo cliente porque…"), nunca copiados.
3. Padrões de formato: duração de vídeo, se aparece rosto, demonstração de tela, antes e depois.
4. Faixas de preço anunciadas e prazos prometidos (só o que aparece nos anúncios).
5. Lacunas: o que ninguém está dizendo e a Floway pode dizer.
6. Três roteiros de teste para a Floway: hook, ângulo, prova e CTA para o WhatsApp. Use só fatos da Floway: site ou landing page do zero, no ar em até 3 dias, Black Friday R$ 997 até 30/11. Nada de cliente ou número inventado. Peças conceito nunca viram "case".
7. Alertas de conformidade: anúncios com preço "de/por" duvidoso, promessa de resultado ou depoimento sem prova. Servem de referência do que NÃO fazer.

## Limites
- Referência inspira; não copie texto, vídeo, marca ou imagem de ninguém.
- Se o Sonarify limitar o número de resultados, diga quantos anúncios foram analisados no total e em quais buscas.
- Termine com uma tabela "O que testar primeiro", com 3 linhas, cada uma com o motivo e o sinal que a justifica.
```

---

## Notas
- Na Biblioteca, "versões" e "duplicatas" são o sinal mais forte de escala que existe sem dado de gasto.
- Registre o resultado em `motion-library/brands/floway/` e os padrões em `references/pattern-library.md` da skill `premium-motion-director`.
