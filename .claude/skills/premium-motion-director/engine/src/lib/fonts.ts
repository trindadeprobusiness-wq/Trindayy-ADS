// Fonts are bundled from npm (@fontsource, SIL Open Font License) so renders never depend on
// network access or on fonts installed on the render machine.
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import {continueRender, delayRender, cancelRender} from 'remotion';

const FACES = [
  '300 32px "Inter"', '400 32px "Inter"', '500 32px "Inter"', '600 32px "Inter"', '700 32px "Inter"', '800 32px "Inter"',
  '400 32px "Instrument Serif"', 'italic 400 32px "Instrument Serif"',
  '400 32px "JetBrains Mono"', '500 32px "JetBrains Mono"',
];

let started = false;

/** Blocks rendering until every face is loaded. A missing font is a render failure, not a silent fallback. */
export const ensureFonts = () => {
  if (started || typeof document === 'undefined') return;
  started = true;
  const handle = delayRender('Loading fonts');
  Promise.all(FACES.map((f) => document.fonts.load(f, 'AaÇçãé0123')))
    .then((results) => {
      const missing = FACES.filter((_, i) => results[i].length === 0);
      if (missing.length) throw new Error(`Fonts failed to load: ${missing.join(', ')}`);
      continueRender(handle);
    })
    .catch((err) => cancelRender(err));
};
