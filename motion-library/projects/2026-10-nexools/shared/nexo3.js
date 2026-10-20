/* Nexools — cenas do lote 3 (n8n B/C, Manus). Depende de nexo.js e nexo2.js. */
(function () {
  const N = window.N, E = N.E, el = N.el, q = N.q, qa = N.qa, words = N.words, scene = N.scene;
  const S = (d, c = "#0b162a") => `<svg viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  Object.assign(N.ICON, {
    money: S('<rect x="3" y="6" width="18" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6.5 9.5v5M17.5 9.5v5"/>'),
    gear: S('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'),
    search: S('<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/>', "#fff"),
    compare: S('<path d="M4 7h13l-3-3M20 17H7l3 3"/>', "#fff"),
    report: S('<path d="M6 3h8l4 4v14H6z"/><path d="M9 12h6M9 16h6"/>', "#fff"),
    slides: S('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/>', "#fff"),
    layers: S('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>', "#fff"),
    eye: S('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', "#fff"),
    inbox: S('<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1.5 2.5h5L16 13h5"/>', "#fff"),
    chat: S('<path d="M4 5h16v11H9l-5 4z"/>'),
    loop: S('<path d="M4 12a8 8 0 0 1 13.7-5.6L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15"/><path d="M4 20v-5h5"/>', "#005afc"),
  });
  const I = N.ICON;
  const tile = (icon, color, sz = 96) => `<div style="flex:none;width:${sz}px;height:${sz}px;border-radius:${sz * 0.31}px;background:${color};display:flex;align-items:center;justify-content:center"><span style="width:${sz * 0.58}px;height:${sz * 0.58}px;display:block">${I[icon]}</span></div>`;
  const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>`;

  /* selo riscado avulso (ex.: "Tarefa repetitiva") */
  N.strikeChip = function (tl, parent, o) {
    const row = el(`<div style="position:absolute;left:0;right:0;top:${o.y}px;display:flex;justify-content:center"><div class="chip">${I[o.icon || "loop"]}<span>${o.text}</span><div class="strike"></div></div></div>`, parent);
    const ch = row.firstElementChild;
    tl.fromTo(ch, { opacity: 0, y: 40, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: E.pop }, o.t - 0.1);
    N.sfx("pop", o.t - 0.1, -8);
    tl.fromTo(q(ch, ".strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: E.move }, o.strikeAt);
    tl.fromTo(ch, { opacity: 1 }, { opacity: 0.5, duration: 0.35, immediateRender: false }, o.strikeAt + 0.3);
    N.sfx("strike", o.strikeAt, -6);
    return ch;
  };

  /* n8n: rotina manual que se repete todo dia */
  N.manualLoop = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const nDays = 1 + o.days.length;
    const c = el(`<div class="center">
      <div class="daypill" style="display:flex;align-items:center;gap:22px;padding:22px 40px;border-radius:999px;background:#fff;box-shadow:var(--shadow)">
        <span class="lp" style="width:58px;height:58px;display:block">${I.loop}</span>
        <div style="height:72px;overflow:hidden"><div class="dcol" data-layout-allow-occlusion>${Array.from({ length: nDays }, (_, i) => `<div data-layout-allow-occlusion style="height:72px;line-height:72px;font-size:56px;font-weight:700;letter-spacing:-.02em">Dia ${i + 1}</div>`).join("")}</div></div></div>
      <div class="rows" style="display:flex;flex-direction:column;gap:30px;margin-top:70px"></div>
      <div class="h2 lfoot" style="margin-top:80px" data-accent="mesmo">${o.foot || ""}</div></div>`, s);
    tl.fromTo(q(c, ".daypill"), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.5, ease: E.enter }, o.t0);
    const rows = o.items.map((it) => {
      const r = el(`<div style="width:900px;display:flex;align-items:center;gap:34px;padding:30px 40px;border-radius:44px;background:#fff;box-shadow:var(--shadow);text-align:left">
        ${tile(it.icon, it.color)}<div style="flex:1;font-size:54px;font-weight:700;letter-spacing:-.025em">${it.label}</div>
        <div class="ck" style="width:76px;height:76px;border-radius:50%;background:#0b8a4c;display:flex;align-items:center;justify-content:center"><span style="width:46px;height:46px;display:block">${CHECK}</span></div></div>`, q(c, ".rows"));
      tl.fromTo(r, { opacity: 0, x: -140 }, { opacity: 1, x: 0, duration: 0.5, ease: E.enter }, it.t - 0.1);
      N.sfx("pop", it.t - 0.1, -9);
      const ck = q(r, ".ck");
      tl.fromTo(ck, { scale: 0 }, { scale: 1, duration: 0.35, ease: E.pop }, it.t + 0.55);
      N.sfx("click", it.t + 0.55, -10);
      return ck;
    });
    // repete: dia seguinte, tudo de novo
    o.days.forEach((d, k) => {
      tl.fromTo(q(c, ".dcol"), { y: -72 * k }, { y: -72 * (k + 1), duration: 0.45, ease: E.snap, immediateRender: false }, d);
      tl.fromTo(q(c, ".lp"), { rotation: 0 }, { rotation: 360, duration: 0.6, ease: E.move, immediateRender: false }, d);
      N.sfx("whoosh", d - 0.15, -12);
      rows.forEach((ck, i) => {
        tl.fromTo(ck, { scale: 1 }, { scale: 0, duration: 0.15, ease: E.exit, immediateRender: false }, d);
        tl.fromTo(ck, { scale: 0 }, { scale: 1, duration: 0.3, ease: E.pop, immediateRender: false }, d + 0.35 + i * 0.22);
        N.sfx("click", d + 0.35 + i * 0.22, -13);
      });
    });
    if (o.foot) words(tl, q(c, ".lfoot"), o.footTimes);
    return s;
  };

  /* pergunta simples num chat genérico de IA */
  N.chatAsk = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="h1" style="margin-bottom:70px;font-size:84px" data-accent="resposta">${o.kicker}</div>
      <div style="display:flex;flex-direction:column;width:900px"><div class="bubble">${o.q}</div><div class="answer acct" style="display:flex;align-items:center;gap:20px"><span style="width:48px;height:48px;display:block;flex:none">${I.spark}</span><span>${o.a}</span></div></div>
      <div class="chatbar" style="margin-top:50px"><span style="width:48px;height:48px;display:block">${I.chat}</span><span style="color:#6b7890">Pergunte à IA…</span></div></div>`, s);
    words(tl, c.children[0], o.kickTimes, { from: 0.3 });
    tl.fromTo(q(c, ".chatbar"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: E.enter }, o.t0 + 0.1);
    tl.fromTo(q(c, ".bubble"), { opacity: 0, scale: 0.6, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: E.pop, transformOrigin: "100% 100%" }, o.qAt);
    N.sfx("pop", o.qAt, -8);
    tl.fromTo(q(c, ".answer"), { opacity: 0, scale: 0.6, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: E.pop, transformOrigin: "0% 100%" }, o.aAt);
    N.sfx("pop", o.aAt, -10);
    return s;
  };

  /* agente executando etapas (pendente → rodando → feito) */
  N.agentTask = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1, { breath: 1.03 });
    const c = el(`<div class="center">
      ${o.chat ? `<div class="chip chatchip" style="margin-bottom:40px;font-size:50px;padding:26px 46px">${I.chat}<span>${o.chat.text}</span><div class="strike"></div></div>` : ""}
      ${o.kicker ? `<div class="h2 kick" style="margin-bottom:50px" data-accent="${o.accent || ""}">${o.kicker}</div>` : ""}
      <div class="lic panel" style="width:920px;padding:46px 50px">
        <div class="lic-top"><div class="lic-title">${N.logo("manus", 64)}${o.title || "Manus"}</div><div class="badge">${o.badge || "Tarefa"}</div></div>
        <div class="steps" style="display:flex;flex-direction:column;gap:22px;margin-top:40px"></div>
        <div style="margin-top:40px;height:16px;border-radius:8px;background:#e6ecf5;overflow:hidden"><div class="bar" style="height:100%;width:100%;border-radius:8px;background:linear-gradient(90deg,#4d8dff,#005afc);transform-origin:0 50%"></div></div></div></div>`, s);
    tl.fromTo(q(c, ".panel"), { opacity: 0, y: 120, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: E.enter }, o.panelAt != null ? o.panelAt : o.t0 + 0.05);
    if (o.chat) {
      const ch = q(c, ".chatchip");
      tl.fromTo(ch, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.45, ease: E.pop }, o.chat.at);
      tl.fromTo(q(ch, ".strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: E.move }, o.chat.strikeAt);
      tl.fromTo(ch, { opacity: 1 }, { opacity: 0.45, duration: 0.3, immediateRender: false }, o.chat.strikeAt + 0.3);
      N.sfx("strike", o.chat.strikeAt, -6);
    }
    if (o.kicker) words(tl, q(c, ".kick"), o.kickTimes, { from: 0.25 });
    const bar = q(c, ".bar");
    tl.set(bar, { scaleX: 0.02 }, o.t0);
    const n = o.steps.length;
    o.steps.forEach((st, i) => {
      const r = el(`<div style="display:flex;align-items:center;gap:28px;padding:22px 26px;border-radius:30px;background:#f4f7fd">
        ${tile(st.icon || ["search", "layers", "report", "eye"][i % 4], st.color || "#005afc", 84)}
        <div style="flex:1;font-size:48px;font-weight:700;letter-spacing:-.025em">${st.label}</div>
        <div style="position:relative;width:64px;height:64px">
          <div class="spin" style="position:absolute;inset:0;border-radius:50%;border:7px solid #cfdcf5;border-top-color:#005afc"></div>
          <div class="ok" style="position:absolute;inset:0;border-radius:50%;background:#0b8a4c;display:flex;align-items:center;justify-content:center"><span style="width:40px;height:40px;display:block">${CHECK}</span></div></div></div>`, q(c, ".steps"));
      const done = st.doneAt != null ? st.doneAt : i < n - 1 ? o.steps[i + 1].t - 0.05 : Math.min(o.t1 - 0.6, st.t + 0.9);
      tl.fromTo(r, { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.45, ease: E.enter }, st.t - 0.12);
      N.sfx("pop", st.t - 0.12, -9);
      const sp = q(r, ".spin");
      tl.fromTo(sp, { rotation: 0 }, { rotation: 360 * Math.max(1, Math.round((done - st.t) / 0.6)), duration: Math.max(0.3, done - st.t), ease: "none" }, st.t - 0.12);
      tl.fromTo(q(r, ".ok"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: E.pop }, done);
      tl.fromTo(sp, { opacity: 1 }, { opacity: 0, duration: 0.15, immediateRender: false }, done);
      N.sfx("click", done, -11);
      tl.fromTo(bar, { scaleX: Math.max(0.02, i / n) }, { scaleX: (i + 1) / n, duration: 0.4, ease: E.move, immediateRender: false }, done);
    });
    return s;
  };

  /* tarefa recebida com os pedidos */
  N.brief = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="lic panel" style="width:920px;padding:50px">
      <div class="lic-top"><div class="lic-title">${tile("inbox", "#005afc", 76)}${o.title || "Nova tarefa"}</div><div class="badge nb">${o.badge || "Recebida"}</div></div>
      <div class="lbl" style="margin-top:34px;text-align:left">${o.sub || "O que precisa entregar:"}</div>
      <div class="its" style="display:flex;flex-direction:column;gap:22px;margin-top:26px"></div></div></div>`, s);
    const p = q(c, ".panel");
    tl.fromTo(p, { opacity: 0, y: -200, rotationX: 30, scale: 0.85 }, { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 0.7, ease: "back.out(1.3)", transformPerspective: 1800 }, o.t0 + 0.02);
    N.sfx("whoosh", o.t0, -8);
    tl.fromTo(q(c, ".nb"), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: E.pop }, o.badgeAt || o.t0 + 0.7);
    N.sfx("chime", o.badgeAt || o.t0 + 0.7, -10);
    o.items.forEach((it, i) => {
      const r = el(`<div style="display:flex;align-items:center;gap:28px;padding:22px 26px;border-radius:30px;background:#f4f7fd">${tile(it.icon, it.color || "#0b162a", 84)}<div style="font-size:50px;font-weight:700;letter-spacing:-.025em;text-align:left">${it.label}</div></div>`, q(c, ".its"));
      tl.fromTo(r, { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: E.pop }, it.t - 0.1);
      N.sfx("pop", it.t - 0.1, -8);
    });
    return s;
  };

  /* duas linhas: a primeira apaga quando a segunda (grande) entra; enxame opcional de "IAs" */
  N.punch = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="h1 l1" style="font-size:${o.l1Size || 84}px" data-accent="${o.accent1 || ""}">${o.l1}</div>
      <div class="h1 l2" style="margin-top:80px;font-size:${o.l2Size || 120}px" data-accent="${o.accent2 || ""}">${o.l2}</div></div>`, s);
    if (o.swarm) {
      const P = [[110, 470], [820, 430], [70, 1250], [860, 1180], [300, 1460], [660, 1500], [470, 330]];
      P.forEach(([x, y], i) => {
        const b = el(`<div class="floaty" style="left:${x}px;top:${y}px;width:130px;height:130px;border-radius:40px"><span style="width:62px;height:62px;display:block">${i % 2 ? I.chat : I.spark}</span></div>`, s);
        tl.fromTo(b, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.45, ease: E.pop }, o.swarm.at + i * 0.13);
        tl.fromTo(b, { y: 0 }, { y: i % 2 ? -40 : 40, duration: Math.max(0.5, o.swarm.out - o.swarm.at), ease: "sine.inOut" }, o.swarm.at);
        tl.fromTo(b, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.3, duration: 0.3, ease: E.exit, immediateRender: false }, o.swarm.out + i * 0.03);
        N.sfx("pop", o.swarm.at + i * 0.13, -14);
      });
    }
    words(tl, q(c, ".l1"), o.l1Times, { from: o.l1From || 0 });
    const t2 = o.l2Times[0];
    tl.fromTo(q(c, ".l1"), { opacity: 1, scale: 1 }, { opacity: 0.4, scale: 0.86, duration: 0.45, ease: E.move, immediateRender: false }, t2 - 0.2);
    words(tl, q(c, ".l2"), o.l2Times);
    N.sfx("impact", t2 - 0.05, -8);
    return s;
  };

  /* revelação do nome do produto (sem logo oficial disponível: tipografia + selo neutro) */
  N.nameReveal = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center">${o.pre ? `<div class="h2 pre">${o.pre}</div>` : ""}
      <div class="nm prodrow" style="margin-top:50px;gap:34px"><span class="nt">${N.logo("manus", 160)}</span><span style="display:block;line-height:0">${N.logo("manus-text", 116)}</span></div>
      <div class="rays" style="position:absolute;left:50%;top:50%;width:1600px;height:1600px;margin:-800px 0 0 -800px;z-index:-1"></div>
      ${o.sub ? `<div class="h2 sub" style="margin-top:50px" data-accent="diferente">${o.sub}</div>` : ""}</div>`, s);
    if (o.pre) words(tl, q(c, ".pre"), o.preTimes);
    const nm = q(c, ".nm");
    tl.fromTo(nm, { opacity: 0, scale: 0.5, filter: "blur(18px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, o.nameAt - 0.1);
    tl.fromTo(q(c, ".nt"), { rotation: -90 }, { rotation: 0, duration: 0.6, ease: E.pop }, o.nameAt - 0.1);
    tl.fromTo(q(c, ".rays"), { opacity: 0, rotation: 0 }, { opacity: 0.8, rotation: 30, duration: 2.5, ease: "sine.out" }, o.nameAt - 0.1);
    N.sfx("impact", o.nameAt - 0.1, -4);
    if (o.sub) words(tl, q(c, ".sub"), o.subTimes);
    return s;
  };
})();
