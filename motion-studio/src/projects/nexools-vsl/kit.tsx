// Nexools VSL kit — 1920×1080 @ 60 fps. Motion standard: launch-motion (nothing linear, soft overshoot on entry,
// exits ~60% of entry, 3–5 frame offsets, nothing fully still) + premium-motion-director rules.
import React from 'react';
import {continueRender, delayRender, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ease, mix, progress, springIn, drift, keyframes} from '../../lib';
import data from './align.json';

/* ------------------------------------------------------------------ time */
export const FPS = 60;
export const fr = (s: number) => Math.round(s * FPS);
type W = {w: string; t: number; sec: string};
type Sec = {id: string; start: number; end: number};
export const WORDS = data.words as W[];
export const SECS = data.sections as Sec[];
export const CAPS = data.captions as {t: number; end: number; text: string}[];
export const TOTAL_S = data.total as number;
const clean = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
export const SEC = (id: string) => {
  const s = SECS.find((x) => x.id === id);
  if (!s) throw new Error(`section ${id} not found`);
  return {from: fr(s.start), to: fr(s.end)};
};
/** Frame of the nth word in section `id` that starts with `key`. Throws if missing (sync must never be guessed). */
export const T = (id: string, key: string, nth = 0) => {
  const k = clean(key);
  const list = WORDS.filter((w) => w.sec === id && clean(w.w).startsWith(k));
  if (!list[nth]) throw new Error(`word "${key}"#${nth} not found in ${id}`);
  return fr(list[nth].t);
};
/** Frames of the consecutive words of `phrase` (first occurrence in section). */
export const TS = (id: string, phrase: string, nth = 0) => {
  const toks = phrase.split(/\s+/).map(clean);
  const sw = WORDS.filter((w) => w.sec === id);
  let found = -1;
  let count = 0;
  for (let i = 0; i <= sw.length - toks.length; i++) {
    if (toks.every((t, j) => clean(sw[i + j].w).startsWith(t))) {
      if (count === nth) { found = i; break; }
      count++;
    }
  }
  if (found < 0) throw new Error(`phrase "${phrase}" not found in ${id}`);
  return toks.map((_, j) => fr(sw[found + j].t));
};

/* ----------------------------------------------------------------- tokens */
export const C = {
  paper: '#F4F7FC', white: '#FFFFFF', blue: '#005AFC', blue2: '#4D8DFF', blueSoft: '#E6EFFF', navy: '#0B162A', navy2: '#16233D',
  ink: '#0B162A', ink2: '#56607A', line: '#DCE3EF', red: '#E5484D', redSoft: '#FDECEC', green: '#12A150', greenSoft: '#E3F6EA', amber: '#F5A524',
};
export const FD = '"Inter Display", "Inter", system-ui, sans-serif';
export const FU = '"Inter", system-ui, sans-serif';
export const SHADOW = '0 30px 80px -24px rgba(11,22,42,0.28), 0 8px 24px -12px rgba(11,22,42,0.18)';
export const SHADOW_DARK = '0 40px 100px -30px rgba(0,0,0,0.7)';

let fontsStarted = false;
export const ensureInterDisplay = () => {
  if (fontsStarted || typeof document === 'undefined') return;
  fontsStarted = true;
  const css = [400, 500, 600, 700].map((w) => {
    const n = {400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold'}[w];
    return `@font-face{font-family:"Inter Display";src:url(${staticFile(`nexools-vsl/fonts/InterDisplay-${n}.otf`)}) format("opentype");font-weight:${w};}`;
  }).join('');
  const el = document.createElement('style');
  el.textContent = css;
  document.head.appendChild(el);
  const h = delayRender('Inter Display');
  Promise.all([400, 500, 600, 700].map((w) => document.fonts.load(`${w} 40px "Inter Display"`, 'R$ 297ãç')))
    .then((r) => { if (r.some((x) => x.length === 0)) throw new Error('Inter Display failed to load'); continueRender(h); })
    .catch((e) => { throw e; });
};

/* ---------------------------------------------------------------- motion */
/** Entry 0→1 with a soft overshoot (launch-motion: damping ~14). */
export const useIn = (at: number, preset: 'snappy' | 'precise' | 'calm' | 'heavy' = 'snappy') => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return frame < at ? 0 : springIn(frame, fps, at, preset);
};
/** Exit 1→0, faster than the entry and eased in. */
export const useOut = (at: number | undefined, dur = 18) => {
  const frame = useCurrentFrame();
  return at === undefined ? 1 : 1 - progress(frame, at, dur, ease.in);
};

