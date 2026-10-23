import React from 'react';
import {Html5Audio, Sequence, interpolate, staticFile} from 'remotion';

export type SfxCue = {at: number; src: string; volume?: number; why?: string};

/** Places SFX cues from a timeline. Each cue should carry a `why` — sound without intention is noise. */
export const SfxCues: React.FC<{cues: SfxCue[]; master?: number}> = ({cues, master = 1}) => (
  <>
    {cues.map((c, i) => (
      <Sequence key={`${c.src}-${c.at}-${i}`} from={c.at} name={`sfx ${c.src}`} layout="none">
        <Html5Audio src={staticFile(c.src)} volume={(c.volume ?? 0.6) * master} />
      </Sequence>
    ))}
  </>
);

export type DuckRange = {from: number; to: number};

/**
 * Music bed with fade in/out and ducking under narration (or under a dramatic silence).
 * `duck` ranges lower the bed to `duckTo` with short ramps so the voice stays intelligible.
 */
export const MusicBed: React.FC<{
  src: string; volume?: number; fadeIn?: number; fadeOut?: number; total: number; duck?: DuckRange[]; duckTo?: number; ramp?: number;
}> = ({src, volume = 0.35, fadeIn = 20, fadeOut = 30, total, duck = [], duckTo = 0.35, ramp = 8}) => (
  <Html5Audio
    src={staticFile(src)}
    volume={(f) => {
      const edge = interpolate(f, [0, fadeIn, total - fadeOut, total], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      let d = 1;
      for (const r of duck) {
        const k = interpolate(f, [r.from - ramp, r.from, r.to, r.to + ramp], [1, duckTo, duckTo, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        d = Math.min(d, k);
      }
      return volume * edge * d;
    }}
  />
);
