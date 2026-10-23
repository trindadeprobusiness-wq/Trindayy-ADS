import {Config} from '@remotion/cli/config';
import {findBrowser} from './scripts/find-browser.mjs';

// Use a locally installed headless Chromium when Remotion cannot download its own.
const local = findBrowser();
if (local) Config.setBrowserExecutable(local);
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
