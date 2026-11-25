// H-COU1 · COU-A 1 "só vale até hoje" · Aline Mota (Urgent and Firm) · 24/11/2026
// Base: COU-A validado (preço de referência → "agora olha a oferta da" → anel 12 meses → catálogo) + prova real + selos + urgência + CTA WhatsApp.
// Prompt Motion: PM-028 (hook cinético), Charts (contador R$ 1.200), PM-016 (montagem de depoimentos), PM-005 (celular no CTA).
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.punch(tl, { t0: 0, t1: 5.15, l1: "Se você chegou até aqui,", l1Times: [0.3, 0.52, 0.78, 1.0, 1.5], l1Size: 80,
  l2: "é porque quer o Coursera Plus.", l2Times: [1.76, 2.06, 2.44, 2.6, 2.74, 3.16], l2Size: 104, accent2: "Coursera|Plus." });
N.anchor(tl, { t0: 5.15, t1: 9.55, head: "Um ano de Coursera Plus", headTimes: [5.26, 5.5, 5.62, 5.94, 6.42], cardAt: 5.5, val: 1200, valAt: 7.4, labelAt: 8.64, strikeAt: 9.1 });
N.brandBeat(tl, { t0: 9.55, t1: 11.6, line: "Agora olha a oferta da", lineTimes: [9.62, 10.06, 10.22, 10.4, 10.7], logoAt: 11.04 });
N.ringPrice(tl, { t0: 11.6, t1: 15.65, months: 12, old: "R$ 1.200/ano", ringAt: 11.7, priceAt: 12.68, price: "297", dark: true, logo: "coursera" });
N.darkOff(tl, 15.5);
N.mosaic(tl, { t0: 15.65, t1: 22.3, chipAt: 15.75, certAt: 20.3, certTitle: "IA Generativa na Prática", certSub: "Certificados nos programas incluídos",
  cats: [{ t: 17.44, label: "Tecnologia", key: "tec" }, { t: 18.14, label: "Inteligência artificial", key: "ia" }, { t: 19.46, label: "Negócios", key: "neg" }] });
N.proof(tl, { t0: 22.3, t1: 27.85, head: "Não precisa acreditar só em mim.", headTimes: [22.4, 22.48, 22.84, 23.3, 23.64, 23.74, 24.0], accent: "mim.", tagAt: 24.3,
  cards: [{ src: "dep3_denis.png", at: 24.4 }, { src: "dep2_alexandre.png", at: 25.0 }, { src: "dep1_cliente.png", at: 25.6 }, { src: "dep4_cliente_honestidade.png", at: 26.2 }, { src: "dep5_erick_msgs.png", at: 26.8, name: "Erick R." }] });
N.trust(tl, { t0: 27.85, t1: 34.4, items: [
  { t: 28.0, icon: "user", label: "Conta criada no seu nome", sub: "Não é conta compartilhada" },
  { t: 29.96, icon: "support", label: "Suporte durante os 12 meses", sub: "Atendimento por uma pessoa" },
  { t: 32.54, icon: "bldg", label: "Empresa com CNPJ ativo", sub: "Consulta pública na Receita Federal" }] });
N.urgency(tl, { t0: 34.4, t1: 37.72, l1: "Se você está vendo esse vídeo,", l1Times: [34.48, 34.74, 34.92, 35.08, 35.3, 35.7], l2: "essa oferta só vale até hoje.", l2Times: [36.0, 36.24, 36.52, 36.76, 37.12, 37.46], stampAt: 36.55 });
N.ctaWpp(tl, { t0: 37.72, t1: DUR, buttonAt: 38.1, steps: [] });
N.thinCues();
N.done(tl, "main");
