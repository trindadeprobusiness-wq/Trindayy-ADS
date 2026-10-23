import React from 'react';
import {Composition} from 'remotion';
import {ensureFonts} from './lib';
import type {Timeline} from './lib';
import {MooviDemo} from './projects/moovi-demo/MooviDemo';
import mooviDemo from './projects/moovi-demo/timeline.json';

ensureFonts();

const fromTimeline = (t: unknown) => {
  const tl = t as Timeline;
  return {id: tl.id, fps: tl.fps, width: tl.width, height: tl.height, durationInFrames: tl.durationInFrames};
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition {...fromTimeline(mooviDemo)} component={MooviDemo} defaultProps={{debugSafeArea: false}} />
  </>
);
