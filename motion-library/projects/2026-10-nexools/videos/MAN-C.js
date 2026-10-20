// MAN-C · "Mais uma IA? Calma." + comparação · Aline
const MAN = { logo: "manus", ticket: "Manus Pro · 12 meses", grad: "linear-gradient(135deg,#0b162a,#2c3f66)", shadow: "rgba(11,22,42,.35)", account: "Sua conta Manus", badge: "Área do plano Pro", okText: "Pro liberado · 12 meses", code: "••••-NEXO-PRO" };
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.punch(tl, { t0: 0, t1: 3.9, l1: "Mais uma inteligência artificial?", l1Times: [0.05, 0.8, 1.14, 1.92], accent1: "artificial", l1Size: 96, l2: "Calma.", l2Times: [3.16], l2Size: 150, swarm: { at: 0.6, out: 3.0 } });
N.nameReveal(tl, { t0: 3.9, t1: 6.3, name: "Manus", nameAt: 4.1, sub: "tem uma proposta diferente", subTimes: [4.34, 4.54, 4.82, 5.6] });
N.agentTask(tl, { t0: 6.3, t1: 12.5, chat: { text: "Só conversar", at: 6.4, strikeAt: 7.26 }, kicker: "Ele executa tarefas", kickTimes: [7.94, 8.22, 8.62], accent: "executa", panelAt: 7.9, badge: "Executando", steps: [
  { label: "Pesquisa", icon: "search", t: 9.58 }, { label: "Organização", icon: "layers", t: 10.38 }, { label: "Criação de materiais", icon: "slides", t: 11.28, doneAt: 11.95 }] });
N.compare(tl, { t0: 12.5, t1: 17.6, head: "E faz a conta:", headTimes: [12.56, 12.74, 12.94, 13.28], old: "+R$ 1.000", oldLabel: "Manus Pro · plano anual oficial", labelAt: 14.7, strikeAt: 17.0 });
N.coupon(tl, Object.assign({ t0: 17.6, t1: 21.0, receiveAt: 17.75, applyAt: 18.56, okAt: 20.66 }, MAN));
N.priceHero(tl, { t0: 21.0, t1: 24.4, months: 12, product: "de Manus Pro", productLogo: "manus", productAt: 22.04, tickAt: 21.05, tickDur: 0.8, price: "597", priceAt: 22.56 });
N.cta(tl, { t0: 24.4, t1: DUR, headline: "Garanta o seu", catalog: "Manus", buttonAt: 24.6 });
N.done(tl, "main");
