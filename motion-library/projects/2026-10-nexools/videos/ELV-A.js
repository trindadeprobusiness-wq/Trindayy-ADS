// ELV-A · "A voz que você está ouvindo" · Carla (ElevenLabs)
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.voiceHero(tl, { t0: 0, t1: 7.0, head: "Sabe essa voz que você está ouvindo agora?", headTimes: [0.0, 0.82, 1.06, 1.26, 1.54, 1.76, 1.98, 2.44],
  sub: "Ela foi criada com inteligência artificial no", subTimes: [3.14, 3.3, 3.58, 3.9, 4.22, 5.14, 5.62], brandAt: 5.96 });
N.thisAd(tl, { t0: 7.0, t1: 12.4, head: "Vídeos e anúncios como este,", headTimes: [8.54, 8.78, 9.02, 9.42, 9.82], phoneAt: 7.4, tagAt: 9.7, chip: "Sem gravar uma palavra", micAt: 10.4 });
N.ttsEditor(tl, { t0: 12.4, t1: 20.25, script: "Sabe essa voz que você está ouvindo agora?", typeAt: 12.86, typeDur: 1.1,
  voices: [{ name: "Narradora", t: 14.06 }, { name: "Locutor", t: 14.5 }, { name: "Animada", t: 14.9 }], genAt: 15.54,
  langs: [{ l: "Português", t: 18.6 }, { l: "Inglês", t: 19.0 }, { l: "Espanhol", t: 19.4 }] });
N.priceHero(tl, { t0: 20.25, t1: 26.6, months: 3, product: "do plano Creator", productLogo: "elevenlabs", productAt: 22.72, price: "149,90", priceSize: 190, priceAt: 24.1, tickAt: 21.7, tickDur: 0.6,
  floatAt: 24.2, floats: [{ name: "elevenlabs", x: 850, y: 600, s: 140, dy: 50, r: 8 }] });
N.cta(tl, { t0: 26.6, t1: DUR, headline: "Comece a criar", catalog: "ElevenLabs", buttonAt: 27.2 });
N.done(tl, "main");
