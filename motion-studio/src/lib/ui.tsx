import React from 'react';
import {evolvePath} from '@remotion/paths';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {ease, keyframes, mix, progress, springIn} from './motion';
import type {EaseName} from './motion';
import {useTheme} from './theme';

/* ---------------------------------- icons ---------------------------------- */
// Minimal original line icons (24px grid). No third-party icon licenses involved.
const PATHS: Record<string, string> = {
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
  sheet: 'M5 3h14v18H5zM5 9h14M5 15h14M11 3v18',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  doc: 'M6 2h9l5 5v15H6zM14 2v6h6M9 13h7M9 17h7',
  check: 'M4 12.5 9.5 18 20 6',
  sparkle: 'M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6',
  database: 'M4 6c0-2 16-2 16 0v12c0 2-16 2-16 0zM4 6c0 2 16 2 16 0M4 12c0 2 16 2 16 0',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  home: 'M3 11l9-8 9 8v10H3z',
  flow: 'M5 5h5v5H5zM14 14h5v5h-5zM7.5 10v4a2 2 0 0 0 2 2H14',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12l2-1-1-3-2 .3-1.4-1.4.3-2-3-1-1 2h-2l-1-2-3 1 .3 2L6 7.3 4 7 3 10l2 1v2l-2 1 1 3 2-.3 1.4 1.4-.3 2 3 1 1-2h2l1 2 3-1-.3-2 1.4-1.4 2 .3 1-3-2-1z',
  plus: 'M12 5v14M5 12h14',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  copy: 'M8 8h12v12H8zM4 16V4h12',
};
export type IconName = keyof typeof PATHS;
export const Icon: React.FC<{name: IconName; size?: number; color?: string; stroke?: number; draw?: number}> = ({name, size = 24, color, stroke = 1.8, draw = 1}) => {
  const theme = useTheme();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? theme.colors.fg} strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{flexShrink: 0}}>
      <path d={PATHS[name]} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
    </svg>
  );
};

/* -------------------------------- surfaces -------------------------------- */
export const AppWindow: React.FC<{width: number; height: number; title?: string; children: React.ReactNode; style?: React.CSSProperties}> = ({
  width, height, title, children, style,
}) => {
  const theme = useTheme();
  return (
    <div style={{width, height, borderRadius: 18, background: theme.colors.bg2, border: `1px solid ${theme.colors.line}`,
      boxShadow: '0 40px 120px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03) inset', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', fontFamily: theme.fonts.text, color: theme.colors.fg, ...style}}>
      <div style={{height: 44, display: 'flex', alignItems: 'center', gap: 8, padding: '0 18px', borderBottom: `1px solid ${theme.colors.line}`}}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{width: 12, height: 12, borderRadius: 6, background: c, opacity: 0.9}} />)}
        {title && <div style={{flex: 1, textAlign: 'center', fontSize: 14, color: theme.colors.muted, marginRight: 52}}>{title}</div>}
      </div>
      <div style={{flex: 1, position: 'relative', display: 'flex'}}>{children}</div>
    </div>
  );
};

export const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties; glow?: number}> = ({children, style, glow = 0}) => {
  const theme = useTheme();
  return (
    <div style={{background: theme.colors.surface, border: `1px solid ${glow > 0 ? theme.colors.accent : theme.colors.line}`, borderRadius: 14,
      padding: 20, boxShadow: glow > 0 ? `0 0 ${40 * glow}px -6px ${theme.colors.accent}` : '0 10px 30px -12px rgba(0,0,0,0.6)',
      fontFamily: theme.fonts.text, color: theme.colors.fg, ...style}}>{children}</div>
  );
};

/** Entry wrapper: rises + fades with the theme spring. Use for cards, panels, list items. */
export const Enter: React.FC<{at: number; distance?: number; children: React.ReactNode; style?: React.CSSProperties; scaleFrom?: number}> = ({
  at, distance = 30, children, style, scaleFrom = 1,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const theme = useTheme();
  const p = springIn(frame, fps, at, theme.motion.spring);
  return (
    <div style={{opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * distance}px) scale(${mix(scaleFrom, 1, p)})`, ...style}}>{children}</div>
  );
};

/* --------------------------------- data viz -------------------------------- */
export const LineChart: React.FC<{
  values: number[]; width: number; height: number; start: number; duration?: number; color?: string; fill?: boolean; strokeWidth?: number;
}> = ({values, width, height, start, duration = 45, color, fill = true, strokeWidth = 3}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const c = color ?? theme.colors.accent;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values.map((v, i) => [(i / (values.length - 1)) * width, height - ((v - min) / (max - min || 1)) * height * 0.9 - height * 0.05]);
  // Smooth with Catmull-Rom → cubic bezier.
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += ` C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6}, ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6}, ${p2[0]} ${p2[1]}`;
  }
  const p = progress(frame, start, duration, ease.inOut);
  const evo = evolvePath(p, d);
  const id = `lc${Math.round(width)}${Math.round(height)}`;
  return (
    <svg width={width} height={height} style={{overflow: 'visible'}}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity={0.28} />
          <stop offset="100%" stopColor={c} stopOpacity={0} />
        </linearGradient>
        <clipPath id={`${id}clip`}><rect x={0} y={-20} width={width * p} height={height + 40} /></clipPath>
      </defs>
      {fill && <path d={`${d} L ${width} ${height} L 0 ${height} Z`} fill={`url(#${id})`} clipPath={`url(#${id}clip)`} />}
      <path d={d} fill="none" stroke={c} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={evo.strokeDasharray}
        strokeDashoffset={evo.strokeDashoffset} style={{filter: `drop-shadow(0 0 8px ${c}88)`}} />
    </svg>
  );
};

