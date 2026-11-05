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
import {VSL, NexoolsVSL} from './projects/nexools-vsl/NexoolsVSL';
import {A1, NexoolsAdA1} from './projects/nexools-ads/A1Ancora';
import {A2, NexoolsAdA2} from './projects/nexools-ads/A2Lista';
import {A3, NexoolsAdA3} from './projects/nexools-ads/A3Golpe';
import {A4, NexoolsAdA4} from './projects/nexools-ads/A4Persona';

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
    <Composition id={VSL.id} fps={60} width={1920} height={1080} durationInFrames={VSL.total} component={NexoolsVSL} defaultProps={{debugSafeArea: false}} />
    <Composition id={A1.id} fps={60} width={1080} height={1920} durationInFrames={A1.total} component={NexoolsAdA1} defaultProps={{debugSafeArea: false}} />
    <Composition id={A2.id} fps={60} width={1080} height={1920} durationInFrames={A2.total} component={NexoolsAdA2} defaultProps={{debugSafeArea: false}} />
    <Composition id={A3.id} fps={60} width={1080} height={1920} durationInFrames={A3.total} component={NexoolsAdA3} defaultProps={{debugSafeArea: false}} />
    <Composition id={A4.id} fps={60} width={1080} height={1920} durationInFrames={A4.total} component={NexoolsAdA4} defaultProps={{debugSafeArea: false}} />
  </>
);
