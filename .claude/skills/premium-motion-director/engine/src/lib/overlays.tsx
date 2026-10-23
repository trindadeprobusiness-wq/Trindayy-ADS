import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {ease, progress, springIn} from './motion';
import {useTheme} from './theme';
import {Button} from './ui';

/**
 * Closing call-to-action. Rule: hold the final readable state ≥ 1.5 s; one action only.
 */
export const CTAReveal: React.FC<{
  start: number; headline: string; sub?: string; button?: string; pressAt?: number; fontSize?: number; logo?: React.ReactNode;
  buttonSize?: number; subSize?: number;
}> = ({start, headline, sub, button, pressAt, fontSize = 88, logo, buttonSize, subSize}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const theme = useTheme();
  const h = springIn(frame, fps, start, theme.motion.spring);
  const s = springIn(frame, fps, start + 8, theme.motion.spring);
  const b = springIn(frame, fps, start + 16, 'snappy');
  const press = pressAt === undefined ? 0 : Math.max(0, 1 - Math.abs(frame - pressAt) / 5);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: fontSize * 0.36, textAlign: 'center',
      fontFamily: theme.fonts.display, color: theme.colors.fg}}>
      {logo && <div style={{opacity: h, transform: `translateY(${(1 - h) * 20}px)`}}>{logo}</div>}
      <div style={{fontSize, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.04, whiteSpace: 'pre-line', opacity: h, transform: `translateY(${(1 - h) * 40}px)`}}>{headline}</div>
      {sub && <div style={{fontSize: subSize ?? fontSize * 0.36, color: theme.colors.muted, fontWeight: 400, opacity: s, transform: `translateY(${(1 - s) * 24}px)`}}>{sub}</div>}
      {button && (
        <div style={{opacity: b, transform: `translateY(${(1 - b) * 20}px)`, marginTop: fontSize * 0.1}}>
          <Button label={button} press={press} size={buttonSize ?? fontSize * 0.28} />
        </div>
      )}
    </AbsoluteFill>
  );
};

/**
 * QA overlay. Shows title-safe (90%) and, for 9:16, the zones covered by social platform UI.
 * Enable with inputProps {"debugSafeArea": true}; never ship with it on.
 */
export const SafeArea: React.FC<{show?: boolean}> = ({show}) => {
  const {width, height} = useVideoConfig();
  if (!show) return null;
  const vertical = height > width;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: width * 0.05, top: height * 0.05, width: width * 0.9, height: height * 0.9, border: '2px dashed #ff00ff'}} />
      {vertical && (
        <>
          <div style={{position: 'absolute', left: 0, top: 0, width, height: height * 0.12, background: 'rgba(255,0,255,0.18)'}} />
          <div style={{position: 'absolute', left: 0, bottom: 0, width, height: height * 0.2, background: 'rgba(255,0,255,0.18)'}} />
          <div style={{position: 'absolute', right: 0, top: height * 0.4, width: width * 0.14, height: height * 0.4, background: 'rgba(255,0,255,0.18)'}} />
        </>
      )}
    </AbsoluteFill>
  );
};

/** Small, honest disclosure label (e.g. "Demonstração · dados fictícios"). */
export const Disclosure: React.FC<{text: string; at?: number}> = ({text, at = 0}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  return (
    <div style={{position: 'absolute', left: 64, bottom: 48, fontFamily: theme.fonts.text, fontSize: 18, color: theme.colors.muted,
      letterSpacing: '0.02em', opacity: 0.75 * progress(frame, at, 15, ease.out)}}>{text}</div>
  );
};