export const BarChart: React.FC<{values: number[]; width: number; height: number; start: number; stagger?: number; color?: string; gap?: number; highlightLast?: boolean}> = ({
  values, width, height, start, stagger = 3, color, gap = 10, highlightLast = true,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const theme = useTheme();
  const max = Math.max(...values);
  const bw = (width - gap * (values.length - 1)) / values.length;
  return (
    <div style={{width, height, display: 'flex', alignItems: 'flex-end', gap}}>
      {values.map((v, i) => {
        const p = springIn(frame, fps, start + i * stagger, 'precise');
        const last = highlightLast && i === values.length - 1;
        return <div key={i} style={{width: bw, height: (v / max) * height * p, borderRadius: 6,
          background: last ? color ?? theme.colors.accent : `${theme.colors.fg}22`,
          boxShadow: last ? `0 0 30px -4px ${color ?? theme.colors.accent}` : undefined}} />;
      })}
    </div>
  );
};

/* ------------------------------- interactions ------------------------------ */
export const Button: React.FC<{label: string; press?: number; icon?: IconName; variant?: 'primary' | 'ghost'; size?: number; style?: React.CSSProperties}> = ({
  label, press = 0, icon, variant = 'primary', size = 18, style,
}) => {
  const theme = useTheme();
  // press: 0 → 1 → 0 bell from caller; scale dips to 0.95 at the click.
  const primary = variant === 'primary';
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: `${size * 0.7}px ${size * 1.3}px`, borderRadius: 999,
      background: primary ? theme.colors.accent : 'transparent', color: primary ? '#04110D' : theme.colors.fg,
      border: primary ? 'none' : `1px solid ${theme.colors.line}`, fontWeight: 600, fontSize: size, fontFamily: theme.fonts.text,
      transform: `scale(${1 - press * 0.05})`, boxShadow: primary ? `0 8px 30px -8px ${theme.colors.accent}` : undefined, ...style}}>
      {icon && <Icon name={icon} size={size * 1.1} color={primary ? '#04110D' : theme.colors.fg} stroke={2.2} />}
      {label}
    </div>
  );
};

export const Toggle: React.FC<{on: number; size?: number}> = ({on, size = 28}) => {
  const theme = useTheme();
  const w = size * 1.8;
  return (
    <div style={{width: w, height: size, borderRadius: size, padding: 3, boxSizing: 'border-box',
      background: on > 0.5 ? theme.colors.accent : theme.colors.line, transition: 'none'}}>
      <div style={{width: size - 6, height: size - 6, borderRadius: size, background: '#fff', transform: `translateX(${on * (w - size)}px)`}} />
    </div>
  );
};

