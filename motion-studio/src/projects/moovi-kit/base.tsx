// Moovi motion kit — shared tokens, fonts, captions and app chrome (extracted from the approved Demo 05).
import React from 'react';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import {Img, cancelRender, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Icon, ease, mix, progress, saasCinematic} from '../../lib';
import type {IconName, Theme} from '../../lib';

let fontsStarted = false;
export const ensureDmSans = () => {
  if (fontsStarted || typeof document === 'undefined') return;
  fontsStarted = true;
  const h = delayRender('DM Sans');
  Promise.all(['400', '500', '600', '700'].map((w) => document.fonts.load(`${w} 32px "DM Sans"`, 'Aãç0R$')))
    .then((r) => {
      if (r.some((x) => x.length === 0)) throw new Error('DM Sans failed to load');
      continueRender(h);
    })
    .catch((e) => cancelRender(e));
};
ensureDmSans();

export const F = '"DM Sans", system-ui, sans-serif';
export const C = {
  stage: '#040A06', brand: '#15803C', brandDeep: '#116530', brandBright: '#22B35E', ui: '#F6F7F9', card: '#FFFFFF',
  line: '#E3E6EA', text: '#16181D', muted: '#6B7280', green: '#21A55A', red: '#D7263D', chat: '#E7EEE9', userBubble: '#ECEEF1',
  amber: '#F0B24E', stageText: '#F4F7F5', stageMuted: '#A9B8AF',
};
export const theme: Theme = {
  ...saasCinematic, name: 'moovi-stage',
  colors: {...saasCinematic.colors, bg: C.stage, accent: C.brandBright, accent2: '#0E5A2B', fg: '#F4F7F5', muted: '#9AA79F'},
  fonts: {display: F, text: F, serif: F, mono: '"JetBrains Mono", monospace'},
};

export const FPS = 30;
/** seconds → frame */
export const f = (s: number) => Math.round(s * FPS);
export const brl = (v: number) => 'R$ ' + v.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
export const Bold: React.FC<{children: React.ReactNode}> = ({children}) => <b style={{fontWeight: 700}}>{children}</b>;

