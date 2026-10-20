// ELV-C2 · Estúdio x IA + comparação de preço · Carla (ElevenLabs)
// ⚠️ comparação US$ 22 × 3 ainda não validada (offers.json approved_for_ads=false)
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.objections(tl, { t0: 0, t1: 4.6, kicker: "Narração de qualidade não depende de", kickTimes: [0.68, 0.94, 1.5, 1.96, 2.44, 2.66], items: [
  { icon: "home", text: "Montar um estúdio em casa", t: 2.86, strikeAt: 3.7 },
  { icon: "mic", text: "Equipamento caro", t: 3.4, strikeAt: 4.1 },
] });
N.ttsEditor(tl, { t0: 4.6, t1: 11.4, script: "Narração de qualidade, sem estúdio.", typeAt: 5.72, typeDur: 1.0,
  voices: [{ name: "Narradora", t: 6.86 }], genAt: 7.08, adjustAt: 9.04 });
N.useCases(tl, { t0: 11.4, t1: 17.3, title: "ElevenLabs Creator", titleAt: 12.3, sub: "para quem trabalha com",
  items: [{ icon: "video", label: "Vídeo", t: 14.88 }, { icon: "mega", label: "Anúncios", t: 15.34 }, { icon: "doc", label: "Conteúdo", t: 16.34 }] });
N.darkOn(tl, 17.3 - 0.1);
N.calc(tl, { t0: 17.3, t1: 27.5, kicker: "E faz a conta:", kickTimes: [17.42, 17.6, 17.84, 18.18], planLabel: "ElevenLabs Creator · assinatura oficial em dólar", planLogo: "elevenlabs", planLogoColor: "#fff",
  monthly: "US$ 22", months: 3, lineAt: 18.6, countStart: 21.06, countEnd: 24.18, total: 333.04, nexAt: 24.6, priceAt: 26.1, price: "149,90", priceSize: 190, vistaAt: null });
N.darkOff(tl, 27.5 - 0.15);
N.cta(tl, { t0: 27.5, t1: DUR, headline: "Garanta o seu", catalog: "ElevenLabs", buttonAt: 28.24 });
N.done(tl, "main");
