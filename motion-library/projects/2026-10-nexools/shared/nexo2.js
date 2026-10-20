/* Nexools — cenas do lote 2 (ElevenLabs, n8n). Depende de nexo.js (window.N). */
(function () {
  const N = window.N, E = N.E, el = N.el, q = N.q, qa = N.qa, words = N.words, scene = N.scene;
  const FPS = 30;
  const env = (t) => { const E2 = window.VO_ENV || []; const i = Math.round(t * FPS); return i >= 0 && i < E2.length ? E2[i] : 0; };
  const IC = {
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="#0b162a" stroke-width="2.2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="#0b162a" stroke-width="2.2" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9H3z"/><path d="M9 20v-6h6v6"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="#005afc" stroke-width="2.2" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="M16 10l5-3v10l-5-3z"/></svg>',
    mega: '<svg viewBox="0 0 24 24" fill="none" stroke="#005afc" stroke-width="2.2" stroke-linejoin="round"><path d="M3 10v4h4l8 5V5L7 10z"/><path d="M18 9a4 4 0 0 1 0 6"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="#005afc" stroke-width="2.2" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M9 12h6M9 16h6"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
    sheet: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M4 10h16M4 15h16M10 4v16"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-6.5 8-6.5s7 2 8 6.5"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"><path d="M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 0 0-4V4H3z"/><path d="M14 4v16" stroke-dasharray="2 2"/></svg>',
  };
  Object.assign(N.ICON, IC);

  /* barras que reagem à locução real (envelope do áudio) */
  function waveBars(tl, host, t0, t1, o = {}) {
    const n = o.bars || 40, h = o.h || 260, w = o.w || 900, gap = o.gap || 8;
    const bw = (w - gap * (n - 1)) / n;
    const box = el(`<div style="position:relative;width:${w}px;height:${h}px;display:flex;align-items:center;gap:${gap}px">${Array.from({ length: n }, () => `<i style="display:block;width:${bw}px;height:${h}px;border-radius:${bw / 2}px;background:${o.color || "linear-gradient(180deg,#4d8dff,#005afc)"};transform-origin:50% 50%"></i>`).join("")}</div>`, host);
    const bars = qa(box, "i"), px = { t: t0 };
    const draw = () => {
      const t = px.t;
      bars.forEach((b, i) => {
        const k = Math.abs(i - (n - 1) / 2) / ((n - 1) / 2);           // centro mais alto
        const lag = Math.round(Math.abs(i - (n - 1) / 2) * 0.6);         // ondula para fora
        const v = env(t - lag / FPS) * (1 - 0.55 * k * k);
        const idle = 0.06 + 0.03 * Math.sin(t * 6 + i * 0.7);
        b.style.transform = `scaleY(${Math.max(idle, v).toFixed(3)})`;
      });
    };
    draw();
    tl.fromTo(px, { t: t0 }, { t: t1, duration: t1 - t0, ease: "none", onUpdate: draw }, t0);
    return box;
  }
  N.waveBars = waveBars;

  /* ELV: "a voz que você está ouvindo" */
  N.voiceHero = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="h1" data-accent="ouvindo|agora?">${o.head}</div><div class="wv" style="margin-top:70px"></div>
      <div class="h2 sub2" style="margin-top:60px">${o.sub}</div>
      <div class="prodrow brand2" style="margin-top:40px"><span class="floaty" style="position:relative;width:130px;height:130px">${N.logo("elevenlabs", 70)}</span><span style="font-size:72px;font-weight:700;letter-spacing:-0.03em">ElevenLabs</span></div></div>`, s);
    words(tl, c.children[0], o.headTimes, { from: 0.3 });
    const wv = waveBars(tl, q(c, ".wv"), o.t0, o.t1, { bars: 36, h: 300 });
    tl.fromTo(q(c, ".wv"), { opacity: 0, scaleY: 0.2 }, { opacity: 1, scaleY: 1, duration: 0.5, ease: E.enter }, o.t0 + 0.2);
    words(tl, q(c, ".sub2"), o.subTimes);
    tl.fromTo(q(c, ".brand2"), { opacity: 0, scale: 0.6, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: E.pop }, o.brandAt - 0.1);
    N.sfx("impact", o.brandAt - 0.1, -8);
    return s;
  };

  /* ELV: "vídeos e anúncios como este" — celular mostrando este anúncio */
  N.thisAd = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="h1" data-accent="como|este,">${o.head}</div>
      <div class="phone" style="margin-top:60px;width:440px;height:780px;border-radius:70px;background:#0b162a;padding:22px;box-shadow:0 60px 120px rgba(11,22,42,.3);position:relative">
        <div style="width:100%;height:100%;border-radius:52px;background:linear-gradient(180deg,#eef4ff,#fff);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;overflow:hidden">
          <img src="assets/nexools-wordmark.png" style="height:44px"><div class="mini"></div><div style="padding:16px 40px;border-radius:999px;background:#005afc;color:#fff;font-size:30px;font-weight:700">Saiba Mais</div></div>
        <div class="tag" style="position:absolute;right:-250px;top:120px;padding:18px 30px;border-radius:999px;background:#fff;box-shadow:var(--shadow);font-size:36px;font-weight:700;white-space:nowrap">este anúncio ←</div>
      </div>
      <div class="chip mic" style="margin-top:-60px;position:relative">${IC.mic}<span>${o.chip}</span><div class="strike"></div></div></div>`, s);
    words(tl, c.children[0], o.headTimes);
    const ph = q(c, ".phone");
    tl.fromTo(ph, { opacity: 0, y: 160, rotation: -6, scale: 0.85 }, { opacity: 1, y: 0, rotation: -2, scale: 1, duration: 0.7, ease: E.enter }, o.phoneAt - 0.15);
    N.sfx("whoosh", o.phoneAt - 0.35, -8);
    waveBars(tl, q(c, ".mini"), o.t0, o.t1, { bars: 18, h: 120, w: 300, gap: 6 });
    tl.fromTo(q(c, ".tag"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.4, ease: E.pop }, o.tagAt);
    N.sfx("pop", o.tagAt, -8);
    const mic = q(c, ".mic");
    tl.fromTo(mic, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.45, ease: E.pop }, o.micAt - 0.3);
    tl.fromTo(q(mic, ".strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: E.move }, o.micAt + 0.3);
    N.sfx("strike", o.micAt + 0.3, -6);
    return s;
  };

  /* ELV: editor roteiro -> voz */
  N.ttsEditor = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="lic" style="width:940px;padding:50px">
      <div class="lic-top"><div class="lic-title">${N.logo("elevenlabs", 54)}ElevenLabs</div><div class="badge">${o.badge || "Creator"}</div></div>
      <div class="fieldlbl">Roteiro</div>
      <div class="field" style="height:auto;min-height:190px;align-items:flex-start;font-size:40px;line-height:1.35"><span class="typed"></span><span class="caret"></span></div>
      <div class="fieldlbl">Voz</div>
      <div class="vch" style="display:flex;gap:16px;margin-top:14px">${o.voices.map((v) => `<div class="vc" style="padding:18px 30px;border-radius:999px;border:3px solid #d9e2f2;font-size:34px;font-weight:700">${v.name}</div>`).join("")}</div>
      ${o.langs ? `<div class="lng" style="display:flex;gap:14px;margin-top:22px">${o.langs.map((l) => `<div style="padding:12px 24px;border-radius:16px;background:#eef3fb;font-size:30px;font-weight:700">${l.l}</div>`).join("")}</div>` : ""}
      ${o.adjustAt != null ? `<div class="sl" style="margin-top:26px">${["Emoção", "Estabilidade"].map((n) => `<div style="display:flex;align-items:center;gap:20px;margin-top:14px;font-family:var(--f-ui);font-size:30px;color:#5b6b85"><span style="width:200px">${n}</span><div style="flex:1;height:12px;border-radius:6px;background:#e3e9f4;position:relative"><div class="knob" style="position:absolute;left:0;top:-14px;width:40px;height:40px;border-radius:50%;background:#005afc;box-shadow:0 6px 16px rgba(0,90,252,.4)"></div></div></div>`).join("")}</div>` : ""}
      <div class="btn" data-layout-allow-overlap><span class="lab">Gerar voz</span><div class="ok" style="background:#0b162a">${N.ICON.play.replace('#005afc', '#fff')}<span>Ouvindo…</span></div></div>
      <div class="ow" style="margin-top:30px;height:140px"></div></div></div>`, s);
    const lic = q(c, ".lic");
    tl.fromTo(lic, { opacity: 0, y: 120, rotationX: 18 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.7, ease: E.enter, transformPerspective: 1800 }, o.t0);
    const typed = q(c, ".typed"), txt = o.script;
    const step = Math.min(0.045, (o.typeDur || 1.4) / txt.length);
    for (let i = 0; i <= txt.length; i++) tl.set(typed, { textContent: txt.slice(0, i) }, o.typeAt + i * step);
    N.sfx("typing", o.typeAt, -10);
    const vcs = qa(c, ".vc");
    o.voices.forEach((v, i) => {
      tl.fromTo(vcs[i], { background: "#ffffff", color: "#0b162a", borderColor: "#d9e2f2" }, { background: "#005afc", color: "#ffffff", borderColor: "#005afc", duration: 0.2 }, v.t);
      if (i > 0) tl.to(vcs[i - 1], { background: "#ffffff", color: "#0b162a", borderColor: "#d9e2f2", duration: 0.2 }, v.t);
      N.sfx("click", v.t, -8);
    });
    if (o.langs) qa(c, ".lng div").forEach((d, i) => { tl.fromTo(d, { background: "#eef3fb", color: "#0b162a" }, { background: "#0b162a", color: "#ffffff", duration: 0.2 }, o.langs[i].t); N.sfx("tick", o.langs[i].t, -8); });
    if (o.adjustAt != null) qa(c, ".knob").forEach((k, i) => { tl.fromTo(k, { x: 60 }, { x: i ? 360 : 520, duration: 0.9, ease: E.move }, o.adjustAt + i * 0.25); });
    const btn = q(c, ".btn");
    tl.fromTo(btn, { scale: 1 }, { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, o.genAt);
    tl.fromTo(q(btn, ".ok"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, o.genAt + 0.1);
    tl.fromTo(q(btn, ".lab"), { opacity: 1 }, { opacity: 0, duration: 0.15, immediateRender: false }, o.genAt + 0.1);
    N.sfx("click", o.genAt, -2);
    waveBars(tl, q(c, ".ow"), o.genAt, o.t1, { bars: 44, h: 140, w: 840, gap: 6 });
    tl.fromTo(q(c, ".ow"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, o.genAt + 0.15);
    N.sfx("riser", o.genAt - 0.6, -14);
    return s;
  };

  /* ELV-B: linha do tempo de edição com a narração ruim */
  N.editTimeline = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const clip = (w, col, lbl) => `<div style="width:${w}px;height:100%;border-radius:16px;background:${col};color:#fff;font-size:24px;font-weight:700;padding:12px 16px;overflow:hidden">${lbl}</div>`;
    const c = el(`<div class="center"><div class="h1" data-accent="não|boa?">${o.head}</div>
      <div class="ed" style="margin-top:70px;width:960px;padding:40px;border-radius:44px;background:#0b162a;box-shadow:0 60px 120px rgba(11,22,42,.3);text-align:left;position:relative">
        <div style="height:300px;border-radius:24px;background:linear-gradient(135deg,#1d3a6e,#005afc);position:relative;overflow:hidden"><div class="play" style="background:rgba(255,255,255,.95)">${N.ICON.play}</div></div>
        <div style="display:flex;gap:10px;height:90px;margin-top:30px">${clip(240, "#4d8dff", "Cena 1")}${clip(300, "#7c5cff", "Cena 2")}${clip(320, "#4d8dff", "Cena 3")}</div>
        <div class="vo" style="position:relative;display:flex;align-items:center;gap:14px;height:90px;margin-top:14px;border-radius:16px;background:rgba(255,255,255,.08);padding:0 20px;color:#fff;font-size:26px;font-weight:700">🎙 Narração<div class="vw" style="flex:1"></div><div class="bad" style="position:absolute;inset:0;border-radius:16px;border:5px solid #ff3b4e;background:rgba(255,59,78,.18)"></div></div>
        <div class="ph" style="position:absolute;top:340px;bottom:30px;left:40px;width:5px;background:#fff;border-radius:3px"></div>
        <div class="badx" style="position:absolute;right:30px;bottom:-40px;padding:20px 32px;border-radius:999px;background:#ff3b4e;color:#fff;font-size:36px;font-weight:700">Não ficou boa</div>
      </div></div>`, s);
    words(tl, c.children[0], o.headTimes, { from: 0.3 });
    tl.fromTo(q(c, ".ed"), { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 0.7, ease: E.enter }, o.t0 + 0.2);
    waveBars(tl, q(c, ".vw"), o.t0, o.t1, { bars: 34, h: 60, w: 560, gap: 5, color: "rgba(255,255,255,.7)" });
    tl.fromTo(q(c, ".ph"), { x: 0 }, { x: 860, duration: o.t1 - o.t0, ease: "none" }, o.t0);
    tl.fromTo([q(c, ".bad"), q(c, ".badx")], { opacity: 0 }, { opacity: 1, duration: 0.25 }, o.badAt);
    tl.fromTo(q(c, ".badx"), { scale: 0.6 }, { scale: 1, duration: 0.4, ease: E.pop }, o.badAt);
    N.sfx("strike", o.badAt, -4);
    return s;
  };

  /* ELV-B: versões de voz geradas */
  N.versions = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="prodrow" style="margin-bottom:40px"><span class="floaty" style="position:relative;width:120px;height:120px">${N.logo("elevenlabs", 64)}</span><span style="font-size:68px;font-weight:700;letter-spacing:-.03em">ElevenLabs</span></div>
      <div class="vl" style="display:flex;flex-direction:column;gap:26px;width:900px"></div><div class="h2 foot2" style="margin-top:50px">${o.foot}</div></div>`, s);
    tl.fromTo(c.children[0], { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.5, ease: E.pop }, o.brandAt - 0.1);
    o.items.forEach((it, i) => {
      const r = el(`<div style="display:flex;align-items:center;gap:26px;padding:28px 34px;border-radius:36px;background:#fff;box-shadow:var(--shadow)">
        <div style="width:84px;height:84px;border-radius:50%;background:#005afc;display:flex;align-items:center;justify-content:center">${N.ICON.play.replace('#005afc', '#fff')}</div>
        <div style="text-align:left;width:300px"><div style="font-size:40px;font-weight:700">Versão ${i + 1}</div><div style="font-family:var(--f-ui);font-size:28px;color:#5b6b85">${it.label}</div></div><div class="w${i}" style="flex:1"></div>
        <div class="ok${i}" style="width:60px;height:60px;border-radius:50%;background:#0b8a4c;display:flex;align-items:center;justify-content:center">${N.ICON.check}</div></div>`, q(c, ".vl"));
      tl.fromTo(r, { opacity: 0, x: 140 }, { opacity: 1, x: 0, duration: 0.5, ease: E.enter }, it.t - 0.1);
      N.sfx("pop", it.t - 0.1, -8);
      waveBars(tl, q(r, `.w${i}`), it.t, o.t1, { bars: 16, h: 70, w: 260, gap: 5 });
      tl.fromTo(q(r, `.ok${i}`), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, ease: E.pop }, it.t + 0.5);
    });
    words(tl, q(c, ".foot2"), o.footTimes);
    return s;
  };

  /* ELV-C: casos de uso */
  N.useCases = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="prodrow"><span class="floaty" style="position:relative;width:140px;height:140px">${N.logo("elevenlabs", 76)}</span><span style="font-size:76px;font-weight:700;letter-spacing:-.035em">${o.title}</span></div>
      <div class="lbl" style="margin-top:20px">${o.sub}</div><div class="uc" style="display:flex;gap:24px;margin-top:60px"></div><div class="wv2" style="margin-top:60px"></div></div>`, s);
    tl.fromTo(c.children[0], { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.55, ease: E.pop }, o.titleAt - 0.1);
    N.sfx("impact", o.titleAt - 0.1, -10);
    words(tl, c.children[1], [o.titleAt + 0.4]);
    o.items.forEach((it) => {
      const d = el(`<div style="width:290px;height:290px;border-radius:48px;background:#fff;box-shadow:var(--shadow);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px"><div style="width:110px;height:110px;border-radius:32px;background:#e6efff;display:flex;align-items:center;justify-content:center"><span style="width:64px;height:64px;display:block">${IC[it.icon]}</span></div><div style="font-size:44px;font-weight:700">${it.label}</div></div>`, q(c, ".uc"));
      tl.fromTo(d, { opacity: 0, y: 80, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: E.pop }, it.t - 0.12);
      N.sfx("pop", it.t - 0.12, -8);
    });
    waveBars(tl, q(c, ".wv2"), o.t0, o.t1, { bars: 40, h: 160, w: 900, gap: 7 });
    return s;
  };

  /* n8n: preço oficial x Nexools */
  N.compare = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="h1 top1" style="font-size:80px">${o.head}</div>
      <div class="oldbox" style="position:relative;margin-top:40px;display:inline-block"><span style="font-size:190px;font-weight:700;letter-spacing:-.05em;color:#0b162a;font-variant-numeric:tabular-nums">${o.old}</span><div class="strike" style="height:14px;left:-20px;right:-20px"></div></div>
      <div class="lbl acct oldl" style="justify-content:center;margin-top:10px">${o.logo ? N.logo(o.logo, 46) : ""}${o.oldLabel}</div>
      <div class="price np" style="margin-top:70px"><div class="rays"></div><div class="glow"></div><span class="cur">R$</span><span class="val" style="font-size:230px">${o.price}</span></div>
      <div class="stamp st2" style="position:relative;margin-top:44px;transform:rotate(-6deg)">${o.stamp}</div></div>`, s);
    words(tl, c.children[0], o.headTimes, { from: 0.3 });
    tl.fromTo(q(c, ".oldbox"), { opacity: 1, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: E.enter }, o.t0);
    tl.fromTo(q(c, ".oldl"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, o.labelAt);
    tl.fromTo(q(c, ".oldbox .strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: E.move }, o.strikeAt);
    N.sfx("strike", o.strikeAt, -4);
    tl.to([q(c, ".oldbox"), q(c, ".oldl")], { opacity: 0.4, scale: 0.8, duration: 0.4, ease: E.move }, o.strikeAt + 0.3);
    const np = q(c, ".np");
    tl.fromTo(np, { opacity: 0, scale: 0.5, filter: "blur(20px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.4)" }, o.priceAt - 0.1);
    tl.fromTo(q(np, ".rays"), { rotation: 0, opacity: 0 }, { rotation: 30, opacity: 1, duration: 3 }, o.priceAt - 0.1);
    N.sfx("impact", o.priceAt - 0.1, -2);
    const st = q(c, ".st2");
    tl.fromTo(st, { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, o.stampAt);
    N.sfx("stamp", o.stampAt, -2);
    return s;
  };

  /* n8n: cupom aplicado na conta do cliente */
  N.coupon = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center">
      <div class="tk" style="position:relative;width:820px;height:250px;border-radius:40px;background:${o.grad || "linear-gradient(135deg,#ea4b71,#ff7a59)"};color:#fff;display:flex;align-items:center;gap:34px;padding:0 50px;box-shadow:0 40px 90px ${o.shadow || "rgba(234,75,113,.35)"};text-align:left">
        <div style="width:120px;height:120px;border-radius:34px;background:#fff;display:flex;align-items:center;justify-content:center">${N.logo(o.logo || "n8n", 76)}</div>
        <div><div style="font-family:var(--f-ui);font-size:30px;opacity:.9">Cupom oficial</div><div style="font-size:60px;font-weight:700;letter-spacing:-.02em">${o.ticket || "n8n Starter · 12 meses"}</div></div>
        <div style="position:absolute;left:-26px;top:98px;width:52px;height:52px;border-radius:50%;background:#f4f7fd"></div><div style="position:absolute;right:-26px;top:98px;width:52px;height:52px;border-radius:50%;background:#f4f7fd"></div></div>
      <div class="acc lic" style="margin-top:60px;width:900px">
        <div class="lic-top"><div class="lic-title">${N.logo(o.logo || "n8n", 54)}${o.account || "Sua conta n8n"}</div><div class="badge">${o.badge || "Plano"}</div></div>
        <div class="fieldlbl">Código do cupom</div><div class="field"><span class="code" style="letter-spacing:.2em"></span><span class="caret"></span></div>
        <div class="btn" data-layout-allow-overlap><span class="lab">Aplicar cupom</span><div class="ok">${N.ICON.check}<span>${o.okText || "Starter liberado · 12 meses"}</span></div></div>
        <div class="owner nomens" style="right:-20px">${o.noFee || "Sem mensalidade"}</div></div></div>`, s);
    const tk = q(c, ".tk");
    tl.fromTo(tk, { opacity: 0, y: -160, rotation: -10, scale: 0.8 }, { opacity: 1, y: 0, rotation: -3, scale: 1, duration: 0.7, ease: "back.out(1.5)" }, o.receiveAt - 0.15);
    N.sfx("whoosh", o.receiveAt - 0.35, -6);
    const acc = q(c, ".acc");
    tl.fromTo(acc, { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 0.6, ease: E.enter }, o.receiveAt + 0.6);
    // cupom "entra" no campo
    tl.to(tk, { y: 230, scale: 0.5, opacity: 0, duration: 0.5, ease: E.exit }, o.applyAt - 0.1);
    const code = q(c, ".code"), txt = o.code || "••••-NEXO-••••";
    for (let i = 0; i <= txt.length; i++) tl.set(code, { textContent: txt.slice(0, i) }, o.applyAt + 0.3 + i * 0.03);
    N.sfx("typing", o.applyAt + 0.3, -10);
    const btn = q(c, ".btn");
    tl.fromTo(btn, { scale: 1 }, { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, o.okAt - 0.15);
    tl.fromTo(q(btn, ".ok"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, o.okAt);
    tl.fromTo(q(btn, ".lab"), { opacity: 1 }, { opacity: 0, duration: 0.15, immediateRender: false }, o.okAt);
    N.sfx("click", o.okAt - 0.15, -2); N.sfx("chime", o.okAt, -6);
    const nm = q(c, ".nomens");
    if (o.noFeeAt == null) { nm.style.display = "none"; return s; }
    tl.fromTo(nm, { opacity: 0, scale: 0.6, rotation: -6 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: E.pop }, o.noFeeAt);
    N.sfx("pop", o.noFeeAt, -6);
    return s;
  };

  /* n8n: fluxo de automação com nós conectando */
  N.flow = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center" style="justify-content:flex-start;padding-top:360px"><div class="h1" style="font-size:78px" data-accent="automações,">${o.head}</div></div>`, s);
    words(tl, c.children[0], o.headTimes, { from: 0.3 });
    const pos = [[150, 760], [600, 760], [600, 1120], [150, 1120]];
    const svg = el(`<svg viewBox="0 0 1080 1920" style="position:absolute;inset:0;width:1080px;height:1920px">${pos.slice(1).map((p, i) => {
      const a = pos[i]; return `<path class="ln" d="M${a[0] + 165} ${a[1] + 110} L${p[0] + 165} ${p[1] + 110}" stroke="#005afc" stroke-width="8" stroke-linecap="round" fill="none" stroke-dasharray="600" stroke-dashoffset="600"/>`;
    }).join("")}</svg>`, s);
    const lines = qa(svg, ".ln");
    o.nodes.forEach((n, i) => {
      const [x, y] = pos[i];
      const nd = el(`<div style="position:absolute;left:${x}px;top:${y}px;width:330px;height:220px;border-radius:40px;background:#fff;box-shadow:var(--shadow);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px">
        <div style="width:96px;height:96px;border-radius:30px;background:${n.color};display:flex;align-items:center;justify-content:center"><span style="width:56px;height:56px;display:block">${n.logo ? N.logo(n.logo, 56, { color: "#fff" }) : IC[n.icon]}</span></div>
        <div style="font-size:36px;font-weight:700">${n.label}</div></div>`, s);
      tl.fromTo(nd, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: E.pop }, n.t - 0.12);
      N.sfx("pop", n.t - 0.12, -8);
      if (i > 0) {
        tl.fromTo(lines[i - 1], { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 0.4, ease: E.move }, n.t - 0.35);
        // pulso de dados percorrendo a ligação
        const a = pos[i - 1], b = pos[i];
        const dot = el(`<div style="position:absolute;left:${a[0] + 165 - 16}px;top:${a[1] + 110 - 16}px;width:32px;height:32px;border-radius:50%;opacity:0;background:#ea4b71;box-shadow:0 0 0 10px rgba(234,75,113,.2)"></div>`, s);
        for (let k = 0; k < 3; k++) tl.fromTo(dot, { x: 0, y: 0, opacity: 1 }, { x: b[0] - a[0], y: b[1] - a[1], opacity: 1, duration: 0.7, ease: "power1.inOut", immediateRender: false }, n.t + 0.1 + k * 0.9);
      }
    });
    return s;
  };
})();
