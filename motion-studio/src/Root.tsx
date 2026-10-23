import React from 'react';
import {Composition} from 'remotion';
import {ensureFonts} from './lib';
import type {Timeline} from './lib';
import {MooviDemo} from './projects/moovi-demo/MooviDemo';
import mooviDemo from './projects/moovi-demo/timeline.json';
import {M01, Moovi01} from './projects/moovi-01/Moovi01';

ensureFonts();

const fromTimeline = (t: unknown) => {
  const tl = t as Timeline;
  return {id: tl.id, fps: tl.fps, width: tl.width, height: tl.height, durationInFrames: tl.durationInFrames};
};
const vertical = (id: string, total: number) => ({id, fps: 30, width: 1080, height: 1920, durationInFrames: total});

export const RemotionRoot: React.FC = () => (
  <>
    <Composition {...fromTimeline(mooviDemo)} component={MooviDemo} defaultProps={{debugSafeArea: false}} />
    <Composition {...vertical(M01.id, M01.total)} component={Moovi01} defaultProps={{debugSafeArea: false}} />
  </>
);