export const Toast: React.FC<{at: number; title: string; body?: string; icon?: IconName; hideAt?: number}> = ({at, title, body, icon = 'check', hideAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const theme = useTheme();
  const p = springIn(frame, fps, at, 'snappy');
  const out = hideAt === undefined ? 0 : progress(frame, hideAt, 10, ease.in);
  if (frame < at) return null;
  return (
    <div style={{display: 'flex', gap: 14, alignItems: 'center', padding: '16px 22px', borderRadius: 14, background: theme.colors.surface,
      border: `1px solid ${theme.colors.line}`, boxShadow: '0 20px 50px -10px rgba(0,0,0,0.7)', fontFamily: theme.fonts.text,
      transform: `translateY(${(1 - p) * 30 - out * 20}px) scale(${mix(0.96, 1, p)})`, opacity: Math.min(1, p * 1.5) * (1 - out)}}>
      <div style={{width: 34, height: 34, borderRadius: 17, background: `${theme.colors.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name={icon} size={18} color={theme.colors.accent} stroke={2.4} draw={progress(frame, at + 4, 12)} />
      </div>
      <div>
        <div style={{fontSize: 17, fontWeight: 600, color: theme.colors.fg}}>{title}</div>
        {body && <div style={{fontSize: 14, color: theme.colors.muted, marginTop: 2}}>{body}</div>}
      </div>
    </div>
  );
};

/* ----------------------------------- flows --------------------------------- */
export const FlowNode: React.FC<{x: number; y: number; label: string; sub?: string; icon: IconName; at: number; active?: number; width?: number; scale?: number}> = ({
  x, y, label, sub, icon, at, active = 0, width = 300, scale = 1,
}) => {
  const theme = useTheme();
  // (x, y) is the node's visual center; scale grows it around that center.
  return (
    <div style={{position: 'absolute', left: x - width / 2, top: y - 42, transform: `scale(${scale})`, transformOrigin: `${width / 2}px 42px`}}>
      <Enter at={at} distance={20} scaleFrom={0.94}>
        <Card glow={active} style={{width, padding: 18, display: 'flex', gap: 14, alignItems: 'center', boxSizing: 'border-box'}}>
          <div style={{width: 44, height: 44, borderRadius: 11, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: active > 0.5 ? `${theme.colors.accent}26` : `${theme.colors.fg}0D`}}>
            <Icon name={icon} size={22} color={active > 0.5 ? theme.colors.accent : theme.colors.fg} />
          </div>
          <div style={{minWidth: 0}}>
            <div style={{fontSize: 18, fontWeight: 600, whiteSpace: 'nowrap'}}>{label}</div>
            {sub && <div style={{fontSize: 14, color: theme.colors.muted, marginTop: 3, whiteSpace: 'nowrap'}}>{sub}</div>}
          </div>
        </Card>
      </Enter>
    </div>
  );
};

/** Connector that draws itself, then carries a pulse (data moving through the automation). */
export const FlowEdge: React.FC<{from: {x: number; y: number}; to: {x: number; y: number}; drawAt: number; drawDuration?: number; pulseAt?: number; pulseDuration?: number; color?: string}> = ({
  from, to, drawAt, drawDuration = 18, pulseAt, pulseDuration = 24, color,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const c = color ?? theme.colors.accent;
  const mx = (from.x + to.x) / 2;
  const d = `M ${from.x} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x} ${to.y}`;
  const draw = progress(frame, drawAt, drawDuration, ease.inOut);
  const evo = evolvePath(draw, d);
  const pt = pulseAt === undefined ? -1 : progress(frame, pulseAt, pulseDuration, ease.inOut);
  const pulse = pt > 0 && pt < 1 ? evolvePath(pt, d) : null;
  return (
    <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1} height={1}>
      <path d={d} fill="none" stroke={`${theme.colors.fg}30`} strokeWidth={2} strokeDasharray={evo.strokeDasharray} strokeDashoffset={evo.strokeDashoffset} />
      {pulse && (
        <path d={d} fill="none" stroke={c} strokeWidth={3} strokeLinecap="round" pathLength={1}
          strokeDasharray="0.14 1" strokeDashoffset={-(pt * 1.14) + 0.14} style={{filter: `drop-shadow(0 0 6px ${c})`}} />
      )}
    </svg>
  );
};

/* ---------------------------------- cursor --------------------------------- */
export type CursorKey = {at: number; x: number; y: number; ease?: EaseName};

/**
 * Cursor with human-like eased travel and click feedback (press + ripple).
 * Realism rule: travel 14–24 frames per move, pause ~6 frames before clicking.
 */
export const Cursor: React.FC<{path: CursorKey[]; clicks?: number[]; appearAt?: number; size?: number}> = ({path, clicks = [], appearAt = 0, size = 30}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  if (frame < appearAt) return null;
  const x = keyframes(frame, path.map((k) => ({at: k.at, value: k.x, ease: k.ease ?? 'inOut'})));
  const y = keyframes(frame, path.map((k) => ({at: k.at, value: k.y, ease: k.ease ?? 'inOut'})));
  const press = clicks.reduce((acc, c) => Math.max(acc, frame >= c - 3 && frame <= c + 5 ? 1 - Math.abs(frame - c) / 5 : 0), 0);
  const lastClick = [...clicks].reverse().find((c) => frame >= c);
  const rp = lastClick === undefined ? 1 : progress(frame, lastClick, 18, ease.out);
  const fade = progress(frame, appearAt, 8);
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: fade, pointerEvents: 'none', zIndex: 50}}>
      {rp < 1 && (
        <div style={{position: 'absolute', left: -30 * rp - 4, top: -30 * rp - 4, width: 60 * rp + 8, height: 60 * rp + 8, borderRadius: '50%',
          border: `2px solid ${theme.colors.accent}`, opacity: 1 - rp}} />
      )}
      <svg width={size} height={size} viewBox="0 0 24 24" style={{transform: `scale(${1 - press * 0.12})`, transformOrigin: '0 0',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'}}>
        <path d="M3 2l7.5 19 2.6-7.9L21 10.5z" fill="#fff" stroke="#111" strokeWidth={1.2} strokeLinejoin="round" />
      </svg>
    </div>
  );
};