/** Generic element entering from below with overshoot and leaving faster. Nothing ever stops: tiny drift while held. */
export const Pop: React.FC<{at: number; out?: number; dy?: number; dx?: number; scale?: number; seed?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({
  at, out, dy = 40, dx = 0, scale = 0.92, seed = 0, children, style,
}) => {
  const frame = useCurrentFrame();
  const e = useIn(at);
  const o = useOut(out);
  // Keep the slot in the layout before entry / after exit so siblings never reflow (no jumps).
  if (frame < at || o <= 0.001) return <div style={{...style, visibility: 'hidden'}}>{children}</div>;
  const v = Math.min(1, e);
  const hold = drift(frame, seed, 0.6) * 3;
  return (
    <div style={{...style, opacity: Math.min(1, e * 1.6) * o,
      transform: `translate(${(1 - e) * dx}px, ${(1 - e) * dy + (1 - o) * -24 + hold}px) scale(${mix(scale, 1, e) * mix(0.96, 1, o)})`,
      filter: v < 0.6 ? `blur(${(0.6 - v) * 10}px)` : undefined}}>
      {children}
    </div>
  );
};

/** Big kinetic line synced to narration word frames. */
export const Kin: React.FC<{text: string; starts: number[]; size?: number; color?: string; hl?: string[]; hlColor?: string; weight?: number; out?: number; maxWidth?: number; align?: 'center' | 'left'}> = ({
  text, starts, size = 96, color = C.ink, hl = [], hlColor = C.blue, weight = 700, out, maxWidth = 1500, align = 'center',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(/\s+/);
  const H = new Set(hl.map(clean));
  const o = useOut(out);
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', columnGap: size * 0.26, rowGap: size * 0.05,
      maxWidth, fontFamily: FD, fontWeight: weight, fontSize: size, letterSpacing: '-0.035em', lineHeight: 1.05, opacity: o, transform: `translateY(${(1 - o) * -20}px)`}}>
      {words.map((w, i) => {
        const at = starts[Math.min(i, starts.length - 1)] - 4;
        const e = frame < at ? 0 : springIn(frame, fps, at, 'snappy');
        return (
          <span key={i} style={{display: 'inline-block', overflow: 'hidden', paddingBottom: size * 0.1, marginBottom: -size * 0.1}}>
            <span style={{display: 'inline-block', color: H.has(clean(w)) ? hlColor : color, transform: `translateY(${(1 - Math.min(e, 1.04)) * 105}%)`, opacity: e > 0 ? 1 : 0}}>{w}</span>
          </span>
        );
      })}
    </div>
  );
};

/** Red strike that draws across its children. */
export const Strike: React.FC<{at: number; color?: string; children: React.ReactNode; thickness?: number}> = ({at, color = C.red, children, thickness = 0.09}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, at, 16, ease.inOut);
  return (
    <span style={{position: 'relative', display: 'inline-block'}}>
      <span style={{opacity: mix(1, 0.5, p)}}>{children}</span>
      <span style={{position: 'absolute', left: '-4%', right: '-4%', top: '50%', height: `${thickness}em`, background: color, borderRadius: 99, transformOrigin: 'left', transform: `translateY(-50%) scaleX(${p}) rotate(-1.2deg)`}} />
    </span>
  );
};

/** Count-up over ~1 s (never jumps). */
export const Count: React.FC<{at: number; from: number; to: number; dur?: number; fmt?: (v: number) => string}> = ({at, from, to, dur = 60, fmt}) => {
  const frame = useCurrentFrame();
  const v = mix(from, to, progress(frame, at, dur, ease.out));
  return <>{fmt ? fmt(v) : Math.round(v).toLocaleString('pt-BR')}</>;
};

