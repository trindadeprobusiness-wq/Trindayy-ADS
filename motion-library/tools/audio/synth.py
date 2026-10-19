#!/usr/bin/env python3
"""Trilha e efeitos sonoros sintetizados (100% originais, sem licença de terceiros).

Uso: python3 motion-library/tools/audio/synth.py <pasta_saida>
Gera: bed_tech.wav (trilha ~44 s) + sfx_*.wav
Determinístico: seed fixa.
"""
import sys, os
import numpy as np
from scipy import signal
from scipy.io import wavfile

SR = 44100
rng = np.random.default_rng(7)
OUT = sys.argv[1] if len(sys.argv) > 1 else "."
os.makedirs(OUT, exist_ok=True)


def save(name, x, peak=0.89):
    x = np.asarray(x, np.float64)
    if x.ndim == 1:
        x = np.stack([x, x], 1)
    m = np.max(np.abs(x)) + 1e-9
    x = x / m * peak
    wavfile.write(os.path.join(OUT, name), SR, (x * 32767).astype(np.int16))


def env(n, a, d, sustain=0.0, r=0.0):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4))
    e *= np.where(t > a, np.exp(-(t - a) / max(d, 1e-4)) * (1 - sustain) + sustain, 1)
    return e


def bp(x, lo, hi, order=2):
    b, a = signal.butter(order, [lo / (SR / 2), hi / (SR / 2)], "band")
    return signal.lfilter(b, a, x)


def lp(x, f, order=2):
    b, a = signal.butter(order, f / (SR / 2), "low")
    return signal.lfilter(b, a, x)


def hp(x, f, order=2):
    b, a = signal.butter(order, f / (SR / 2), "high")
    return signal.lfilter(b, a, x)


# ---------------- SFX ----------------
def whoosh(dur=0.55, up=True):
    n = int(dur * SR); t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    # varredura de banda em blocos
    blk = 512
    for i in range(0, n, blk):
        p = i / n
        fc = 300 + (5200 if up else 5200 * (1 - p)) * (p if up else 1)
        seg = bp(noise[i:i + blk + 256], max(80, fc * 0.6), min(18000, fc * 1.6))[:len(noise[i:i + blk])]
        out[i:i + blk] = seg
    e = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 1.6
    l = out * e; r = np.roll(out, 90) * e
    return np.stack([l, r], 1)


def tick(f=2600, dur=0.03):
    n = int(dur * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * f * t) * np.exp(-t / 0.006)


def pop():
    n = int(0.12 * SR); t = np.arange(n) / SR
    f = 900 * np.exp(-t / 0.03) + 380
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.035)


def click():
    n = int(0.05 * SR); t = np.arange(n) / SR
    x = bp(rng.standard_normal(n), 1800, 6000) * np.exp(-t / 0.004) + 0.4 * np.sin(2 * np.pi * 1200 * t) * np.exp(-t / 0.01)
    return x


def impact(dur=1.2):
    n = int(dur * SR); t = np.arange(n) / SR
    f = 52 + 70 * np.exp(-t / 0.05)
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.35)
    body = lp(rng.standard_normal(n), 900) * np.exp(-t / 0.08) * 0.6
    air = hp(rng.standard_normal(n), 4000) * np.exp(-t / 0.25) * 0.08
    return sub + body + air


def strike():
    n = int(0.22 * SR); t = np.arange(n) / SR
    return bp(rng.standard_normal(n), 2500, 9000) * np.exp(-t / 0.05) * np.minimum(1, t / 0.01)


def stamp():
    n = int(0.5 * SR); t = np.arange(n) / SR
    thud = np.sin(2 * np.pi * (90 + 120 * np.exp(-t / 0.02)) * t) * np.exp(-t / 0.09)
    return thud + 0.5 * click()[:n].tolist() + [0] * 0 if False else thud + np.pad(click(), (0, n - len(click())))


def riser(dur=0.9):
    n = int(dur * SR); t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    x = np.zeros(n); blk = 512
    for i in range(0, n, blk):
        fc = 400 + 7000 * (i / n) ** 2
        x[i:i + blk] = bp(noise[i:i + blk + 256], fc * 0.7, min(18000, fc * 1.4))[:len(noise[i:i + blk])]
    tone = np.sin(2 * np.pi * (220 + 660 * (t / dur) ** 2) * t) * 0.15
    return (x + tone) * (t / dur) ** 2


