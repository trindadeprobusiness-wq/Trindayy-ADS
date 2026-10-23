import {Easing, interpolate, spring} from 'remotion';
import type {SpringConfig} from 'remotion';

/**
 * Curated easing curves. Premium motion = strong deceleration, almost no linear motion.
 * Pick by intent, not by taste: `out` for arrivals, `in` for departures, `inOut` for camera.
 */
export const ease = {
  /** Expo-like deceleration. Default for anything entering the frame. */
  out: Easing.bezier(0.16, 1, 0.3, 1),
  /** Gentle deceleration for large/slow elements (backgrounds, product shots). */
  softOut: Easing.bezier(0.25, 0.1, 0.25, 1),
  /** Acceleration for exits — elements leave faster than they arrive. */
  in: Easing.bezier(0.7, 0, 0.84, 0),
  /** Symmetric, for camera moves and morphs between two rest states. */
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  /** Material-like standard curve for UI state changes. */
  standard: Easing.bezier(0.4, 0, 0.2, 1),
  /** Small overshoot. Use sparingly: playful brands, confirmations. */
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  /** Pulls back before moving forward (anticipation). */
  anticipate: Easing.bezier(0.36, 0, 0.66, -0.56),
  linear: Easing.linear,
} as const;

export type EaseName = keyof typeof ease;

/** Spring presets, from restrained to expressive. */
export const springs = {
  /** Critically damped: no overshoot. Apple-like precision. */
  calm: {damping: 200, stiffness: 90, mass: 1},
  /** Fast settle, imperceptible overshoot. UI and typography default. */
  precise: {damping: 28, stiffness: 180, mass: 1},
  /** Energetic, visible micro-overshoot. Performance ads. */
  snappy: {damping: 15, stiffness: 220, mass: 0.8},
  /** Noticeable bounce. Only for playful contexts. */
  playful: {damping: 10, stiffness: 160, mass: 0.9},
  /** Weighty, slow: big objects, product reveals. */
  heavy: {damping: 24, stiffness: 70, mass: 2.2},
} satisfies Record<string, Partial<SpringConfig>>;

export type SpringName = keyof typeof springs;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** 0→1 between `start` and `start + duration` frames, eased and clamped. */
export const progress = (frame: number, start: number, duration: number, easing: (t: number) => number = ease.out) =>
  duration <= 0 ? (frame >= start ? 1 : 0) : interpolate(frame, [start, start + duration], [0, 1], {...clamp, easing});

/** Spring 0→1 starting at `delay` frames. */
export const springIn = (frame: number, fps: number, delay = 0, preset: SpringName = 'precise', durationInFrames?: number) =>
  spring({frame: frame - delay, fps, config: springs[preset], durationInFrames});

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export type Keyframe = {at: number; value: number; ease?: EaseName};

/**
 * Piecewise keyframe interpolation. Each segment uses the easing of its *destination* keyframe,
 * the same convention as After Effects' incoming ease.
 */
export const keyframes = (frame: number, kfs: Keyframe[]): number => {
  if (kfs.length === 0) return 0;
  if (frame <= kfs[0].at) return kfs[0].value;
  for (let i = 1; i < kfs.length; i++) {
    const a = kfs[i - 1];
    const b = kfs[i];
    if (frame <= b.at) {
      return interpolate(frame, [a.at, b.at], [a.value, b.value], {...clamp, easing: ease[b.ease ?? 'inOut']});
    }
  }
  return kfs[kfs.length - 1].value;
};

/** Seconds → frames. */
export const sec = (s: number, fps: number) => Math.round(s * fps);

/** Deterministic smooth noise (sum of sines) — safe for rendering, unlike Math.random(). */
export const drift = (frame: number, seed = 0, speed = 1) =>
  Math.sin((frame * 0.013 + seed * 1.7) * speed) * 0.6 + Math.sin((frame * 0.031 + seed * 3.1) * speed) * 0.4;
