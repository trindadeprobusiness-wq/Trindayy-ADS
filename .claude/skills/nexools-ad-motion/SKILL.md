---
name: nexools-ad-motion
description: Cenas de motion prontas para anúncios em vídeo 9:16 de resposta direta (WhatsApp), em HyperFrames + GSAP. Hook cinético, "É golpe?", contador de preço (âncora → oferta), anel de meses, economia, catálogo, depoimentos reais empilhados, gravação real de tela, selos de confiança, condições com check, carimbo "Só até hoje" e CTA com celular + botão do WhatsApp. Use para montar ou variar anúncios a partir de uma narração do ElevenLabs, sincronizando cada cena com o tempo das palavras. Gatilhos: "faça o vídeo desse áudio", "anúncio em motion", "coloque os depoimentos", "mostre a tela", "variação do criativo que deu certo".
---

# Nexools Ad Motion · cenas de anúncio 9:16

Kit das cenas usadas nos anúncios Coursera "só vale até hoje" (H-COU1…H-A33, 24/11/2026). Uma cena = uma função `N.<cena>(tl, {t0, t1, ...})` sincronizada pelo tempo das palavras da narração.

## Onde está cada coisa
- `kit/shared/nexo*.js` + `nexo.css` + `template.html`: biblioteca de cenas (copie para `<projeto>/shared/`).
- `kit/tools/build.py` + `cues.mjs`: monta, mixa (voz + trilha com ducking + SFX, −14 LUFS, pico ≤ −1 dBTP), renderiza e **remove metadados**.
- `examples/`: três roteiros completos (comparação, tela real, "É golpe?").
- Fonte viva no repositório: `motion-library/projects/2026-10-nexools/` (o kit é uma cópia; atualize os dois juntos).

## Fluxo (7 passos)
1. **Áudio:** copie para `audio/<ID>.mp3`. Confira duplicados (`md5sum`).
2. **Tempo das palavras:** `node motion-library/tools/asr/words.mjs audio/<ID>.mp3 > audio/<ID>.words.txt` (Whisper tiny: use só para tempo; erra palavras e números, então avise o usuário quando ouvir algo estranho, ex.: "277" no lugar de "297").
3. **Roteiro de cenas:** `videos/<ID>.js`, uma cena por frase, `t1` de uma = `t0` da próxima. Use os tempos reais; nunca invente.
4. **Mídia real:** depoimentos em `brands/<marca>/assets/depoimentos/*.png` (dados ocultos; arquivos `_raw` não entram); gravação de tela em `assets/tela/*.mp4`, declarada no roteiro com `// @video arquivo.mp4 id=tela start=<t0+0.25> dur=<t1-t0-0.55> media=<segundo da gravação>`.
5. **Prévia:** `python3 tools/build.py <ID> --no-render` (confere erros e densidade de SFX).
6. **Render:** `python3 tools/build.py <ID>` (≈4 min por 35 s). Rode em segundo plano para lotes.
7. **Revisão obrigatória:** folha de quadros (`ffmpeg -vf "fps=1/2.5,scale=216:384,tile=8x2"`) + quadros nos pontos críticos (carimbo, depoimentos, tela, CTA) + `ebur128` (≈ −14 LUFS, pico ≤ −1). Só entregue depois de olhar.

