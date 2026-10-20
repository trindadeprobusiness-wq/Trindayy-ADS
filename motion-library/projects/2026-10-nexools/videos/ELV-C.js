// ELV-C · Estúdio x IA + comparação de preço · Carla (ElevenLabs)
// ⚠️ comparação US$ 22 × 3 ainda não validada (offers.json approved_for_ads=false)
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.objections(tl, { t0: 0, t1: 4.8, kicker: "Narração de qualidade não depende de", kickTimes: [0.74, 0.98, 1.54, 2.08, 2.56, 2.86], items: [
  { icon: "home", text: "Montar um estúdio em casa", t: 3.02, strikeAt: 3.9 },
  { icon: "mic", text: "Equipamento caro", t: 3.5, strikeAt: 4.2 },
] });
N.ttsEditor(tl, { t0: 4.8, t1: 11.95, script: "Narração de qualidade, sem estúdio.", typeAt: 5.9, typeDur: 1.0,
  voices: [{ name: "Narradora", t: 7.12 }], genAt: 7.3, adjustAt: 9.34 });
N.useCases(tl, { t0: 11.95, t1: 17.95, title: "ElevenLabs Creator", titleAt: 12.84, sub: "para quem trabalha com",
  items: [{ icon: "video", label: "Vídeo", t: 15.6 }, { icon: "mega", label: "Anúncios", t: 16.08 }, { icon: "doc", label: "Conteúdo", t: 17.04 }] });
N.darkOn(tl, 17.95 - 0.1);
N.calc(tl, { t0: 17.95, t1: 28.7, kicker: "E faz a conta:", kickTimes: [18.14, 18.36, 18.62, 18.94], planLabel: "ElevenLabs Creator · assinatura oficial em dólar", planLogo: "elevenlabs", planLogoColor: "#fff",
  monthly: "US$ 22", months: 3, lineAt: 19.38, countStart: 21.8, countEnd: 25.0, total: 333.04, nexAt: 25.5, priceAt: 26.9, price: "149,90", priceSize: 190, vistaAt: null });
N.darkOff(tl, 28.7 - 0.15);
N.cta(tl, { t0: 28.7, t1: DUR, headline: "Garanta o seu", catalog: "ElevenLabs", buttonAt: 29.36 });
N.done(tl, "main");
