// N8N-A · Comparação + cupom na conta do cliente · Aline Mota
// ⚠️ comparação R$ 1.358/ano ainda não validada (offers.json approved_for_ads=false)
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.compare(tl, { t0: 0, t1: 12.85, head: "Mais de mil e trezentos reais", headTimes: [0.0, 1.12, 1.3, 1.4, 1.7, 2.48],
  old: "R$ 1.358", oldLabel: "n8n Cloud Starter · anual, convertido para reais", logo: "n8n", labelAt: 3.54, strikeAt: 7.66, price: "297", priceAt: 9.1, stamp: "UMA VEZ SÓ", stampAt: 10.96 });
N.coupon(tl, { t0: 12.85, t1: 20.95, receiveAt: 13.24, applyAt: 14.8, okAt: 18.1, noFeeAt: 19.84 });
N.flow(tl, { t0: 20.95, t1: 26.45, head: "Sua conta, suas automações", headTimes: [21.14, 21.64, 22.4, 22.76], nodes: [
  { label: "Novo lead", icon: "user", color: "#005afc", t: 22.9 }, { label: "Planilha", icon: "sheet", color: "#0b8a4c", t: 23.84 },
  { label: "Aviso à equipe", icon: "bell", color: "#ffb020", t: 24.44 }, { label: "Agente de IA", icon: "bolt", color: "#ea4b71", t: 25.36 }] });
N.cta(tl, { t0: 26.45, t1: DUR, headline: "Garanta o seu cupom", catalog: "n8n", buttonAt: 27.1 });
N.done(tl, "main");
