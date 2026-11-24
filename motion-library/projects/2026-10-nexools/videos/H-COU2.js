// H-COU2 · COU-A 2 "vou te mostrar que é real" · Aline Mota (Urgent and Firm) · 24/11/2026
// Prova: gravação REAL da tela do usuário com o Coursera Plus ativo (painel "Meu aprendizado"), 17,35–25,2 s.
// Prompt Motion: PM-028 (hook cinético), Charts (contador), PM-016 (prova UGC), PM-005 (celular no CTA).
// @video tela_coursera.mp4 id=tela start=17.60 dur=7.30 media=0.5
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.punch(tl, { t0: 0, t1: 6.3, l1: "Se você quer o Coursera Plus,", l1Times: [0.28, 0.66, 0.96, 1.2, 1.28, 1.74], l1Size: 80, accent1: "Coursera|Plus,",
  l2: "não paga o preço do site antes de ver isso.", l2Times: [3.54, 3.82, 3.94, 4.14, 4.38, 4.64, 5.2, 5.28, 5.54, 5.94], l2Size: 92, accent2: "não" });
N.anchor(tl, { t0: 6.3, t1: 11.1, head: "Um ano de Coursera Plus", headTimes: [6.46, 6.7, 6.84, 7.1, 7.6], cardAt: 6.6, val: 1200, valAt: 8.88, labelAt: 10.02, strikeAt: 10.6 });
N.brandBeat(tl, { t0: 11.1, t1: 13.2, line: "Agora olha a oferta da", lineTimes: [11.16, 11.6, 11.82, 11.96, 12.22], logoAt: 12.68 });
N.ringPrice(tl, { t0: 13.2, t1: 17.35, months: 12, old: "R$ 1.200/ano", ringAt: 13.34, priceAt: 14.38, price: "297", dark: true, logo: "coursera" });
N.darkOff(tl, 17.2);
N.screenReal(tl, { t0: 17.35, t1: 25.2, head: "E eu vou te mostrar que é real.", headTimes: [17.44, 17.58, 17.6, 17.72, 18.06, 18.36, 18.42, 18.8], accent: "real.", mediaStart: 0.5, zoom: 1.06 });
N.trust(tl, { t0: 25.2, t1: 30.8, items: [
  { t: 25.34, icon: "user", label: "Conta no seu nome", sub: "Não é conta compartilhada" },
  { t: 26.9, icon: "support", label: "Suporte durante os 12 meses", sub: "Atendimento por uma pessoa" },
  { t: 28.92, icon: "bldg", label: "Empresa com CNPJ ativo", sub: "Consulta pública na Receita Federal" }] });
N.urgency(tl, { t0: 30.8, t1: 32.7, l2: "Essa oferta só vale até hoje.", l2Times: [30.9, 31.2, 31.52, 31.74, 32.02, 32.46], stampAt: 31.52 });
N.ctaWpp(tl, { t0: 32.7, t1: DUR, buttonAt: 33.0, steps: [{ t: 34.72, label: "Eu te respondo 👋" }, { t: 35.62, label: "Tiro suas dúvidas" }, { t: 36.6, label: "E crio a conta no seu nome ✅" }] });
N.thinCues();
N.done(tl, "main");
