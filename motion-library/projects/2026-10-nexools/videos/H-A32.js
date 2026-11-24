// H-A32 · A3 2 "É golpe? eu vou te mostrar" (CNPJ, conta, clientes) · Aline Mota · 24/11/2026
// Base A3 + 3 provas em sequência + condições + preço + urgência + CTA. Prompt Motion: PM-028, PM-016, PM-005.
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.golpe(tl, { t0: 0, t1: 5.75, wordTimes: [0.36, 0.76], qAt: 0.9, sub: "Se você quer o Coursera Plus, eu vou te mostrar.", subTimes: [1.38, 1.66, 1.84, 2.08, 2.2, 2.84, 4.12, 4.3, 4.5, 4.76] });
N.trust(tl, { t0: 5.75, t1: 12.1, head: "Primeiro, a empresa.", headTimes: [5.88, 6.48, 6.78], items: [{ t: 7.88, icon: "bldg", label: "CNPJ ativo na Receita Federal", sub: "Situação ativa · consulta pública" }] });
N.trust(tl, { t0: 12.1, t1: 16.2, head: "Segundo, a conta.", headTimes: [12.22, 12.68, 13.1], items: [{ t: 13.46, icon: "user", label: "Vem no seu nome", sub: "Não é conta compartilhada" }] });
N.proof(tl, { t0: 16.2, t1: 20.8, head: "Terceiro, quem já comprou.", headTimes: [16.34, 17.0, 17.22, 17.56], accent: "comprou.", tagAt: 18.1,
  cards: [{ src: "dep4_cliente_honestidade.png", at: 18.3 }, { src: "dep3_denis.png", at: 19.0 }, { src: "dep5_erick_msgs.png", at: 19.8, name: "Erick R." }] });
N.chips(tl, { t0: 20.8, t1: 25.85, items: [{ t: 20.92, label: "Fala com uma pessoa antes de pagar" }, { t: 24.24, label: "7 dias para desistir" }] });
N.darkOn(tl, 25.75, 0.25);
N.ringPrice(tl, { t0: 25.85, t1: 30.6, months: 12, old: "R$ 1.200 no site", ringAt: 25.98, priceAt: 27.2, price: "297", dark: true, logo: "coursera" });
N.darkOff(tl, 30.45);
N.urgency(tl, { t0: 30.6, t1: 32.75, l2: "Essa oferta só vale até hoje.", l2Times: [30.72, 31.0, 31.34, 31.62, 31.86, 32.32], stampAt: 31.34 });
N.ctaWpp(tl, { t0: 32.75, t1: DUR, buttonAt: 32.92, steps: [] });
N.thinCues();
N.done(tl, "main");
