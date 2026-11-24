// H-A33 · A3 3 "ficou com o pé atrás? isso é pra você" · Aline Mota · 24/11/2026
// Base A3 + condições + selos + prova real + preço + urgência + CTA. Prompt Motion: PM-028, PM-016, PM-005.
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.punch(tl, { t0: 0, t1: 5.95, l1: "Se você chegou até aqui e quer o Coursera Plus,", l1Times: [0.36, 0.54, 0.82, 1.2, 1.6, 1.88, 2.14, 2.3, 2.44, 2.96], l1Size: 70, accent1: "Coursera|Plus,",
  l2: "mas ficou com o pé atrás?", l2Times: [3.36, 3.66, 3.9, 4.1, 4.28, 4.5], l2Size: 104, accent2: "atrás?" });
N.golpe(tl, { t0: 5.95, t1: 11.95, wordTimes: [6.48, 6.86], qAt: 7.0, sub: "É a pergunta que mais recebemos. E ela faz sentido.", subTimes: [7.46, 7.54, 7.84, 8.22, 8.52, 8.9, 9.6, 9.64, 9.84, 10.36] });
N.chips(tl, { t0: 11.95, t1: 19.55, items: [{ t: 12.4, label: "Conta no seu nome" }, { t: 13.84, label: "Fala com uma pessoa antes de pagar" }, { t: 18.08, label: "7 dias para desistir" }] });
N.trust(tl, { t0: 19.55, t1: 24.55, items: [
  { t: 19.94, icon: "bldg", label: "Empresa com CNPJ ativo", sub: "Consulta pública na Receita Federal" },
  { t: 22.62, icon: "support", label: "Suporte durante os 12 meses", sub: "Atendimento por uma pessoa" }] });
N.proof(tl, { t0: 24.55, t1: 27.0, head: "Pessoas que já compraram com a gente.", headTimes: [24.64, 25.14, 25.48, 25.72, 26.06, 26.32, 26.46, 26.72], accent: "compraram", tagAt: 24.7,
  cards: [{ src: "dep1_cliente.png", at: 24.9 }, { src: "dep4_cliente_honestidade.png", at: 25.6 }, { src: "dep5_erick_msgs.png", at: 26.3, name: "Erick R." }] });
N.darkOn(tl, 26.9, 0.25);
N.ringPrice(tl, { t0: 27.0, t1: 30.05, months: 12, old: "R$ 1.200 no site", ringAt: 27.1, ringDur: 0.6, priceAt: 27.6, price: "297", dark: true, logo: "coursera" });
N.darkOff(tl, 29.9);
N.urgency(tl, { t0: 30.05, t1: 32.25, l2: "E essa oferta só vale até hoje.", l2Times: [30.12, 30.24, 30.54, 31.04, 31.28, 31.58, 31.98], stampAt: 31.04 });
N.ctaWpp(tl, { t0: 32.25, t1: DUR, buttonAt: 32.5, steps: [{ t: 33.66, label: "Pode perguntar o que quiser 🙂" }] });
N.thinCues();
N.done(tl, "main");
