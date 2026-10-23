import {existsSync, readdirSync} from 'node:fs';
import {join} from 'node:path';

/** Returns a headless Chromium path: $REMOTION_BROWSER, then Playwright's cache, else null (Remotion downloads its own). */
export function findBrowser() {
  if (process.env.REMOTION_BROWSER && existsSync(process.env.REMOTION_BROWSER)) return process.env.REMOTION_BROWSER;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH ?? '/opt/pw-browsers';
  if (!existsSync(root)) return null;
  for (const dir of readdirSync(root).filter((d) => d.startsWith('chromium_headless_shell')).sort().reverse()) {
    for (const sub of readdirSync(join(root, dir))) {
      const bin = join(root, dir, sub, 'chrome-headless-shell');
      if (existsSync(bin)) return bin;
    }
  }
  return null;
}
