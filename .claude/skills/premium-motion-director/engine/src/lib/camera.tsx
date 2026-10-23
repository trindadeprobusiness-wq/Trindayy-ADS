import React, {createContext, useContext} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {drift, keyframes} from './motion';
import type {EaseName} from './motion';

export type CameraKey = {
  at: number;
  /** World-space point (px from composition center) the camera looks at. */
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  ease?: EaseName;
};

type CameraState = {x: number; y: number; scale: number};
const CameraContext = createContext<CameraState>({x: 0, y: 0, scale: 1});
export const useCamera = () => useContext(CameraContext);

const track = (frame: number, keys: CameraKey[], prop: keyof Omit<CameraKey, 'at' | 'ease'>, fallback: number) => {
  // Carry forward the last defined value so keys can animate one property at a time.
  let last = fallback;
  const filled = keys.map((k) => {
    const v = k[prop];
    if (typeof v === 'number') last = v;
    return {at: k.at, value: last, ease: k.ease};
  });
  return keyframes(frame, filled);
};

/**
 * Virtual camera over a "world" larger than the frame. Use it to make UI demos feel like one
 * continuous shot (push-in to a feature, pan to the next) instead of hard cuts.
 * `driftAmount` adds a subtle handheld float (px) — keep ≤ 6 for premium work.
 */
export const Camera: React.FC<{
  keys: CameraKey[]; perspective?: number; driftAmount?: number; children: React.ReactNode; style?: React.CSSProperties;
}> = ({keys, perspective = 1800, driftAmount = 0, children, style}) => {
  const frame = useCurrentFrame();
  const x = track(frame, keys, 'x', 0) + drift(frame, 1) * driftAmount;
  const y = track(frame, keys, 'y', 0) + drift(frame, 2) * driftAmount;
  const scale = track(frame, keys, 'scale', 1);
  const rotate = track(frame, keys, 'rotate', 0);
  const rx = track(frame, keys, 'rotateX', 0);
  const ry = track(frame, keys, 'rotateY', 0);
  return (
    <AbsoluteFill style={{perspective, overflow: 'hidden', ...style}}>
      <AbsoluteFill style={{
        transformStyle: 'preserve-3d', transformOrigin: '50% 50%',
        transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotate(${rotate}deg) scale(${scale}) translate(${-x}px, ${-y}px)`,
      }}>
        <CameraContext.Provider value={{x, y, scale}}>{children}</CameraContext.Provider>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * Parallax layer inside a Camera. depth 1 = moves with the world, 0 = locked to screen (infinitely far),
 * >1 = foreground (moves more than the world).
 */
export const ParallaxLayer: React.FC<{depth: number; children: React.ReactNode; style?: React.CSSProperties}> = ({depth, children, style}) => {
  const {x, y} = useCamera();
  return (
    <AbsoluteFill style={{transform: `translate(${x * (1 - depth)}px, ${y * (1 - depth)}px)`, ...style}}>{children}</AbsoluteFill>
  );
};

/**
 * Simulated rack focus: blur grows with distance between the layer's depth and the animated focus depth.
 */
export const FocusLayer: React.FC<{
  depth: number; focus: {at: number; value: number; ease?: EaseName}[]; maxBlur?: number; children: React.ReactNode;
}> = ({depth, focus, maxBlur = 14, children}) => {
  const frame = useCurrentFrame();
  const f = keyframes(frame, focus);
  const blur = Math.min(maxBlur, Math.abs(depth - f) * maxBlur);
  return <AbsoluteFill style={{filter: blur > 0.1 ? `blur(${blur}px)` : undefined}}>{children}</AbsoluteFill>;
};
