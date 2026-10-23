// Moovi motion kit — stage: phone + camera + screen router, beats, typography, guarantee, plans, end card, video shell.
import React from 'react';
import {AbsoluteFill, Html5Audio, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {GradientField, Grain, Icon, MusicBed, SafeArea, SfxCues, ThemeProvider, Vignette, WordReveal, ease, keyframes, mix, progress, springIn} from '../../lib';
import type {IconName, Keyframe, SfxCue} from '../../lib';
import {C, Captions, F, SH, SW, brl, theme} from './base';

/* ============================================================ phone stage */
export type ScreenSpec = {from: number; node: React.ReactNode; enter?: 'cut' | 'swipe' | 'fade'};
export type PhoneCam = {S: Keyframe[]; ty: Keyframe[]; tx?: Keyframe[]; opacity?: Keyframe[]; blur?: Keyframe[];
  /** 3D dive-in only (keep 3D windows short: Chromium can capture un-rastered tiles on large 3D layers) */
  dive?: {from: number; to: number}};

const Screen: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: SW, height: SH, transformOrigin: '0 0', transform: `scale(${690 / SW})`, background: C.ui, overflow: 'hidden'}}>
    {children}
  </div>
);

/** Renders only the screens needed for the current frame; entering screen slides/fades over 12 frames. */
const Router: React.FC<{screens: ScreenSpec[]}> = ({screens}) => {
  const frame = useCurrentFrame();
  let cur = 0;
  screens.forEach((s, i) => { if (frame >= s.from) cur = i; });
  const s = screens[cur];
  const p = s.enter === 'cut' || cur === 0 ? 1 : progress(frame, s.from, 12, ease.inOut);
  const prev = cur > 0 && p < 1 ? screens[cur - 1] : null;
  const enterStyle: React.CSSProperties = s.enter === 'fade' ? {opacity: p} : {transform: `translateX(${(1 - p) * 100}%)`};
  return (
    <>
      {prev && <div style={{position: 'absolute', inset: 0, transform: s.enter === 'fade' ? undefined : `translateX(${-p * 30}%)`, opacity: s.enter === 'fade' ? 1 : 1 - p * 0.4}}>
        <Screen>{prev.node}</Screen></div>}
      <div style={{position: 'absolute', inset: 0, ...enterStyle}}><Screen>{s.node}</Screen></div>
    </>
  );
};

