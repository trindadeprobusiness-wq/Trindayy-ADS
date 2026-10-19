// Transcrição offline para localizar fala nas referências.
// Uso: node motion-library/tools/asr/transcribe.mjs <video...> [--lang portuguese|english]
// Instalação: (cd motion-library/tools/asr && npm install --ignore-scripts)
// --ignore-scripts evita o download extra do onnxruntime (host bloqueado no ambiente).
// Whisper tiny ERRA palavras e ALUCINA texto quando só há música: use para tempo/presença de fala.
import { pipeline, env } from '@huggingface/transformers';
import { execFileSync } from 'child_process';
const here = new URL('.', import.meta.url).pathname;
env.localModelPath = here + 'node_modules/sts-whisper-tiny/models/';
env.allowRemoteModels = false;
const args = process.argv.slice(2);
const li = args.indexOf('--lang');
const langs = li >= 0 ? [args[li + 1]] : ['portuguese', 'english'];
const files = args.filter((a, i) => a !== '--lang' && i !== li + 1);
const asr = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny', { dtype: 'q8' });
for (const f of files) {
  const buf = execFileSync('ffmpeg', ['-v', 'error', '-i', f, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], { maxBuffer: 1e9 });
  const audio = new Float32Array(new Uint8Array(buf).buffer);
  for (const lang of langs) {
    const r = await asr(audio, { language: lang, task: 'transcribe', return_timestamps: true, chunk_length_s: 30, stride_length_s: 5 });
    console.log('=====', f.split('/').pop(), lang);
    for (const c of r.chunks) console.log(`[${c.timestamp[0]?.toFixed(1)}-${c.timestamp[1]?.toFixed(1)}] ${c.text}`);
  }
}
