// COU-A · Economia e valor · Aline Mota · comparação validada pelo usuário
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.priceFlip(tl, { t0: 0, t1: 5.75, head: "Um ano de Coursera Plus", headTimes: [0.34, 0.52, 0.64, 0.9, 1.46], cardAt: 0.2,
  frontTop: "Coursera Plus · 12 meses", front: 399, frontSub: "por ano", priceAt: 1.9, note: "Referência internacional", noteAt: 4.2,
  backTop: "Convertido em reais", back: "≈ R$ 2.013", backSub: "por ano, sem impostos", flipAt: 4.7 });
N.brandBeat(tl, { t0: 5.75, t1: 7.95, line: "Agora olha a oferta da", lineTimes: [5.9, 6.38, 6.72, 6.9, 7.0], logoAt: 7.44 });
N.ringPrice(tl, { t0: 7.95, t1: 11.65, months: 12, old: "US$ 399/ano", ringAt: 8.1, priceAt: 9.48, price: "89,90", dark: true, logo: "coursera" });
N.darkOff(tl, 11.5);
N.mosaic(tl, { t0: 11.65, t1: 20.05, chipAt: 12.12, certAt: 18.1, certTitle: "IA Generativa na Prática", certSub: "Certificados nos programas incluídos",
  cats: [{ t: 14.14, label: "Tecnologia", key: "tec" }, { t: 14.86, label: "Inteligência artificial", key: "ia" }, { t: 16.26, label: "Negócios", key: "neg" }, { t: 17.0, label: "e muito mais", key: "mais" }] });
N.cta(tl, { t0: 20.05, t1: DUR, headline: "Continue aprendendo", catalog: "Coursera", buttonAt: 22.24 });
N.done(tl, "main");