export const PhoneStage: React.FC<{cam: PhoneCam; screens: ScreenSpec[]}> = ({cam, screens}) => {
  const frame = useCurrentFrame();
  const S = keyframes(frame, cam.S);
  const ty = keyframes(frame, cam.ty);
  const tx = cam.tx ? keyframes(frame, cam.tx) : 0;
  const op = cam.opacity ? keyframes(frame, cam.opacity) : 1;
  const blur = cam.blur ? keyframes(frame, cam.blur) : 0;
  if (op <= 0.001) return null;
  const in3D = !!cam.dive && frame >= cam.dive.from && frame <= cam.dive.to;
  const rx = cam.dive ? keyframes(frame, [{at: cam.dive.from, value: 54}, {at: cam.dive.to - 4, value: 0, ease: 'inOut'}]) : 0;
  const rz = cam.dive ? keyframes(frame, [{at: cam.dive.from, value: -34}, {at: cam.dive.to - 4, value: 0, ease: 'inOut'}]) : 0;
  const glow = 1;
  return (
    <AbsoluteFill style={{perspective: in3D ? 2600 : undefined}}>
      <div style={{position: 'absolute', left: 540 - 360, top: 950 - 750, width: 720, height: 1500, transformStyle: in3D ? 'preserve-3d' : 'flat', opacity: op,
        filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
        transform: in3D ? `translate(${tx}px, ${ty}px) scale(${S}) rotateX(${rx}deg) rotateZ(${rz}deg)` : `translate(${tx}px, ${ty}px) scale(${S})`}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 92, background: 'linear-gradient(145deg,#4A504C,#1A1D1B 38%,#2C302D)',
          boxShadow: `0 0 0 2px rgba(255,255,255,0.22) inset, 0 0 0 1px rgba(255,255,255,0.10), 0 60px 140px -30px rgba(0,0,0,0.9), 0 0 ${120 * glow}px -20px ${C.brandBright}55`}} />
        <div style={{position: 'absolute', left: 15, top: 15, width: 690, height: 1470, borderRadius: 78, overflow: 'hidden'}}>
          <Router screens={screens} />
          <div style={{position: 'absolute', top: 22, left: 245, width: 200, height: 56, borderRadius: 28, background: '#000'}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ================================================================= beats */
/** Mounts children only between `from` and `to`, with a short fade/blur in and out. Children use absolute frames. */
export const Beat: React.FC<{from: number; to: number; children: React.ReactNode; inFrames?: number; outFrames?: number}> = ({from, to, children, inFrames = 8, outFrames = 8}) => {
  const frame = useCurrentFrame();
  if (frame < from || frame > to) return null;
  const a = progress(frame, from, inFrames, ease.out);
  const b = 1 - progress(frame, to - outFrames, outFrames, ease.in);
  const v = Math.min(a, b);
  return <AbsoluteFill style={{opacity: v, filter: v < 0.98 ? `blur(${(1 - v) * 10}px)` : undefined}}>{children}</AbsoluteFill>;
};

/** Big kinetic line(s) synced to word frames. */
export const Kinetic: React.FC<{lines: {text: string; starts: number[]; size?: number; color?: string; highlight?: string[]; weight?: number}[]; y?: number; gap?: number}> = ({lines, y = 760, gap = 10}) => (
  <div style={{position: 'absolute', left: 70, right: 70, top: y, display: 'flex', flexDirection: 'column', alignItems: 'center', gap}}>
    {lines.map((l, i) => (
      <WordReveal key={i} text={l.text} wordStarts={l.starts} fontSize={l.size ?? 104} weight={l.weight ?? 800} family={F} color={l.color ?? C.stageText}
        highlight={l.highlight} highlightColor={C.brandBright} letterSpacing="-0.035em" maxWidth={940} lineHeight={1.02} />
    ))}
  </div>
);

export const StrikeWord: React.FC<{text: string; at: number; strikeAt: number; size?: number; y: number; color?: string}> = ({text, at, strikeAt, size = 120, y, color = C.stageText}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = springIn(frame, fps, at, 'snappy');
  const s = progress(frame, strikeAt, 10, ease.inOut);
  return (
    <div style={{position: 'absolute', top: y, width: '100%', textAlign: 'center'}}>
      <span style={{position: 'relative', display: 'inline-block', fontFamily: F, fontWeight: 800, fontSize: size, letterSpacing: '-0.04em', color, opacity: e * mix(1, 0.45, s),
        transform: `translateY(${(1 - e) * 40}px)`}}>
        {text}
        <span style={{position: 'absolute', left: '-0.04em', right: '-0.04em', top: '54%', height: '0.08em', background: C.red, transformOrigin: 'left', transform: `scaleX(${s})`, borderRadius: 6}} />
      </span>
    </div>
  );
};

/* ============================================================ guarantee */
export const Guarantee: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ring = progress(frame, at, 30, ease.inOut);
  const n = springIn(frame, fps, at + 8, 'snappy');
  const t = springIn(frame, fps, at + 18, 'precise');
  const r = 210;
  const L = 2 * Math.PI * r;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', fontFamily: F}}>
      <div style={{position: 'relative', width: 520, height: 520}}>
        <svg width={520} height={520} style={{position: 'absolute', inset: 0, transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 18px ${C.brandBright}88)`}}>
          <circle cx={260} cy={260} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={16} />
          <circle cx={260} cy={260} r={r} fill="none" stroke={C.brandBright} strokeWidth={16} strokeLinecap="round" strokeDasharray={`${L * ring} ${L}`} />
        </svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff',
          opacity: n, transform: `scale(${mix(0.7, 1, n)})`}}>
          <div style={{fontSize: 230, fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.05em'}}>7</div>
          <div style={{fontSize: 52, fontWeight: 700, marginTop: 6}}>dias</div>
        </div>
      </div>
      <div style={{marginTop: 46, fontSize: 56, fontWeight: 700, color: '#fff', opacity: t, transform: `translateY(${(1 - t) * 24}px)`}}>dinheiro de volta</div>
      <div style={{marginTop: 12, fontSize: 34, color: C.stageMuted, opacity: t}}>se não gostar</div>
    </AbsoluteFill>
  );
};

/* ============================================================== floating */
export const FloatCard: React.FC<{from: number; to: number; x?: number; y?: number; width?: number; children: React.ReactNode; glowAt?: number}> = ({from, to, x = 64, y = 430, width = 560, children, glowAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < from - 2 || frame > to + 14) return null;
  const inn = springIn(frame, fps, from, 'snappy');
  const out = progress(frame, to, 12, ease.in);
  const glow = glowAt === undefined ? 0 : Math.max(0, 1 - Math.abs(frame - glowAt - 6) / 20);
  return (
    <div style={{position: 'absolute', left: x, top: y, width, borderRadius: 30, background: '#FFFFFF', padding: '26px 30px', boxSizing: 'border-box',
      fontFamily: F, color: C.text, opacity: Math.min(1, inn * 1.3) * (1 - out), transform: `translateY(${(1 - inn) * 40 - out * 30}px) scale(${mix(0.94, 1, inn)})`,
      boxShadow: `0 40px 90px -20px rgba(0,0,0,0.75), 0 0 ${50 * glow}px -4px ${C.brandBright}`}}>{children}</div>
  );
};

/** Floating chips listing items in sync with speech (e.g. "entrou · saiu · contas · cartões…"). */
export const ChipList: React.FC<{items: {label: string; at: number; icon?: IconName}[]; x: number; y: number}> = ({items, x, y}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{position: 'absolute', left: x, top: y, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
      {items.map((it) => {
        const e = springIn(frame, fps, it.at, 'snappy');
        return (
          <div key={it.label} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', borderRadius: 999, background: 'rgba(255,255,255,0.95)',
            fontFamily: F, fontWeight: 700, fontSize: 34, color: C.text, opacity: Math.min(1, e * 1.4), transform: `translateX(${(1 - e) * -40}px)`,
            boxShadow: '0 16px 40px -16px rgba(0,0,0,0.7)'}}>
            <Icon name={it.icon ?? 'check'} size={30} color={C.brand} stroke={2.4} />{it.label}
          </div>
        );
      })}
    </div>
  );
};

/* ================================================================= plans */
export const Plans: React.FC<{at: [number, number, number]; proFeaturesAt?: number; billingAt?: number}> = ({at, proFeaturesAt, billingAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const plans = [{n: 'Básico', p: '14,90'}, {n: 'Pro', p: '19,90'}, {n: 'Premium', p: '24,90'}];
  const pf = proFeaturesAt === undefined ? 0 : springIn(frame, fps, proFeaturesAt, 'snappy');
  const bill = billingAt === undefined ? 0 : springIn(frame, fps, billingAt, 'snappy');
  return (
    <AbsoluteFill style={{fontFamily: F}}>
      <div style={{position: 'absolute', top: 470, left: 70, right: 70, display: 'flex', flexDirection: 'column', gap: 26}}>
        {plans.map((p, i) => {
          const e = springIn(frame, fps, at[i], 'snappy');
          const isPro = i === 1;
          const focus = isPro ? pf : 0;
          return (
            <div key={p.n} style={{background: isPro ? '#fff' : 'rgba(255,255,255,0.94)', borderRadius: 34, padding: '30px 40px', opacity: Math.min(1, e * 1.4) * (pf > 0 && !isPro ? mix(1, 0.55, pf) : 1),
              transform: `translateX(${(1 - e) * 80}px) scale(${1 + focus * 0.04})`, boxShadow: isPro && focus > 0 ? `0 0 0 ${5 * focus}px ${C.brandBright}, 0 30px 70px -20px rgba(0,0,0,0.8)` : '0 20px 50px -20px rgba(0,0,0,0.7)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <span style={{fontSize: 46, fontWeight: 700, color: C.text}}>{p.n}</span>
                <span style={{fontSize: 30, color: C.muted}}>R$ <b style={{fontSize: 64, color: C.text, letterSpacing: '-0.03em'}}>{p.p}</b>/mês</span>
              </div>
              {isPro && pf > 0 && (
                <div style={{height: 64 * pf, overflow: 'hidden', opacity: pf, display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, color: '#0F7A3A', fontWeight: 600, marginTop: 10 * pf}}>
                  <Icon name="sparkle" size={30} color={C.brand} stroke={2} />Assistente com IA · lê extrato
                </div>
              )}
            </div>
          );
        })}
      </div>
      {billingAt !== undefined && (
        <div style={{position: 'absolute', top: 1260, width: '100%', display: 'flex', justifyContent: 'center', gap: 16, opacity: bill, transform: `translateY(${(1 - bill) * 24}px)`}}>
          {['Plano anual', 'Até 2× no cartão', 'ou Pix'].map((t) => (
            <span key={t} style={{fontSize: 32, fontWeight: 600, color: '#fff', padding: '12px 24px', borderRadius: 999, border: '2px solid rgba(255,255,255,0.25)'}}>{t}</span>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ======================================================== info / security */
export const InfoList: React.FC<{items: {icon: IconName; text: string; at: number}[]; y?: number}> = ({items, y = 520}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{position: 'absolute', top: y, left: 80, right: 80, display: 'flex', flexDirection: 'column', gap: 28, fontFamily: F}}>
      {items.map((it) => {
        const e = springIn(frame, fps, it.at, 'snappy');
        return (
          <div key={it.text} style={{display: 'flex', gap: 26, alignItems: 'center', background: 'rgba(255,255,255,0.95)', borderRadius: 30, padding: '30px 34px',
            opacity: Math.min(1, e * 1.4), transform: `translateY(${(1 - e) * 40}px)`, boxShadow: '0 20px 50px -20px rgba(0,0,0,0.7)'}}>
            <div style={{width: 84, height: 84, borderRadius: 24, background: '#DDF3E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Icon name={it.icon} size={44} color={C.brand} stroke={2.2} draw={progress(frame, it.at + 4, 14)} />
            </div>
            <div style={{fontSize: 38, fontWeight: 700, color: C.text, lineHeight: 1.2}}>{it.text}</div>
          </div>
        );
      })}
    </div>
  );
};

/** Question header for FAQ sections. */
export const Question: React.FC<{text: string; at: number; y?: number; size?: number}> = ({text, at, y = 380, size = 78}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = springIn(frame, fps, at, 'snappy');
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{fontFamily: F, fontWeight: 800, fontSize: size, color: '#fff', letterSpacing: '-0.03em', opacity: e, transform: `translateY(${(1 - e) * 30}px) scale(${mix(0.92, 1, e)})`,
        display: 'flex', alignItems: 'center', gap: 22}}>
        <span style={{width: 70, height: 70, borderRadius: 35, background: C.brandBright, color: '#04140A', fontSize: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>?</span>
        {text}
      </div>
    </div>
  );
};

/* ============================================================== end card */
export const EndCard: React.FC<{at: number; headline: string; sub?: string; cta?: string; hint?: string}> = ({at, headline, sub, cta = 'moovi.chat', hint}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < at) return null;
  const logo = springIn(frame, fps, at, 'calm');
  const btn = springIn(frame, fps, at + 22, 'snappy');
  const arrow = Math.sin((frame - at) / 6) * 8;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', fontFamily: F}}>
      <Img src={staticFile('moovi/logo_full_white.png')} style={{width: 470, opacity: logo, transform: `translateY(${(1 - logo) * 30}px) scale(${mix(0.9, 1, logo)})`}} />
      <div style={{marginTop: 70}}>
        <WordReveal text={headline} start={at + 8} stagger={3} fontSize={68} weight={700} family={F} color="#FFFFFF" maxWidth={900} />
      </div>
      {sub && <div style={{marginTop: 22, fontSize: 34, color: '#B7C4BC', opacity: progress(frame, at + 16, 12), textAlign: 'center', maxWidth: 880}}>{sub}</div>}
      <div style={{marginTop: 54, opacity: btn, transform: `translateY(${(1 - btn) * 20}px)`, background: C.brandBright, color: '#04140A', fontWeight: 700,
        fontSize: 40, padding: '24px 56px', borderRadius: 999, boxShadow: `0 16px 50px -12px ${C.brandBright}`}}>{cta}</div>
      {hint && <div style={{marginTop: 26, fontSize: 32, color: '#fff', opacity: btn, display: 'flex', alignItems: 'center', gap: 12}}>
        {hint}<span style={{display: 'inline-block', transform: `translateY(${arrow}px)`, fontSize: 40}}>↓</span></div>}
    </AbsoluteFill>
  );
};

/* ================================================================= shell */
export const VideoShell: React.FC<{voice: string; bed: string; total: number; sfx: SfxCue[]; chunks: [number, string][]; capEnd: number;
  duck: {from: number; to: number}[]; children: React.ReactNode; debugSafeArea?: boolean}> = ({voice, bed, total, sfx, chunks, capEnd, duck, children, debugSafeArea}) => (
  <ThemeProvider theme={theme}>
    <AbsoluteFill style={{background: C.stage}}>
      <GradientField opacity={0.22} speed={0.6} colors={[C.brand, '#0B3D1E']} />
      {children}
      <Captions chunks={chunks} end={capEnd} />
      <Html5Audio src={staticFile(voice)} volume={1} />
      <MusicBed src={bed} volume={0.5} total={total} fadeIn={8} fadeOut={24} duck={duck} duckTo={0.5} ramp={10} />
      <SfxCues cues={sfx} />
      <Vignette strength={0.5} />
      <Grain opacity={0.06} />
      <SafeArea show={debugSafeArea} />
    </AbsoluteFill>
  </ThemeProvider>
);

export {brl};
