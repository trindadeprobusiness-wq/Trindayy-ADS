// Nexools Meta Ads kit — 1080×1920 @ 60 fps, dark high-contrast. Motion: launch-motion + hyperframes-animation rules
// (kinetic beat slam, ASR keyword glow captions, counting with dynamic scale, press-release spring, particle burst).
import React from 'react';
import {AbsoluteFill, Html5Audio, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {MusicBed, SfxCues, Grain, Vignette, SafeArea} from '../../lib';
import type {SfxCue} from '../../lib';
import {ease, mix, progress, springIn, drift} from '../../lib';
import {FD, FU, ensureInterDisplay, Ico} from '../nexools-vsl/kit';
export {Pop, Kin, Strike, Count, Ico, Lock, CourseraMark, Tile, useIn, useOut, FD, FU} from '../nexools-vsl/kit';

export const FPS = 60;
export const fr = (s: number) => Math.round(s * FPS);
export const D = {
  bg: '#040814', panel: '#0D1526', panel2: '#121D36', line: 'rgba(255,255,255,0.10)', blue: '#3D8BFF', blueDeep: '#005AFC', ice: '#A9C8FF',
  white: '#FFFFFF', muted: 'rgba(255,255,255,0.64)', red: '#FF4D5E', green: '#2BD67B', amber: '#FFC23D',
};
export const GLOW = (c = D.blue, r = 40) => `0 0 ${r}px ${c}88, 0 0 ${r * 2.2}px ${c}44`;
const clean = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');

type W = {w: string; t: number; sec: string};
type AlignData = {total: number; words: W[]; sections: {id: string; start: number; end: number}[]};
/** Time helpers bound to one ad's narration alignment. Missing words throw: sync is never guessed. */
export const timing = (data: AlignData) => {
  const words = data.words;
  const SEC = (id: string) => {
    const s = data.sections.find((x) => x.id === id);
    if (!s) throw new Error(`section ${id}`);
    return {from: fr(s.start), to: fr(s.end)};
  };
  const T = (id: string, key: string, nth = 0) => {
    const k = clean(key);
    const l = words.filter((w) => w.sec === id && clean(w.w).startsWith(k));
    if (!l[nth]) throw new Error(`word "${key}"#${nth} not in ${id}`);
    return fr(l[nth].t);
  };
  const TS = (id: string, phrase: string) => {
    const toks = phrase.split(/\s+/).map(clean);
    const sw = words.filter((w) => w.sec === id);
    for (let i = 0; i <= sw.length - toks.length; i++) if (toks.every((t, j) => clean(sw[i + j].w).startsWith(t))) return toks.map((_, j) => fr(sw[i + j].t));
    throw new Error(`phrase "${phrase}" not in ${id}`);
  };
  return {SEC, T, TS, words, total: data.total};
};

/* --------------------------------------------------------------- stage */
export const Stage: React.FC<{children: React.ReactNode; top?: number; gap?: number; style?: React.CSSProperties}> = ({children, top = 250, gap = 40, style}) => (
  <div style={{position: 'absolute', left: 64, right: 64, top, height: 1240 - top, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap, ...style}}>{children}</div>
);

/** Dark backdrop: deep navy, two drifting light pools, faint perspective grid, optional red tension tint. */
export const DarkBG: React.FC<{tension?: number; flash?: number}> = ({tension = 0, flash = 0}) => {
  const f = useCurrentFrame();
  const x1 = 30 + drift(f, 1, 0.5) * 10, y1 = 28 + drift(f, 2, 0.5) * 8, x2 = 70 + drift(f, 3, 0.5) * 10, y2 = 72 + drift(f, 4, 0.5) * 8;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: `radial-gradient(circle at ${x1}% ${y1}%, #12306E 0%, transparent 46%), radial-gradient(circle at ${x2}% ${y2}%, #0B2257 0%, transparent 44%), ${D.bg}`}} />
      <AbsoluteFill style={{opacity: tension, background: `radial-gradient(circle at 50% 40%, #5A0F1E 0%, transparent 60%)`}} />
      <AbsoluteFill style={{opacity: 0.12, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '90px 90px', backgroundPosition: `0 ${(f * 0.4) % 90}px`, maskImage: 'radial-gradient(circle at 50% 45%, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 0%, transparent 70%)'}} />
      {flash > 0 && <AbsoluteFill style={{background: '#fff', opacity: flash}} />}
    </AbsoluteFill>
  );
};

