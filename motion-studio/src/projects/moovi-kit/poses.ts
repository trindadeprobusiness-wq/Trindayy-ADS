import type {EaseName, Keyframe} from '../../lib';

/** Camera poses for the phone (scale S, vertical offset ty) — framed so the relevant UI sits inside the 9:16 safe area. */
export const POSES = {
  full: {S: 0.74, ty: 0},
  dash: {S: 1.15, ty: 185},
  donut: {S: 1.15, ty: 291},
  chat: {S: 1.15, ty: -132},
  lock: {S: 1.3, ty: 235},
  lockWide: {S: 1.16, ty: 150},
  page: {S: 1.1, ty: 260},
  hidden: {S: 0.9, ty: 2100},
} as const;
export type Pose = keyof typeof POSES;

/** [frame, pose, ease?] steps → keyframes for S and ty (holds between steps; each move takes `move` frames). */
export const camPath = (steps: [number, Pose, EaseName?][], move = 18): {S: Keyframe[]; ty: Keyframe[]} => {
  const S: Keyframe[] = [];
  const ty: Keyframe[] = [];
  steps.forEach(([at, pose, e], i) => {
    const p = POSES[pose];
    if (i === 0) {
      S.push({at, value: p.S});
      ty.push({at, value: p.ty});
      return;
    }
    const prev = POSES[steps[i - 1][1]];
    S.push({at, value: prev.S}, {at: at + move, value: p.S, ease: e ?? 'inOut'});
    ty.push({at, value: prev.ty}, {at: at + move, value: p.ty, ease: e ?? 'inOut'});
  });
  return {S, ty};
};
