// MAN-B · Tarefa com várias etapas · Aline
const MAN = { logo: "manus", ticket: "Manus Pro · 12 meses", grad: "linear-gradient(135deg,#0b162a,#2c3f66)", shadow: "rgba(11,22,42,.35)", account: "Sua conta Manus", badge: "Área do plano Pro", okText: "Pro liberado · 12 meses", code: "••••-NEXO-PRO" };
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.brief(tl, { t0: 0, t1: 6.3, badgeAt: 0.76, items: [
  { label: "Pesquisa", icon: "search", t: 2.44 }, { label: "Comparação de informações", icon: "compare", t: 3.16 }, { label: "Relatório completo", icon: "report", t: 4.94 }] });
N.punch(tl, { t0: 6.3, t1: 11.2, l1: "O problema não é só encontrar a resposta.", l1Times: [6.5, 6.7, 7.08, 7.22, 7.5, 7.76, 8.06, 8.38], l2: "É organizar todas as etapas.", l2Times: [8.96, 9.42, 10.1, 10.34, 10.76], accent2: "etapas" });
N.agentTask(tl, { t0: 11.2, t1: 17.4, kicker: "O Manus ajuda nesse processo", kickTimes: [11.32, 11.5, 12.1, 12.4, 12.96], accent: "Manus", badge: "Do começo ao fim", steps: [
  { label: "Pesquisa", icon: "search", t: 13.56 }, { label: "Preparação do material", icon: "report", t: 14.66 }, { label: "Sua revisão", icon: "eye", color: "#0b8a4c", t: 16.06, doneAt: 16.8 }] });
N.coupon(tl, Object.assign({ t0: 17.4, t1: 21.7, receiveAt: 17.6, applyAt: 18.72, okAt: 20.64 }, MAN));
N.priceHero(tl, { t0: 21.7, t1: 24.6, months: 12, product: "de Manus Pro", productLogo: "manus", productAt: 22.3, tickAt: 21.75, tickDur: 0.8, price: "597", priceAt: 22.84 });
N.cta(tl, { t0: 24.6, t1: DUR, headline: "Conheça a ferramenta", catalog: "Manus", buttonAt: 24.8 });
N.done(tl, "main");
