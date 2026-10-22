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
OUT = sys.argv[1] if len(sys.argv) > 1 and sys.argv[1] != "bed" else "."
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


# ---------------- Trilha de retenção (gerada por vídeo, sincronizada com o CTA) ----------------
def bed_drive(dur=30.0, cta=25.0, bpm=120, root=57, seed=11):
    """Pulso constante desde o 1º segundo, brilho subindo aos poucos (retém),
    'build' nos 2 s antes do CTA (riser + caixa acelerando) e 'drop' no CTA (convida ao clique)."""
    r = np.random.default_rng(seed)
    n = int(dur * SR); t = np.arange(n) / SR
    beat = 60 / bpm; bar = beat * 4; s16 = beat / 4
    midi = lambda m: 440 * 2 ** ((m - 69) / 12)
    prog = [[0, 3, 7, 12], [-4, 0, 3, 8], [-9, -5, 0, 3], [-2, 2, 5, 10]]  # Am F C G
    out = np.zeros((n, 2))
    b0 = max(1.0, cta - 2.0)  # início do build
    def add(x, start, ch=None, g=1.0):
        s = int(start * SR)
        if s >= n or s < 0: return
        e = min(n, s + len(x)); seg = x[: e - s] * g
        if ch is None: out[s:e] += seg[:, None]
        else: out[s:e, ch] += seg
    # kick: todo tempo (some no build, volta forte no drop)
    k = lp(impact(0.32), 2200) * 0.5
    for i in range(int(dur / beat) + 1):
        tt = i * beat
        if b0 <= tt < cta: continue
        add(k, tt, g=(0.75 if tt < bar else 1.0) * (1.15 if tt >= cta else 1.0))
    # hat no contratempo + 16ths depois do drop
    hl = int(0.035 * SR); hat = hp(r.standard_normal(hl), 7000) * np.exp(-np.arange(hl) / SR / 0.010)
    for i in range(int(dur / s16) + 1):
        tt = i * s16
        if b0 <= tt < cta: continue
        off = (i % 4 == 2); sixteenth = tt >= cta
        if off or (sixteenth and i % 2):
            add(hat, tt, ch=i % 2, g=0.07 if off else 0.035)
    # sub em colcheias
    for i in range(int(dur / (beat / 2)) + 1):
        tt = i * beat / 2
        if b0 <= tt < cta: continue
        ch = prog[int(tt / bar) % 4]; ln = int(beat / 2 * 0.85 * SR); x = np.arange(ln) / SR
        add(np.sin(2 * np.pi * midi(root + ch[0] - 12) * x) * np.exp(-x / 0.16) * 0.20, tt)
    # pluck em arpejo 16ths, filtro abrindo com o tempo (sensação de progresso)
    pl = np.zeros(n)
    for i in range(int(dur / s16) + 1):
        tt = i * s16
        if b0 <= tt < cta and i % 2: continue
        ch = prog[int(tt / bar) % 4]; f = midi(root + 12 + ch[[0, 1, 2, 3, 2, 1, 3, 2][i % 8]])
        ln = int(0.22 * SR); x = np.arange(ln) / SR
        w = (np.sign(np.sin(2 * np.pi * f * x)) * 0.35 + np.sin(2 * np.pi * f * x)) * np.exp(-x / 0.07)
        s = int(tt * SR); e = min(n, s + ln)
        if s < n: pl[s:e] += w[: e - s] * 0.16
    blk = int(bar * SR / 2)
    for s in range(0, n, blk):
        tt = s / SR
        prog_ = min(1, tt / max(1, b0)) if tt < cta else 1.0
        fc = 900 + 3800 * prog_ ** 1.4 + (1800 if tt >= cta else 0)
        seg = pl[max(0, s - 512): s + blk]
        y = lp(seg, min(fc, 9000), 2)[(s - max(0, s - 512)):]
        pl[s:s + len(y)] = y
    out[:, 0] += pl; out[:, 1] += np.roll(pl, 220)
    # pad (mais aberto no drop)
    for i in range(int(dur / bar) + 1):
        tt = i * bar; s = int(tt * SR); e = min(n, int((tt + bar + 0.3) * SR))
        if s >= n: break
        x = np.arange(e - s) / SR; ch = prog[i % 4]
        seg = sum(np.sin(2 * np.pi * midi(root + iv) * x + j) + 0.25 * np.sin(2 * np.pi * midi(root + iv) * 2.004 * x) for j, iv in enumerate(ch))
        a = np.minimum(1, x / 0.5) * np.minimum(1, (x[-1] - x + 0.01) / 0.3)
        seg = lp(seg * a, 3000 if tt >= cta - 0.01 else 1600) * (0.07 if tt >= cta else 0.05)
        out[s:e, 0] += seg; out[s:e, 1] += np.roll(seg, 300)
    # build: riser + caixa acelerando
    bl = cta - b0
    rz = riser(bl) * 0.55; add(rz, b0)
    sn_l = int(0.12 * SR); xs = np.arange(sn_l) / SR
    snare = bp(r.standard_normal(sn_l), 1200, 6000) * np.exp(-xs / 0.05) + np.sin(2 * np.pi * 190 * xs) * np.exp(-xs / 0.04) * 0.5
    tt = b0; step = beat / 2
    while tt < cta - 0.04:
        add(snare, tt, g=0.10 + 0.22 * (tt - b0) / bl); tt += step; step = max(beat / 8, step * 0.82)
    # drop: impacto + acorde cheio
    add(impact(1.4) * 0.8, cta)
    x = np.arange(int(1.2 * SR)) / SR; ch = prog[int(cta / bar) % 4]
    stab = sum(np.sin(2 * np.pi * midi(root + 12 + iv) * x) for iv in ch) * np.exp(-x / 0.35) * 0.09
    add(stab, cta)
    fi = np.minimum(1, t / 0.25); fo = np.minimum(1, (dur - t) / 1.5)
    return out * (fi * fo)[:, None]


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "bed":
        OUT = os.path.dirname(os.path.abspath(sys.argv[2])); save(os.path.basename(sys.argv[2]), bed_drive(float(sys.argv[3]), float(sys.argv[4])), 0.7); sys.exit(0)
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
