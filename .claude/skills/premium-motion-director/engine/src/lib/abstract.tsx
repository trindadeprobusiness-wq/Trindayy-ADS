import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {drift, ease, mix, progress} from './motion';
import {useTheme} from './theme';

/** Slow drifting light fields. Gives depth to flat backgrounds without drawing attention. */
export const GradientField: React.FC<{
  colors?: string[]; opacity?: number; speed?: number; seed?: number; base?: string;
}> = ({colors, opacity = 0.55, speed = 1, seed = 0, base}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const cs = colors ?? [theme.colors.accent, theme.colors.accent2];
  const blobs = cs.map((c, i) => {
    const x = 50 + drift(frame, seed + i * 3, speed) * 28;
    const y = 50 + drift(frame, seed + i * 5 + 1, speed * 0.8) * 22;
    return `radial-gradient(circle at ${x}% ${y}%, ${c} 0%, transparent 55%)`;
  });
  return (
    <AbsoluteFill style={{background: base ?? theme.colors.bg}}>
      <AbsoluteFill style={{background: blobs.join(','), opacity, filter: 'blur(60px)'}} />
    </AbsoluteFill>
  );
};

/** Grid whose lines draw in with stagger. A structural, "engineered" backdrop for tech/SaaS. */
export const GridLines: React.FC<{
  spacing?: number; start?: number; color?: string; opacity?: number; drawDuration?: number; fadeEdges?: boolean;
}> = ({spacing = 120, start = 0, color, opacity = 1, drawDuration = 30, fadeEdges = true}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const theme = useTheme();
  const c = color ?? theme.colors.line;
  const cols = Math.ceil(width / spacing) + 1;
  const rows = Math.ceil(height / spacing) + 1;
  const ox = (width % spacing) / 2;
  const oy = (height % spacing) / 2;
  const mask = fadeEdges ? 'radial-gradient(ellipse at center, black 30%, transparent 78%)' : undefined;
  return (
    <AbsoluteFill style={{opacity, WebkitMaskImage: mask, maskImage: mask}}>
      {Array.from({length: cols}).map((_, i) => (
        <div key={`v${i}`} style={{position: 'absolute', left: ox + i * spacing, top: 0, width: 1, height: '100%', background: c,
          transformOrigin: 'top', transform: `scaleY(${progress(frame, start + i * 1.5, drawDuration, ease.out)})`}} />
      ))}
      {Array.from({length: rows}).map((_, i) => (
        <div key={`h${i}`} style={{position: 'absolute', top: oy + i * spacing, left: 0, height: 1, width: '100%', background: c,
          transformOrigin: 'left', transform: `scaleX(${progress(frame, start + i * 1.5, drawDuration, ease.out)})`}} />
      ))}
    </AbsoluteFill>
  );
};

/** Deterministic film grain (changes every 2 frames). Removes the "digital flatness" of gradients. */
export const Grain: React.FC<{opacity?: number}> = ({opacity}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const seed = Math.floor(frame / 2) % 12;
  const o = opacity ?? theme.grain;
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <svg width="100%" height="100%">
        <filter id={`grain${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.55}) => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,${strength}) 100%)`, pointerEvents: 'none'}} />
);

/**
 * Particle system with three deterministic states, morphable by two progress values:
 *   chaos (scattered, drifting) → grid (ordered) → point (converged).
 * Built for "noise becomes clarity" / "chaos becomes system" metaphors.
 */
