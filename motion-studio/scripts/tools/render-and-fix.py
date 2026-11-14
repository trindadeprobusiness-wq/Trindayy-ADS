#!/usr/bin/env python3
"""Renderiza composições do Remotion, acha quadros cinzas/piscados e os substitui por stills limpos.

Uso (dentro de motion-studio/):
    python3 scripts/tools/render-and-fix.py NexoolsC1Atencao NexoolsC2Maioria
    python3 scripts/tools/render-and-fix.py NexoolsC1Atencao --export renders/C1.mp4

Por que existe: o Chromium às vezes entrega 1 a 3 quadros cinzas seguidos. O render.mjs conserta o caso
de 1 quadro; este script pega também os de 2-3 quadros (queda de luminância que volta em até 4 quadros),
renderiza esses quadros como PNG e sobrepõe com ffmpeg. Depois, opcionalmente, exporta sem metadados.
"""
import os, subprocess, sys
import numpy as np

ST = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))  # motion-studio/


def run(cmd, **k):
    return subprocess.run(cmd, cwd=ST, **k)


def dips(video, jump=8, back=3, window=5):
    """Índices de quadros que fogem da média e voltam em até `window` quadros."""
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', video, '-vf', 'scale=64:64', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'],
                         capture_output=True, check=True).stdout
    m = np.frombuffer(raw, np.uint8).reshape(-1, 64 * 64).astype(float).mean(1)
    bad = set()
    for i in range(1, len(m)):
        if abs(m[i] - m[i - 1]) > jump:
            for j in range(i + 1, min(len(m), i + window)):
                if abs(m[j] - m[i - 1]) < back:
                    bad.update(range(i, j))
                    break
    return sorted(bad)


def fix(cid):
    run(['node', 'scripts/render.mjs', cid], check=True)
    v = f'{ST}/out/{cid}.mp4'
    bad = dips(v)
    print(cid, 'quadros suspeitos:', bad, flush=True)
    if not bad:
        return v
    fx = f'{ST}/out/fx_{cid}'
    run(['node', 'scripts/render.mjs', cid, '--stills', ','.join(map(str, bad)), '--out', fx], check=True)
    ins, fc, prev = [], [], '[0:v]'
    for k, n in enumerate(bad, 1):
        ins += ['-i', f'{fx}/frames/{cid}_{n:04d}.png']
        fc.append(f"{prev}[{k}:v]overlay=enable='eq(n\\,{n})'[v{k}]")
        prev = f'[v{k}]'
    f = ';'.join(fc)
    f = f[:f.rfind('[')] + ',format=yuv420p[v]'
    out = f'{ST}/out/{cid}_fixed.mp4'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', v, *ins, '-filter_complex', f, '-map', '[v]', '-map', '0:a',
                    '-c:v', 'libx264', '-crf', '14', '-preset', 'medium', '-c:a', 'copy', out], check=True)
    print(cid, 'depois da correção:', dips(out), flush=True)
    return out


if __name__ == '__main__':
    args = sys.argv[1:]
    export = None
    if '--export' in args:
        i = args.index('--export')
        export = args[i + 1]
        del args[i:i + 2]
    if not args:
        sys.exit(__doc__)
    for cid in args:
        src = fix(cid)
        if export:
            dst = export if len(args) == 1 else export.replace('.mp4', f'_{cid}.mp4')
            run(['bash', 'scripts/tools/export-final.sh', src, os.path.abspath(dst)], check=True)
            print('entregue sem metadados:', dst)
