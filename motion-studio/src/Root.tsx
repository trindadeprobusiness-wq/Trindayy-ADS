import React from 'react';
import {Composition} from 'remotion';
import {ensureFonts} from './lib';
import type {Timeline} from './lib';
import {MooviDemo} from './projects/moovi-demo/MooviDemo';
import mooviDemo from './projects/moovi-demo/timeline.json';
import {M01, Moovi01} from './projects/moovi-01/Moovi01';
import {M02, Moovi02} from './projects/moovi-02/Moovi02';
import {M03, Moovi03} from './projects/moovi-03/Moovi03';
import {M04, Moovi04} from './projects/moovi-04/Moovi04';
import {M06, Moovi06} from './projects/moovi-06/Moovi06';

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
    <Composition {...vertical(M02.id, M02.total)} component={Moovi02} defaultProps={{debugSafeArea: false}} />
    <Composition {...vertical(M03.id, M03.total)} component={Moovi03} defaultProps={{debugSafeArea: false}} />
    <Composition {...vertical(M04.id, M04.total)} component={Moovi04} defaultProps={{debugSafeArea: false}} />
    <Composition {...vertical(M06.id, M06.total)} component={Moovi06} defaultProps={{debugSafeArea: false}} />
  </>
);
