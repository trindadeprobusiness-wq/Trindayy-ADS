// H-A12 · A1 2 "olha aqui: conta ativada" · Aline Mota (Urgent and Firm) · 24/11/2026
// Prova: gravação REAL da tela do usuário (painel com o curso em andamento → página do curso), 10,95–18,6 s.
// Prompt Motion: PM-028, Charts (contador), PM-016 (prova UGC), PM-005 (CTA no celular).
// @video tela_coursera.mp4 id=tela start=11.20 dur=7.10 media=3.5
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.punch(tl, { t0: 0, t1: 4.65, l1: "Se você chegou até aqui,", l1Times: [0.32, 0.56, 0.8, 1.04, 1.34], l1Size: 80,
  l2: "é porque quer o Coursera Plus.", l2Times: [1.58, 1.72, 2.04, 2.2, 2.3, 2.96], l2Size: 104, accent2: "Coursera|Plus." });
N.anchor(tl, { t0: 4.65, t1: 8.6, head: "O mesmo ano", headTimes: [4.76, 5.08, 5.34], cardAt: 5.0, val: 1200, valAt: 6.4, labelAt: 7.7, strikeAt: 8.25 });
N.darkOn(tl, 8.5, 0.25);
N.ringPrice(tl, { t0: 8.6, t1: 10.95, months: 12, old: "R$ 1.200 no site", ringAt: 8.7, ringDur: 0.6, priceAt: 9.14, price: "297", dark: true, logo: "coursera" });
N.darkOff(tl, 10.8);
N.screenReal(tl, { t0: 10.95, t1: 18.6, head: "Olha aqui na tela: conta ativada.", headTimes: [11.1, 11.22, 11.36, 11.76, 12.78, 13.26], accent: "ativada.", mediaStart: 3.5 });
N.chips(tl, { t0: 18.6, t1: 23.95, items: [{ t: 18.92, label: "Conta no seu nome" }, { t: 20.34, label: "Pagamento único" }, { t: 21.36, label: "Pix ou cartão" }, { t: 22.76, label: "Sem renovação automática" }] });
N.trust(tl, { t0: 23.95, t1: 28.1, items: [
  { t: 24.2, icon: "support", label: "Suporte durante os 12 meses", sub: "Atendimento por uma pessoa" },
  { t: 26.16, icon: "bldg", label: "Empresa com CNPJ ativo", sub: "Consulta pública na Receita Federal" }] });
N.urgency(tl, { t0: 28.1, t1: 31.55, l1: "Se você está vendo esse vídeo,", l1Times: [28.18, 28.44, 28.6, 28.74, 28.98, 29.34], l2: "essa oferta só vale até hoje.", l2Times: [29.64, 29.86, 30.24, 30.46, 30.78, 31.16], stampAt: 30.24 });
N.ctaWpp(tl, { t0: 31.55, t1: DUR, buttonAt: 31.75, steps: [] });
N.thinCues();
N.done(tl, "main");
