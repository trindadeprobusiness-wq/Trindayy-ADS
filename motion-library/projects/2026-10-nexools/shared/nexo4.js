/* Nexools — cenas do lote "só vale até hoje" (Coursera, 24/11/2026). Depende de nexo.js.
 * Novas cenas: anchor (preço do site com contador), chips (condições), proof (depoimentos reais),
 * trust (selos de segurança), urgency (só vale até hoje), ctaWpp (CTA para o WhatsApp).
 * Princípios do Prompt Motion: PM-028 (tipografia cinética), Charts (contador ~1 s),
 * PM-016 (montagem UGC de prova), PM-005 (celular no CTA). Fluidez: launch-motion.
 */
(function () {
  const N = window.N, E = N.E, el = N.el, q = N.q, qa = N.qa, words = N.words, scene = N.scene;
  const css = document.createElement("style");
  css.textContent = `
  .card4 { background:#fff; border-radius:44px; box-shadow:var(--shadow); padding:50px 60px; }
  .anch-top { display:flex; align-items:center; gap:22px; font-family:var(--f-ui); font-size:34px; font-weight:500; color:var(--ink-2); }
  .anch-val { font-size:170px; font-weight:700; letter-spacing:-0.05em; line-height:1; margin-top:20px; font-variant-numeric:tabular-nums; position:relative; display:inline-block; }
  .anch-val .strike { position:absolute; top:52%; left:-14px; right:-14px; height:12px; border-radius:6px; background:var(--red); transform-origin:left center; }
  .chiprow { display:flex; align-items:center; gap:30px; width:860px; padding:34px 44px; margin:18px 0; background:#fff; border-radius:36px; box-shadow:var(--shadow); font-size:54px; font-weight:600; letter-spacing:-0.02em; text-align:left; }
  .chk { flex:none; width:84px; height:84px; border-radius:26px; background:var(--blue); display:flex; align-items:center; justify-content:center; }
  .chk svg { width:52px; height:52px; }
  .chk.green { background:var(--green); }
  .proof-stage { position:absolute; left:0; right:0; top:560px; height:900px; }
  .pcard { position:absolute; left:50%; top:0; width:880px; margin-left:-440px; border-radius:40px; overflow:hidden; box-shadow:0 50px 100px rgba(11,22,42,.28), 0 12px 30px rgba(11,22,42,.18); background:#0b141a; }
  .pcard img { display:block; width:100%; }
  .pcard .ph { display:flex; align-items:center; gap:18px; padding:22px 30px; background:#111b21; color:#e9edef; font-family:var(--f-ui); font-size:32px; font-weight:500; }
  .pcard .ph i { width:54px; height:54px; border-radius:50%; background:#2b5cff; display:flex; align-items:center; justify-content:center; font-style:normal; font-weight:700; color:#fff; }
  .pcard .ph small { display:block; font-size:22px; color:#8696a0; }
  .realtag { display:inline-flex; align-items:center; gap:14px; padding:18px 34px; border-radius:999px; background:var(--navy); color:#fff; font-family:var(--f-ui); font-size:30px; font-weight:500; }
  .realtag b { width:16px; height:16px; border-radius:50%; background:#2ee57a; display:block; }
  .badge4 { display:flex; align-items:center; gap:34px; width:900px; padding:40px 48px; margin:20px 0; background:#fff; border-radius:40px; box-shadow:var(--shadow); text-align:left; }
  .badge4 .ic { flex:none; width:120px; height:120px; border-radius:36px; background:var(--blue-soft); display:flex; align-items:center; justify-content:center; }
  .badge4 .ic svg { width:68px; height:68px; }
  .badge4 .tt { font-size:54px; font-weight:700; letter-spacing:-0.025em; line-height:1.05; }
  .badge4 .st { font-family:var(--f-ui); font-size:30px; color:var(--ink-2); margin-top:8px; }
  .badge4 .ok { margin-left:auto; flex:none; width:76px; height:76px; border-radius:50%; background:var(--green); display:flex; align-items:center; justify-content:center; }
  .badge4 .ok svg { width:46px; height:46px; }
  .stamp4 { position:relative; display:inline-flex; align-items:center; gap:26px; margin-top:70px; padding:34px 60px; border:8px solid var(--red); border-radius:36px; color:var(--red); font-size:84px; font-weight:800; letter-spacing:-0.02em; text-transform:uppercase; transform:rotate(-4deg); background:rgba(255,59,78,.06); }
  .clock { width:96px; height:96px; }
  .phone { position:relative; width:600px; height:820px; border-radius:80px; background:#0b162a; padding:22px; box-shadow:0 60px 120px rgba(11,22,42,.35); }
  .phone .scr { position:absolute; inset:22px; border-radius:60px; background:#efeae2; overflow:hidden; }
  .phone .bar { height:130px; background:#0b8a4c; display:flex; align-items:flex-end; gap:20px; padding:0 34px 24px; color:#fff; font-family:var(--f-ui); font-size:32px; font-weight:600; }
  .phone .bar i { width:62px; height:62px; border-radius:50%; background:#fff; display:flex; align-items:center; justify-content:center; font-style:normal; }
  .bub { position:absolute; max-width:470px; padding:22px 30px; border-radius:30px; font-family:var(--f-ui); font-size:32px; line-height:1.25; text-align:left; box-shadow:0 4px 10px rgba(0,0,0,.08); }
  .bub.me { right:30px; background:#d9fdd3; border-top-right-radius:8px; }
  .bub.you { left:30px; background:#fff; border-top-left-radius:8px; }
  .wpill { position:relative; margin-top:60px; display:inline-flex; align-items:center; gap:24px; padding:40px 80px; border-radius:999px; background:#0b8a4c; color:#fff; font-size:56px; font-weight:700; letter-spacing:-0.02em; overflow:hidden; box-shadow:0 30px 80px rgba(11,138,76,.35); }
  .wpill svg { width:62px; height:62px; }
  .wpill .sheen { position:absolute; top:0; bottom:0; width:160px; background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent); transform:skewX(-20deg); }
  `;
  document.head.appendChild(css);
  const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>`;
  const SV = (d, c = "#005afc") => `<svg viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const IC = {
    user: SV('<circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6"/>'),
    support: SV('<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19c0 1.5-2 2.5-5 2.5"/>'),
    bldg: SV('<path d="M4 21V5l8-3v19M12 21V9l8 3v9M2 21h20"/><path d="M7 8h2M7 12h2M7 16h2M15 14h2M15 17h2"/>'),
    chat: SV('<path d="M4 5h16v11H9l-5 4z"/>', "#fff"),
  };

  /* preço de referência do site oficial com contador */
  N.anchor = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="h2 hd" style="margin-bottom:60px">${o.head}</div>
      <div class="card4 ac" style="width:880px"><div class="anch-top" style="justify-content:center"><span style="width:76px;height:76px;border-radius:24px;background:var(--paper);display:flex;align-items:center;justify-content:center">${N.logo("coursera", 50)}</span>Coursera Plus · plano anual</div>
      <div class="anch-val"><span class="v">R$ 0</span><div class="strike"></div></div>
      <div class="lbl lb" style="margin-top:16px">${o.label || "no site oficial"}</div></div></div>`, s);
    words(tl, q(c, ".hd"), o.headTimes);
    tl.fromTo(q(c, ".ac"), { opacity: 0, y: 90, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.3)" }, o.cardAt);
    const v = q(c, ".v"), px = { v: 0 };
    tl.fromTo(px, { v: 0 }, { v: o.val, duration: 0.9, ease: "power2.out", onUpdate: () => (v.textContent = "R$ " + Math.round(px.v).toLocaleString("pt-BR")) }, o.valAt);
    for (let i = 0; i < 6; i++) N.sfx("tick", o.valAt + i * 0.13, -12);
    tl.fromTo(q(c, ".lb"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E.enter }, o.labelAt);
    if (o.strikeAt) {
      tl.fromTo(q(c, ".strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: E.move }, o.strikeAt);
      N.sfx("strike", o.strikeAt, -6);
    } else tl.set(q(c, ".strike"), { scaleX: 0 }, o.t0);
    return s;
  };

  /* condições em linhas com check */
  N.chips = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center">${o.head ? `<div class="h2 hd" style="margin-bottom:50px">${o.head}</div>` : ""}${o.items.map((it) => `<div class="chiprow"><span class="chk">${CHECK}</span><span>${it.label}</span></div>`).join("")}</div>`, s);
    if (o.head) words(tl, q(c, ".hd"), o.headTimes);
    qa(c, ".chiprow").forEach((r, i) => {
      const t = o.items[i].t;
      tl.fromTo(r, { opacity: 0, x: -120, scale: 0.94 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, t - 0.08);
      tl.fromTo(q(r, ".chk"), { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.45, ease: E.pop }, t + 0.05);
      N.sfx("pop", t, -8);
    });
    return s;
  };

  /* depoimentos reais: cartões empilhando (montagem UGC) */
  N.proof = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center" style="justify-content:flex-start;padding-top:330px"><div class="h2 hd" style="font-size:60px" data-accent="${o.accent || ""}">${o.head}</div>
      <div class="realtag rt" style="margin-top:30px"><b></b>Mensagens reais de clientes · dados ocultos</div></div>`, s);
    words(tl, q(c, ".hd"), o.headTimes);
    tl.fromTo(q(c, ".rt"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: E.enter }, o.tagAt);
    const st = el(`<div class="proof-stage" data-layout-allow-overlap data-layout-allow-occlusion></div>`, s);
    const cards = o.cards.map((cd, i) => {
      const head = cd.name ? `<div class="ph"><i>${cd.name[0]}</i><div>${cd.name}<small>Mensagem real no WhatsApp · telefone oculto</small></div></div>` : "";
      return el(`<div class="pcard" data-layout-allow-overlap data-layout-allow-occlusion style="z-index:${i + 1}">${head}<img src="assets/${cd.src}" alt="Depoimento de cliente"></div>`, st);
    });
    cards.forEach((cd, i) => {
      const t = o.cards[i].at, rot = i % 2 ? 2.5 : -2.5;
      tl.fromTo(cd, { opacity: 0, y: 520, rotation: rot * 3, scale: 0.9 }, { opacity: 1, y: (o.cards[i].y != null ? o.cards[i].y : i * 26), rotation: rot, scale: 1, duration: 0.55, ease: "back.out(1.2)" }, t - 0.1);
      N.sfx(i ? "pop" : "whoosh", t - 0.05, i ? -9 : -8);
      for (let k = 0; k < i; k++) {
        tl.to(cards[k], { scale: 1 - (i - k) * 0.05, opacity: Math.max(0.3, 1 - (i - k) * 0.22), filter: `blur(${(i - k) * 1.5}px)`, duration: 0.45, ease: E.move }, t - 0.1);
      }
    });
    return s;
  };

  /* selos de segurança */
  N.trust = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center">${o.head ? `<div class="h2 hd" style="margin-bottom:40px">${o.head}</div>` : ""}${o.items.map((it) => `<div class="badge4"><span class="ic">${IC[it.icon]}</span><div><div class="tt">${it.label}</div>${it.sub ? `<div class="st">${it.sub}</div>` : ""}</div><span class="ok">${CHECK}</span></div>`).join("")}</div>`, s);
    if (o.head) words(tl, q(c, ".hd"), o.headTimes);
    qa(c, ".badge4").forEach((b, i) => {
      const t = o.items[i].t;
      tl.fromTo(b, { opacity: 0, y: 80, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.3)" }, t - 0.1);
      tl.fromTo(q(b, ".ok"), { scale: 0 }, { scale: 1, duration: 0.4, ease: E.pop }, t + 0.35);
      N.sfx(i === o.items.length - 1 ? "stamp" : "pop", t + 0.35, -8);
    });
    return s;
  };

  /* só vale até hoje */
  N.urgency = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center">${o.l1 ? `<div class="h2 l1">${o.l1}</div>` : ""}<div class="h1 l2" style="margin-top:40px" data-accent="${o.accent || "hoje.|hoje"}">${o.l2}</div>
      <div class="stamp4"><svg class="clock" viewBox="0 0 24 24" fill="none" stroke="#ff3b4e" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path class="hand" d="M12 12V6.5" style="transform-origin:12px 12px"/><path d="M12 12l3.5 2"/></svg>${o.stamp || "Só até hoje"}</div></div>`, s);
    if (o.l1) words(tl, q(c, ".l1"), o.l1Times);
    words(tl, q(c, ".l2"), o.l2Times);
    const stp = q(c, ".stamp4");
    tl.fromTo(stp, { opacity: 0, scale: 2.2, rotation: -14 }, { opacity: 1, scale: 1, rotation: -4, duration: 0.35, ease: "power4.out" }, o.stampAt);
    N.sfx("stamp", o.stampAt + 0.05, -4);
    tl.fromTo(q(c, ".hand"), { rotation: 0 }, { rotation: 720, duration: Math.max(0.6, o.t1 - o.stampAt), ease: "none" }, o.stampAt);
    tl.fromTo(stp, { x: 0 }, { x: 8, duration: 0.06, yoyo: true, repeat: 5, ease: "none", immediateRender: false }, o.stampAt + 0.35);
    return s;
  };

  /* CTA WhatsApp: celular com a conversa + botão */
  N.ctaWpp = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1, { noExit: true });
    const steps = (o.steps && o.steps.length) ? o.steps : [{ t: o.buttonAt + 0.5, label: "Oi! Te explico tudo por aqui 😊" }];
    const c = el(`<div class="center" style="justify-content:flex-start;padding-top:320px">
      <div class="phone ph"><div class="scr"><div class="bar"><i><img src="assets/nexools-mark.png" style="width:44px" alt=""></i>Nexools · atendimento</div>
        <div class="bub me b0" style="top:180px">Oi! Quero o Coursera Plus 🙂</div>
        ${steps.map((st, i) => `<div class="bub you bs" style="top:${300 + i * 120}px">${st.label}</div>`).join("")}
      </div></div>
      <div class="wpill wp">${IC.chat}<span>${o.button || "Chamar no WhatsApp"}</span><div class="sheen"></div></div>${o.stampAt ? `<div class="stamp4 cst" style="margin-top:40px;font-size:64px;padding:24px 46px">Só até hoje</div>` : ""}</div>`, s);
    if (o.stampAt) { tl.fromTo(q(c, ".cst"), { opacity: 0, scale: 2.2, rotation: -14 }, { opacity: 1, scale: 1, rotation: -4, duration: 0.35, ease: "power4.out" }, o.stampAt); N.sfx("stamp", o.stampAt + 0.05, -4); }
    N.hideBrand(tl, o.t0 - 0.2);
    const ph = q(c, ".ph");
    tl.fromTo(ph, { opacity: 0, y: 300, rotation: 6, scale: 0.85 }, { opacity: 1, y: 0, rotation: 0, scale: 0.92, duration: 0.7, ease: "back.out(1.2)" }, o.t0);
    tl.fromTo(ph, { y: 0 }, { y: -18, duration: Math.max(0.6, o.t1 - o.t0 - 0.7), ease: "sine.inOut", immediateRender: false }, o.t0 + 0.7);
    N.sfx("whoosh", o.t0 - 0.2, -6);
    tl.fromTo(q(c, ".b0"), { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: E.pop }, o.t0 + 0.5);
    N.sfx("pop", o.t0 + 0.5, -8);
    qa(c, ".bs").forEach((b, i) => {
      tl.fromTo(b, { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: E.pop }, steps[i].t);
      N.sfx("pop", steps[i].t, -10);
    });
    const wp = q(c, ".wp");
    tl.fromTo(wp, { opacity: 0, scale: 0.6, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: E.pop }, o.buttonAt);
    N.sfx("chime", o.buttonAt + 0.2, -8);
    tl.fromTo(q(wp, ".sheen"), { x: -200 }, { x: 900, duration: 0.9, ease: E.move }, o.buttonAt + 0.4);
    for (let k = 0; k < 3; k++) tl.fromTo(wp, { scale: 1 }, { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, o.buttonAt + 1.0 + k * 0.8);
    return s;
  };
  /* "É golpe?" — pergunta grande com ponto de interrogação desenhado (objeção do A3) */
  N.golpe = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center">${o.pre ? `<div class="h2 pre" style="font-size:58px">${o.pre}</div>` : ""}
      <div style="display:flex;align-items:center;justify-content:center;margin-top:50px"><div class="h1 big" style="font-size:190px;width:auto" data-accent="golpe">${o.word || "É golpe"}</div>
      <svg viewBox="0 0 60 100" style="width:120px;height:200px;margin-left:6px"><path class="qm" d="M10 30 C10 5, 50 5, 50 30 C50 50, 30 50, 30 68" fill="none" stroke="#ff3b4e" stroke-width="11" stroke-linecap="round"/><circle class="qd" cx="30" cy="88" r="7" fill="#ff3b4e"/></svg></div>
      ${o.sub ? `<div class="h2 sub" style="margin-top:60px">${o.sub}</div>` : ""}</div>`, s);
    if (o.pre) words(tl, q(c, ".pre"), o.preTimes);
    words(tl, q(c, ".big"), o.wordTimes);
    const qm = q(c, ".qm"); qm.style.strokeDasharray = 140;
    tl.fromTo(qm, { strokeDashoffset: 140 }, { strokeDashoffset: 0, duration: 0.4, ease: E.move }, o.qAt);
    tl.fromTo(q(c, ".qd"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.25, ease: E.pop, transformOrigin: "50% 50%" }, o.qAt + 0.35);
    N.sfx("impact", o.qAt, -6);
    if (o.sub) words(tl, q(c, ".sub"), o.subTimes);
    return s;
  };

  /* economia: R$ 903 no seu bolso (contador verde) */
  N.saving = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="lbl">${o.calc || "R$ 1.200 − R$ 297"}</div>
      <div class="anch-val" style="color:var(--green);font-size:200px;margin-top:30px"><span class="v">R$ 0</span></div>
      <div class="h2 lb" style="margin-top:30px" data-accent="bolso.">${o.label || "que ficam no seu bolso."}</div></div>`, s);
    tl.fromTo(q(c, ".lbl"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: E.enter }, o.t0 + 0.1);
    const v = q(c, ".v"), px = { v: 0 };
    tl.fromTo(px, { v: 0 }, { v: o.val || 903, duration: 1.0, ease: "power2.out", onUpdate: () => (v.textContent = "R$ " + Math.round(px.v)) }, o.valAt);
    N.sfx("chime", o.valAt + 0.9, -6);
    words(tl, q(c, ".lb"), o.labelTimes);
    return s;
  };

  /* densidade de SFX (regra premium-motion-director: ≤ 6 cues por 10 s, cada um com motivo).
   * Mantém os acentos narrativos (impacto, carimbo, risco, chime) e corta ticks/pops repetidos. */
  N.thinCues = function (max = 6, win = 10) {
    const prio = { impact: 0, stamp: 0, strike: 1, chime: 1, whoosh: 2, pop: 3, tick: 4, click: 4, typing: 4, riser: 2 };
    const all = window.__nexoCues, bed = all.filter((c) => c.name === "bed");
    let fx = all.filter((c) => c.name !== "bed").sort((a, b) => a.t - b.t);
    fx = fx.filter((c, i) => !fx.slice(0, i).some((d) => Math.abs(d.t - c.t) < 0.35)); // nada empilhado
    const keep = [];
    for (let w = 0; w * win < 600; w++) {
      const inW = fx.filter((c) => c.t >= w * win && c.t < (w + 1) * win);
      if (!inW.length) { if (w * win > (fx.at(-1) || { t: 0 }).t) break; continue; }
      inW.sort((a, b) => (prio[a.name] ?? 5) - (prio[b.name] ?? 5) || a.t - b.t);
      keep.push(...inW.slice(0, max));
    }
    window.__nexoCues = bed.concat(keep.sort((a, b) => a.t - b.t));
  };
})();