/** Reels-style captions: 1–3 word groups, each word pops on its own timestamp; the word being spoken glows blue. */
export const ReelsCaptions: React.FC<{words: W[]; y?: number; hide?: [number, number][]}> = ({words, y = 1268, hide = []}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const groups = React.useMemo(() => {
    const g: W[][] = [];
    let cur: W[] = [];
    words.forEach((w, i) => {
      cur.push(w);
      const nxt = words[i + 1];
      if (!nxt || nxt.sec !== w.sec || /[.,?!:]$/.test(w.w) || cur.length >= 3 || cur.map((x) => x.w).join(' ').length > 18) { g.push(cur); cur = []; }
    });
    return g;
  }, [words]);
  const t = frame / FPS;
  if (hide.some(([a, b]) => frame >= a && frame < b)) return null;
  const gi = groups.findIndex((g, i) => t >= g[0].t - 0.06 && (i + 1 >= groups.length || t < groups[i + 1][0].t - 0.06));
  if (gi < 0) return null;
  const g = groups[gi];
  const lastT = g[g.length - 1].t;
  if (gi === groups.length - 1 && t > lastT + 1.2) return null;
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top: y, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', columnGap: 22, rowGap: 0}}>
      {g.map((w, i) => {
        const at = fr(w.t) - 3;
        const e = frame < at ? 0 : springIn(frame, fps, at, 'snappy');
        const nextT = g[i + 1]?.t ?? (groups[gi + 1]?.[0].t ?? w.t + 0.5);
        const speaking = t >= w.t - 0.03 && t < nextT;
        return (
          <span key={i} style={{fontFamily: FD, fontWeight: 700, fontSize: 86, letterSpacing: '-0.025em', lineHeight: 1.1, color: speaking ? D.blue : D.white,
            opacity: e > 0 ? 1 : 0, transform: `translateY(${(1 - Math.min(e, 1)) * 24}px) scale(${mix(0.7, 1, Math.min(e, 1.08)) * (speaking ? 1.06 : 1)})`,
            textShadow: speaking ? `${GLOW(D.blue, 22)}, 0 6px 18px rgba(0,0,0,0.8)` : '0 6px 18px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)', display: 'inline-block'}}>{w.w}</span>
        );
      })}
    </div>
  );
};

/* ---------------------------------------------------------------- atoms */
export const Glass: React.FC<{children: React.ReactNode; style?: React.CSSProperties; glow?: string}> = ({children, style, glow}) => (
  <div style={{background: `linear-gradient(160deg, ${D.panel2}, ${D.panel})`, border: `1.5px solid ${glow ?? D.line}`, borderRadius: 40,
    boxShadow: `0 40px 90px -30px rgba(0,0,0,0.9)${glow ? `, ${GLOW(glow, 26)}` : ''}`, ...style}}>{children}</div>
);
export const Tag: React.FC<{children: React.ReactNode; tone?: 'blue' | 'red' | 'green' | 'white' | 'ghost'; size?: number; style?: React.CSSProperties}> = ({children, tone = 'blue', size = 40, style}) => {
  const t = {blue: ['rgba(61,139,255,0.16)', D.ice, 'rgba(61,139,255,0.5)'], red: ['rgba(255,77,94,0.14)', '#FF8A95', 'rgba(255,77,94,0.5)'], green: ['rgba(43,214,123,0.14)', '#7DF0B0', 'rgba(43,214,123,0.45)'],
    white: ['#fff', '#0B162A', '#fff'], ghost: ['rgba(255,255,255,0.06)', '#fff', 'rgba(255,255,255,0.18)']}[tone];
  return <span style={{display: 'inline-flex', alignItems: 'center', gap: size * 0.35, padding: `${size * 0.38}px ${size * 0.72}px`, borderRadius: 999, background: t[0], color: t[1],
    border: `2px solid ${t[2]}`, fontFamily: FD, fontWeight: 600, fontSize: size, whiteSpace: 'nowrap', ...style}}>{children}</span>;
};

/** Price slam: drops from oversized to rest with a hit, tiny camera shake and glow (kinetic beat slam). */
export const Slam: React.FC<{at: number; children: React.ReactNode; size?: number; color?: string; glow?: string}> = ({at, children, size = 300, color = D.white, glow = D.blue}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < at) return <div style={{height: size * 1.05}} />;
  const e = springIn(frame, fps, at, 'snappy');
  const hit = Math.max(0, 1 - (frame - at - 6) / 14);
  const shake = frame > at + 4 ? Math.sin((frame - at) * 2.1) * 10 * hit : 0;
  const pulse = 1 + 0.012 * Math.sin((frame - at) * 0.09);
  return (
    <div style={{fontFamily: FD, fontWeight: 700, fontSize: size, lineHeight: 1, letterSpacing: '-0.055em', color, whiteSpace: 'nowrap',
      transform: `translate(${shake}px, ${shake * 0.4}px) scale(${mix(1.9, 1, Math.min(e, 1.04)) * pulse})`, opacity: Math.min(1, e * 2.5),
      filter: e < 0.5 ? `blur(${(0.5 - e) * 24}px)` : undefined, textShadow: GLOW(glow, 50)}}>{children}</div>
  );
};

