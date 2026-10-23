// Usage: node scripts/render.mjs <CompositionId|all> [--stills 0,90,180] [--safe] [--out out] [--lufs -14] [--no-master]
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition, getCompositions} from '@remotion/renderer';
import {existsSync, mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import os from 'node:os';
import {findBrowser} from './find-browser.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const target = args[0] ?? 'all';
const opt = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};
const outDir = resolve(root, opt('--out') ?? 'out');
const stills = opt('--stills')?.split(',').map(Number);
const inputProps = {debugSafeArea: args.includes('--safe')};

// Sound palette is generated deterministically; regenerate if missing.
if (!existsSync(join(root, 'public/sfx/bed_minimal.wav'))) {
  console.log('[render] generating sfx palette…');
  execFileSync('python3', [join(root, 'scripts/tools/synth-sfx.py'), join(root, 'public/sfx')], {stdio: 'inherit'});
}

const browserExecutable = findBrowser();
const serveUrl = await bundle({entryPoint: join(root, 'src/index.ts'), publicDir: join(root, 'public')});
const all = await getCompositions(serveUrl, {inputProps, browserExecutable});
const ids = target === 'all' ? all.map((c) => c.id) : target.split(',');
mkdirSync(outDir, {recursive: true});

for (const id of ids) {
  const composition = await selectComposition({serveUrl, id, inputProps, browserExecutable});
  if (stills) {
    mkdirSync(join(outDir, 'frames'), {recursive: true});
    for (const frame of stills) {
      const output = join(outDir, 'frames', `${id}_${String(frame).padStart(4, '0')}.png`);
      await renderStill({composition, serveUrl, output, frame, inputProps, browserExecutable});
      console.log(`[still] ${output}`);
    }
    continue;
  }
  const outputLocation = join(outDir, `${id}.mp4`);
  const t0 = Date.now();
  let last = -1;
  await renderMedia({
    composition, serveUrl, codec: 'h264', outputLocation, inputProps, browserExecutable, crf: 18, pixelFormat: 'yuv420p',
    audioCodec: 'aac', audioBitrate: '192k', concurrency: Math.max(1, os.cpus().length - 1),
    onProgress: ({progress}) => {
      const pct = Math.floor(progress * 10);
      if (pct !== last) { last = pct; console.log(`[render] ${id} ${pct * 10}%`); }
    },
  });
  console.log(`[render] ${outputLocation} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  // Mastering: normalize loudness to the social target (-14 LUFS, true peak -1.5 dBTP). Skip with --no-master.
  if (!args.includes('--no-master')) {
    execFileSync('python3', [join(root, 'scripts/tools/master-audio.py'), outputLocation, '--lufs', opt('--lufs') ?? '-14'], {stdio: 'inherit'});
  }
}
