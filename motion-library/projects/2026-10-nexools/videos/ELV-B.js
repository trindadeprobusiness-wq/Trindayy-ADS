// ELV-B · Narração que não ficou boa · Carla (ElevenLabs)
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.editTimeline(tl, { t0: 0, t1: 5.95, head: "Terminou o vídeo e a narração não ficou boa?", headTimes: [0.0, 1.22, 2.18, 2.44, 3.08, 3.34, 3.92, 4.2, 4.86], badAt: 3.92 });
N.notList(tl, { t0: 5.95, t1: 10.95, items: [{ text: "Gravar de novo", t: 6.1 }, { text: "Acertar a entonação", t: 8.16 }, { text: "Ajustar o áudio", t: 9.84 }] });
N.versions(tl, { t0: 10.95, t1: 17.5, brandAt: 11.32, items: [{ label: "Narradora", t: 13.58 }, { label: "Locutor", t: 14.48 }, { label: "Animada", t: 15.34 }],
  foot: "a partir do próprio roteiro", footTimes: [15.74, 15.88, 16.2, 16.52, 16.9] });
N.priceHero(tl, { t0: 17.5, t1: 23.2, months: 3, product: "de Creator", productLogo: "elevenlabs", productAt: 19.76, price: "149,90", priceSize: 190, priceAt: 20.94, tickAt: 17.65, tickDur: 1.4,
  floatAt: 21.0, floats: [{ name: "elevenlabs", x: 850, y: 600, s: 140, dy: 50, r: 8 }] });
N.cta(tl, { t0: 23.2, t1: DUR, headline: "Veja a oferta completa", catalog: "ElevenLabs", buttonAt: 23.6 });
N.done(tl, "main");
