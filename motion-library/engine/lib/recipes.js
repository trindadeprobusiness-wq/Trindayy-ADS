/*
 * Biblioteca de receitas de motion — implementação HyperFrames/GSAP.
 * Cada função corresponde a uma receita em motion-library/recipes/ (ID R-xx).
 *
 * Regras (contrato HyperFrames):
 *  - Tudo entra em UM timeline pausado passado como `tl`.
 *  - fromTo com estado inicial explícito (seek-safe nos dois sentidos).
 *  - Só transform/opacity/filter/borderRadius/cores. Nada de width/height/top/left.
 *  - Determinístico: nada de Math.random/Date.now.
 *  - Valores padrão = SUGESTÕES calibradas a olho nas referências, não medições.
 */
(function () {
  const M = (window.MotionRecipes = {});

  /* Easings nomeados da biblioteca (ver design-system/motion-tokens.md). */
  M.ease = {
    enter: "expo.out", //   entrada: chega rápido e assenta longo (REF-003/007/008)
    exit: "power3.in", //   saída: acelera para fora
    move: "power2.inOut", // reposicionamento de câmera/objeto
    land: "power4.out", //  pouso de câmera com assentamento firme (REF-007)
    pop: "back.out(1.6)", // pop com leve overshoot (pills, tiles — REF-007/008)
    snap: "expo.inOut", //  morph/whip rápido no meio, suave nas pontas (REF-004/005)
  };

  /* Quebra o texto de um elemento em spans por palavra (uma vez, no build). */
  M.splitWords = function (el) {
    if (el.dataset.split === "1") return Array.from(el.querySelectorAll(".w"));
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach((w, i) => {
      const s = document.createElement("span");
      s.className = "w";
      s.style.display = "inline-block";
      s.textContent = w;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
    el.dataset.split = "1";
    return Array.from(el.querySelectorAll(".w"));
  };

  /* R-01 Blur-in por palavra (Apple Style / tipografia cinética).
     Origem: REF-003 0.9–2.4s, REF-008 9.2–9.6s, REF-006 (todas as frases). */
  M.blurWordsIn = function (tl, el, o = {}) {
    const p = Object.assign({ at: 0, dur: 0.6, stagger: 0.09, blur: 14, y: 18, scale: 1, fromOpacity: 0, ease: M.ease.enter }, o);
    const words = M.splitWords(el);
    tl.fromTo(
      words,
      { opacity: p.fromOpacity, y: p.y, scale: p.scale, filter: `blur(${p.blur}px)` },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: p.dur, stagger: p.stagger, ease: p.ease },
      p.at
    );
    return p.at + p.dur + p.stagger * (words.length - 1);
  };

  /* R-02 Saída por blur (dissolve com desfoque). Origem: REF-003 6.1s, REF-008 11.0s. */
  M.blurOut = function (tl, targets, o = {}) {
    const p = Object.assign({ at: 0, dur: 0.35, blur: 16, scale: 1.04, y: 0, ease: M.ease.exit }, o);
    tl.fromTo(
      targets,
      { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 },
      { opacity: 0, filter: `blur(${p.blur}px)`, scale: p.scale, y: p.y, duration: p.dur, ease: p.ease, immediateRender: false },
      p.at
    );
    return p.at + p.dur;
  };

  /* R-03 Pop escalonado / montagem de grid (bento). Origem: REF-007 0.1–0.8s, REF-008 9.9–10.2s. */
  M.staggerPop = function (tl, items, o = {}) {
    const p = Object.assign({ at: 0, dur: 0.55, stagger: 0.06, from: 0.4, ease: M.ease.pop }, o);
    tl.fromTo(items, { opacity: 0, scale: p.from }, { opacity: 1, scale: 1, duration: p.dur, stagger: p.stagger, ease: p.ease }, p.at);
    return p.at + p.dur + p.stagger * (items.length - 1);
  };

  /* R-04 Morph de forma (pill → card, bolha → tile). Transform-only: o elemento é
     autorado no tamanho FINAL; o início é um scaleX/scaleY menor + raio maior.
     Origem: REF-004 1.1–1.5s, REF-005 7.6–7.7s, REF-001 6.8–6.9s. */
  M.shapeMorph = function (tl, el, o = {}) {
    const p = Object.assign({ at: 0, dur: 0.5, fromScaleX: 0.35, fromScaleY: 0.12, fromRadius: 999, toRadius: 32, ease: M.ease.snap }, o);
    tl.fromTo(
      el,
      { scaleX: p.fromScaleX, scaleY: p.fromScaleY, borderRadius: p.fromRadius },
      { scaleX: 1, scaleY: 1, borderRadius: p.toRadius, duration: p.dur, ease: p.ease },
      p.at
    );
    return p.at + p.dur;
  };

  /* R-05 Ticker vertical (roleta de anos/números) que desacelera e trava.
     `col` = coluna com N linhas de altura `rowH`; trava na linha `toIndex`.
     Origem: REF-002 15.6–16.6s. */
  M.slotTicker = function (tl, col, o = {}) {
    const p = Object.assign({ at: 0, dur: 1.1, rowH: 120, fromIndex: 0, toIndex: 5, ease: "expo.out" }, o);
    tl.fromTo(col, { y: -p.fromIndex * p.rowH }, { y: -p.toIndex * p.rowH, duration: p.dur, ease: p.ease }, p.at);
    return p.at + p.dur;
  };

  /* R-06 Contador (count-up) via proxy — seek-safe. Origem: REF-007 3.0–3.4s, REF-008 4.8s. */
  M.countUp = function (tl, el, o = {}) {
    const p = Object.assign({ at: 0, dur: 0.9, from: 0, to: 100, prefix: "", suffix: "", decimals: 0, ease: "power2.out" }, o);
    const proxy = { v: p.from };
    const fmt = (v) => p.prefix + v.toFixed(p.decimals).replace(".", ",") + p.suffix;
    el.textContent = fmt(p.from);
    tl.fromTo(
      proxy,
      { v: p.from },
      { v: p.to, duration: p.dur, ease: p.ease, onUpdate: () => (el.textContent = fmt(proxy.v)) },
      p.at
    );
    return p.at + p.dur;
  };

  /* R-07 Revelação circular (wipe radial) — um disco escala a partir de um ponto
     até cobrir o quadro. `disc` = div circular já posicionada no ponto de origem,
     com diâmetro = diagonal*2 do quadro. Origem: REF-005 7.07–7.6s, REF-001 7.6–7.9s, REF-006 5.4s. */
  M.circleReveal = function (tl, disc, o = {}) {
    const p = Object.assign({ at: 0, dur: 0.55, ease: "power3.in" }, o);
    tl.fromTo(disc, { scale: 0 }, { scale: 1, duration: p.dur, ease: p.ease }, p.at);
    return p.at + p.dur;
  };

  /* R-08 Câmera 3D (estado único + um escritor). Pernas = [{at, dur, x,y,z,rx,ry, ease}].
     `world` precisa de transform-style: preserve-3d dentro de um .stage com perspective.
     Origem: REF-007 (toda a peça), REF-003 8.2–8.5s (entrada inclinada do player). */
  M.camera = function (tl, world, start, legs) {
    const cam = Object.assign({ x: 0, y: 0, z: 0, rx: 0, ry: 0 }, start);
    const apply = () => {
      world.style.transform = `translate3d(${cam.x}px, ${cam.y}px, ${cam.z}px) rotateX(${cam.rx}deg) rotateY(${cam.ry}deg)`;
    };
    apply();
    let prev = Object.assign({}, cam);
    legs.forEach((leg) => {
      const to = { x: prev.x, y: prev.y, z: prev.z, rx: prev.rx, ry: prev.ry };
      ["x", "y", "z", "rx", "ry"].forEach((k) => leg[k] !== undefined && (to[k] = leg[k]));
      tl.fromTo(cam, Object.assign({}, prev), Object.assign({}, to, { duration: leg.dur, ease: leg.ease || M.ease.move, onUpdate: apply, immediateRender: false }), leg.at);
      prev = to;
    });
    return cam;
  };

  /* R-09 Pilha de eco (palavra repetida com opacidade decrescente) + entrada.
     Origem: REF-006 8.2–8.8s, REF-008 14.7–15.3s ("Profissional" x3). */
  M.echoStack = function (tl, layers, o = {}) {
    const p = Object.assign({ at: 0, dur: 0.5, stagger: 0.07, y: 30, ease: M.ease.enter }, o);
    tl.fromTo(layers, { opacity: 0, y: p.y }, { opacity: (i) => Math.max(0.12, 1 - i * 0.38), y: 0, duration: p.dur, stagger: p.stagger, ease: p.ease }, p.at);
    return p.at + p.dur + p.stagger * (layers.length - 1);
  };

  /* R-10 Brilho que varre (light sweep) sobre pill/botão. `sheen` = faixa com gradiente
     dentro do elemento (overflow hidden). Origem: REF-006 8.3–8.7s. */
  M.lightSweep = function (tl, sheen, o = {}) {
    const p = Object.assign({ at: 0, dur: 0.6, fromX: -260, toX: 260, ease: "power2.inOut" }, o);
    tl.fromTo(sheen, { x: p.fromX, opacity: 1 }, { x: p.toX, opacity: 1, duration: p.dur, ease: p.ease }, p.at);
    return p.at + p.dur;
  };

  /* R-11 Profundidade de campo (rack focus) em camadas não focais. Origem: REF-008 5.3–5.6s, REF-003 3.0s. */
  M.depthBlur = function (tl, targets, o = {}) {
    const p = Object.assign({ at: 0, dur: 0.6, blur: 10, dim: 0.55, ease: M.ease.move }, o);
    tl.fromTo(targets, { filter: "blur(0px)", opacity: 1 }, { filter: `blur(${p.blur}px)`, opacity: p.dim, duration: p.dur, ease: p.ease, immediateRender: false }, p.at);
    return p.at + p.dur;
  };

  /* R-12 Flash de corte (tom intermediário de 1–3 frames entre cenas claras/escuras).
     `veil` = camada full-frame da cor do flash. Origem: REF-006 5.33s/8.13s, REF-008 3.2s/5.27s. */
  M.flashCut = function (tl, veil, o = {}) {
    const p = Object.assign({ at: 0, frames: 2, fps: 30, opacity: 1 }, o);
    const d = p.frames / p.fps;
    tl.fromTo(veil, { opacity: 0 }, { opacity: p.opacity, duration: 0.001, immediateRender: false }, p.at);
    tl.to(veil, { opacity: 0, duration: 0.001 }, p.at + d);
    return p.at + d;
  };
})();