/* ------------------------------------------------------------------ atoms */
export const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties; dark?: boolean}> = ({children, style, dark}) => (
  <div style={{background: dark ? C.navy2 : C.white, borderRadius: 36, boxShadow: dark ? SHADOW_DARK : SHADOW, border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(11,22,42,0.06)'}`, ...style}}>{children}</div>
);
export const Chip: React.FC<{children: React.ReactNode; tone?: 'blue' | 'navy' | 'red' | 'green' | 'ghost' | 'white'; size?: number; style?: React.CSSProperties}> = ({children, tone = 'blue', size = 34, style}) => {
  const t = {blue: [C.blueSoft, C.blue], navy: [C.navy, '#fff'], red: [C.redSoft, C.red], green: [C.greenSoft, C.green], ghost: ['rgba(255,255,255,0.1)', '#fff'], white: ['#fff', C.ink]}[tone];
  return <span style={{display: 'inline-flex', alignItems: 'center', gap: size * 0.35, padding: `${size * 0.36}px ${size * 0.7}px`, borderRadius: 999, background: t[0], color: t[1], fontFamily: FD, fontWeight: 600, fontSize: size, whiteSpace: 'nowrap', ...style}}>{children}</span>;
};

/* original line icons (24px grid) */
const P: Record<string, string> = {
  check: 'M4 12.5 9.5 18 20 6', x: 'M6 6l12 12M18 6 6 18', lockBody: 'M5 11h14v10H5z', key: 'M12 15v3',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6', card: 'M3 6h18v12H3zM3 10h18M7 15h4',
  chat: 'M4 5h16v11H9l-5 4z', phone: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2',
  laptop: 'M5 5h14v10H5zM2 19h20', play: 'M8 5v14l11-7z', cert: 'M5 3h14v13H5zM9 7h6M9 10h6M12 16l-2 5 2-1 2 1-2-5', star: 'M12 3l2.7 5.6 6.2.9-4.5 4.4 1 6.1L12 17l-5.5 3 1-6.1L3 9.5l6.2-.9z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2', mail: 'M3 5h18v14H3zM3 6l9 7 9-7', shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  arrowDown: 'M12 4v16M5 13l7 7 7-7', bus: 'M5 4h14v12H5zM5 11h14M8 19v-3M16 19v-3M8 14h.01M16 14h.01', coffee: 'M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 11h2a2 2 0 0 1 0 4h-2M8 3v3M12 3v3',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18', calendar: 'M4 5h16v15H4zM4 9h16M9 3v4M15 3v4',
  wifiOff: 'M3 3l18 18M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5-2.8M14 10.2A10 10 0 0 1 19 13M12 20h.01', repeat: 'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3',
  pix: 'M12 3l9 9-9 9-9-9z', bolt: 'M13 2 4 14h7l-1 8 9-12h-7z', linked: 'M4 4h16v16H4zM8 10v6M8 7v.01M12 16v-4a2 2 0 0 1 4 0v4',
};
export type IconName = keyof typeof P;
export const Ico: React.FC<{n: IconName; size?: number; color?: string; stroke?: number}> = ({n, size = 32, color = C.blue, stroke = 2}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={P[n]} />
  </svg>
);

/** Padlock that closes at `closeAt` (shackle drops) or opens at `openAt`. */
export const Lock: React.FC<{size?: number; color?: string; closeAt?: number; openAt?: number; fill?: string}> = ({size = 120, color = C.blue, closeAt, openAt, fill}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  let closed = 1;
  if (closeAt !== undefined) closed = frame < closeAt ? 0 : springIn(frame, fps, closeAt, 'snappy');
  if (openAt !== undefined) closed = 1 - (frame < openAt ? 0 : springIn(frame, fps, openAt, 'snappy'));
  const lift = (1 - closed) * 5;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M8 ${11 - lift}V7a4 4 0 0 1 8 0v${4 + (1 - closed) * 0}`} transform={`translate(${(1 - closed) * 3} 0)`} />
      <rect x="5" y="11" width="14" height="10" rx="2.5" fill={fill ?? 'none'} />
      <path d="M12 15v2.5" />
    </svg>
  );
};

export const CourseraMark: React.FC<{size?: number; color?: string}> = ({size = 48, color = '#0056D2'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><path fill={color} d="M11.374 23.977c-4.183-.21-8.006-2.626-9.959-6.347-2.097-3.858-1.871-8.864.732-12.454C4.748 1.338 9.497-.698 14.281.23c4.583.857 8.351 4.494 9.358 8.911 1.122 4.344-.423 9.173-3.925 12.04-2.289 1.953-5.295 2.956-8.34 2.797zm7.705-8.05a588.737 588.737 0 0 0-3.171-1.887c-.903 1.483-2.885 2.248-4.57 1.665-2.024-.639-3.394-2.987-2.488-5.134.801-2.009 2.79-2.707 4.357-2.464a4.19 4.19 0 0 1 2.623 1.669c1.077-.631 2.128-1.218 3.173-1.855-2.03-3.118-6.151-4.294-9.656-2.754-3.13 1.423-4.89 4.68-4.388 7.919.54 3.598 3.73 6.486 7.716 6.404a7.664 7.664 0 0 0 6.404-3.563z" /></svg>
);
export const Logo: React.FC<{dark?: boolean; height?: number}> = ({dark, height = 44}) => (
  <Img src={staticFile(`nexools-vsl/nexools-wordmark${dark ? '-ondark' : ''}.png`)} style={{height}} />
);

/** Course tile like the validated COU-A grid (gradient cover + title + area). */
export const TILE_GRAD = [['#FF8A3D', '#FF5E7E'], ['#2F80FF', '#6A5BFF'], ['#18B37E', '#2FD6A0'], ['#9B5BFF', '#E05BFF'], ['#FFB020', '#FF7A30'], ['#1FA2FF', '#12D8FA']];
export const Tile: React.FC<{title: string; area: string; i: number; w?: number}> = ({title, area, i, w = 300}) => {
  const g = TILE_GRAD[i % TILE_GRAD.length];
  return (
    <div style={{width: w, background: '#fff', borderRadius: 26, boxShadow: SHADOW, overflow: 'hidden', fontFamily: FD}}>
      <div style={{height: w * 0.42, background: `linear-gradient(135deg, ${g[0]}, ${g[1]})`}} />
      <div style={{padding: '16px 20px 20px'}}>
        <div style={{fontWeight: 700, fontSize: w * 0.075, color: C.ink, lineHeight: 1.15}}>{title}</div>
        <div style={{fontWeight: 500, fontSize: w * 0.055, color: C.ink2, marginTop: 6}}>{area}</div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------- framing */
/** Scene layer: mounts between from/to with a quick dissolve and a constant micro push-in (camera never stops). */
export const Scene: React.FC<{from: number; to: number; children: React.ReactNode; push?: number; fadeIn?: number; fadeOut?: number}> = ({from, to, children, push = 0.035, fadeIn = 16, fadeOut = 12}) => {
  const frame = useCurrentFrame();
  // Sequential handoff: this scene is gone before the next one's first word lands (no double exposure).
  if (frame < from - 1 || frame > to) return null;
  const a = progress(frame, from, fadeIn, ease.out);
  const b = 1 - progress(frame, to - fadeOut - 2, fadeOut, ease.in);
  const k = mix(1, 1 + push, progress(frame, from, Math.max(1, to - from), ease.inOut));
  return (
    <div style={{position: 'absolute', inset: 0, opacity: Math.min(a, b), transform: `scale(${k * mix(0.985, 1, a)})`}}>
      {children}
    </div>
  );
};
export const Center: React.FC<{children: React.ReactNode; top?: number; style?: React.CSSProperties}> = ({children, top = 0, style}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top, bottom: 190, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 34, ...style}}>{children}</div>
);

/** Background: light paper ↔ navy, blended by `dark` keyframes; soft moving light blobs. */
export const Backdrop: React.FC<{dark: number}> = ({dark}) => {
  const frame = useCurrentFrame();
  const x1 = 30 + drift(frame, 1, 0.5) * 8;
  const y1 = 30 + drift(frame, 2, 0.5) * 8;
  const x2 = 72 + drift(frame, 3, 0.5) * 8;
  const y2 = 70 + drift(frame, 4, 0.5) * 8;
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at ${x1}% ${y1}%, #FFFFFF 0%, transparent 55%), radial-gradient(circle at ${x2}% ${y2}%, #DCE8FF 0%, transparent 50%), ${C.paper}`}} />
      <div style={{position: 'absolute', inset: 0, opacity: dark, background: `radial-gradient(circle at ${x2}% ${y1}%, #1B3A7A 0%, transparent 55%), radial-gradient(circle at ${x1}% ${y2}%, #0F2550 0%, transparent 50%), ${C.navy}`}} />
    </div>
  );
};

