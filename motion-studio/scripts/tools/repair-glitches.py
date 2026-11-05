#!/usr/bin/env python3
"""Find and repair single-frame render glitches (un-rastered tiles, vanished layers) in a Remotion render.

A glitch frame differs strongly from BOTH neighbours while the neighbours agree with each other.
Each glitch frame is re-rendered as a still and composited back over the video; repeats until clean.

Usage (inside the studio): python3 scripts/tools/repair-glitches.py <CompositionId> [--video out/<Id>.mp4] [--max-rounds 4]
Env: REMOTION_BROWSER as for render.mjs.
"""
import argparse, json, os, shutil, subprocess, sys, tempfile
import numpy as np

def detect(video, thr=0.03):
    """Frames that differ from BOTH neighbours while the neighbours agree (1-frame Chromium tile glitches).
    Aspect-aware (works for 9:16 and 16:9) and sensitive to faint blocks on light backgrounds."""
    probe = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', video],
                           capture_output=True, text=True, check=True).stdout.strip().split(',')
    vw, vh = int(probe[0]), int(probe[1])
    W, H = (192, 108) if vw >= vh else (108, 192)
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', video, '-vf', f'scale={W}:{H}', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'],
                         capture_output=True, check=True).stdout
    f = np.frombuffer(raw, np.uint8).reshape(-1, H, W)
    bad = []
    for i in range(1, len(f) - 1):
        p, x, n = f[i - 1].astype(np.int16), f[i].astype(np.int16), f[i + 1].astype(np.int16)
        a = np.abs(x - p); b = np.abs(x - n); c = np.abs(p - n)
        strong = ((a > 40) & (b > 40) & (c < 20)).mean() > thr
        faint = ((a > 10) & (b > 10) & (c < 4)).mean() > 0.004
        if strong or faint:
            bad.append(i)
    return bad

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('id'); ap.add_argument('--video'); ap.add_argument('--max-rounds', type=int, default=4)
    a = ap.parse_args()
    root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    video = os.path.abspath(a.video or os.path.join(root, 'out', f'{a.id}.mp4'))
    for rnd in range(1, a.max_rounds + 1):
        bad = detect(video)
        print(json.dumps({'round': rnd, 'glitch_frames': bad}))
        if not bad:
            return 0
        tmp = tempfile.mkdtemp()
        subprocess.run(['node', os.path.join(root, 'scripts', 'render.mjs'), a.id, '--stills', ','.join(map(str, bad)), '--out', tmp],
                       cwd=root, check=True, stdout=subprocess.DEVNULL)
        stills = [os.path.join(tmp, 'frames', f'{a.id}_{n:04d}.png') for n in bad]
        inputs = ['-i', video]
        chain, last = [], '0:v'
        for k, (n, png) in enumerate(zip(bad, stills)):
            inputs += ['-i', png]
            out = f'v{k}'
            chain.append(f"[{last}][{k + 1}:v]overlay=enable='eq(n\\,{n})'[{out}]")
            last = out
        fixed = video + '.fixed.mp4'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(chain), '-map', f'[{last}]', '-map', '0:a?',
                        '-c:v', 'libx264', '-crf', '16', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-c:a', 'copy', fixed], check=True)
        os.replace(fixed, video)
        shutil.rmtree(tmp, ignore_errors=True)
    bad = detect(video)
    print(json.dumps({'final_glitch_frames': bad}))
    return 1 if bad else 0

if __name__ == '__main__':
    sys.exit(main())
