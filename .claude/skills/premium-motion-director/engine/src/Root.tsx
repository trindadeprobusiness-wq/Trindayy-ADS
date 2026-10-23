import React from 'react';
import {Composition} from 'remotion';
import {ensureFonts} from './lib';
import type {Timeline} from './lib';
import {PremiumProduct} from './examples/premium-product/PremiumProduct';
import premium from './examples/premium-product/timeline.json';
import {DynamicAd} from './examples/dynamic-ad/DynamicAd';
import dynamicAd from './examples/dynamic-ad/timeline.json';
import {SaasShowcase} from './examples/saas-showcase/SaasShowcase';
import saas from './examples/saas-showcase/timeline.json';

ensureFonts();

const fromTimeline = (t: unknown) => {
  const tl = t as Timeline;
  return {id: tl.id, fps: tl.fps, width: tl.width, height: tl.height, durationInFrames: tl.durationInFrames};
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition {...fromTimeline(premium)} component={PremiumProduct} defaultProps={{debugSafeArea: false}} />
    <Composition {...fromTimeline(dynamicAd)} component={DynamicAd} defaultProps={{debugSafeArea: false}} />
    <Composition {...fromTimeline(saas)} component={SaasShowcase} defaultProps={{debugSafeArea: false}} />
  </>
);
