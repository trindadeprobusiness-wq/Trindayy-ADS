#!/usr/bin/env python3
"""Procedural sound-design kit (original, license-free).

Generates a small, coherent palette of SFX and two music beds as 48 kHz WAV.
Everything is deterministic (fixed seed), so renders are reproducible.

Usage:
    python3 synth-sfx.py <out_dir> [--only name1,name2] [--bed-seconds 32]

Sounds:
    whoosh_soft, whoosh_fast, impact_low, impact_soft, click_ui, tick,
    pop_soft, riser_2s, shimmer, swell_reverse,
    bed_minimal (calm pad), bed_pulse (110 bpm pulse for dynamic ads)
"""
import argparse
import math
import os
import sys
import wave

try:
    import numpy as np
except ImportError:  # pragma: no cover
    sys.exit("numpy is required: pip install numpy")

SR = 48000
RNG = np.random.default_rng(20261023)


# ---------- helpers ----------
def t_axis(seconds):
    return np.arange(int(SR * seconds)) / SR


def env_adsr(n, a, d, s_level, r):
    """Linear-ish ADSR in seconds, sustain fills the remainder."""
    a_n, d_n, r_n = int(a * SR), int(d * SR), int(r * SR)
    s_n = max(0, n - a_n - d_n - r_n)
    parts = [
        np.linspace(0, 1, a_n, endpoint=False) ** 2 if a_n else np.array([]),
        np.linspace(1, s_level, d_n, endpoint=False) if d_n else np.array([]),
        np.full(s_n, s_level),
        np.linspace(s_level, 0, r_n) if r_n else np.array([]),
    ]
    e = np.concatenate(parts)
    return np.pad(e, (0, max(0, n - len(e))))[:n]


def one_pole_lp(x, cutoff):
    """Time-varying one-pole low-pass. cutoff: float or array (Hz)."""
    cutoff = np.broadcast_to(np.asarray(cutoff, dtype=float), x.shape)
    a = np.exp(-2 * math.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a[i]) * x[i] + a[i] * acc
        y[i] = acc
    return y


def band(x, lo, hi):
    """Crude band-pass = LP(hi) - LP(lo)."""
    return one_pole_lp(x, hi) - one_pole_lp(x, lo)


def reverb(x, seconds=1.2, mix=0.25, seed=7):
    rng = np.random.default_rng(seed)
    n = int(SR * seconds)
    ir = rng.standard_normal(n) * np.exp(-np.linspace(0, 6, n))
    ir = one_pole_lp(ir, 5000)
    ir /= np.sqrt(np.sum(ir ** 2)) + 1e-9
    wet = np.fft.irfft(np.fft.rfft(x, len(x) + n) * np.fft.rfft(ir, len(x) + n))[: len(x) + n]
    dry = np.pad(x, (0, n))
    return (1 - mix) * dry + mix * wet


def normalize(x, peak_db=-3.0):
    peak = np.max(np.abs(x)) + 1e-12
    return x * (10 ** (peak_db / 20) / peak)


def fade_edges(x, ms=4):
    n = int(SR * ms / 1000)
    if n and len(x) > 2 * n:
        x = x.copy()
        x[:n] *= np.linspace(0, 1, n)
        x[-n:] *= np.linspace(1, 0, n)
    return x


def stereo(x, width=0.0, seed=1):
    """Mono -> stereo with optional micro-delay width."""
    if width <= 0:
        return np.stack([x, x], axis=1)
    d = int(SR * 0.012 * width)
    r = np.concatenate([np.zeros(d), x])[: len(x)]
    return np.stack([x, 0.8 * x + 0.2 * r], axis=1)


def write_wav(path, data):
    data = np.clip(data, -1, 1)
    if data.ndim == 1:
        data = stereo(data)
    pcm = (data * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


# ---------- sounds ----------
def whoosh(seconds, lo_hz, hi_hz, peak_at=0.6):
    n = int(SR * seconds)
    noise = RNG.standard_normal(n)
    pos = np.linspace(0, 1, n)
    # bell envelope peaking at peak_at
    e = np.where(pos < peak_at, (pos / peak_at) ** 2.2, ((1 - pos) / (1 - peak_at)) ** 1.6)
    sweep = lo_hz + (hi_hz - lo_hz) * np.sin(np.pi * np.clip(pos / (peak_at * 1.4), 0, 1)) ** 2
    y = band(noise, sweep * 0.35, sweep) * e
    return normalize(reverb(fade_edges(y), 0.6, 0.18), -4)


def impact(seconds=1.4, f0=62, f1=38, noise_amt=0.35):
    t = t_axis(seconds)
    freq = f1 + (f0 - f1) * np.exp(-t * 18)
    phase = 2 * np.pi * np.cumsum(freq) / SR
    body = np.sin(phase) * np.exp(-t * 4.2)
    click = one_pole_lp(RNG.standard_normal(len(t)), 3500) * np.exp(-t * 60) * noise_amt
    y = np.tanh(1.6 * (body + click))
    return normalize(reverb(fade_edges(y), 1.4, 0.2), -2)


def click_ui():
    t = t_axis(0.09)
    blip = np.sin(2 * np.pi * 2100 * t) * np.exp(-t * 90)
    snap = one_pole_lp(RNG.standard_normal(len(t)), 7000) * np.exp(-t * 400) * 0.6
    return normalize(fade_edges(blip + snap, 1), -6)


def tick():
    t = t_axis(0.04)
    y = np.sin(2 * np.pi * 4200 * t) * np.exp(-t * 220)
    return normalize(fade_edges(y, 1), -9)


def pop_soft():
    t = t_axis(0.16)
    f = 520 + 420 * (1 - np.exp(-t * 40))
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 28)
    return normalize(reverb(fade_edges(y, 2), 0.4, 0.15), -7)


