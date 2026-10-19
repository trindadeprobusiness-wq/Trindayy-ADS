// COU-B · Aspiração profissional · Aline Mota
const tl = gsap.timeline({ paused: true });
N.base(tl, document.getElementById("stage"), DUR);
N.pathSkill(tl, { t0: 0, t1: 5.05, head: "O próximo curso pode ser o começo de uma nova habilidade",
  headTimes: [0.4, 0.62, 1.0, 2.16, 2.4, 2.52, 2.86, 3.14, 3.24, 3.58, 3.86], drawAt: 1.0, drawDur: 2.6, nodeAt: 4.2, node: "profissional" });
N.wordSlot(tl, { t0: 5.05, t1: 10.6, prefix: "Pode ser", words: [{ t: 5.86, text: "Inteligência artificial" }, { t: 7.28, text: "Análise de dados" }, { t: 8.6, text: "Programação" }, { t: 9.72, text: "Marketing" }] });
N.converge(tl, { t0: 10.6, t1: 15.75, leftLabel: "Universidades", left: ["Ciência de Dados", "Engenharia", "Psicologia"], leftAt: 10.9,
  rightLabel: "Grandes empresas", right: ["Cloud", "Marketing", "Gestão"], rightAt: 12.6, playerAt: 14.06, rhythmAt: 15.0 });
N.ringPrice(tl, { t0: 15.75, t1: 21.05, months: 12, old: "US$ 399/ano", ringAt: 16.0, ringDur: 1.6, priceAt: 18.9, price: "89,90" });
N.cta(tl, { t0: 21.05, t1: DUR, headline: "Confira os cursos incluídos", catalog: "Coursera", buttonAt: 21.3 });
N.done(tl, "main");
