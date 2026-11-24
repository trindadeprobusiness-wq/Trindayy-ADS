// H-A13 · A1 3 "faz essa conta comigo" (economia R$ 903) · Aline Mota · 24/11/2026
// Base A1 (âncora) + economia + condições + prova real + selos + urgência + CTA. Prompt Motion: PM-028, Charts (contadores), PM-016, PM-005.
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.punch(tl, { t0: 0, t1: 4.6, l1: "Se você quer o Coursera Plus,", l1Times: [0.34, 0.5, 0.86, 1.1, 1.16, 1.6], l1Size: 80, accent1: "Coursera|Plus,",
  l2: "faz essa conta comigo.", l2Times: [3.28, 3.52, 3.72, 4.14], l2Size: 110, accent2: "conta" });
N.anchor(tl, { t0: 4.6, t1: 8.55, head: "O mesmo ano", headTimes: [4.78, 5.06, 5.32], cardAt: 5.0, val: 1200, valAt: 6.3, labelAt: 7.74, strikeAt: 8.25 });
N.darkOn(tl, 8.45, 0.25);
N.ringPrice(tl, { t0: 8.55, t1: 10.95, months: 12, old: "R$ 1.200 no site", ringAt: 8.65, ringDur: 0.6, priceAt: 9.16, price: "297", dark: true, logo: "coursera" });
N.darkOff(tl, 10.8);
N.saving(tl, { t0: 10.95, t1: 14.15, valAt: 11.2, labelTimes: [12.8, 13.04, 13.26, 13.38, 13.66] });
N.chips(tl, { t0: 14.15, t1: 21.4, items: [{ t: 15.46, label: "Conta no seu nome" }, { t: 17.22, label: "Pagamento único" }, { t: 18.24, label: "Pix ou cartão" }, { t: 20.12, label: "Sem renovação automática" }] });
N.proof(tl, { t0: 21.4, t1: 24.0, head: "Pessoas que já estão estudando", headTimes: [21.98, 22.3, 22.52, 22.78, 23.08], accent: "estudando", tagAt: 21.5,
  cards: [{ src: "dep3_denis.png", at: 21.9 }, { src: "dep4_cliente_honestidade.png", at: 22.5 }, { src: "dep5_erick_msgs.png", at: 23.1, name: "Erick R." }] });
N.trust(tl, { t0: 24.0, t1: 27.65, items: [
  { t: 24.42, icon: "support", label: "Suporte durante o ano inteiro", sub: "Atendimento por uma pessoa" },
  { t: 26.5, icon: "bldg", label: "Empresa com CNPJ ativo", sub: "Consulta pública na Receita Federal" }] });
N.urgency(tl, { t0: 27.65, t1: 29.6, l2: "Essa oferta só vale até hoje.", l2Times: [27.76, 28.04, 28.36, 28.56, 28.86, 29.3], stampAt: 28.36 });
N.ctaWpp(tl, { t0: 29.6, t1: DUR, buttonAt: 29.9, steps: [{ t: 30.84, label: "Você fala comigo antes de pagar" }, { t: 33.7, label: "Sem compromisso 🙂" }] });
N.thinCues();
N.done(tl, "main");
