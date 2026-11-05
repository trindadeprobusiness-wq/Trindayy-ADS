#!/usr/bin/env python3
"""Pacote de SFX "pro" 100% sintetizado (original, sem licença de terceiros). Determinístico.
Uso: python3 sfx_pro.py <pasta_saida>
"""
import os, sys
import numpy as np
from scipy import signal
from scipy.io import wavfile

SR = 48000
R = np.random.default_rng(11)
OUT = sys.argv[1] if len(sys.argv) > 1 else '.'
os.makedirs(OUT, exist_ok=True)
t_ = lambda s: np.arange(int(s * SR)) / SR


def lp(x, f, o=2): b, a = signal.butter(o, f / (SR / 2), 'low'); return signal.lfilter(b, a, x)
def hp(x, f, o=2): b, a = signal.butter(o, f / (SR / 2), 'high'); return signal.lfilter(b, a, x)
def bp(x, lo, hi, o=2): b, a = signal.butter(o, [lo / (SR / 2), hi / (SR / 2)], 'band'); return signal.lfilter(b, a, x)


def verb(x, s=1.0, mix=0.25):
    n = int(s * SR); ir = R.standard_normal(n) * np.exp(-np.arange(n) / SR / (s / 5))
    w = signal.fftconvolve(x, lp(ir, 6000)); w = np.pad(w, (0, max(0, len(x) + n - len(w))))[: len(x) + n]
    y = np.concatenate([x, np.zeros(n)]); return y * (1 - mix) + w / (np.max(np.abs(w)) + 1e-9) * np.max(np.abs(x)) * mix


def save(name, x, peak=0.89, width=0.0):
    x = np.asarray(x, float); x = x / (np.max(np.abs(x)) + 1e-9) * peak
    fade = min(len(x), int(0.004 * SR)); x[-fade:] *= np.linspace(1, 0, fade)
    L = x; Rr = np.roll(x, int(width * 0.012 * SR)) if width else x
    wavfile.write(os.path.join(OUT, name), SR, (np.stack([L, Rr], 1) * 32767).astype(np.int16))


def sweep_noise(s, f0, f1, peak=0.6):
    n = int(s * SR); x = R.standard_normal(n); out = np.zeros(n); blk = 512
    for i in range(0, n, blk):
        p = i / n; f = f0 * (f1 / f0) ** p
        seg = bp(x[max(0, i - 2048): i + blk], max(40, f * 0.6), min(SR / 2 - 100, f * 1.6))[-min(blk, n - i):]
        out[i: i + len(seg)] = seg
    env = np.where(np.arange(n) / n < peak, (np.arange(n) / n / peak) ** 2, (1 - (np.arange(n) / n - peak) / (1 - peak)) ** 1.5)
    return out * env


# --- tension / weight
def sub_drop(s=1.3):
    t = t_(s); f = 90 * (28 / 90) ** (t / s); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.tanh(2.2 * np.sin(ph)) * np.exp(-t / (s * 0.45)) + 0.25 * lp(R.standard_normal(len(t)), 300) * np.exp(-t / 0.08)


def heartbeat():
    def thump(): t = t_(0.28); return np.sin(2 * np.pi * (55 - 20 * t / 0.28) * t) * np.exp(-t / 0.07)
    a = thump(); out = np.zeros(int(0.9 * SR)); out[: len(a)] += a; s = int(0.24 * SR); out[s: s + len(a)] += a * 0.7
    return lp(out, 400)


def tension_stinger(s=1.8):
    t = t_(s); x = sum(np.sin(2 * np.pi * f * t + i) for i, f in enumerate([55, 58.3, 82.4, 87.3, 116.5]))
    x += 0.3 * bp(R.standard_normal(len(t)), 200, 900)
    env = np.minimum(1, t / (s * 0.75)) ** 2 * np.exp(-np.maximum(0, t - s * 0.75) / 0.12)
    return verb(lp(x * env, 1400), 1.4, 0.3)


def clock_tick():
    t = t_(0.05); return hp(R.standard_normal(len(t)), 3500) * np.exp(-t / 0.006) + np.sin(2 * np.pi * 1800 * t) * np.exp(-t / 0.01) * 0.3