/* ---------------------------------------------------------------- captions */
export const Captions: React.FC<{chunks: [number, string][]; end: number}> = ({chunks, end}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const i = chunks.findIndex(([s], k) => t >= s && t < (chunks[k + 1]?.[0] ?? end));
  if (i < 0 || !chunks[i][1]) return null; // empty text = no caption (big kinetic type on screen)
  const p = progress(frame, chunks[i][0] * fps, 6, ease.out);
  const out = i === chunks.length - 1 ? progress(frame, end * fps - 4, 6, ease.in) : 0;
  return (
    <div style={{position: 'absolute', top: 236, left: 0, width: '100%', display: 'flex', justifyContent: 'center', opacity: 1 - out}}>
      <div style={{fontFamily: F, fontWeight: 700, fontSize: 54, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15,
        padding: '16px 30px', borderRadius: 26, background: 'rgba(4,10,6,0.72)', border: '1px solid rgba(255,255,255,0.08)',
        maxWidth: 900, textAlign: 'center', transform: `translateY(${(1 - p) * 12}px)`, opacity: mix(0.2, 1, p)}}>
        {chunks[i][1]}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- app chrome */
// Screens are authored in the screenshot's coordinate system (780 × 1662) and scaled into the phone.
export const SW = 780;
export const SH = 1662;

export const StatusBar: React.FC<{light?: boolean}> = ({light}) => {
  const col = light ? '#fff' : C.text;
  return (
    <div style={{position: 'absolute', top: 0, left: 0, width: SW, height: 86, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 52px 0', boxSizing: 'border-box', fontFamily: F, fontWeight: 600, fontSize: 28, color: col}}>
      <span>9:41</span>
      <span style={{display: 'flex', gap: 8, alignItems: 'center'}}>
        {[10, 14, 18, 22].map((h) => <span key={h} style={{width: 6, height: h, borderRadius: 2, background: col}} />)}
        <span style={{width: 44, height: 22, borderRadius: 6, border: `2px solid ${col}`, marginLeft: 8, position: 'relative'}}>
          <span style={{position: 'absolute', inset: 3, right: 10, borderRadius: 3, background: col}} />
        </span>
      </span>
    </div>
  );
};

export const Header: React.FC = () => (
  <div style={{position: 'absolute', top: 86, left: 0, width: SW, height: 124, borderBottom: `2px solid ${C.line}`, display: 'flex',
    alignItems: 'center', padding: '0 34px', boxSizing: 'border-box', gap: 18, background: C.ui}}>
    <Img src={staticFile('moovi/logo_full.png')} style={{height: 46}} />
    <div style={{fontFamily: F, fontWeight: 700, fontSize: 34, color: C.text, flex: 1}}>Moovi</div>
    <div style={{fontFamily: F, fontWeight: 500, fontSize: 24, color: C.text, background: '#ECEEF1', borderRadius: 14, padding: '14px 20px'}}>BRL ⌄</div>
    <svg width={34} height={34} viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="none" stroke={C.text} strokeWidth={1.9} strokeLinejoin="round" /></svg>
  </div>
);

export type Tab = 'inicio' | 'transacoes' | 'assistente' | 'compromissos' | 'menu';
const NAV: {id: Tab; label: string; icon: IconName | 'dots'}[] = [
  {id: 'inicio', label: 'Início', icon: 'home'}, {id: 'transacoes', label: 'Transações', icon: 'doc'},
  {id: 'assistente', label: 'Assistente', icon: 'sparkle'}, {id: 'compromissos', label: 'Compromissos', icon: 'clock'}, {id: 'menu', label: 'Menu', icon: 'dots'},
];
export const BottomNav: React.FC<{active: Tab}> = ({active}) => (
  <div style={{position: 'absolute', left: 0, top: 1490, width: SW, height: SH - 1490, background: '#F3F4F6', borderTop: `2px solid ${C.line}`,
    display: 'flex', justifyContent: 'space-around', paddingTop: 16, boxSizing: 'border-box'}}>
    {NAV.map((n) => {
      const on = n.id === active;
      const col = on ? C.brand : '#4B5563';
      return (
        <div key={n.id} style={{width: 146, height: 92, borderRadius: 22, background: on ? '#DDEFE3' : 'transparent', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: F, fontSize: 21, color: col}}>
          {n.icon === 'dots' ? <div style={{fontSize: 30, lineHeight: '30px', letterSpacing: 2}}>•••</div> : <Icon name={n.icon} size={34} color={col} stroke={1.7} />}
          <span style={{whiteSpace: 'nowrap'}}>{n.label}</span>
        </div>
      );
    })}
  </div>
);

export const UICard: React.FC<{x: number; y: number; w: number; h: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, background: C.card, borderRadius: 26, border: `2px solid ${C.line}`,
    boxShadow: '0 6px 18px -10px rgba(0,0,0,0.18)', boxSizing: 'border-box', fontFamily: F, color: C.text, ...style}}>{children}</div>
);

/** Full app page: status bar + header + content viewport (y 210–1490) + bottom nav. */
export const AppPage: React.FC<{tab: Tab; children: React.ReactNode}> = ({tab, children}) => (
  <>
    <StatusBar />
    <Header />
    <div style={{position: 'absolute', top: 210, left: 0, width: SW, height: 1280, overflow: 'hidden', background: C.ui}}>{children}</div>
    <BottomNav active={tab} />
  </>
);

export const PageTitle: React.FC<{title: string; sub?: string}> = ({title, sub}) => (
  <div style={{position: 'absolute', left: 34, top: 34, fontFamily: F}}>
    <div style={{fontWeight: 700, fontSize: 42, color: C.text}}>{title}</div>
    {sub && <div style={{fontSize: 26, color: C.muted, marginTop: 6}}>{sub}</div>}
  </div>
);