/** Narration captions (lower third), color follows the background. */
export const Captions: React.FC<{dark: number}> = ({dark}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const i = CAPS.findIndex((c) => t >= c.t && t < c.end);
  if (i < 0) return null;
  const c = CAPS[i];
  const p = progress(frame, fr(c.t), 8, ease.out);
  const onDark = dark > 0.5;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 924, display: 'flex', justifyContent: 'center'}}>
      <div style={{fontFamily: FD, fontWeight: 600, fontSize: 42, letterSpacing: '-0.01em', color: onDark ? '#fff' : C.ink, padding: '12px 28px', borderRadius: 18,
        background: onDark ? 'rgba(4,10,24,0.62)' : 'rgba(255,255,255,0.86)', boxShadow: onDark ? 'none' : '0 10px 30px -14px rgba(11,22,42,0.3)',
        opacity: mix(0.3, 1, p), transform: `translateY(${(1 - p) * 10}px)`, maxWidth: 1500, textAlign: 'center'}}>{c.text}</div>
    </div>
  );
};

export const Footer: React.FC<{dark: number}> = ({dark}) => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 18, textAlign: 'center', fontFamily: FU, fontSize: 17, color: dark > 0.5 ? 'rgba(255,255,255,0.55)' : 'rgba(11,22,42,0.5)'}}>
    Nexools é revendedora independente. Marcas citadas pertencem aos seus respectivos donos.
  </div>
);

export {keyframes, progress, ease, mix, drift};
