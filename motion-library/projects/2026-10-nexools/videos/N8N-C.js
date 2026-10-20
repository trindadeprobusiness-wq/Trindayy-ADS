// N8N-C · Automação começa simples · Aline
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.objections(tl, { t0: 0, t1: 4.45, kicker: "Automação não precisa começar com", kickTimes: [0.05, 1.14, 1.52, 2.0, 2.32], items: [
  { icon: "money", text: "Sistema caro", t: 2.9, strikeAt: 3.45 },
  { icon: "gear", text: "Processo complexo", t: 3.5, strikeAt: 4.0 }] });
const fl = N.flow(tl, { t0: 4.45, t1: 10.4, head: "O primeiro passo: conectar duas ferramentas", headTimes: [4.5, 4.62, 4.74, 6.4, 6.86, 7.18], nodes: [
  { label: "Novo contato", icon: "user", color: "#005afc", t: 6.5 }, { label: "Planilha", icon: "sheet", color: "#0b8a4c", t: 7.3 }] });
N.strikeChip(tl, fl, { text: "Tarefa repetitiva", icon: "loop", y: 1130, t: 8.4, strikeAt: 9.14 });
N.notList(tl, { t0: 10.4, t1: 13.7, items: [{ text: "Link compartilhado", t: 10.6 }, { text: "Conta de terceiros", t: 12.4 }] });
N.coupon(tl, { t0: 13.7, t1: 20.3, receiveAt: 14.0, applyAt: 15.54, okAt: 18.12 });
N.priceHero(tl, { t0: 20.3, t1: 23.9, months: 12, product: "do plano Starter", productLogo: "n8n", productAt: 20.6, tickAt: 20.35, tickDur: 0.8, price: "297", priceAt: 21.64, sub: "à vista" });
N.cta(tl, { t0: 23.9, t1: DUR, headline: "Garanta o seu", catalog: "n8n", buttonAt: 24.2 });
N.done(tl, "main");