export const ParticleField: React.FC<{
  count?: number; cols?: number; toGrid: number; toPoint: number; point?: {x: number; y: number}; size?: number;
  color?: string; area?: {w: number; h: number}; gridGap?: number; seed?: string; chaosDrift?: number; opacity?: number;
  /** 0..1 — how staggered the convergence is (0 = all particles move as one block). */
  convergeStagger?: number;
  /** Radians of spiral added while converging. */
  swirl?: number;
}> = ({count = 120, cols = 15, toGrid, toPoint, point = {x: 0, y: 0}, size = 6, color, area, gridGap = 44, seed = 'pf', chaosDrift = 26, opacity = 1,
  convergeStagger = 0.5, swirl = 1.2}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const theme = useTheme();
  const W = area?.w ?? width * 0.9;
  const H = area?.h ?? height * 0.8;
  const rows = Math.ceil(count / cols);
  return (
    <AbsoluteFill style={{opacity}}>
      {Array.from({length: count}).map((_, i) => {
        const cx = (random(`${seed}x${i}`) - 0.5) * W + drift(frame, i, 1.4) * chaosDrift;
        const cy = (random(`${seed}y${i}`) - 0.5) * H + drift(frame, i + 50, 1.2) * chaosDrift;
        const gx = ((i % cols) - (cols - 1) / 2) * gridGap;
        const gy = (Math.floor(i / cols) - (rows - 1) / 2) * gridGap;
        // Per-particle convergence: outer/random particles arrive later, with a slight spiral.
        const k = Math.min(1, Math.max(0, toPoint * (1 + convergeStagger) - convergeStagger * random(`${seed}c${i}`)));
        const bx = mix(cx, gx, toGrid) - point.x;
        const by = mix(cy, gy, toGrid) - point.y;
        const ang = swirl * k * (1 - k) * 4;
        const rx = bx * Math.cos(ang) - by * Math.sin(ang);
        const ry = bx * Math.sin(ang) + by * Math.cos(ang);
        const x = point.x + rx * (1 - k);
        const y = point.y + ry * (1 - k);
        const s = size * mix(0.6 + random(`${seed}s${i}`) * 0.9, 1, toGrid) * (1 - k * 0.6);
        const o = mix(0.25 + random(`${seed}o${i}`) * 0.5, 0.9, toGrid) * (1 - k * 0.85);
        return (
          <div key={i} style={{position: 'absolute', left: width / 2 + x - s / 2, top: height / 2 + y - s / 2, width: s, height: s,
            borderRadius: '50%', background: color ?? theme.colors.fg, opacity: o}} />
        );
      })}
    </AbsoluteFill>
  );
};

/** Glowing point of light — a minimal focal subject. */
export const LightPoint: React.FC<{size: number; color?: string; glow?: number; x?: number; y?: number}> = ({size, color, glow = 1, x = 0, y = 0}) => {
  const theme = useTheme();
  const c = color ?? theme.colors.accent;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', transform: `translate(${x}px, ${y}px)`}}>
      <div style={{width: size * 9, height: size * 9, position: 'absolute', borderRadius: '50%',
        background: `radial-gradient(circle, ${c} 0%, transparent 60%)`, opacity: 0.18 * glow}} />
      <div style={{width: size, height: size, borderRadius: '50%', background: '#fff',
        boxShadow: `0 0 ${size * 1.2}px ${size * 0.4}px ${c}, 0 0 ${size * 3}px ${size}px ${c}55`}} />
    </AbsoluteFill>
  );
};

/** Circle stroke that draws itself. */
export const Ring: React.FC<{radius: number; draw: number; stroke?: number; color?: string; glow?: boolean; rotate?: number}> = ({
  radius, draw, stroke = 2, color, glow = true, rotate = -90,
}) => {
  const theme = useTheme();
  const c = color ?? theme.colors.accent;
  const len = 2 * Math.PI * radius;
  const box = radius * 2 + stroke * 4;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <svg width={box} height={box} style={{overflow: 'visible', transform: `rotate(${rotate}deg)`,
        filter: glow ? `drop-shadow(0 0 12px ${c})` : undefined}}>
        <circle cx={box / 2} cy={box / 2} r={radius} fill="none" stroke={c} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
      </svg>
    </AbsoluteFill>
  );
};

/** Horizontal speed lines — momentum/acceleration cue for dynamic pieces. */
export const KineticLines: React.FC<{count?: number; speed?: number; color?: string; opacity?: number; seed?: string}> = ({
  count = 18, speed = 40, color, opacity = 0.5, seed = 'kl',
}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const theme = useTheme();
  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      {Array.from({length: count}).map((_, i) => {
        const len = 80 + random(`${seed}l${i}`) * 260;
        const y = random(`${seed}y${i}`) * height;
        const v = speed * (0.6 + random(`${seed}v${i}`));
        const x = ((random(`${seed}x${i}`) * (width + len) + frame * v) % (width + len)) - len;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: len, height: 2, borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${color ?? theme.colors.accent})`}} />;
      })}
    </AbsoluteFill>
  );
};
