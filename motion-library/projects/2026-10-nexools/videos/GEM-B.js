// GEM-B · Identificação · Ana Alice
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.chatGrow(tl, { t0: 0, mid: 4.95, t1: 13.0, kicker: "Você abre a IA só para uma dúvida rápida", kickTimes: [0.0, 0.7, 0.98, 1.82, 2.42, 2.64, 3.26, 3.4, 3.96], q: "Me explica isso rapidinho?", qAt: 1.2, a: "Claro! Em resumo…", aAt: 2.9,
  head: "Com o Gemini Pro ela pode:", headTimes: [4.98, 5.2, 5.46, 6.02, 6.3, 6.54],
  items: [{ kind: "slides", label: "Estruturar uma apresentação", t: 7.0 }, { kind: "research", label: "Pesquisar um assunto complexo", t: 8.6 }, { kind: "calendar", label: "Planejar a semana inteira", t: 10.62 }] });
N.bento(tl, { id: "gb", t0: 13.0, t1: 22.9, aiAt: 13.3, tbAt: 15.58, flowAt: 19.04 });
N.priceHero(tl, { t0: 22.9, t1: 27.15, months: 18, product: "de Gemini Pro", productLogo: "googlegemini", productAt: 25.06, floatAt: 25.95, floats: [{ name: "googledrive", x: 70, y: 1180, s: 150, dy: -70, r: -8 }, { name: "google", x: 860, y: 1230, s: 130, dy: -50, r: 8 }, { name: "googlegemini", x: 850, y: 470, s: 120, dy: 50, r: 10 }], price: "47", priceAt: 25.9, tickAt: 23.6 });
N.objections(tl, { t0: 27.15, t1: 30.55, items: [
  { icon: "link", text: "Sem link compartilhado", t: 27.4, strikeAt: 28.3 },
  { icon: "users", text: "Sem conta de outra pessoa", t: 29.0, strikeAt: 29.9 },
] });
N.license(tl, { t0: 30.55, t1: 34.1, badge: "18 meses", product: "Gemini Pro", productLogo: "googlegemini", account: "google", productSub: "Licença ativada no seu próprio e-mail", typeAt: 31.2, okAt: 32.9 });
N.cta(tl, { t0: 34.1, t1: DUR, headline: "Ative a sua licença", buttonAt: 34.6 });
N.done(tl, "main");
