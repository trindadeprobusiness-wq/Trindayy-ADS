// H-A1 · A1 Âncora "só vale até hoje" · Aline Mota (Urgent and Firm) · 24/11/2026
// Base: A1 validado (R$ 1.200 no site oficial → R$ 297 aqui → conta no seu nome, pagamento único, sem renovação) + prova real + selos + urgência + CTA WhatsApp.
// Prompt Motion: PM-028 (hook cinético), Charts (contador), PM-016 (depoimentos), PM-005 (celular no CTA).
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.punch(tl, { t0: 0, t1: 4.6, l1: "Antes de pagar R$ 1.200", l1Times: [0.38, 0.54, 0.88, 1.28, 1.5], l1Size: 84, accent1: "1.200",
  l2: "no Coursera Plus, olha isso aqui.", l2Times: [2.34, 2.56, 3.0, 3.6, 3.78, 4.16], l2Size: 96, accent2: "Coursera|Plus," });
N.anchor(tl, { t0: 4.6, t1: 9.25, head: "O mesmo ano de Coursera Plus", headTimes: [4.66, 4.96, 5.14, 5.32, 5.6, 6.02], cardAt: 5.0, val: 1200, valAt: 6.9, labelAt: 8.46, strikeAt: 8.95 });
N.ringPrice(tl, { t0: 9.25, t1: 14.25, months: 12, old: "R$ 1.200 no site", ringAt: 11.9, priceAt: 9.8, price: "297", dark: true, logo: "coursera" });
N.darkOn(tl, 9.15, 0.25);
N.darkOff(tl, 14.1);
N.chips(tl, { t0: 14.25, t1: 18.65, items: [{ t: 14.7, label: "Pagamento único" }, { t: 15.58, label: "Pix ou cartão" }, { t: 17.44, label: "Sem renovação automática" }] });
N.proof(tl, { t0: 18.65, t1: 24.05, head: "Preço baixo dá desconfiança. Então olha:", headTimes: [19.3, 19.74, 19.96, 20.34, 21.06, 21.24], accent: "olha:", tagAt: 21.5,
  cards: [{ src: "dep3_denis.png", at: 21.8 }, { src: "dep2_alexandre.png", at: 22.25 }, { src: "dep1_cliente.png", at: 22.7 }, { src: "dep4_cliente_honestidade.png", at: 23.1 }, { src: "dep5_erick_msgs.png", at: 23.5, name: "Erick R." }] });
N.trust(tl, { t0: 24.05, t1: 28.6, items: [
  { t: 24.1, icon: "user", label: "Conta no seu nome", sub: "Não é conta compartilhada" },
  { t: 24.62, icon: "support", label: "Suporte durante os 12 meses", sub: "Atendimento por uma pessoa" },
  { t: 26.98, icon: "bldg", label: "Empresa com CNPJ ativo", sub: "Consulta pública na Receita Federal" }] });
N.urgency(tl, { t0: 28.6, t1: 30.55, l2: "Essa oferta só vale até hoje.", l2Times: [28.66, 28.96, 29.36, 29.62, 29.9, 30.28], stampAt: 29.4 });
N.ctaWpp(tl, { t0: 30.55, t1: DUR, buttonAt: 30.9, steps: [{ t: 32.6, label: "Eu te respondo 👋" }, { t: 33.6, label: "Tiro suas dúvidas" }, { t: 34.5, label: "E crio a conta no seu nome ✅" }] });
N.thinCues();
N.done(tl, "main");