def riser(seconds=2.0):
    t = t_axis(seconds)
    pos = t / seconds
    noise = band(RNG.standard_normal(len(t)), 300 + 3000 * pos ** 2, 1200 + 9000 * pos ** 2)
    f = 180 + 900 * pos ** 2.4
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.35
    y = (noise * 0.9 + tone) * pos ** 2.6
    y[-int(SR * 0.01):] *= np.linspace(1, 0, int(SR * 0.01))
    return normalize(y, -4)


def shimmer(seconds=1.8):
    t = t_axis(seconds)
    y = np.zeros_like(t)
    for i, f in enumerate([1760, 2217.46, 2637.02, 3520]):
        y += np.sin(2 * np.pi * f * t + i) * (0.5 + 0.5 * np.sin(2 * np.pi * (5 + i) * t)) / (i + 1)
    y *= env_adsr(len(t), 0.04, 0.3, 0.4, seconds - 0.4)
    return normalize(reverb(y, 1.8, 0.4), -10)


def swell_reverse(seconds=1.1):
    y = impact(seconds, 90, 60, 0.6)[: int(SR * seconds)][::-1]
    return normalize(fade_edges(y), -5)


def pad_voice(freqs, seconds, bright=1800):
    t = t_axis(seconds)
    y = np.zeros_like(t)
    for f in freqs:
        for det in (-0.12, 0.0, 0.11):  # cents-ish detune for width
            ff = f * (1 + det / 100)
            for h in range(1, 7):
                y += np.sin(2 * np.pi * ff * h * t + RNG.uniform(0, 6.28)) / (h ** 1.3)
    y = one_pole_lp(y, bright)
    return y * env_adsr(len(t), 1.2, 0.5, 0.85, 1.6)


def midi(n):
    return 440 * 2 ** ((n - 69) / 12)


def bed_minimal(seconds=32):
    # Dmaj9 -> Bm9 -> Gmaj7#11 -> Aadd9, slow and airy
    chords = [[50, 57, 61, 64, 66], [47, 54, 57, 61, 62], [43, 50, 54, 57, 61], [45, 52, 57, 59, 64]]
    seg = seconds / 4
    out = np.zeros(int(SR * seconds) + int(SR * 2))
    for i, ch in enumerate(chords):
        v = pad_voice([midi(n) for n in ch], seg + 2, 1400)
        s = int(i * seg * SR)
        out[s : s + len(v)] += v
    out = out[: int(SR * seconds)]
    out *= np.minimum(1, np.linspace(0, seconds, len(out)) / 1.5)  # fade in
    out *= np.minimum(1, (seconds - np.linspace(0, seconds, len(out))) / 2.5)  # fade out
    return normalize(reverb(out, 2.4, 0.35)[: len(out)], -14)


def bed_pulse(seconds=32, bpm=110):
    beat = 60 / bpm
    n = int(SR * seconds)
    out = np.zeros(n + SR)
    kick = impact(0.45, 120, 45, 0.15)[: int(SR * 0.45)]
    hat = band(RNG.standard_normal(int(SR * 0.05)), 6000, 14000) * np.exp(-t_axis(0.05) * 90)
    b = 0
    while b * beat < seconds:
        s = int(b * beat * SR)
        out[s : s + len(kick)] += kick * 0.9
        h = int((b + 0.5) * beat * SR)
        out[h : h + len(hat)] += normalize(hat, -14)
        b += 1
    bass_notes = [38, 38, 35, 35, 31, 31, 33, 33]
    for i in range(int(seconds / (beat * 2)) + 1):
        f = midi(bass_notes[i % len(bass_notes)])
        tt = t_axis(beat * 2)
        v = np.tanh(2 * np.sin(2 * np.pi * f * tt)) * env_adsr(len(tt), 0.01, 0.2, 0.5, 0.15)
        s = int(i * beat * 2 * SR)
        seg = out[s : s + len(v)]
        seg += one_pole_lp(v, 500)[: len(seg)] * 0.35
    pad = bed_minimal(seconds) * 0.6
    out = out[:n] + np.pad(pad, (0, max(0, n - len(pad))))[:n]
    out *= np.minimum(1, (seconds - np.linspace(0, seconds, n)) / 1.5)
    return normalize(out, -10)


REGISTRY = {
    "whoosh_soft": lambda a: whoosh(0.75, 400, 3500),
    "whoosh_fast": lambda a: whoosh(0.38, 900, 7000, 0.55),
    "impact_low": lambda a: impact(),
    "impact_soft": lambda a: impact(0.9, 110, 70, 0.15),
    "click_ui": lambda a: click_ui(),
    "tick": lambda a: tick(),
    "pop_soft": lambda a: pop_soft(),
    "riser_2s": lambda a: riser(2.0),
    "shimmer": lambda a: shimmer(),
    "swell_reverse": lambda a: swell_reverse(),
    "bed_minimal": lambda a: bed_minimal(a.bed_seconds),
    "bed_pulse": lambda a: bed_pulse(a.bed_seconds),
}


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("out_dir")
    p.add_argument("--only", default="")
    p.add_argument("--bed-seconds", type=float, default=32)
    a = p.parse_args()
    os.makedirs(a.out_dir, exist_ok=True)
    names = [n for n in a.only.split(",") if n] or list(REGISTRY)
    for name in names:
        if name not in REGISTRY:
            sys.exit(f"unknown sound: {name}. Options: {', '.join(REGISTRY)}")
        path = os.path.join(a.out_dir, f"{name}.wav")
        write_wav(path, REGISTRY[name](a))
        print(f"wrote {path}")


if __name__ == "__main__":
    main()
