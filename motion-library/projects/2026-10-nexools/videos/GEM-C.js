// GEM-C · Objeção + comparação à vista × mensal · Diego
// ⚠️ comparação R$ 96,99 × 18 ainda não validada para publicação (offers.json approved_for_ads=false)
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.question(tl, { t0: 0, t1: 4.85, qAt: 3.0, sub: "por 18 meses de Gemini Pro", subTimes: [1.4, 1.8, 2.2, 2.44, 2.62, 2.84], punch: "Parece bom demais?", punchTimes: [3.66, 4.0, 4.4] });
N.notList(tl, { t0: 4.85, t1: 10.6, flipAt: 9.85, items: [
  { text: "Não é link compartilhado", t: 5.22 }, { text: "Não é conta dividida", t: 6.8 }, { text: "Não é login de outra pessoa", t: 8.26 },
] });
N.license(tl, { t0: 10.6, t1: 15.85, badge: "18 meses", product: "Gemini Pro", productSub: "A conta é sua. O acesso também.", typeAt: 11.5, okAt: 12.9, ownerAt: 13.7 });
N.darkOn(tl, 15.7);
N.calc(tl, { t0: 15.85, t1: 25.9, kicker: "E faz a conta:", lineAt: 17.0, monthly: "R$ 96,99", months: 18, countStart: 18.8, countEnd: 22.2, total: 1745.82, nexAt: 22.6, priceAt: 23.8, price: "47", vistaAt: 25.1 });
N.darkOff(tl, 25.7);
N.cta(tl, { t0: 25.9, t1: DUR, headline: "Garanta a sua licença", buttonAt: 26.4 });
N.done(tl, "main");
