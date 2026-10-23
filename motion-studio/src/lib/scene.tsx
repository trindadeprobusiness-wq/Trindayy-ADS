import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {ease, mix, progress} from './motion';

/**
 * Transition engine. Every scene declares how it enters and how it leaves; overlapping
 * the next scene by `transitionIn.frames` creates a true crossover instead of a cut to black.
 *
 * Choose by meaning:
 *  cut         – rhythm, contrast, beat drops. The most premium transition is often none.
 *  fade        – time passing, calm continuity.
 *  blur        – change of focus / thought; soft and premium.
 *  push        – sequence, "next"; direction carries meaning (left = forward).
 *  wipe        – reveal/replace; pairs with a moving element leading the edge.
 *  iris        – focus from a point (light, button, logo); match with a circular subject.
 *  zoomThrough – travelling *into* an element (exit scales up) to arrive in its detail.
 */
export type TransitionType = 'cut' | 'fade' | 'blur' | 'push' | 'wipe' | 'iris' | 'zoomThrough';
export type Direction = 'left' | 'right' | 'up' | 'down';
export type TransitionSpec = {type: TransitionType; frames: number; direction?: Direction; origin?: {x: number; y: number}};

const styleFor = (spec: TransitionSpec | undefined, p: number, phase: 'in' | 'out'): React.CSSProperties => {
  // p: 0 = fully hidden, 1 = fully visible
  if (!spec || spec.type === 'cut' || p >= 1) return {};
  const d = spec.direction ?? 'left';
  const o = spec.origin ?? {x: 50, y: 50};
  switch (spec.type) {
    case 'fade':
      return {opacity: p};
    case 'blur':
      return {opacity: p, filter: `blur(${(1 - p) * 24}px)`, transform: `scale(${phase === 'in' ? mix(1.06, 1, p) : mix(0.96, 1, p)})`};
    case 'push': {
      const sign = phase === 'in' ? 1 : -1;
      const axis = d === 'left' || d === 'right' ? 'X' : 'Y';
      const dir = d === 'left' || d === 'up' ? 1 : -1;
      return {transform: `translate${axis}(${(1 - p) * 100 * sign * dir}%)`};
    }
    case 'wipe': {
      const r = (1 - p) * 100;
      const inset = d === 'left' ? `0 0 0 ${phase === 'in' ? r : 0}%` : d === 'right' ? `0 ${phase === 'in' ? r : 0}% 0 0` :
        d === 'up' ? `${phase === 'in' ? r : 0}% 0 0 0` : `0 0 ${phase === 'in' ? r : 0}% 0`;
      return phase === 'in' ? {clipPath: `inset(${inset})`} : {opacity: mix(0.4, 1, p)};
    }
    case 'iris':
      return phase === 'in' ? {clipPath: `circle(${p * 150}% at ${o.x}% ${o.y}%)`} : {opacity: p};
    case 'zoomThrough':
      return phase === 'in'
        ? {opacity: p, transform: `scale(${mix(0.86, 1, p)})`, filter: `blur(${(1 - p) * 10}px)`}
        : {opacity: p, transform: `scale(${mix(2.2, 1, p)})`, transformOrigin: `${o.x}% ${o.y}%`, filter: `blur(${(1 - p) * 14}px)`};
  }
  return {};
};

export const Scene: React.FC<{
  from: number; duration: number; transitionIn?: TransitionSpec; transitionOut?: TransitionSpec; name?: string;
  children: React.ReactNode; background?: string;
}> = ({from, duration, transitionIn, transitionOut, name, children, background}) => (
  <Sequence from={from} durationInFrames={duration} name={name}>
    <SceneBody duration={duration} transitionIn={transitionIn} transitionOut={transitionOut} background={background}>
      {children}
    </SceneBody>
  </Sequence>
);

const SceneBody: React.FC<{duration: number; transitionIn?: TransitionSpec; transitionOut?: TransitionSpec; children: React.ReactNode; background?: string}> = ({
  duration, transitionIn, transitionOut, children, background,
}) => {
  const frame = useCurrentFrame();
  const pin = transitionIn ? progress(frame, 0, transitionIn.frames, ease.out) : 1;
  const pout = transitionOut ? 1 - progress(frame, duration - transitionOut.frames, transitionOut.frames, ease.in) : 1;
  const a = styleFor(transitionIn, pin, 'in');
  const b = styleFor(transitionOut, pout, 'out');
  const transform = [a.transform, b.transform].filter(Boolean).join(' ') || undefined;
  const filter = [a.filter, b.filter].filter(Boolean).join(' ') || undefined;
  const opacity = (a.opacity === undefined ? 1 : Number(a.opacity)) * (b.opacity === undefined ? 1 : Number(b.opacity));
  return (
    <AbsoluteFill style={{background, opacity, transform, filter, clipPath: a.clipPath ?? b.clipPath,
      transformOrigin: b.transformOrigin ?? a.transformOrigin}}>
      {children}
    </AbsoluteFill>
  );
};
