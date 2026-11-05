// Render only the audio of a composition (voice + bed + SFX) — used to remix sound without re-rendering video.
// Usage: node scripts/render-audio.mjs <CompositionId> <out.m4a>
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import {join, dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {findBrowser} from './find-browser.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [id, out] = process.argv.slice(2);
const browserExecutable = findBrowser();
const extra = browserExecutable && !browserExecutable.includes('headless') ? {chromeMode: 'chrome-for-testing'} : {};
const serveUrl = await bundle({entryPoint: join(root, 'src/index.ts'), publicDir: join(root, 'public')});
const composition = await selectComposition({serveUrl, id, inputProps: {debugSafeArea: false}, browserExecutable, ...extra});
await renderMedia({composition, serveUrl, codec: 'aac', audioBitrate: '320k', outputLocation: resolve(out), inputProps: {debugSafeArea: false}, browserExecutable, ...extra});
console.log('[audio]', out);
