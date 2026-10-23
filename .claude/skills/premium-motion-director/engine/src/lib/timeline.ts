import type {SfxCue} from './audio';
import type {TransitionSpec} from './scene';

/** Shape of templates/motion-timeline.json — the contract between storyboard and code. */
export type TimelineScene = {
  id: string;
  from: number;
  duration: number;
  intent: string;
  text?: string;
  visual?: string;
  motion?: string;
  sound?: string;
  transitionIn?: TransitionSpec;
  transitionOut?: TransitionSpec;
};

export type Timeline = {
  id: string;
  style: string;
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
  scenes: TimelineScene[];
  audio: {
    music?: {src: string; volume: number; duck?: {from: number; to: number}[]};
    narration?: {src: string; volume: number} | null;
    sfx: SfxCue[];
  };
  assets?: string[];
};

export const scene = (tl: Timeline, id: string): TimelineScene => {
  const s = tl.scenes.find((x) => x.id === id);
  if (!s) throw new Error(`Timeline ${tl.id}: scene "${id}" not found`);
  return s;
};
