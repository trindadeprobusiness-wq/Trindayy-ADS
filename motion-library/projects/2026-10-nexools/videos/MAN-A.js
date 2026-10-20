// MAN-A · Resposta x trabalho em etapas · Diego
const MAN = { logo: "manus", ticket: "Manus Pro · 12 meses", grad: "linear-gradient(135deg,#0b162a,#2c3f66)", shadow: "rgba(11,22,42,.35)", account: "Sua conta Manus", badge: "Área do plano Pro", okText: "Pro liberado · 12 meses", code: "••••-NEXO-PRO" };
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.chatAsk(tl, { t0: 0, t1: 4.3, kicker: "Uma coisa é pedir uma resposta", kickTimes: [0.05, 0.78, 1.06, 1.26, 1.48, 1.94], q: "Me responde rapidinho?", qAt: 2.1, a: "Aqui está a resposta.", aAt: 3.2 });
N.agentTask(tl, { t0: 4.3, t1: 11.2, kicker: "Outra é usar uma IA para", kickTimes: [4.4, 4.72, 5.0, 5.22, 5.54, 5.72], badge: "Em várias etapas", steps: [
  { label: "Pesquisar o tema", icon: "search", t: 6.04 }, { label: "Estruturar a apresentação", icon: "slides", t: 7.22 }, { label: "Organizar o trabalho", icon: "layers", t: 8.92, doneAt: 10.4 }] });
N.nameReveal(tl, { t0: 11.2, t1: 13.5, pre: "Essa é a proposta do", preTimes: [11.3, 11.38, 11.56, 11.86, 12.1], name: "Manus", nameAt: 12.6 });
N.coupon(tl, Object.assign({ t0: 13.5, t1: 21.1, receiveAt: 13.7, applyAt: 16.52, okAt: 19.66, noFeeAt: 20.5, noFee: "Liberado automaticamente" }, MAN));
N.priceHero(tl, { t0: 21.1, t1: 24.35, months: 12, product: "de Manus Pro", productLogo: "manus", productAt: 21.92, tickAt: 21.15, tickDur: 0.8, price: "597", priceAt: 22.58 });
N.cta(tl, { t0: 24.35, t1: DUR, headline: "Confira os créditos incluídos", catalog: "Manus", buttonAt: 24.5 });
N.done(tl, "main");
