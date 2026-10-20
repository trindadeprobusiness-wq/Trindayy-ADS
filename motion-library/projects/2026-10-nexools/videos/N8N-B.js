// N8N-B · Rotina manual que se repete · Jon
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.manualLoop(tl, { t0: 0, t1: 9.3, items: [
  { icon: "user", label: "Chega um novo lead", color: "#005afc", t: 0.3 },
  { icon: "sheet", label: "Copiar para a planilha", color: "#0b8a4c", t: 2.0 },
  { icon: "bell", label: "Avisar a equipe", color: "#ffb020", t: 4.22 }],
  days: [6.4, 8.1], foot: "Todo dia, o mesmo processo", footTimes: [6.48, 6.8, 7.0, 7.14, 7.68] });
N.flow(tl, { t0: 9.3, t1: 14.45, head: "Com o n8n, conecte as etapas", headTimes: [9.38, 9.5, 9.6, 10.92, 11.18, 11.54], nodes: [
  { label: "Novo lead", icon: "user", color: "#005afc", t: 10.0 }, { label: "Planilha", icon: "sheet", color: "#0b8a4c", t: 10.9 },
  { label: "Aviso à equipe", icon: "bell", color: "#ffb020", t: 11.6 }, { label: "No automático", icon: "bolt", color: "#ea4b71", t: 12.58 }] });
N.coupon(tl, { t0: 14.45, t1: 19.95, receiveAt: 14.9, applyAt: 17.2, okAt: 19.35 });
N.priceHero(tl, { t0: 19.95, t1: 23.5, months: 12, product: "do plano Starter", productLogo: "n8n", productAt: 20.86, tickAt: 20.0, tickDur: 0.8, price: "297", priceAt: 21.84 });
N.cta(tl, { t0: 23.5, t1: DUR, headline: "Comece a automatizar", catalog: "n8n", buttonAt: 23.7 });
N.done(tl, "main");
