#!/usr/bin/env python3
"""Quadros densos de um trecho, para estudar uma transição/animação.

Uso: python3 motion-library/tools/strip.py <video> <inicio_s> <fim_s> <passo_s> <saida.jpg> [cols] [largura]
Ex.: python3 motion-library/tools/strip.py references/REF-007_*.mp4 0 3 0.1 contact-sheets/REF-007_detail_0-3s.jpg
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from analyze import sheet, probe
v, t0, t1, step, out = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4]), sys.argv[5]
m = probe(v)
cols = int(sys.argv[6]) if len(sys.argv) > 6 else (10 if m["height"] > m["width"] else 6)
width = int(sys.argv[7]) if len(sys.argv) > 7 else (150 if m["height"] > m["width"] else 260)
times, t = [], t0
while t <= t1 + 1e-6 and t < m["duration_s"] - 0.03:
    times.append(round(t, 3)); t += step
sheet(v, times, out, cols, width, f"{os.path.basename(v)}  |  detalhe {t0:.2f}-{t1:.2f}s, passo {step}s")
print(out, len(times), "frames")