def typing(n_keys=10, gap=0.07):
    total = int((n_keys * gap + 0.1) * SR); out = np.zeros(total)
    for k in range(n_keys):
        s = int(k * gap * SR + rng.integers(0, 600))
        c = click() * (0.5 + 0.3 * rng.random())
        out[s:s + len(c)] += c[: max(0, total - s)]
    return out


def chime():
    n = int(0.9 * SR); t = np.arange(n) / SR
    x = sum(np.sin(2 * np.pi * f * t) * np.exp(-t / d) * g for f, d, g in [(1318.5, 0.5, 1), (1975.5, 0.35, 0.5), (2637, 0.25, 0.25)])
    x2 = np.pad(x, (int(0.08 * SR), 0))[:n] * 0.7 + x
    return x2


# ---------------- Trilha ----------------
def bed(dur=44.0, bpm=112, root=57):
    n = int(dur * SR); t = np.arange(n) / SR
    beat = 60 / bpm
    out = np.zeros((n, 2))
    midi = lambda m: 440 * 2 ** ((m - 69) / 12)
    prog = [[0, 3, 7, 10], [-4, 0, 3, 7], [-9, -5, 0, 3], [-2, 2, 5, 9]]  # Am7 Fmaj7 C(add) G6 aprox.
    bar = beat * 4
    # pad
    for i in range(int(dur / bar) + 1):
        ch = prog[i % 4]; s = int(i * bar * SR); e = min(n, int((i + 1) * bar * SR + 0.3 * SR))
        if s >= n: break
        tt = np.arange(e - s) / SR
        a = np.minimum(1, tt / 0.6) * np.minimum(1, (e - s) / SR - tt + 0.01) ** 0.3
        seg = np.zeros(e - s)
        for k, iv in enumerate(ch):
            f = midi(root + iv + 12)
            seg += np.sin(2 * np.pi * f * tt + k) + 0.3 * np.sin(2 * np.pi * f * 2.003 * tt)
        seg = lp(seg * a, 2200)
        out[s:e, 0] += seg * 0.10; out[s:e, 1] += np.roll(seg, 300) * 0.10
    # sub pulse (colcheias, sidechain implícito)
    for k in range(int(dur / (beat / 2))):
        s = int(k * beat / 2 * SR)
        if s >= n: break
        ch = prog[int(k * beat / 2 / bar) % 4]
        f = midi(root + ch[0] - 12)
        ln = int(beat / 2 * SR * 0.9); tt = np.arange(min(ln, n - s)) / SR
        out[s:s + len(tt)] += (np.sin(2 * np.pi * f * tt) * np.exp(-tt / 0.18) * 0.22)[:, None]
    # kick em 1 e 3 a partir do compasso 2
    for k in range(int(dur / beat)):
        if k < 4 or k % 2: continue
        s = int(k * beat * SR); ki = impact(0.35) * 0.35
        e = min(n, s + len(ki)); out[s:e] += ki[: e - s, None]
    # hat suave
    hat = hp(rng.standard_normal(int(0.04 * SR)), 7000) * np.exp(-np.arange(int(0.04 * SR)) / SR / 0.012)
    for k in range(int(dur / (beat / 2))):
        if k < 8: continue
        s = int(k * beat / 2 * SR + beat / 4 * SR)
        e = min(n, s + len(hat)); g = 0.05 if k % 2 else 0.03
        if s < n: out[s:e, k % 2] += hat[: e - s] * g
    # fade in/out
    fi = np.minimum(1, t / 1.5); fo = np.minimum(1, (dur - t) / 2.5)
    return out * (fi * fo)[:, None]


if __name__ == "__main__":
    save("bed_tech.wav", bed(), 0.7)
    save("sfx_whoosh.wav", whoosh())
    save("sfx_whoosh_down.wav", whoosh(0.5, up=False))
    save("sfx_tick.wav", tick(), 0.5)
    save("sfx_pop.wav", pop(), 0.7)
    save("sfx_click.wav", click(), 0.6)
    save("sfx_impact.wav", impact(), 0.9)
    save("sfx_strike.wav", strike(), 0.6)
    save("sfx_stamp.wav", stamp(), 0.85)
    save("sfx_riser.wav", riser(), 0.6)
    save("sfx_typing.wav", typing(), 0.45)
    save("sfx_chime.wav", chime(), 0.6)
    print("ok", sorted(os.listdir(OUT)))