/** Deterministic spark burst (particle burst rule). */
export const Burst: React.FC<{at: number; x?: number; y?: number; color?: string; n?: number; spread?: number}> = ({at, x = 540, y = 760, color = D.blue, n = 22, spread = 420}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, at, 46, ease.out);
  if (frame < at || p >= 1) return null;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, pointerEvents: 'none'}}>
      {Array.from({length: n}, (_, i) => {
        const a = (i / n) * Math.PI * 2 + (i % 3) * 0.17;
        const r = spread * (0.55 + ((i * 37) % 10) / 22) * p;
        const s = (1 - p) * (6 + (i % 4) * 3);
        return <div key={i} style={{position: 'absolute', left: x + Math.cos(a) * r, top: y + Math.sin(a) * r, width: s * 3, height: s, borderRadius: s,
          background: i % 4 === 0 ? '#fff' : color, opacity: 1 - p, transform: `rotate(${a}rad)`, boxShadow: `0 0 12px ${color}`}} />;
      })}
    </div>
  );
};

/** Light sweep across the whole frame (transition accent). */
export const Sweep: React.FC<{at: number; dur?: number}> = ({at, dur = 26}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, at, dur, ease.inOut);
  if (frame < at || p >= 1) return null;
  return <AbsoluteFill style={{background: `linear-gradient(105deg, transparent ${p * 140 - 40}%, rgba(120,170,255,0.35) ${p * 140 - 20}%, transparent ${p * 140}%)`}} />;
};

/** CTA "Saiba mais" with press-release spring and an arrow pointing to Meta's CTA bar. */
export const CTA: React.FC<{at: number; press: number; label?: string; sub?: string}> = ({at, press, label = 'Saiba mais', sub}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < at) return null;
  const e = springIn(frame, fps, at, 'snappy');
  const pr = frame < press ? 0 : springIn(frame, fps, press, 'playful');
  const squash = frame >= press && frame < press + 6 ? progress(frame, press, 6) : 0;
  const s = (1 - 0.08 * Math.sin(Math.min(1, pr) * Math.PI)) * (1 - 0.02 * squash);
  const bob = Math.sin((frame - at) * 0.13) * 14;
  const ring = progress(frame, press, 40, ease.out);
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, opacity: Math.min(1, e * 1.6), transform: `translateY(${(1 - Math.min(e, 1)) * 60}px)`}}>
      <div style={{position: 'relative'}}>
        {frame >= press && <div style={{position: 'absolute', inset: -10 - ring * 40, borderRadius: 999, border: `4px solid ${D.blue}`, opacity: 1 - ring}} />}
        <div style={{transform: `scale(${s})`, background: `linear-gradient(180deg, #5A9BFF, ${D.blueDeep})`, color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 64,
          padding: '34px 84px', borderRadius: 999, boxShadow: `${GLOW(D.blue, 30)}, inset 0 2px 0 rgba(255,255,255,0.35)`, display: 'flex', alignItems: 'center', gap: 22}}>
          {label}<Ico n="arrowDown" size={56} color="#fff" stroke={2.8} />
        </div>
      </div>
      {sub && <div style={{fontFamily: FD, fontWeight: 600, fontSize: 38, color: D.muted}}>{sub}</div>}
      <div style={{transform: `translateY(${bob}px)`}}><Ico n="arrowDown" size={90} color={D.ice} stroke={2.4} /></div>
    </div>
  );
};

export const Logo: React.FC<{height?: number}> = ({height = 46}) => <Img src={staticFile('nexools-ads/nexools-wordmark-ondark.png')} style={{height}} />;

/** Shell: background, scenes, captions, footer, voice, retention bed, SFX. */
export const AdShell: React.FC<{voice: string; bed: string; total: number; sfx: SfxCue[]; words: W[]; tension?: number; flash?: number; capHide?: [number, number][];
  children: React.ReactNode; debugSafeArea?: boolean; logoUntil?: number}> = ({voice, bed, total, sfx, words, tension, flash, capHide, children, debugSafeArea, logoUntil}) => {
  ensureInterDisplay();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: D.bg, overflow: 'hidden'}}>
      <DarkBG tension={tension} flash={flash} />
      {children}
      <div style={{position: 'absolute', left: 0, right: 0, top: 176, display: 'flex', justifyContent: 'center', opacity: logoUntil !== undefined ? 1 - progress(frame, logoUntil, 14) : 1}}><Logo height={44} /></div>
      <ReelsCaptions words={words} hide={capHide} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 1462, textAlign: 'center', fontFamily: FU, fontSize: 21, lineHeight: 1.35, color: 'rgba(255,255,255,0.5)'}}>
        Nexools é revendedora independente. Marcas citadas pertencem aos seus respectivos donos.
      </div>
      <Vignette strength={0.45} />
      <Grain opacity={0.05} />
      <Html5Audio src={staticFile(voice)} />
      <MusicBed src={bed} volume={0.32} total={total} fadeIn={6} fadeOut={30} />
      <SfxCues cues={sfx} />
      <SafeArea show={debugSafeArea} />
    </AbsoluteFill>
  );
};
export const sfx = (at: number, n: string, volume: number, why: string): SfxCue => ({at, src: n.startsWith('sfx/') ? n : `nexools-ads/sfx_${n}.wav`, volume, why});
