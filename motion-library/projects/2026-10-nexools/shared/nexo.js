/* Nexools — biblioteca de cenas para os criativos (HyperFrames + GSAP).
 * Cada cena: N.<cena>(tl, {t0, t1, ...tempos das palavras}) monta o DOM e agenda as animações.
 * Efeitos sonoros: N.sfx(nome, t, ganho_dB) registra em window.__nexoCues (o mix de áudio lê daqui).
 * Regras HyperFrames: um timeline pausado, fromTo explícito, só transform/opacity/filter, determinístico.
 */
(function () {
  const N = (window.N = {});
  const E = { enter: "expo.out", exit: "power3.in", move: "power2.inOut", pop: "back.out(1.7)", snap: "expo.inOut" };
  N.E = E;
  window.__nexoCues = [];
  N.sfx = (name, t, db = 0) => window.__nexoCues.push({ name, t: +t.toFixed(3), db });

  const ICON = {
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="#0b162a" stroke-width="2.2" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="#0b162a" stroke-width="2.2" stroke-linecap="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.3 3-5 6-5s5.4 1.7 6 5"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14c2.4.2 4 1.7 4.5 4.5"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="#0b162a" stroke-width="2.2" stroke-linecap="round"><circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2 2M14 9l2 2"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="#005afc"><path d="M12 2c.6 4.8 3.6 8.4 10 10-6.4 1.6-9.4 5.2-10 10-.6-4.8-3.6-8.4-10-10 6.4-1.6 9.4-5.2 10-10z"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="#005afc" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.2 9.5 4.3 4.3 0 0 0 7 18z"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z" fill="#fff"/></svg>',
    play: '<svg viewBox="0 0 24 24" width="52" height="52"><path d="M8 5v14l11-7z" fill="#005afc"/></svg>',
    cursor: '<svg viewBox="0 0 24 24"><path d="M5 3l14 7-6 1.6L10.5 18z" fill="#0b162a" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="#005afc" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v15M5.5 12.5L12 19l6.5-6.5"/></svg>',
    cap: '<svg viewBox="0 0 24 24" fill="none" stroke="#005afc" stroke-width="2.2" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/></svg>',
  };
  N.ICON = ICON;

  /* ---------- logos oficiais (simple-icons, CC0; marcas pertencem aos donos) ---------- */
  const LP = {"googlegemini": "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81", "google": "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z", "googledrive": "M12.01 1.485c-2.082 0-3.754.02-3.743.047.01.02 1.708 3.001 3.774 6.62l3.76 6.574h3.76c2.081 0 3.753-.02 3.742-.047-.005-.02-1.708-3.001-3.775-6.62l-3.76-6.574zm-4.76 1.73a789.828 789.861 0 0 0-3.63 6.319L0 15.868l1.89 3.298 1.885 3.297 3.62-6.335 3.618-6.33-1.88-3.287C8.1 4.704 7.255 3.22 7.25 3.214zm2.259 12.653-.203.348c-.114.198-.96 1.672-1.88 3.287a423.93 423.948 0 0 1-1.698 2.97c-.01.026 3.24.042 7.222.042h7.244l1.796-3.157c.992-1.734 1.85-3.23 1.906-3.323l.104-.167h-7.249z", "coursera": "M11.374 23.977c-4.183-.21-8.006-2.626-9.959-6.347-2.097-3.858-1.871-8.864.732-12.454C4.748 1.338 9.497-.698 14.281.23c4.583.857 8.351 4.494 9.358 8.911 1.122 4.344-.423 9.173-3.925 12.04-2.289 1.953-5.295 2.956-8.34 2.797zm7.705-8.05a588.737 588.737 0 0 0-3.171-1.887c-.903 1.483-2.885 2.248-4.57 1.665-2.024-.639-3.394-2.987-2.488-5.134.801-2.009 2.79-2.707 4.357-2.464a4.19 4.19 0 0 1 2.623 1.669c1.077-.631 2.128-1.218 3.173-1.855-2.03-3.118-6.151-4.294-9.656-2.754-3.13 1.423-4.89 4.68-4.388 7.919.54 3.598 3.73 6.486 7.716 6.404a7.664 7.664 0 0 0 6.404-3.563z", "elevenlabs": "M4.6035 0v24h4.9317V0zm9.8613 0v24h4.9317V0z", "n8n": "M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632"};
  let gid = 0;
  N.logo = function (name, size, o = {}) {
    const d = LP[name]; const id = "lg" + (gid++);
    // Manus não tem logo no simple-icons: usamos só o nome em tipografia neutra (não é o logo da marca)
    if (!d) return `<span style="display:inline-flex;width:${size}px;height:${size}px;border-radius:${size * 0.28}px;background:${o.color === "#fff" ? "#fff" : "#0b162a"};color:${o.color === "#fff" ? "#0b162a" : "#fff"};align-items:center;justify-content:center;font-weight:700;font-size:${size * 0.56}px;line-height:1">${(name[0] || "?").toUpperCase()}</span>`;
    const sz = `width="${size}" height="${size}"`;
    if (name === "googlegemini") return `<svg viewBox="0 0 24 24" ${sz}><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4285F4"/><stop offset=".55" stop-color="#9B72CB"/><stop offset="1" stop-color="#D96570"/></linearGradient></defs><path d="${d}" fill="url(#${id})"/></svg>`;
    if (name === "google" && !o.mono) return `<svg viewBox="0 0 24 24" ${sz}><defs>${["a","b","c","d"].map((k)=>`<clipPath id="${id}${k}"><rect ${{a:'x="0" y="0" width="24" height="9.3"',b:'x="0" y="9.3" width="8.2" height="7"',c:'x="0" y="15" width="24" height="9"',d:'x="12" y="9.3" width="12" height="6"'}[k]}/></clipPath>`).join("")}</defs>${[["a","#EA4335"],["b","#FBBC05"],["c","#34A853"],["d","#4285F4"]].map(([k,c])=>`<path d="${d}" fill="${c}" clip-path="url(#${id}${k})"/>`).join("")}</svg>`;
    if (name === "googledrive" && !o.mono) return `<svg viewBox="0 0 24 24" ${sz}><defs><clipPath id="${id}a"><polygon points="0,0 9,0 4.5,24 0,24"/></clipPath><clipPath id="${id}b"><rect x="0" y="15.5" width="24" height="9"/></clipPath><clipPath id="${id}c"><polygon points="9,0 24,0 24,15.5 12,15.5"/></clipPath></defs><path d="${d}" fill="#0F9D58" clip-path="url(#${id}a)"/><path d="${d}" fill="#4285F4" clip-path="url(#${id}b)"/><path d="${d}" fill="#FFBA00" clip-path="url(#${id}c)"/></svg>`;
    const col = o.color || { coursera: "#0056D2", elevenlabs: "#000000", n8n: "#EA4B71", google: "#4285F4", googledrive: "#4285F4" }[name];
    return `<svg viewBox="0 0 24 24" ${sz}><path d="${d}" fill="${col}"/></svg>`;
  };

  let stage;
  const el = (html, parent) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    const n = t.content.firstElementChild;
    (parent || stage).appendChild(n);
    return n;
  };
  const q = (root, s) => root.querySelector(s);
  const qa = (root, s) => Array.from(root.querySelectorAll(s));
  N.el = el;
  N.q = q; N.qa = qa; N.split = split;

  function split(node) {
    const words = node.textContent.trim().split(/\s+/);
    const accent = (node.dataset.accent || "").split("|");
    node.textContent = "";
    words.forEach((w, i) => {
      const s = document.createElement("span");
      s.className = "w" + (accent.includes(w.replace(/[.,!?]/g, "")) ? " accent" : "");
      s.textContent = w;
      node.appendChild(s);
      if (i < words.length - 1) node.appendChild(document.createTextNode(" "));
    });
    return qa(node, ".w");
  }

  /* blur-in palavra a palavra; times = array de tempos (um por palavra) ou {at, stagger} */
  function words(tl, node, times, o = {}) {
    const ws = split(node);
    ws.forEach((w, i) => {
      const t = Array.isArray(times) ? times[Math.min(i, times.length - 1)] : times.at + i * (times.stagger || 0.08);
      tl.fromTo(w, { opacity: o.from || 0, y: 26, filter: "blur(14px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: E.enter }, Math.max(0, t - 0.06));
    });
    return ws;
  }
  N.words = words;

  /* janela da cena: aparece em t0, sai com blur até t1 */
  function scene(tl, cls, t0, t1, o = {}) {
    const s = el(`<div class="scene ${cls || ""}"></div>`);
    const cam = el(`<div class="cam"></div>`, s);
    tl.set(s, { autoAlpha: 1 }, t0);
    // entrada: zoom cruzado suave
    if (!o.noEnter) tl.fromTo(s, { scale: 0.94, filter: "blur(10px)" }, { scale: 1, filter: "blur(0px)", duration: 0.45, ease: E.enter }, t0);
    // câmera viva: nunca fica parada
    tl.fromTo(cam, { scale: 1, y: 0 }, { scale: o.breath || 1.045, y: -14, duration: Math.max(0.5, t1 - t0), ease: "sine.inOut" }, t0);
    if (o.noExit) tl.set(s, { autoAlpha: 0 }, t1);
    else {
      const d = o.exit || 0.3;
      tl.fromTo(s, { opacity: 1, filter: "blur(0px)", scale: 1 }, { opacity: 0, filter: "blur(16px)", scale: o.exitScale || 1.12, duration: d, ease: E.exit, immediateRender: false }, t1 - d);
      tl.set(s, { autoAlpha: 0 }, t1);
      if (!o.quiet) N.sfx("whoosh", t1 - d - 0.12, -14);
    }
    cam.__outer = s;
    return cam;
  }
  N.scene = scene;

  /* logos flutuando em profundidade (parallax + flutuação) */
  N.floats = function (tl, parent, list, at, dur) {
    list.forEach((f, i) => {
      const sz = f.s || 150;
      const e = el(`<div class="floaty" style="left:${f.x}px;top:${f.y}px;width:${sz}px;height:${sz}px;border-radius:${sz * 0.3}px">${N.logo(f.name, Math.round(sz * 0.56))}</div>`, parent);
      tl.fromTo(e, { opacity: 0, scale: 0.3, rotation: -14 }, { opacity: 1, scale: 1, rotation: f.r || 0, duration: 0.6, ease: E.pop }, at + i * 0.12);
      tl.fromTo(e, { y: 0, x: 0 }, { y: f.dy != null ? f.dy : -50, x: f.dx || 0, duration: Math.max(0.6, dur), ease: "sine.inOut" }, at);
      N.sfx("pop", at + i * 0.12, -13);
    });
  };

  /* base: fundo vivo + marca persistente + camada escura controlável */
  N.base = function (tl, root, dur, o = {}) {
    stage = root;
    el(`<div class="bg"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div><div class="grain"></div></div>`);
    N.dark = el(`<div class="darkbg"></div>`);
    tl.fromTo(".blob.b1", { x: 0, y: 0 }, { x: 260, y: 180, duration: dur, ease: "sine.inOut" }, 0);
    tl.fromTo(".blob.b2", { x: 0, y: 0 }, { x: -320, y: -260, duration: dur, ease: "sine.inOut" }, 0);
    tl.fromTo(".blob.b3", { x: 0, scale: 1 }, { x: -200, scale: 1.3, duration: dur, ease: "sine.inOut" }, 0);
    N.brand = el(`<div class="brandbar"><img src="assets/nexools-wordmark.png" alt="Nexools"></div>`);
    N.brandDark = el(`<div class="brandbar" style="opacity:0"><img src="assets/nexools-wordmark-ondark.png" alt="Nexools"></div>`);
    N.flashEl = el(`<div class="flash"></div>`);
    if (o.bed !== false) N.sfx("bed", 0, 0);
  };
  /* liga/desliga fundo escuro (marca acompanha) */
  N.darkOn = (tl, t, d = 0.35) => {
    tl.fromTo(N.dark, { opacity: 0 }, { opacity: 1, duration: d, ease: E.move, immediateRender: false }, t);
    tl.fromTo(N.brand, { opacity: 1 }, { opacity: 0, duration: d, immediateRender: false }, t);
    tl.fromTo(N.brandDark, { opacity: 0 }, { opacity: 1, duration: d, immediateRender: false }, t);
  };
  N.darkOff = (tl, t, d = 0.35) => {
    tl.fromTo(N.dark, { opacity: 1 }, { opacity: 0, duration: d, ease: E.move, immediateRender: false }, t);
    tl.fromTo(N.brand, { opacity: 0 }, { opacity: 1, duration: d, immediateRender: false }, t);
    tl.fromTo(N.brandDark, { opacity: 1 }, { opacity: 0, duration: d, immediateRender: false }, t);
  };
  N.hideBrand = (tl, t) => {
    tl.fromTo([N.brand, N.brandDark], { y: 0 }, { y: -40, opacity: 0, duration: 0.3, ease: E.exit, immediateRender: false }, t);
  };
  N.flash = (tl, t, sound = true) => {
    tl.fromTo(N.flashEl, { opacity: 0 }, { opacity: 0.9, duration: 0.001, immediateRender: false }, t);
    tl.to(N.flashEl, { opacity: 0, duration: 0.12 }, t + 0.067);
    if (sound) N.sfx("whoosh", t - 0.25, -6);
  };

  /* ---------- 1. Preço com roleta de meses ---------- */
  N.priceHero = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1, { exitScale: 0.92 });
    const n = o.months;
    const rows = Array.from({ length: n }, (_, i) => `<div class="trow">${String(i + 1).padStart(2, "0")}</div>`).join("");
    const c = el(`<div class="center">
      <div class="ph-num"><div class="tmask"><div class="tcol">${rows}</div></div><div class="unit">${o.unit || "meses"}</div></div>
      <div class="prod prodrow">${o.productLogo ? `<span class="lg plogo">${N.logo(o.productLogo, 84)}</span>` : ""}<span class="ptxt">${o.product}</span></div>
      <div class="price"><div class="rays"></div><div class="glow"></div><span class="cur">R$</span><span class="val" style="${o.priceSize ? `font-size:${o.priceSize}px` : ""}">${o.price}</span></div>
      ${o.sub ? `<div class="lbl" style="margin-top:30px">${o.sub}</div>` : ""}
    </div>`, s);
    const col = q(c, ".tcol");
    const ts = o.tickAt != null ? o.tickAt : o.t0 + 0.05;
    tl.fromTo(col, { y: 0 }, { y: -(n - 1) * 300, duration: o.tickDur || 1.1, ease: "expo.out" }, ts);
    tl.fromTo(q(c, ".ph-num"), { opacity: o.firstFrame ? 1 : 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: E.enter }, ts);
    tl.fromTo(q(c, ".unit"), { opacity: o.firstFrame ? 1 : 0, x: o.firstFrame ? 0 : -30 }, { opacity: 1, x: 0, duration: 0.5, ease: E.enter }, ts + 0.3);
    for (let i = 0; i < 9; i++) N.sfx("tick", ts + 0.02 + 0.9 * Math.pow(i / 9, 2), -10 - i);
    words(tl, q(c, ".ptxt"), [o.productAt]);
    if (o.productLogo) tl.fromTo(q(c, ".plogo"), { opacity: 0, scale: 0.3, rotation: -90 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: E.pop }, o.productAt - 0.1);
    if (o.floats) N.floats(tl, s, o.floats, o.floatAt || o.priceAt, o.t1 - (o.floatAt || o.priceAt));
    const pr = q(c, ".price");
    tl.fromTo(pr, { opacity: 0, scale: 0.6, filter: "blur(20px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.4)" }, o.priceAt - 0.1);
    tl.fromTo(q(c, ".rays"), { rotation: 0, opacity: 0 }, { rotation: 40, opacity: 1, duration: 3, ease: "sine.out" }, o.priceAt - 0.1);
    tl.fromTo(q(c, ".glow"), { scale: 0.4, opacity: 0 }, { scale: 1.2, opacity: 1, duration: 0.8, ease: E.enter }, o.priceAt - 0.1);
    N.sfx("impact", o.priceAt - 0.08, -4);
    if (o.sub) tl.fromTo(c.lastElementChild, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: E.enter }, o.priceAt + 0.4);
    return s;
  };

  /* ---------- 2. Selos de objeção riscados ---------- */
  N.objections = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="h1 kick" style="margin-bottom:90px" data-accent="pergunte:">${o.kicker || ""}</div><div class="chips"></div></div>`, s);
    if (o.kicker) {
      words(tl, q(c, ".kick"), o.kickTimes || { at: o.t0 + 0.05, stagger: 0.12 });
      tl.fromTo(q(c, ".kick"), { scale: 1.12 }, { scale: 0.8, duration: 0.6, ease: E.move, immediateRender: false }, o.items[0].t - 0.4);
    }
    o.items.forEach((it) => {
      const ch = el(`<div class="chip">${ICON[it.icon]}<span>${it.text}</span><div class="strike"></div></div>`, q(c, ".chips"));
      tl.fromTo(ch, { opacity: 0, scale: 0.7, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: E.pop }, it.t - 0.1);
      N.sfx("pop", it.t - 0.1, -8);
      const st = it.strikeAt || it.t + 0.7;
      tl.fromTo(q(ch, ".strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.32, ease: E.move }, st);
      tl.fromTo(ch, { filter: "grayscale(0) blur(0px)", opacity: 1 }, { filter: "grayscale(1) blur(1px)", opacity: 0.55, duration: 0.4, immediateRender: false }, st + 0.3);
      N.sfx("strike", st, -6);
    });
    return s;
  };

  /* ---------- 2b. Lista "Não é..." com X que vira ✓ ---------- */
  N.notList = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="qlist"></div>${o.after ? `<div class="h2" style="margin-top:90px">${o.after}</div>` : ""}</div>`, s);
    o.items.forEach((it) => {
      const r = el(`<div class="qrow"><div class="qicon"><div class="qx">${ICON.x}</div><div class="qok">${ICON.check}</div></div><span>${it.text}</span></div>`, q(c, ".qlist"));
      tl.fromTo(r, { opacity: 0, x: -120 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, it.t - 0.08);
      N.sfx("impact", it.t - 0.08, -12);
      if (o.flipAt) {
        tl.fromTo(q(r, ".qicon"), { rotationY: 0 }, { rotationY: 180, duration: 0.5, ease: E.snap }, o.flipAt + o.items.indexOf(it) * 0.08);
        tl.fromTo(q(r, "span"), { opacity: 1 }, { opacity: 0.45, duration: 0.3, immediateRender: false }, o.flipAt);
      }
    });
    if (o.flipAt) N.sfx("chime", o.flipAt, -8);
    return s;
  };

  /* ---------- 3. Cartão de licença (digitação, ativação, dono) ---------- */
  N.license = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="lic-wrap"><div class="lic">
      <div class="toast"><div class="dot">${ICON.check}</div><span>${o.toast || "Ativado na sua conta"}</span></div>
      <div class="lic-top"><div class="lic-title"><img src="assets/nexools-mark.png" alt="">${o.title || "Licença oficial"}</div><div class="badge">${o.badge}</div></div>
      <div class="lic-prod"><span class="prodrow" style="justify-content:flex-start">${o.productLogo ? N.logo(o.productLogo, 78) : ""}${o.product}</span><small>${o.productSub || ""}</small></div>
      <div class="fieldlbl acct">${o.account === "google" ? N.logo("google", 40) : ""}${o.fieldLabel || (o.account === "google" ? "Sua conta Google" : "Seu e-mail")}</div>
      <div class="field"><span class="typed"></span><span class="caret"></span><span class="ph">${o.placeholder || "voce@email.com"}</span></div>
      <div class="btn" data-layout-allow-overlap><span class="lab">${o.button || "Ativar licença"}</span><div class="ok">${ICON.check}<span>${o.done || "Ativado"}</span></div></div>
      <div class="owner">${o.owner || "<b>1</b> conta · <b>1</b> dono"}</div>
      <div class="cursor">${ICON.cursor}</div>
    </div></div></div>`, s);
    const lic = q(c, ".lic");
    tl.fromTo(lic, { opacity: 0, y: 120, rotationX: 22, scale: 0.9 }, { opacity: 1, y: 0, rotationX: 6, scale: 1, duration: 0.8, ease: E.enter, transformPerspective: 1800 }, o.t0);
    tl.fromTo(lic, { rotationX: 6 }, { rotationX: 0, duration: Math.max(1, o.t1 - o.t0 - 0.8), ease: "sine.inOut", immediateRender: false, transformPerspective: 1800 }, o.t0 + 0.8);
    N.sfx("whoosh", o.t0 - 0.2, -8);
    // digitação seek-safe: um set por letra
    const typed = q(c, ".typed"), ph = q(c, ".ph"), email = o.email || "voce@email.com";
    tl.set(ph, { opacity: 1 }, o.t0);
    tl.set(ph, { opacity: 0 }, o.typeAt);
    for (let i = 0; i <= email.length; i++) tl.set(typed, { textContent: email.slice(0, i) }, o.typeAt + i * 0.045);
    if (o.typeAt != null) N.sfx("typing", o.typeAt, -10);
    const caret = q(c, ".caret");
    for (let k = 0; k < Math.floor((o.t1 - o.t0) / 0.5); k++) tl.set(caret, { opacity: k % 2 ? 0 : 1 }, o.t0 + k * 0.5);
    // cursor + clique
    const cur = q(c, ".cursor"), btn = q(c, ".btn");
    if (o.clickAt != null) {
      tl.fromTo(cur, { x: 900, y: 1000, opacity: 0 }, { x: 560, y: 700, opacity: 1, duration: 0.6, ease: E.move }, o.clickAt - 0.65);
      tl.fromTo(cur, { scale: 1 }, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, o.clickAt);
      tl.fromTo(btn, { scale: 1 }, { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, o.clickAt);
      tl.fromTo(q(btn, ".ok"), { opacity: 0 }, { opacity: 1, duration: 0.25, ease: E.enter }, o.clickAt + 0.12);
      tl.fromTo(q(btn, ".lab"), { opacity: 1 }, { opacity: 0, duration: 0.15, immediateRender: false }, o.clickAt + 0.12);
      tl.to(cur, { opacity: 0, x: 640, y: 820, duration: 0.4 }, o.clickAt + 0.4);
      N.sfx("click", o.clickAt, -2);
      N.sfx("chime", o.clickAt + 0.12, -6);
      const toast = q(c, ".toast");
      tl.fromTo(toast, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.5, ease: E.enter }, o.clickAt + 0.3);
    } else {
      tl.set([cur, q(c, ".toast")], { opacity: 0 }, o.t0);
      if (o.okAt != null) { tl.fromTo(q(btn, ".ok"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, o.okAt); tl.fromTo(q(btn, ".lab"), { opacity: 1 }, { opacity: 0, duration: 0.15, immediateRender: false }, o.okAt); N.sfx("chime", o.okAt, -6); }
    }
    const ow = q(c, ".owner");
    if (o.ownerAt != null) {
      tl.fromTo(ow, { opacity: 0, scale: 0.6, rotation: -6 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: E.pop }, o.ownerAt);
      N.sfx("pop", o.ownerAt, -6);
    } else tl.set(ow, { opacity: 0 }, o.t0);
    return s;
  };

  /* ---------- 4. Bento de benefícios (IA, 5 TB, Flow) com câmera ---------- */
  N.bento = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1, { exitScale: 0.9, breath: 1.02 });
    const b = el(`<div class="bento">
      <div class="tile" id="${o.id}-ai" style="top:0;height:300px"><div class="ico" style="background:#f1ecfb">${N.logo("googlegemini", 62)}</div><div class="tt">${o.aiTitle || "Gemini Pro"}</div><div class="ts">${o.aiSub || "IA avançada para estudar, trabalhar e criar"}</div></div>
      <div class="tile" id="${o.id}-tb" style="top:340px;height:360px"><div class="ico" style="background:#eef4ff">${N.logo("googledrive", 60)}</div><div style="display:flex;align-items:baseline;gap:18px"><span class="tb-big">0</span><span class="tt">TB</span></div><div class="ts">de armazenamento no Google Drive</div><div class="bar"><div></div></div></div>
      <div class="tile dark" id="${o.id}-flow" style="top:740px;height:430px"><div class="ico" style="background:#fff">${N.logo("google", 58)}</div><div class="tt">Google Flow</div><div class="ts" style="width:430px">Crie imagens e vídeos com inteligência artificial</div>
        <div class="frames">${["#0a3dbd,#4d8dff", "#ff7a59,#ffb020", "#12b76a,#0a8f86", "#7c5cff,#ff5ca8"].map((g) => `<div style="background:linear-gradient(135deg,${g})"></div>`).join("")}<div class="play">${ICON.play}</div></div></div>
    </div>`, s);
    const tiles = ["ai", "tb", "flow"].map((k) => q(b, `#${o.id}-${k}`));
    const at = [o.aiAt, o.tbAt, o.flowAt];
    tiles.forEach((t, i) => {
      tl.fromTo(t, { opacity: 0, scale: 0.7, y: 80 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: E.pop }, at[i] - 0.15);
      N.sfx("pop", at[i] - 0.15, -8);
    });
    // destaque: o tile falado cresce, os outros recuam
    const focus = (i, t) => tiles.forEach((tt, j) => {
      tl.to(tt, { scale: j === i ? 1.03 : 0.96, filter: j === i ? "blur(0px)" : "blur(2px)", opacity: j === i ? 1 : 0.6, duration: 0.5, ease: E.move }, t);
    });
    focus(0, o.aiAt + 0.4);
    focus(1, o.tbAt + 0.3);
    focus(2, o.flowAt + 0.3);
    tl.to(tiles, { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.5, ease: E.move }, o.t1 - 1.1);
    // câmera: o bento sobe para manter o tile ativo no centro
    tl.fromTo(b, { y: 220 }, { y: 110, duration: 0.8, ease: E.move }, o.aiAt - 0.15);
    tl.to(b, { y: 0, duration: 0.8, ease: E.move }, o.tbAt - 0.2);
    tl.to(b, { y: -50, duration: 0.8, ease: E.move }, o.flowAt - 0.2);
    tl.to(b, { y: 0, scale: 0.92, duration: 0.8, ease: "power4.out" }, o.t1 - 1.1);
    // 5 TB
    const big = q(b, ".tb-big"), px = { v: 0 };
    tl.fromTo(px, { v: 0 }, { v: o.tb || 5, duration: 1.0, ease: "power2.out", onUpdate: () => (big.textContent = Math.round(px.v)) }, o.tbAt);
    tl.fromTo(q(b, ".bar > div"), { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: "power2.out" }, o.tbAt);
    for (let i = 0; i < 5; i++) N.sfx("tick", o.tbAt + i * 0.16, -12);
    // frames do Flow trocando
    const fr = qa(b, ".frames > div");
    for (let k = 0; k < 10; k++) fr.forEach((f, i) => tl.set(f, { opacity: i === k % 4 ? 1 : 0 }, o.flowAt + k * 0.4));
    return s;
  };

  /* ---------- 5. Preço por mês ---------- */
  N.perMonth = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="h2">${o.pre}</div>
      <div class="price" style="margin-top:20px"><div class="glow"></div><span class="cur">R$</span><span class="val">${o.big}</span></div>
      <div class="h2" style="margin-top:10px">${o.post}</div><div class="lbl" style="margin-top:40px">${o.foot || ""}</div></div>`, s);
    words(tl, c.children[0], [o.preAt]);
    tl.fromTo(q(c, ".price"), { opacity: 0, scale: 0.6, filter: "blur(16px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.4)" }, o.bigAt - 0.1);
    N.sfx("impact", o.bigAt - 0.1, -8);
    words(tl, c.children[2], [o.postAt]);
    if (o.foot) tl.fromTo(c.children[3], { opacity: 0 }, { opacity: 1, duration: 0.5 }, o.postAt + 0.3);
    return s;
  };

  /* ---------- 6. CTA final ---------- */
  N.cta = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1, { noExit: true });
    const LG = { "Gemini Pro": "googlegemini", Coursera: "coursera", ElevenLabs: "elevenlabs", n8n: "n8n" };
    const cat = o.catalog ? `<div class="cat">${["Gemini Pro", "Coursera", "ElevenLabs", "n8n", "Manus"].map((p) => `<div class="${p === o.catalog ? "hl" : ""}" style="flex-direction:column;gap:10px">${LG[p] ? `<span style="width:64px;height:64px;border-radius:20px;background:#fff;display:flex;align-items:center;justify-content:center">${N.logo(LG[p], 42)}</span>` : `<span style="width:64px;height:64px;border-radius:20px;background:#0b162a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:34px">M</span>`}<span>${p}</span></div>`).join("")}</div>` : "";
    const c = el(`<div class="center"><div class="cta-logo"><img src="assets/nexools-wordmark.png" alt="Nexools"></div>
      <div class="h2" style="margin-top:70px">${o.headline}</div>${cat}
      <div class="pill">${o.button || "Saiba Mais"}<div class="sheen"></div></div><div class="arrow">${ICON.arrow}</div></div>`, s);
    const legal = el(`<div class="legal">Nexools é revendedora independente. Marcas citadas pertencem aos seus respectivos donos.</div>`, s);
    tl.fromTo(legal, { opacity: 0 }, { opacity: 1, duration: 0.5 }, o.buttonAt + 0.6);
    N.hideBrand(tl, o.t0 - 0.2);
    tl.fromTo(q(c, ".cta-logo"), { opacity: 0, scale: 0.85, filter: "blur(16px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: E.enter }, o.t0);
    N.sfx("whoosh", o.t0 - 0.25, -6);
    words(tl, q(c, ".h2"), { at: o.t0 + 0.25, stagger: 0.07 });
    if (o.catalog) {
      const cs = qa(c, ".cat div");
      tl.fromTo(cs, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: E.enter }, o.t0 + 0.4);
      tl.fromTo(q(c, ".cat .hl"), { scale: 1 }, { scale: 1.12, duration: 0.4, ease: E.pop, immediateRender: false }, o.t0 + 0.9);
    }
    const pill = q(c, ".pill");
    tl.fromTo(pill, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.55, ease: E.pop }, o.buttonAt);
    N.sfx("pop", o.buttonAt, -4);
    tl.fromTo(q(c, ".sheen"), { x: -200 }, { x: 900, duration: 0.8, ease: E.move }, o.buttonAt + 0.4);
    N.sfx("chime", o.buttonAt + 0.4, -10);
    const ar = q(c, ".arrow");
    tl.fromTo(ar, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4 }, o.buttonAt + 0.3);
    for (let k = 0; k < 4; k++) tl.fromTo(ar, { y: 0 }, { y: 26, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, o.buttonAt + 0.7 + k * 0.7);
    return s;
  };

  /* ---------- GEM-B: chat que vira entregáveis ---------- */
  N.chatGrow = function (tl, o) {
    const s1 = scene(tl, "", o.t0, o.mid, { exit: 0.2 });
    const c = el(`<div class="center"><div class="h2" style="margin-bottom:60px">${o.kicker}</div>
      <div style="display:flex;flex-direction:column;width:900px"><div class="bubble">${o.q}</div><div class="answer acct">${N.logo("googlegemini", 46)}<span>${o.a}</span></div></div>
      <div class="chatbar" style="margin-top:50px">${N.logo("googlegemini", 52)}<span style="color:#6b7890">Pergunte ao Gemini…</span></div></div>`, s1);
    words(tl, c.children[0], o.kickTimes || { at: o.t0 + 0.1, stagger: 0.07 }, { from: 0.3 });
    tl.fromTo(q(c, ".bubble"), { opacity: 0, scale: 0.6, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: E.pop, transformOrigin: "100% 100%" }, o.qAt);
    N.sfx("pop", o.qAt, -8);
    tl.fromTo(q(c, ".answer"), { opacity: 0, scale: 0.6, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: E.pop, transformOrigin: "0% 100%" }, o.aAt);
    N.sfx("pop", o.aAt, -10);
    tl.fromTo(q(c, ".chatbar"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: E.enter }, o.t0 + 0.2);
    // parte 2: entregáveis
    const s2 = scene(tl, "", o.mid, o.t1);
    const h = el(`<div class="center" style="justify-content:flex-start;padding-top:400px"><div class="h2" data-accent="Gemini|Pro">${o.head}</div></div>`, s2);
    words(tl, h.children[0], o.headTimes);
    const tops = [600, 900, 1180];
    const kinds = {
      slides: (l) => `<div class="tt">${l}</div><div class="slides"><div></div><div></div><div></div></div>`,
      research: (l) => `<div class="tt">${l}</div><div class="lines"><div style="width:96%"></div><div style="width:88%"></div><div style="width:70%"></div></div>`,
      calendar: (l) => `<div class="tt">${l}</div><div class="cal">${["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => `<div>${d}<i></i></div>`).join("")}</div>`,
    };
    o.items.forEach((it, i) => {
      const d = el(`<div class="deliv" style="top:${tops[i]}px">${kinds[it.kind](it.label)}</div>`, s2);
      tl.fromTo(d, { opacity: 0, y: 80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: E.pop }, it.t - 0.12);
      N.sfx("pop", it.t - 0.12, -8);
      if (it.kind === "calendar") tl.fromTo(qa(d, ".cal i"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, stagger: 0.07, ease: E.enter, transformOrigin: "0 50%" }, it.t + 0.2);
      if (it.kind === "research") tl.fromTo(qa(d, ".lines div"), { scaleX: 0 }, { scaleX: 1, duration: 0.4, stagger: 0.1, ease: E.enter, transformOrigin: "0 50%" }, it.t + 0.1);
      if (it.kind === "slides") tl.fromTo(qa(d, ".slides div"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, ease: E.enter }, it.t + 0.1);
    });
    return s2;
  };

  /* ---------- GEM-C: preço com pergunta + "bom demais?" ---------- */
  N.question = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center">
      <div class="price"><div class="glow"></div><span class="cur">R$</span><span class="val">47</span>
        <svg viewBox="0 0 60 100" style="width:150px;height:250px;margin-left:10px;margin-top:10px"><path id="qm" d="M10 30 C10 5, 50 5, 50 30 C50 50, 30 50, 30 68" fill="none" stroke="#005afc" stroke-width="10" stroke-linecap="round"/><circle id="qd" cx="30" cy="88" r="6.5" fill="#005afc"/></svg></div>
      <div class="h2" style="margin-top:30px">${o.sub}</div>
      <div class="h1" style="margin-top:120px" data-accent="demais?">${o.punch}</div></div>`, s);
    const qm = q(c, "#qm"), len = 140;
    qm.style.strokeDasharray = len;
    tl.fromTo(q(c, ".price"), { opacity: 1, scale: 1 }, { opacity: 1, scale: 1, duration: 0.01 }, 0);
    tl.fromTo(q(c, ".glow"), { opacity: 0.6 }, { opacity: 1, duration: 1, ease: "sine.inOut" }, o.t0);
    tl.fromTo(qm, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.45, ease: E.move }, o.qAt);
    tl.fromTo(q(c, "#qd"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.25, ease: E.pop, transformOrigin: "50% 50%" }, o.qAt + 0.4);
    words(tl, c.children[1], o.subTimes, { from: 0.25 });
    if (o.floats) N.floats(tl, s, o.floats, o.floatAt || 1.3, o.t1 - (o.floatAt || 1.3));
    const pw = words(tl, c.children[2], o.punchTimes);
    tl.fromTo(stage, { scale: 1 }, { scale: 1.05, duration: 0.15, ease: "power3.out", immediateRender: false }, o.punchTimes[o.punchTimes.length - 1]);
    tl.to(stage, { scale: 1, duration: 0.4, ease: E.move }, o.punchTimes[o.punchTimes.length - 1] + 0.2);
    N.sfx("impact", o.punchTimes[o.punchTimes.length - 1], -10);
    return s;
  };

  /* ---------- GEM-C: a conta 96,99 × 18 ---------- */
  const brl = (v) => { const [i, d] = v.toFixed(2).split("."); return "R$ " + i.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + d; };
  N.brl = brl;
  N.calc = function (tl, o) {
    const s = scene(tl, "dark", o.t0, o.t1, { noExit: true });
    const tiles = Array.from({ length: o.months }, (_, i) => `<div class="mtile">${i + 1}<div class="on">${i + 1}</div></div>`).join("");
    const c = el(`<div class="center" style="padding-bottom:120px"><div class="h1" style="color:#fff;font-size:84px">${o.kicker}</div>
      <div class="lbl acct" style="justify-content:center;margin-top:26px;color:rgba(255,255,255,.8)">${o.planLogo ? N.logo(o.planLogo, 40, { color: o.planLogoColor }) : ""}${o.planLabel || ""}</div><div class="calc-line" style="margin-top:14px">${o.monthly} <span>×</span> ${o.months}</div>
      <div class="mgrid" style="grid-template-columns:repeat(${Math.min(6, o.months)}, ${o.months <= 3 ? 150 : 104}px)">${tiles}</div>
      <div class="ctot"><span class="num">R$ 0,00</span><div class="strike"></div></div>
      <div class="price" style="margin-top:0"><div class="rays"></div><div class="glow"></div><span class="cur">R$</span><span class="val" style="font-size:${o.priceSize || 220}px">${o.price}</span></div>
        <div style="position:relative;height:120px;width:400px;margin-top:-10px"><div class="stamp" style="left:40px;top:0">${o.stamp || "À VISTA"}</div></div></div>`, s);
    words(tl, c.children[0], o.kickTimes || [o.t0 + 0.05]);
    tl.fromTo(c.children[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: E.enter }, o.lineAt - 0.2);
    tl.fromTo(q(c, ".calc-line"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: E.enter }, o.lineAt);
    N.sfx("pop", o.lineAt, -8);
    const mt = qa(c, ".mtile");
    tl.fromTo(mt, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.02, ease: E.pop }, o.lineAt + 0.1);
    const span = (o.countEnd - o.countStart) / o.months;
    mt.forEach((m, i) => { tl.fromTo(q(m, ".on"), { opacity: 0 }, { opacity: 1, duration: 0.12 }, o.countStart + i * span); if (i % 2 === 0) N.sfx("tick", o.countStart + i * span, -12); });
    const num = q(c, ".num"), px = { v: 0 };
    tl.fromTo(q(c, ".ctot"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, o.countStart - 0.1);
    tl.fromTo(px, { v: 0 }, { v: o.total, duration: o.countEnd - o.countStart, ease: "none", onUpdate: () => (num.textContent = brl(px.v)) }, o.countStart);
    tl.fromTo(q(c, ".ctot"), { scale: 1 }, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, o.countEnd);
    // Nexools: risca o total e entra o preço
    tl.fromTo(q(c, ".ctot .strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: E.move }, o.nexAt);
    N.sfx("strike", o.nexAt, -4);
    tl.to([q(c, ".ctot"), q(c, ".mgrid"), q(c, ".calc-line")], { opacity: 0.35, scale: 0.9, duration: 0.4, ease: E.move }, o.nexAt + 0.3);
    const pr = q(c, ".price");
    tl.fromTo(pr, { opacity: 0, scale: 0.5, filter: "blur(20px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.4)" }, o.priceAt - 0.1);
    tl.fromTo(q(pr, ".rays"), { rotation: 0, opacity: 0 }, { rotation: 30, opacity: 1, duration: 2.5 }, o.priceAt - 0.1);
    N.sfx("impact", o.priceAt - 0.1, -2);
    const st = q(c, ".stamp");
    if (o.vistaAt != null) {
      tl.fromTo(st, { opacity: 0, scale: 1.8, rotation: -20 }, { opacity: 1, scale: 1, rotation: -10, duration: 0.35, ease: "back.out(2)" }, o.vistaAt);
      N.sfx("stamp", o.vistaAt, -2);
    } else tl.set(st, { opacity: 0 }, o.t0);
    tl.fromTo(s, { opacity: 1, filter: "blur(0px)" }, { opacity: 0, filter: "blur(18px)", duration: 0.3, immediateRender: false }, o.t1 - 0.3);
    return s;
  };

  /* ---------- COU: flip de preço ---------- */
  N.priceFlip = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1, { exitScale: 3.2, exit: 0.35 });
    const c = el(`<div class="center"><div class="floaty brandlogo" style="position:relative;margin-bottom:40px;width:150px;height:150px">${N.logo(o.logo || "coursera", 88)}</div><div class="h2" style="margin-bottom:60px">${o.head}</div>
      <div class="flip-wrap"><div class="flip" data-layout-allow-overlap data-layout-allow-occlusion>
        <div class="face"><div class="sm" style="margin:0 0 10px">${o.frontTop}</div><div class="big"><span class="pv">US$ 0</span></div><div class="sm">${o.frontSub}</div></div>
        <div class="face back"><div class="sm" style="margin:0 0 10px">${o.backTop}</div><div class="big">${o.back}</div><div class="sm">${o.backSub}</div></div>
      </div></div><div class="lbl" style="margin-top:50px">${o.note}</div></div>`, s);
    tl.fromTo(q(c, ".brandlogo"), { opacity: 1, scale: 0.6, rotation: -20 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: E.pop }, 0.0);
    words(tl, c.children[1], o.headTimes, { from: 0.2 });
    tl.fromTo(q(c, ".flip"), { opacity: 0, y: 80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: E.enter }, o.cardAt);
    const pv = q(c, ".pv"), px = { v: 0 };
    tl.fromTo(pv, { opacity: 0 }, { opacity: 1, duration: 0.2 }, o.priceAt);
    tl.fromTo(px, { v: 0 }, { v: o.front, duration: 0.8, ease: "power2.out", onUpdate: () => (pv.textContent = "US$ " + Math.round(px.v)) }, o.priceAt);
    for (let i = 0; i < 5; i++) N.sfx("tick", o.priceAt + i * 0.12, -12);
    words(tl, c.children[3], [o.noteAt]);
    tl.fromTo(q(c, ".flip"), { rotationY: 0 }, { rotationY: 180, duration: 0.7, ease: E.snap, immediateRender: false }, o.flipAt);
    N.sfx("whoosh", o.flipAt - 0.1, -10);
    N.sfx("whoosh", o.t1 - 0.4, -4);
    return s;
  };

  /* ---------- COU: batida de marca escura ---------- */
  N.brandBeat = function (tl, o) {
    const s = scene(tl, "dark", o.t0, o.t1);
    const c = el(`<div class="center"><div class="h2" style="color:#fff">${o.line}</div><img src="assets/nexools-wordmark-ondark.png" style="height:150px;margin-top:70px" alt="Nexools"></div>`, s);
    N.darkOn(tl, o.t0 - 0.1, 0.2);
    words(tl, c.children[0], o.lineTimes);
    tl.fromTo(c.children[1], { opacity: 0, scale: 0.8, filter: "blur(20px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, ease: E.enter }, o.logoAt - 0.1);
    N.sfx("impact", o.logoAt - 0.1, -6);
    return s;
  };

  /* ---------- COU: anel de meses + preço ---------- */
  N.ringPrice = function (tl, o) {
    const s = scene(tl, o.dark ? "dark" : "", o.t0, o.t1);
    const R = 250, C = 2 * Math.PI * R, seg = C / o.months;
    const arcs = Array.from({ length: o.months }, (_, i) => `<circle cx="280" cy="280" r="${R}" fill="none" stroke="#005afc" stroke-width="34" stroke-dasharray="${seg - 10} ${C}" stroke-dashoffset="${-i * seg}" transform="rotate(-90 280 280)" class="arc"/>`).join("");
    const c = el(`<div class="center">${o.logo ? `<div class="floaty rlogo" style="position:relative;width:120px;height:120px;margin-bottom:30px">${N.logo(o.logo, 70)}</div>` : ""}<div class="oldp">${o.old}<div class="strike"></div></div>
      <div class="ring-wrap" style="margin-top:50px"><svg class="ring" viewBox="0 0 560 560"><circle cx="280" cy="280" r="${R}" fill="none" stroke="${o.dark ? "rgba(255,255,255,.1)" : "#e3ebfa"}" stroke-width="34"/>${arcs}</svg>
        <div class="ring-in"><div class="m">${o.months}</div><div class="u">meses</div></div></div>
      <div class="price" style="margin-top:20px"><div class="glow"></div><span class="cur">R$</span><span class="val" style="font-size:210px">${o.price}</span></div></div>`, s);
    if (o.dark) { qa(c, ".m,.u").forEach((n) => (n.style.color = "#fff")); q(c, ".oldp").style.color = "rgba(255,255,255,.6)"; q(c, ".price .val").style.color = "#fff"; }
    if (o.logo) tl.fromTo(q(c, ".rlogo"), { opacity: 0, scale: 0.4, rotation: -30 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: E.pop }, o.t0 + 0.05);
    tl.fromTo(q(c, ".oldp"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, o.t0);
    tl.fromTo(q(c, ".oldp .strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: E.move }, o.t0 + 0.3);
    tl.fromTo(qa(c, ".arc"), { opacity: 0 }, { opacity: 1, duration: 0.12, stagger: (o.ringDur || 0.8) / o.months }, o.ringAt);
    for (let i = 0; i < o.months; i += 2) N.sfx("tick", o.ringAt + i * ((o.ringDur || 0.8) / o.months), -12);
    tl.fromTo(q(c, ".ring-wrap"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: E.enter }, o.ringAt - 0.2);
    const pr = q(c, ".price");
    tl.fromTo(pr, { opacity: 0, scale: 0.6, filter: "blur(18px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.4)" }, o.priceAt - 0.1);
    N.sfx("impact", o.priceAt - 0.1, -4);
    return s;
  };

  /* ---------- COU: mosaico de cursos + certificado ---------- */
  N.mosaic = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const cats = { tec: "#0a3dbd,#4d8dff", ia: "#7c5cff,#ff5ca8", neg: "#ff7a59,#ffb020", mais: "#12b76a,#0a8f86" };
    const courses = [
      ["Python para Análise de Dados", "Tecnologia", "tec"], ["IA Generativa na Prática", "Inteligência artificial", "ia"], ["Gestão de Projetos", "Negócios", "neg"],
      ["Desenvolvimento Web", "Tecnologia", "tec"], ["Machine Learning", "Inteligência artificial", "ia"], ["Marketing Digital", "Negócios", "neg"],
      ["UX Design", "Design", "mais"], ["Finanças Pessoais", "Negócios", "neg"], ["Prompt Engineering", "Inteligência artificial", "ia"],
      ["Cloud Computing", "Tecnologia", "tec"], ["Liderança", "Negócios", "neg"], ["Inglês para Negócios", "Idiomas", "mais"],
      ["Cibersegurança", "Tecnologia", "tec"], ["Visão Computacional", "Inteligência artificial", "ia"], ["Excel Avançado", "Negócios", "neg"],
      ["SQL Essencial", "Tecnologia", "tec"], ["Ética em IA", "Inteligência artificial", "ia"], ["Comunicação", "Carreira", "mais"],
    ];
    const m = el(`<div class="mosaic" data-layout-allow-overlap data-layout-allow-occlusion aria-hidden="true"></div>`, s);
    const colsN = 4, per = Math.ceil(courses.length / colsN);
    const cols = [];
    for (let k = 0; k < colsN; k++) {
      const col = el(`<div class="mcol" style="left:${k * 360}px"></div>`, m);
      for (let r = 0; r < per + 2; r++) {
        const cc = courses[(k * per + r) % courses.length];
        el(`<div class="ccard" data-cat="${cc[2]}" data-layout-allow-overlap data-layout-allow-occlusion><div class="top" style="background:linear-gradient(135deg,${cats[cc[2]]})"></div><div class="t" data-layout-allow-overlap data-layout-allow-occlusion>${cc[0]}</div><div class="g" data-layout-allow-overlap data-layout-allow-occlusion>${cc[1]}</div><div class="hl"></div></div>`, col);
      }
      cols.push(col);
      tl.fromTo(col, { y: k % 2 ? -300 : 0 }, { y: k % 2 ? 0 : -300, duration: o.t1 - o.t0, ease: "none" }, o.t0);
    }
    tl.fromTo(m, { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 0.7, ease: E.enter }, o.t0);
    const chip = el(`<div class="topchip acct" style="justify-content:center" data-layout-allow-overlap data-layout-allow-occlusion><span style="width:70px;height:70px;border-radius:22px;background:#fff;display:flex;align-items:center;justify-content:center">${N.logo("coursera", 48)}</span>+ milhares de cursos</div>`, s);
    tl.fromTo(chip, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.5, ease: E.pop }, o.chipAt);
    N.sfx("pop", o.chipAt, -6);
    const word = el(`<div class="catword" data-layout-allow-overlap data-layout-allow-occlusion><span></span></div>`, s);
    const ws = q(word, "span");
    o.cats.forEach((cat, i) => {
      tl.set(ws, { textContent: cat.label }, cat.t - 0.05);
      tl.fromTo(word, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: E.pop, immediateRender: i === 0 }, cat.t - 0.05);
      qa(m, `.ccard[data-cat="${cat.key}"] .hl`).forEach((h) => tl.fromTo(h, { opacity: 0 }, { opacity: 1, duration: 0.25, immediateRender: false }, cat.t));
      qa(m, `.ccard:not([data-cat="${cat.key}"]) .hl`).forEach((h) => tl.to(h, { opacity: 0, duration: 0.2 }, cat.t));
      N.sfx("tick", cat.t, -8);
    });
    // certificado
    const cert = el(`<div class="center" data-layout-allow-overlap data-layout-allow-occlusion><div class="cert"><div class="ct">Certificado de conclusão</div><div class="cn">${o.certTitle}</div><div class="cl"></div><div class="cs">${o.certSub}</div>
      <svg class="seal" viewBox="0 0 100 100"><circle id="sl" cx="50" cy="50" r="40" fill="none" stroke="#005afc" stroke-width="6"/><path id="sk" d="M32 51l12 12 24-26" fill="none" stroke="#005afc" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>`, s);
    tl.to([m, chip, word], { filter: "blur(10px)", opacity: 0.35, duration: 0.5, ease: E.move }, o.certAt - 0.1);
    tl.fromTo(q(cert, ".cert"), { opacity: 0, y: 200, rotation: 6, scale: 0.9 }, { opacity: 1, y: 0, rotation: -2, scale: 1, duration: 0.7, ease: E.enter }, o.certAt - 0.1);
    const sl = q(cert, "#sl"), sk = q(cert, "#sk");
    sl.style.strokeDasharray = 252; sk.style.strokeDasharray = 60;
    tl.fromTo(sl, { strokeDashoffset: 252 }, { strokeDashoffset: 0, duration: 0.6, ease: E.move }, o.certAt + 0.5);
    tl.fromTo(sk, { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 0.35, ease: E.move }, o.certAt + 1.0);
    N.sfx("whoosh", o.certAt - 0.3, -8);
    N.sfx("chime", o.certAt + 1.0, -6);
    return s;
  };

  /* ---------- COU-B: trajetória ---------- */
  N.pathSkill = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const h = el(`<div class="center" style="justify-content:flex-start;padding-top:340px"><div class="h1" data-accent="nova|habilidade">${o.head}</div></div>`, s);
    words(tl, h.children[0], o.headTimes, { from: 0.25 });
    el(`<svg class="path" viewBox="0 0 1080 1920"><path id="pp" d="M210 1340 C 420 1280, 380 1000, 600 960 S 860 840, 820 760" fill="none" stroke="#005afc" stroke-width="10" stroke-linecap="round" stroke-dasharray="14 18"/></svg>`, s);
    const today = el(`<div class="today" style="left:120px;top:1360px">hoje</div>`, s);
    const node = el(`<div class="node" style="left:560px;top:640px">${o.node}</div>`, s);
    const pp = q(s, "#pp");
    tl.fromTo(today, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: E.pop }, o.drawAt - 0.2);
    tl.fromTo(pp, { opacity: 0 }, { opacity: 1, duration: 0.01 }, o.drawAt);
    // desenho por máscara: clipPath de retângulo crescendo é complexo; usamos dashoffset em cópia sólida
    const solid = pp.cloneNode(); solid.setAttribute("stroke-dasharray", "1400"); solid.setAttribute("stroke-dashoffset", "1400"); solid.removeAttribute("id"); pp.parentNode.appendChild(solid);
    pp.setAttribute("opacity", "0.25");
    tl.fromTo(solid, { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: o.drawDur || 1.4, ease: E.move }, o.drawAt);
    tl.fromTo(node, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: E.pop }, o.nodeAt);
    tl.fromTo(node, { boxShadow: "0 0 0 0 rgba(0,90,252,0.5)" }, { boxShadow: "0 0 0 40px rgba(0,90,252,0)", duration: 0.9, ease: "power2.out", immediateRender: false }, o.nodeAt + 0.3);
    N.sfx("riser", o.nodeAt - 0.85, -10);
    N.sfx("chime", o.nodeAt, -8);
    return s;
  };

  /* ---------- COU-B: roleta de palavras ---------- */
  N.wordSlot = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const c = el(`<div class="center"><div class="h2">${o.prefix}</div><div class="slot"><div class="slotcol">${o.words.map((w) => `<div>${w.text}</div>`).join("")}</div></div></div>`, s);
    words(tl, c.children[0], [o.t0 + 0.05]);
    const col = q(c, ".slotcol");
    tl.fromTo(q(c, ".slot"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, o.words[0].t - 0.15);
    o.words.forEach((w, i) => {
      if (i === 0) tl.fromTo(col, { y: 150 }, { y: 0, duration: 0.35, ease: "back.out(1.6)" }, w.t - 0.15);
      else tl.to(col, { y: -i * 150, duration: 0.35, ease: "back.out(1.6)" }, w.t - 0.15);
      N.sfx("tick", w.t - 0.1, -6);
    });
    return s;
  };

  /* ---------- COU-B: universidades + empresas -> player ---------- */
  N.converge = function (tl, o) {
    const s = scene(tl, "", o.t0, o.t1);
    const mk = (labels) => labels.map((l) => `<div class="scard"><i></i>${l}</div>`).join("");
    const L = el(`<div class="stack" style="left:60px;top:430px"><div class="lbl" style="margin-bottom:20px;text-align:left">${o.leftLabel}</div>${mk(o.left)}</div>`, s);
    const Rr = el(`<div class="stack" style="left:620px;top:430px"><div class="lbl" style="margin-bottom:20px;text-align:left">${o.rightLabel}</div>${mk(o.right)}</div>`, s);
    tl.fromTo(L, { opacity: 0, x: -300 }, { opacity: 1, x: 0, duration: 0.6, ease: E.enter }, o.leftAt - 0.1);
    tl.fromTo(Rr, { opacity: 0, x: 300 }, { opacity: 1, x: 0, duration: 0.6, ease: E.enter }, o.rightAt - 0.1);
    N.sfx("whoosh", o.leftAt - 0.3, -10); N.sfx("whoosh", o.rightAt - 0.3, -10);
    const pl = el(`<div class="player"><div class="acct" style="margin-bottom:26px;font-size:40px;font-weight:700"><span style="width:70px;height:70px;border-radius:22px;background:#fff;display:flex;align-items:center;justify-content:center">${N.logo("coursera", 48)}</span>Coursera</div><div class="scr"><div class="play" style="background:rgba(255,255,255,.95)">${ICON.play}</div></div><div class="pb"><div></div></div><div class="speed">Velocidade <b class="sp">1x</b></div></div>`, s);
    tl.to([L, Rr], { y: -160, scale: 0.8, opacity: 0.5, duration: 0.6, ease: E.move }, o.playerAt - 0.2);
    tl.fromTo(pl, { opacity: 0, y: 200, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: E.enter }, o.playerAt - 0.1);
    N.sfx("pop", o.playerAt, -8);
    tl.fromTo(q(pl, ".pb div"), { scaleX: 0 }, { scaleX: 0.65, duration: o.t1 - o.playerAt, ease: "none" }, o.playerAt);
    const sp = q(pl, ".sp");
    tl.set(sp, { textContent: "1,5x" }, o.rhythmAt);
    tl.fromTo(q(pl, ".speed"), { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, o.rhythmAt);
    N.sfx("click", o.rhythmAt, -4);
    return s;
  };

  N.done = function (tl, id) { window.__timelines[id] = tl; };
})();
