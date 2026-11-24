// H-A31 · A3 1 "É golpe? deixa quem já comprou responder" · Aline Mota · 24/11/2026
// Base A3 (objeção) + prova real + condições + preço + selos + urgência + CTA. Prompt Motion: PM-028 (pergunta cinética), PM-016, PM-005.
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.golpe(tl, { t0: 0, t1: 5.85, pre: "Você quer o Coursera Plus, mas acha que", preTimes: [0.48, 0.78, 1.0, 1.12, 1.86, 2.4, 2.64, 2.92], wordTimes: [2.94, 3.28], qAt: 3.4,
  sub: "Então assiste até o final.", subTimes: [4.14, 4.6, 4.88, 5.0, 5.24] });
N.punch(tl, { t0: 5.85, t1: 9.35, l1: "“É golpe?”", l1Times: [5.92, 6.38], l1Size: 110, accent1: "golpe?”", l2: "É a pergunta que mais recebemos.", l2Times: [6.82, 7.18, 7.18, 7.62, 7.92, 8.38], l2Size: 92 });
N.proof(tl, { t0: 9.35, t1: 16.0, head: "Deixa quem já comprou responder.", headTimes: [10.96, 11.24, 11.5, 11.84, 12.32], accent: "responder.", tagAt: 9.6,
  cards: [{ src: "dep4_cliente_honestidade.png", at: 12.6 }, { src: "dep3_denis.png", at: 13.4 }, { src: "dep1_cliente.png", at: 14.2 }, { src: "dep5_erick_msgs.png", at: 15.0, name: "Erick R." }] });
N.chips(tl, { t0: 16.0, t1: 23.0, items: [{ t: 16.06, label: "Conta no seu nome" }, { t: 17.68, label: "Fala com uma pessoa antes de pagar" }, { t: 21.4, label: "7 dias para desistir" }] });
N.darkOn(tl, 22.9, 0.25);
N.ringPrice(tl, { t0: 23.0, t1: 25.85, months: 12, old: "R$ 1.200 no site", ringAt: 23.3, priceAt: 24.32, price: "297", dark: true, logo: "coursera" });
N.darkOff(tl, 25.7);
N.trust(tl, { t0: 25.85, t1: 30.35, items: [
  { t: 26.28, icon: "support", label: "Suporte durante o ano todo", sub: "Atendimento por uma pessoa" },
  { t: 28.22, icon: "bldg", label: "Empresa com CNPJ ativo", sub: "Consulta pública na Receita Federal" }] });
N.punch(tl, { t0: 30.35, t1: 32.5, l1: "Ainda está com o", l1Times: [30.4, 30.68, 30.84, 31.0], l1Size: 84, l2: "pé atrás? Ótimo.", l2Times: [31.16, 31.5, 31.96], l2Size: 120, accent2: "Ótimo." });
N.ctaWpp(tl, { t0: 32.5, t1: DUR, buttonAt: 32.76, stampAt: 36.22, steps: [{ t: 33.9, label: "Pode perguntar o que quiser 🙂" }] });
N.thinCues();
N.done(tl, "main");