## Catálogo de cenas
| Cena | Uso | Parâmetros principais |
|---|---|---|
| `N.base(tl, stage, DUR)` | fundo vivo + marca | sempre primeiro |
| `N.punch` | hook cinético em 2 linhas | `l1, l1Times, l2, l2Times, l1Size, l2Size, accent1, accent2` |
| `N.golpe` | "É golpe?" com ? vermelho desenhado | `pre, preTimes, wordTimes, qAt, sub, subTimes` |
| `N.anchor` | preço do site com contador e risco | `head, headTimes, cardAt, val, valAt, labelAt, strikeAt` |
| `N.brandBeat` | "Agora olha a oferta da" + logo (escuro) | `line, lineTimes, logoAt` |
| `N.ringPrice` | anel de 12 meses + preço | `months, old, ringAt, ringDur, priceAt, price, dark, logo` (use `N.darkOn/Off` em volta) |
| `N.saving` | economia em verde (R$ 903) | `valAt, labelTimes, calc, label` |
| `N.mosaic` | catálogo de cursos + certificado | `chipAt, cats[{t,label,key}], certAt` |
| `N.chips` | condições com check | `items[{t,label}]`, `head` opcional |
| `N.proof` | depoimentos reais empilhados | `head, headTimes, tagAt, cards[{src, at, name?}]` (o mais forte por último) |
| `N.screenReal` | gravação real de tela em moldura | `head, headTimes, mediaStart, zoom` + linha `// @video` |
| `N.trust` | selos (conta no seu nome, suporte, CNPJ) | `items[{t, icon: user|support|bldg, label, sub}]`, `head` opcional |
| `N.urgency` | "só vale até hoje" + carimbo | `l1, l1Times, l2, l2Times, stampAt` (carimbo na palavra "só") |
| `N.ctaWpp` | celular com conversa + botão WhatsApp | `buttonAt, steps[{t,label}], stampAt?`; última cena (`t1: DUR`) |
| `N.thinCues()` | limita SFX a ≤ 6 por 10 s | sempre antes de `N.done` |

## Estruturas que já deram certo (variar a partir delas)
- **Comparação (COU-A):** punch → anchor → brandBeat → ringPrice → mosaic → proof → trust → urgency → ctaWpp.
- **Âncora (A1):** punch → anchor → ringPrice → chips → proof → trust → urgency → ctaWpp.
- **Objeção (A3):** golpe → punch → proof → chips → ringPrice → trust → urgency/punch → ctaWpp.
- **Tela real:** igual à base, trocando `proof` por `screenReal` quando a fala disser "olha aqui na tela".

## Regras inegociáveis
- **Nada inventado:** preço, prazo, economia, depoimento e tela só com dado real do usuário. Sem a gravação, use depoimentos de ativação no lugar e diga isso; nunca simule a tela do produto.
- **Depoimentos:** só com autorização; telefone, sobrenome e foto ocultos; corte linhas que confundem a oferta (ex.: "pagamento da parte que falta").
- **Urgência:** "só até hoje" só se for verdade (alertar o usuário uma vez; a decisão é dele).
- **Área segura 9:16:** conteúdo entre 320 px e 1500 px de altura; marca fica no topo (232 px).
- **Fluidez:** entradas com overshoot leve, nada parado, saídas mais rápidas (padrão `launch-motion`).
- **Entrega:** arquivo sem metadados (o `build.py` já faz), commit + push, e mandar no chat com o resumo do que entrou.
- Marcas de terceiros só as autorizadas no `CLAUDE.md` do projeto.

## Exemplo mínimo
```js
// @video tela_coursera.mp4 id=tela start=11.20 dur=7.10 media=3.5
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.punch(tl, { t0: 0, t1: 4.6, l1: "Antes de pagar R$ 1.200", l1Times: [0.38,0.54,0.88,1.28,1.5], l2: "olha isso aqui.", l2Times: [3.6,3.78,4.16] });
N.anchor(tl, { t0: 4.6, t1: 9.25, head: "O mesmo ano de Coursera Plus", headTimes: [4.66,4.96,5.14,5.32,5.6,6.02], cardAt: 5.0, val: 1200, valAt: 6.9, labelAt: 8.46, strikeAt: 8.95 });
N.urgency(tl, { t0: 28.6, t1: 30.55, l2: "Essa oferta só vale até hoje.", l2Times: [28.66,28.96,29.36,29.62,29.9,30.28], stampAt: 29.36 });
N.ctaWpp(tl, { t0: 30.55, t1: DUR, buttonAt: 30.9, steps: [{ t: 32.6, label: "Eu te respondo 👋" }] });
N.thinCues();
N.done(tl, "main");
```
