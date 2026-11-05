#!/usr/bin/env python3
"""Trilha longa para VSL (100% sintetizada, original), com energia guiada pelas seções da narração.

Uso: python3 bed_vsl.py <saida.wav> <duracao_s> <mapa.json>
mapa.json: {"segments": [[inicio_s, energia 0..1, "minor"|"major"], ...], "hits": [s, ...], "build_to": s|null}
- energia < 0.4: só pad; >= 0.4 sub pulsando; >= 0.5 arpejo; >= 0.6 kick; >= 0.68 hat.
- transições com rampas de 2,5 s (nada liga/desliga de golpe); "hits" = impacto suave; "build_to" = riser de 3 s.
"""
import importlib.util, json, os, sys
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('synth', os.path.join(HERE, 'synth.py'))
S = importlib.util.module_from_spec(spec)
sys_argv = sys.argv; sys.argv = ['synth']; spec.loader.exec_module(S); sys.argv = sys_argv
SR = S.SR
midi = lambda m: 440 * 2 ** ((m - 69) / 12)
PROG = {'minor': [[0, 3, 7, 10], [-4, 0, 3, 7], [-7, -4, 0, 3], [-2, 2, 5, 9]],   # Am7 Fmaj7 Dm7 G6
        'major': [[3, 7, 10, 14], [-2, 2, 5, 10], [-4, 0, 3, 7], [-9, -5, 0, 3]]}  # C G F Am


def main(out, dur, mp):
    m = json.load(open(mp))
    segs = sorted(m['segments']); n = int(dur * SR); t = np.arange(n) / SR
    bpm = 96; beat = 60 / bpm; bar = beat * 4; root = 57
    # energy curve with 2.5 s ramps
    e_steps = np.zeros(n)
    for i, (s0, e, _) in enumerate(segs):
        a = int(s0 * SR); b = int(segs[i + 1][0] * SR) if i + 1 < len(segs) else n
        e_steps[a:b] = e
    k = int(2.5 * SR); ker = np.ones(k) / k
    energy = np.convolve(np.pad(e_steps, (k // 2, k - k // 2 - 1), mode='edge'), ker, mode='valid')[:n]
    mood_at = lambda tt: next((md for s0, _, md in reversed(segs) if tt >= s0), segs[0][2])
    g = lambda lo, hi: np.clip((energy - lo) / (hi - lo), 0, 1)
    out_ = np.zeros((n, 2))

    def place(buf, x, start, gain=1.0, ch=None):
        s = int(start * SR)
        if s >= n or s < 0: return
        e = min(n, s + len(x)); seg = x[: e - s] * gain
        if ch is None: buf[s:e] += seg[:, None] if buf.ndim == 2 else seg
        else: buf[s:e, ch] += seg

    pad = np.zeros((n, 2)); sub = np.zeros(n); arp = np.zeros(n); kick = np.zeros(n); hat = np.zeros((n, 2))
    nbars = int(dur / bar) + 1
    for i in range(nbars):
        tt = i * bar; ch = PROG[mood_at(tt)][i % 4]
        L = int((bar + 0.4) * SR); x = np.arange(L) / SR
        seg = sum(np.sin(2 * np.pi * midi(root + iv) * x + j) + 0.22 * np.sin(2 * np.pi * midi(root + iv) * 2.003 * x) for j, iv in enumerate(ch))
        a = np.minimum(1, x / 0.9) * np.minimum(1, (x[-1] - x + 0.01) / 0.4)
        seg = S.lp(seg * a, 1500) * 0.06
        s = int(tt * SR); e = min(n, s + L)
        if s >= n: break
        pad[s:e, 0] += seg[: e - s]; pad[s:e, 1] += np.roll(seg, 400)[: e - s]
        for q in range(8):  # sub eighths + arp eighths
            t8 = tt + q * beat / 2; ln = int(beat / 2 * 0.85 * SR); xx = np.arange(ln) / SR
            place(sub, np.sin(2 * np.pi * midi(root + ch[0] - 12) * xx) * np.exp(-xx / 0.15) * 0.18, t8)
            f = midi(root + 12 + ch[[0, 1, 2, 3, 2, 1, 3, 2][q]]); xx = np.arange(int(0.3 * SR)) / SR
            place(arp, (np.sin(2 * np.pi * f * xx) + 0.25 * np.sin(4 * np.pi * f * xx)) * np.exp(-xx / 0.09) * 0.10, t8)
        for q in range(4):
            place(kick, S.lp(S.impact(0.3), 1800) * 0.42, tt + q * beat)
            hl = int(0.03 * SR); hn = S.hp(np.random.default_rng(i * 4 + q).standard_normal(hl), 7000) * np.exp(-np.arange(hl) / SR / 0.009)
            place(hat, hn * 0.05, tt + q * beat + beat / 2, ch=q % 2)
    arp = S.lp(arp, 3200)
    mix_ = pad * (0.75 + 0.25 * g(0.3, 0.8))[:, None]
    mix_ += (sub * g(0.35, 0.5))[:, None]
    mix_ += np.stack([arp * g(0.45, 0.6), np.roll(arp, 250) * g(0.45, 0.6)], 1)
    mix_ += (kick * g(0.55, 0.7))[:, None]
    mix_ += hat * g(0.62, 0.75)[:, None]
    for h in m.get('hits', []):
        place(mix_, S.lp(S.impact(1.6), 4000) * 0.45, h)
    if m.get('build_to'):
        place(mix_, S.riser(3.0) * 0.35, m['build_to'] - 3.0)
    fi = np.minimum(1, t / 1.0); fo = np.minimum(1, (dur - t) / 3.0)
    mix_ *= (fi * fo)[:, None]
    S.OUT = os.path.dirname(os.path.abspath(out)); S.save(os.path.basename(out), mix_, 0.7)
    print('ok', out)


if __name__ == '__main__':
    main(sys.argv[1], float(sys.argv[2]), sys.argv[3])
