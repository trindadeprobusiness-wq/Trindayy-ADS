// H-COU3 · COU-A 3 "só vale até hoje" na abertura · Aline Mota (Urgent and Firm) · 24/11/2026
// Base: COU-A validado + urgência no hook + selos + prova real + CTA WhatsApp.
// Prompt Motion: PM-028 (hook cinético/carimbo), Charts (contador), PM-016 (depoimentos), PM-005 (celular no CTA).
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.urgency(tl, { t0: 0, t1: 5.85, l1: "Se você está vendo esse vídeo,", l1Times: [0.3, 0.54, 0.72, 0.86, 1.12, 1.54], l2: "essa oferta do Coursera Plus só vale até hoje.", l2Times: [3.08, 3.36, 3.6, 3.86, 4.3, 4.48, 4.7, 4.96, 5.3], accent: "hoje.|Coursera|Plus", stampAt: 5.35 });
N.anchor(tl, { t0: 5.85, t1: 10.15, head: "Um ano de Coursera Plus", headTimes: [5.94, 6.14, 6.3, 6.56, 6.98], cardAt: 6.2, val: 1200, valAt: 7.8, labelAt: 9.14, strikeAt: 9.7 });
N.brandBeat(tl, { t0: 10.15, t1: 12.25, line: "Agora olha a oferta da", lineTimes: [10.26, 10.6, 10.8, 10.98, 11.24], logoAt: 11.76 });
N.ringPrice(tl, { t0: 12.25, t1: 15.95, months: 12, old: "R$ 1.200/ano", ringAt: 12.35, priceAt: 13.4, price: "297", dark: true, logo: "coursera" });
N.darkOff(tl, 15.8);
N.mosaic(tl, { t0: 15.95, t1: 22.35, chipAt: 16.05, certAt: 20.2, certTitle: "IA Generativa na Prática", certSub: "Certificados nos programas incluídos",
  cats: [{ t: 17.7, label: "Tecnologia", key: "tec" }, { t: 18.36, label: "Inteligência artificial", key: "ia" }, { t: 19.56, label: "Negócios", key: "neg" }] });
N.trust(tl, { t0: 22.35, t1: 25.8, items: [
  { t: 22.46, icon: "user", label: "Conta no seu nome", sub: "Não é conta compartilhada" },
  { t: 23.92, icon: "support", label: "Suporte durante os 12 meses", sub: "Atendimento por uma pessoa" }] });
N.proof(tl, { t0: 25.8, t1: 28.15, head: "Pessoas que já garantiram a delas", headTimes: [26.3, 26.5, 26.74, 27.06, 27.3, 27.5], accent: "garantiram", tagAt: 26.2,
  cards: [{ src: "dep1_cliente.png", at: 26.2 }, { src: "dep4_cliente_honestidade.png", at: 26.75 }, { src: "dep5_erick_msgs.png", at: 27.3, name: "Erick R." }] });
N.punch(tl, { t0: 28.15, t1: 29.65, l1: "Amanhã", l1Times: [28.2], l1Size: 110, l2: "já não vale mais.", l2Times: [28.56, 28.76, 28.98, 29.42], l2Size: 110, accent2: "não|mais." });
N.ctaWpp(tl, { t0: 29.65, t1: DUR, buttonAt: 30.0, steps: [] });
N.thinCues();
N.done(tl, "main");
