import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {ease, progress, springIn} from './motion';
import type {SpringName} from './motion';
import {useTheme} from './theme';

type Align = 'left' | 'center' | 'right';

export type WordRevealProps = {
  text: string;
  /** Frame (relative to the parent Sequence) when the first word starts. */
  start?: number;
  /** Frames between words. Defaults to theme stagger. */
  stagger?: number;
  /** Optional explicit start frame per word (e.g. from narration timings). Overrides start/stagger. */
  wordStarts?: number[];
  mode?: 'mask' | 'rise' | 'blur' | 'fade';
  spring?: SpringName;
  /** Words (case-insensitive, punctuation ignored) rendered in accent color. */
  highlight?: string[];
  highlightColor?: string;
  /** Draw a marker sweep behind highlighted words. */
  highlightSweep?: boolean;
  exitAt?: number;
  exitDuration?: number;
  fontSize?: number;
  weight?: number;
  family?: string;
  italic?: boolean;
  color?: string;
  lineHeight?: number;
  letterSpacing?: string;
  align?: Align;
  maxWidth?: number;
  style?: React.CSSProperties;
};

const clean = (w: string) => w.toLowerCase().replace(/[.,!?;:…"“”()]/g, '');

/**
 * Word-by-word reveal. `mask` slides each word up from behind a clipping line (editorial, premium);
 * `rise` adds opacity; `blur` resolves focus; `fade` is the most restrained.
 * Readability rule: whole phrase is legible as soon as its last word lands — no continuous wobble.
 */
export const WordReveal: React.FC<WordRevealProps> = ({
  text, start = 0, stagger, wordStarts, mode = 'mask', spring: springName, highlight = [], highlightColor,
  highlightSweep = false, exitAt, exitDuration = 12, fontSize = 96, weight = 600, family, italic, color, lineHeight = 1.08,
  letterSpacing = '-0.03em', align = 'center', maxWidth, style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const theme = useTheme();
  const words = text.split(/\s+/).filter(Boolean);
  const hl = new Set(highlight.map(clean));
  const st = stagger ?? theme.motion.stagger;
  const travel = 0.9 + theme.motion.intensity * 0.2;

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
      columnGap: fontSize * 0.26, rowGap: 0, maxWidth, fontSize, fontWeight: weight, lineHeight, letterSpacing,
      fontFamily: family ?? theme.fonts.display, fontStyle: italic ? 'italic' : 'normal', color: color ?? theme.colors.fg,
      textAlign: align, ...style,
    }}>
      {words.map((w, i) => {
        const s = wordStarts?.[i] ?? start + i * st;
        const p = springIn(frame, fps, s, springName ?? theme.motion.spring);
        const isHl = hl.has(clean(w));
        const sweep = isHl && highlightSweep ? progress(frame, s + 6, 14, ease.out) : 0;
        const exitWord = exitAt === undefined ? 0 : progress(frame, exitAt + i * Math.max(1, st / 2), exitDuration, ease.in);
        const y = mode === 'mask' || mode === 'rise' ? (1 - p) * 100 * travel : 0;
        const opacity = mode === 'mask' ? 1 : p;
        const blur = mode === 'blur' ? (1 - p) * 18 * theme.motion.intensity : 0;
        return (
          <span key={i} style={{
            display: 'inline-block', position: 'relative', overflow: mode === 'mask' ? 'hidden' : 'visible',
            paddingBottom: mode === 'mask' ? '0.12em' : 0, marginBottom: mode === 'mask' ? '-0.12em' : 0,
            paddingRight: italic ? '0.08em' : 0,
          }}>
            {sweep > 0 && (
              <span style={{
                position: 'absolute', left: '-0.06em', right: '-0.06em', bottom: '0.14em', height: '0.34em',
                background: highlightColor ?? theme.colors.accent, opacity: 0.28, transformOrigin: 'left',
                transform: `scaleX(${sweep})`, borderRadius: '0.06em',
              }} />
            )}
            <span style={{
              display: 'inline-block', position: 'relative',
              transform: `translateY(${y - exitWord * 40 * travel}%)`,
              opacity: opacity * (1 - exitWord),
              filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
              color: isHl ? highlightColor ?? theme.colors.accent : undefined,
            }}>
              {w}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Per-character stagger for short words, logos and numbers. Not for sentences (hurts reading). */
export const CharStagger: React.FC<{
  text: string; start?: number; stagger?: number; fontSize?: number; weight?: number; color?: string; family?: string;
  letterSpacing?: string; spring?: SpringName; from?: 'below' | 'scale';
}> = ({text, start = 0, stagger = 2, fontSize = 120, weight = 700, color, family, letterSpacing = '-0.04em', spring: sp, from = 'below'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const theme = useTheme();
  return (
    <div style={{display: 'flex', fontSize, fontWeight: weight, color: color ?? theme.colors.fg, letterSpacing,
      fontFamily: family ?? theme.fonts.display, lineHeight: 1}}>
      {Array.from(text).map((c, i) => {
        const p = springIn(frame, fps, start + i * stagger, sp ?? theme.motion.spring);
        const t = from === 'below' ? `translateY(${(1 - p) * 0.6}em)` : `scale(${0.6 + 0.4 * p})`;
        return <span key={i} style={{display: 'inline-block', whiteSpace: 'pre', opacity: p, transform: t}}>{c}</span>;
      })}
    </div>
  );
};

/** Letter-spacing resolves from wide to tight while fading in. Classic luxury/product lockup move. */
export const TrackingIn: React.FC<{
  text: string; start?: number; duration?: number; fromSpacing?: number; toSpacing?: number; fontSize?: number;
  weight?: number; color?: string; family?: string; uppercase?: boolean; style?: React.CSSProperties;
}> = ({text, start = 0, duration = 40, fromSpacing = 0.5, toSpacing = -0.02, fontSize = 64, weight = 600, color, family, uppercase, style}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const p = progress(frame, start, duration, ease.out);
  return (
    <div style={{
      fontSize, fontWeight: weight, color: color ?? theme.colors.fg, fontFamily: family ?? theme.fonts.display,
      letterSpacing: `${fromSpacing + (toSpacing - fromSpacing) * p}em`, opacity: interpolate(p, [0, 0.6], [0, 1], {extrapolateRight: 'clamp'}),
      filter: `blur(${(1 - p) * 8}px)`, textTransform: uppercase ? 'uppercase' : undefined, whiteSpace: 'nowrap', ...style,
    }}>{text}</div>
  );
};

/** Animated number. Use tabular figures so width does not jitter while counting. */
export const CountUp: React.FC<{
  from?: number; to: number; start?: number; duration?: number; decimals?: number; prefix?: string; suffix?: string;
  locale?: string; style?: React.CSSProperties;
}> = ({from = 0, to, start = 0, duration = 45, decimals = 0, prefix = '', suffix = '', locale = 'pt-BR', style}) => {
  const frame = useCurrentFrame();
  const v = from + (to - from) * progress(frame, start, duration, ease.out);
  const txt = v.toLocaleString(locale, {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
  return <span style={{fontVariantNumeric: 'tabular-nums', ...style}}>{prefix}{txt}{suffix}</span>;
};

/** A line that draws across text — semantic negation ("pare de operar"). */
export const StrikeThrough: React.FC<{at: number; duration?: number; color?: string; thickness?: number; children: React.ReactNode}> = ({
  at, duration = 10, color, thickness = 0.08, children,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const p = progress(frame, at, duration, ease.inOut);
  return (
    <span style={{position: 'relative', display: 'inline-block'}}>
      {children}
      <span style={{position: 'absolute', left: '-0.04em', right: '-0.04em', top: '54%', height: `${thickness}em`,
        background: color ?? theme.colors.danger, transformOrigin: 'left', transform: `scaleX(${p})`, borderRadius: 4}} />
    </span>
  );
};

export type TimedWord = {text: string; startFrame: number; endFrame: number};

/**
 * Narration-synced captions (karaoke). Shows the phrase containing the current frame;
 * the spoken word is emphasized, upcoming words are dimmed. Requires word-level timings.
 */
export const Captions: React.FC<{
  phrases: {startFrame: number; endFrame: number; words: number[]}[]; words: TimedWord[]; fontSize?: number;
  activeColor?: string; hold?: number; style?: React.CSSProperties;
}> = ({phrases, words, fontSize = 44, activeColor, hold = 8, style}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const phrase = phrases.find((p, i) => frame >= p.startFrame && frame < (phrases[i + 1]?.startFrame ?? p.endFrame + hold));
  if (!phrase || frame > phrase.endFrame + hold) return null;
  const inP = progress(frame, phrase.startFrame, 6, ease.out);
  const outP = progress(frame, phrase.endFrame + hold - 5, 5, ease.in);
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: '0.28em', fontSize, fontWeight: 600,
      fontFamily: theme.fonts.text, lineHeight: 1.25, opacity: inP * (1 - outP), transform: `translateY(${(1 - inP) * 10}px)`, ...style}}>
      {phrase.words.map((wi) => {
        const w = words[wi];
        const spoken = frame >= w.startFrame;
        const active = spoken && frame < w.endFrame + 2;
        return (
          <span key={wi} style={{color: active ? activeColor ?? theme.colors.accent : theme.colors.fg, opacity: spoken ? 1 : 0.38}}>
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
