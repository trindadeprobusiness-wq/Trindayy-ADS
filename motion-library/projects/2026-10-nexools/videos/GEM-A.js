// GEM-A · Contraste de preço + licença oficial + Drive/Flow · voz Ana Alice · tempos das palavras do áudio
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.priceHero(tl, { t0: 0, t1: 4.5, months: 18, product: "de Gemini Pro", productAt: 1.36, price: "47", priceAt: 3.25, tickAt: 0.05, firstFrame: true });
N.objections(tl, { t0: 4.5, t1: 10.65, kicker: "E antes que você pergunte:", items: [
  { icon: "link", text: "Link compartilhado", t: 7.1 },
  { icon: "users", text: "Conta dividida", t: 8.8 },
] });
N.license(tl, { t0: 10.65, t1: 19.85, badge: "18 meses", product: "Gemini Pro", productSub: "Licença ativada no seu próprio e-mail", typeAt: 14.0, clickAt: 16.64, ownerAt: 19.0 });
N.bento(tl, { id: "ga", t0: 19.85, t1: 29.95, aiAt: 20.3, tbAt: 22.3, flowAt: 25.84 });
N.perMonth(tl, { t0: 29.95, t1: 33.3, pre: "Tudo isso por menos de", preAt: 30.06, big: "3", bigAt: 31.7, post: "por mês", postAt: 32.3, foot: "R$ 47 à vista por 18 meses" });
N.cta(tl, { t0: 33.3, t1: DUR, headline: "Garanta a sua licença", buttonAt: 33.85 });
N.done(tl, "main");