# --- positive / reveal
def sparkle(s=1.6):
    out = np.zeros(int(s * SR))
    for k, f in enumerate([1568, 1976, 2349, 3136, 3951]):
        t = t_(s - k * 0.06); st = int(k * 0.06 * SR)
        w = (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 2.01 * t)) * np.exp(-t / 0.35) * (0.9 ** k)
        m = min(len(w), len(out) - st); out[st: st + m] += w[:m]
    return verb(out, 1.2, 0.35)


def success():
    out = np.zeros(int(1.2 * SR))
    for k, f in enumerate([523.25, 659.25, 783.99, 1046.5]):
        t = t_(1.2 - k * 0.07); st = int(k * 0.07 * SR)
        w = np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t / 0.05)
        w = w * np.exp(-t / 0.4); m = min(len(w), len(out) - st); out[st: st + m] += w[:m]
    return verb(out, 1.0, 0.25)


def notification():
    out = np.zeros(int(0.7 * SR))
    for st, f in [(0, 987.77), (0.11, 1318.5)]:
        t = t_(0.5); s = int(st * SR); out[s: s + len(t)] += (np.sin(2 * np.pi * f * t) + 0.2 * np.sin(4 * np.pi * f * t)) * np.exp(-t / 0.18)
    return verb(out, 0.6, 0.2)


# --- UI / foley
def lock_click():
    t = t_(0.25); metal = sum(np.sin(2 * np.pi * f * t) for f in [2200, 3300, 4700]) * np.exp(-t / 0.02)
    thunk = np.sin(2 * np.pi * 140 * t) * np.exp(-t / 0.04)
    return hp(R.standard_normal(len(t)), 2000) * np.exp(-t / 0.004) * 0.6 + metal * 0.25 + thunk * 0.7


def key_tap():
    t = t_(0.06); return bp(R.standard_normal(len(t)), 1500, 6000) * np.exp(-t / 0.008) + np.sin(2 * np.pi * 300 * t) * np.exp(-t / 0.01) * 0.3


def typing_burst(n=7, gap=0.085):
    out = np.zeros(int((n * gap + 0.1) * SR)); k = key_tap()
    for i in range(n):
        s = int((i * gap + R.uniform(-0.012, 0.012)) * SR); s = max(0, s); out[s: s + len(k)] += k * R.uniform(0.6, 1.0)
    return out


def ui_tap():
    t = t_(0.08); return np.sin(2 * np.pi * 900 * t) * np.exp(-t / 0.015) + hp(R.standard_normal(len(t)), 4000) * np.exp(-t / 0.003) * 0.5


def page_flip():
    return sweep_noise(0.35, 6000, 1500, 0.3) * 0.8


def coin():
    out = np.zeros(int(0.9 * SR))
    for st, f in [(0, 2093), (0.08, 2637)]:
        t = t_(0.7); s = int(st * SR); out[s: s + len(t)] += (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.76 * t)) * np.exp(-t / 0.15)
    return out


if __name__ == '__main__':
    save('whoosh_long.wav', sweep_noise(1.1, 300, 5000, 0.7), width=0.6)
    save('whoosh_short.wav', sweep_noise(0.45, 500, 6000, 0.55), width=0.4)
    save('whoosh_down.wav', sweep_noise(0.8, 5000, 250, 0.35), width=0.5)
    save('sub_drop.wav', sub_drop(), 0.95)
    save('heartbeat.wav', heartbeat(), 0.9)
    save('tension_stinger.wav', tension_stinger(), 0.8, width=0.5)
    save('clock_tick.wav', clock_tick(), 0.5)
    save('sparkle.wav', sparkle(), 0.6, width=0.7)
    save('success.wav', success(), 0.7, width=0.4)
    save('notification.wav', notification(), 0.6)
    save('lock_click.wav', lock_click(), 0.8)
    save('typing_burst.wav', typing_burst(), 0.6)
    save('key_tap.wav', key_tap(), 0.5)
    save('ui_tap.wav', ui_tap(), 0.55)
    save('page_flip.wav', page_flip(), 0.6, width=0.4)
    save('coin.wav', coin(), 0.5)
    print('ok', sorted(f for f in os.listdir(OUT) if f.endswith('.wav')))
