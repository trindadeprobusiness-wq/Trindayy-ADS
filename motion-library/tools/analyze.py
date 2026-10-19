#!/usr/bin/env python3
"""Analisa uma referência de vídeo e grava métricas + folhas de contato.

Uso:
  python3 motion-library/tools/analyze.py <video> <REF-ID> [--original-name "nome.mp4"]
  python3 motion-library/tools/analyze.py <render.mp4> <ID> --qa   (QA de render próprio)

Gera:
  analysis/<REF-ID>/metrics.json        métricas medidas (metadados, cortes, movimento, áudio)
  contact-sheets/<REF-ID>_sheet.jpg     grade de frames com timestamp
  contact-sheets/<REF-ID>_cuts.jpg      frames antes/depois de cada corte detectado
  contact-sheets/<REF-ID>_timeline.png  movimento x áudio x cortes ao longo do tempo
  references/catalog.json               atualizado (merge, nunca apaga entradas)

Requer: ffmpeg/ffprobe, numpy, scipy, Pillow.
Tudo aqui é medição automática: serve de apoio, não substitui olhar o vídeo.
"""
import argparse, hashlib, json, os, re, subprocess, sys
from datetime import date
import numpy as np
from scipy import signal
from PIL import Image, ImageDraw, ImageFont

LIB = os.path.normpath(os.path.join(os.path.dirname(__file__), ".."))
CUT_THRESHOLD = 0.30  # score de cena do ffmpeg acima disso = corte seco provável


def run(cmd, binary=False):
    r = subprocess.run(cmd, capture_output=True, check=True)
    return r.stdout if binary else r.stdout.decode() + r.stderr.decode()


FONT_CANDIDATES = ["/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
                   "/usr/share/fonts/opentype/inter/Inter-Medium.otf"]


def font(size):
    for f in FONT_CANDIDATES:
        if os.path.exists(f):
            return ImageFont.truetype(f, size)
    try:
        return ImageFont.load_default(size=size)
    except TypeError:
        return ImageFont.load_default()


def probe(path):
    j = json.loads(run(["ffprobe", "-v", "error", "-print_format", "json",
                        "-show_format", "-show_streams", path]))
    v = next(s for s in j["streams"] if s["codec_type"] == "video")
    a = next((s for s in j["streams"] if s["codec_type"] == "audio"), None)
    num, den = map(int, v["r_frame_rate"].split("/"))
    w, h = int(v["width"]), int(v["height"])
    g = np.gcd(w, h)
    return {
        "duration_s": round(float(j["format"]["duration"]), 3),
        "width": w, "height": h,
        "aspect": f"{w // g}:{h // g}",
        "aspect_family": "9:16" if h > w else ("16:9" if abs(w / h - 16 / 9) < 0.02 else ("1:1" if w == h else "outro")),
        "fps": round(num / den, 3),
        "video_codec": v["codec_name"],
        "bitrate_kbps": round(int(j["format"].get("bit_rate", 0)) / 1000),
        "audio": None if a is None else {
            "codec": a["codec_name"], "sample_rate": int(a["sample_rate"]),
            "channels": a.get("channels")},
    }


def scene_scores(path):
    out = run(["ffmpeg", "-hide_banner", "-i", path, "-vf",
               "select='gte(scene,0)',metadata=print:file=-", "-an", "-f", "null", "-"])
    times = [float(x) for x in re.findall(r"pts_time:([\d.]+)", out)]
    scores = [float(x) for x in re.findall(r"lavfi\.scene_score=([\d.]+)", out)]
    n = min(len(times), len(scores))
    return np.array(times[:n]), np.array(scores[:n])


def motion_energy(path, fps):
    w = 96
    raw = run(["ffmpeg", "-v", "error", "-i", path, "-vf", f"scale={w}:-2,format=gray",
               "-f", "rawvideo", "-"], binary=True)
    info = probe_size(path, w)
    frames = np.frombuffer(raw, np.uint8).reshape(-1, info[1], info[0]).astype(np.float32)
    diff = np.abs(np.diff(frames, axis=0)).mean(axis=(1, 2)) / 255.0
    luma = frames.mean(axis=(1, 2)) / 255.0
    t = np.arange(1, len(frames)) / fps
    return t, diff, luma


def probe_size(path, w):
    out = run(["ffmpeg", "-v", "error", "-i", path, "-vf", f"scale={w}:-2", "-frames:v", "1",
               "-f", "rawvideo", "-pix_fmt", "gray", "-"], binary=True)
    return w, len(out) // w


def audio_analysis(path, sr=22050):
    raw = run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(sr),
               "-f", "f32le", "-"], binary=True)
    y = np.frombuffer(raw, np.float32)
    if len(y) < sr:
        return None
    hop, n = 512, 2048
    f, tt, Z = signal.stft(y, sr, nperseg=n, noverlap=n - hop, boundary=None)
    mag = np.abs(Z)
    rms = np.sqrt((mag ** 2).mean(axis=0))
    rms_db = 20 * np.log10(rms + 1e-9)
    logm = np.log1p(100 * mag)
    flux = np.maximum(0, np.diff(logm, axis=1)).sum(axis=0)
    flux = np.concatenate([[0], flux])
    flux = flux / (flux.max() + 1e-9)
    # pico adaptativo: acima da mediana local + delta
    med = signal.medfilt(flux, 17)
    peaks, _ = signal.find_peaks(flux, height=med + 0.12, distance=int(0.09 * sr / hop))
    onsets = tt[peaks]
    strengths = flux[peaks]
    # andamento: autocorrelação do envelope de onset
    env = flux - flux.mean()
    ac = np.correlate(env, env, "full")[len(env) - 1:]
    fps_env = sr / hop
    lags = np.arange(len(ac)) / fps_env
    m = (lags >= 60 / 180) & (lags <= 60 / 70)
    tempo = None
    if m.any() and ac[0] > 0:
        cand = np.argsort(ac[m])[::-1]
        lag_vals = lags[m][cand]
        best = lag_vals[0]
        conf = float(ac[m][cand[0]] / ac[0])
        tempo = {"bpm_estimate": round(60 / best, 1), "confidence_autocorr": round(conf, 3),
                 "note": "estimativa por autocorrelação; confiança < 0.15 = sem pulso claro"}
    centroid = (f[:, None] * mag).sum(0) / (mag.sum(0) + 1e-9)
    low = mag[f < 150].sum() / (mag.sum() + 1e-9)
    # silêncios
    sil = run(["ffmpeg", "-hide_banner", "-i", path, "-af", "silencedetect=n=-40dB:d=0.4",
               "-f", "null", "-"])
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", sil)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", sil)]
    loud = run(["ffmpeg", "-hide_banner", "-i", path, "-af", "ebur128", "-f", "null", "-"])
    lufs = re.findall(r"I:\s+(-?[\d.]+) LUFS", loud)
    lra = re.findall(r"LRA:\s+([\d.]+) LU", loud)
    return {
        "t": tt, "rms_db": rms_db, "flux": flux, "onsets": onsets, "strengths": strengths,
        "summary": {
            "integrated_lufs": float(lufs[-1]) if lufs else None,
            "loudness_range_lu": float(lra[-1]) if lra else None,
            "onset_count": int(len(onsets)),
            "onsets_per_second": round(len(onsets) / (len(y) / sr), 2),
            "tempo": tempo,
            "spectral_centroid_hz_median": round(float(np.median(centroid)), 0),
            "low_freq_energy_ratio_below_150hz": round(float(low), 3),
            "silences": [{"start": s, "end": e} for s, e in zip(starts, ends + [None] * (len(starts) - len(ends)))],
        },
    }


def grab(path, t, width):
    raw = run(["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", path, "-frames:v", "1",
               "-vf", f"scale={width}:-2", "-f", "image2pipe", "-vcodec", "png", "-"], binary=True)
    from io import BytesIO
    return Image.open(BytesIO(raw)).convert("RGB")


def label(img, text):
    d = ImageDraw.Draw(img)
    fn = font(max(12, img.width // 14))
    bb = d.textbbox((0, 0), text, font=fn)
    d.rectangle([0, 0, bb[2] + 10, bb[3] + 8], fill=(0, 0, 0))
    d.text((5, 3), text, fill=(255, 230, 0), font=fn)
    return img


def sheet(path, times, out, cols, width, title):
    imgs = [label(grab(path, t, width), f"{t:05.2f}s") for t in times]
    w, h = imgs[0].size
    rows = (len(imgs) + cols - 1) // cols
    pad, head = 6, 34
    S = Image.new("RGB", (cols * (w + pad) + pad, rows * (h + pad) + pad + head), (24, 24, 24))
    ImageDraw.Draw(S).text((pad, 8), title, fill=(240, 240, 240), font=font(18))
    for i, im in enumerate(imgs):
        S.paste(im, (pad + (i % cols) * (w + pad), head + pad + (i // cols) * (h + pad)))
    S.save(out, quality=88)


def timeline_png(path, meta, mt, me, cuts, au, out):
    W, dur = 1800, meta["duration_s"]
    strip_n = int(min(40, max(12, dur)))
    tw = W // strip_n
    thumbs = [grab(path, (i + 0.5) * dur / strip_n, tw) for i in range(strip_n)]
    th = max(i.height for i in thumbs)
    H = th + 330
    img = Image.new("RGB", (W, H), (18, 18, 20))
    d = ImageDraw.Draw(img)
    for i, t in enumerate(thumbs):
        img.paste(t, (i * tw, 0))
    x = lambda s: int(s / dur * (W - 1))
    def curve(y0, hgt, ts, vals, color, name):
        d.rectangle([0, y0, W, y0 + hgt], fill=(28, 28, 32))
        if len(vals):
            v = np.asarray(vals, float)
            v = (v - v.min()) / (np.ptp(v) + 1e-9)
            pts = [(x(a), y0 + hgt - int(b * (hgt - 4)) - 2) for a, b in zip(ts, v)]
            d.line(pts, fill=color, width=2)
        d.text((6, y0 + 4), name, fill=(200, 200, 200), font=font(14))
    y = th + 10
    curve(y, 110, mt, me, (90, 200, 255), "energia de movimento (diferença entre frames)")
    if au:
        curve(y + 120, 90, au["t"], au["rms_db"], (120, 230, 140), "volume do áudio (RMS dB)")
        for o, s in zip(au["onsets"], au["strengths"]):
            d.line([(x(o), y + 220), (x(o), y + 220 + int(10 + 30 * s))], fill=(255, 200, 60), width=1)
        d.text((6, y + 222), "ataques sonoros (onsets)", fill=(200, 200, 200), font=font(14))
    for c in cuts:
        d.line([(x(c), th), (x(c), H - 30)], fill=(255, 60, 60), width=3)
    for s in range(0, int(dur) + 1):
        d.line([(x(s), H - 28), (x(s), H - 22 if s % 5 else H - 16)], fill=(160, 160, 160))
        if s % 5 == 0:
            d.text((x(s) + 2, H - 20), f"{s}s", fill=(160, 160, 160), font=font(13))
    d.text((W - 420, th + 14), "linhas vermelhas = cortes secos detectados", fill=(255, 120, 120), font=font(13))
    img.save(out)


def holds(mt, me, thr=0.004, min_len=0.5):
    """Trechos quase parados (pausas de leitura)."""
    res, start = [], None
    for t, v in zip(mt, me):
        if v < thr and start is None:
            start = t
        elif v >= thr and start is not None:
            if t - start >= min_len:
                res.append([round(float(start), 2), round(float(t), 2)])
            start = None
    if start is not None and mt[-1] - start >= min_len:
        res.append([round(float(start), 2), round(float(mt[-1]), 2)])
    return res


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video"); ap.add_argument("ref_id")
    ap.add_argument("--original-name", default=None)
    ap.add_argument("--qa", action="store_true",
                    help="analisar um RENDER próprio: grava em <video>_qa/ e não mexe no catálogo")
    a = ap.parse_args()
    is_ref = a.ref_id.startswith("REF-") and not a.qa
    path = a.video
    meta = probe(path)
    st, ss = scene_scores(path)
    raw_cuts = [float(t) for t, s in zip(st, ss) if s >= CUT_THRESHOLD]
    cuts = []  # une cortes em frames consecutivos (flash de 1-3 frames = 1 evento)
    for t in raw_cuts:
        if cuts and t - cuts[-1][-1] <= 3.5 / meta["fps"]:
            cuts[-1].append(t)
        else:
            cuts.append([t])
    flashes = [round(g[0], 3) for g in cuts if len(g) > 1]
    cuts = [round(g[0], 3) for g in cuts]
    soft = [round(float(t), 3) for t, s in zip(st, ss) if 0.12 <= s < CUT_THRESHOLD]
    mt, me, luma = motion_energy(path, meta["fps"])
    au = audio_analysis(path) if meta["audio"] else None

    shots = [0.0] + cuts + [meta["duration_s"]]
    shot_lens = np.diff(shots)
    sync = None
    if au is not None and cuts:
        dist = [float(np.min(np.abs(au["onsets"] - c))) if len(au["onsets"]) else None for c in cuts]
        fr = 1 / meta["fps"]
        chance = min(1.0, len(au["onsets"]) / meta["duration_s"] * 4 * fr)
        sync = {"chance_baseline": round(chance, 2), "cuts_within_2_frames_of_onset": round(sum(1 for x in dist if x is not None and x <= 2 * fr) / len(cuts), 2),
                "median_cut_to_onset_s": round(float(np.median([x for x in dist if x is not None])), 3)}
    p = np.percentile(me, [50, 90, 99])
    metrics = {
        "ref_id": a.ref_id,
        "file": os.path.relpath(path, LIB),
        "metadata": meta,
        "cuts": {"threshold_scene_score": CUT_THRESHOLD, "hard_cut_times_s": cuts,
                 "soft_change_times_s": soft, "multi_frame_flash_cuts_s": flashes, "shot_count": len(shot_lens),
                 "avg_shot_length_s": round(float(shot_lens.mean()), 2),
                 "median_shot_length_s": round(float(np.median(shot_lens)), 2)},
        "motion": {"energy_p50": round(float(p[0]), 4), "energy_p90": round(float(p[1]), 4),
                   "energy_p99": round(float(p[2]), 4),
                   "near_static_holds_s": holds(mt, me),
                   "mean_luma": round(float(luma.mean()), 3),
                   "luma_range": [round(float(luma.min()), 3), round(float(luma.max()), 3)]},
        "audio": au["summary"] if au else None,
        "audio_onsets_s": [round(float(x), 3) for x in au["onsets"]] if au else [],
        "cut_audio_sync": sync,
        "generated": str(date.today()),
        "notes": "Métricas automáticas. Cortes = score de cena do ffmpeg >= limiar; transições suaves (blur, wipe, morph) podem não aparecer como corte.",
    }
    qa_dir = os.path.splitext(path)[0] + "_qa"
    adir = os.path.join(LIB, "analysis", a.ref_id) if is_ref else qa_dir
    os.makedirs(adir, exist_ok=True)
    with open(os.path.join(adir, "metrics.json"), "w") as fh:
        json.dump(metrics, fh, ensure_ascii=False, indent=2)

    cs = os.path.join(LIB, "contact-sheets") if is_ref else qa_dir
    os.makedirs(cs, exist_ok=True)
    dur = meta["duration_s"]
    vertical = meta["height"] > meta["width"]
    n = 32 if dur > 25 else 24
    times = [(i + 0.5) * dur / n for i in range(n)]
    sheet(path, times, os.path.join(cs, f"{a.ref_id}_sheet.jpg"), 8 if vertical else 6,
          200 if vertical else 300, f"{a.ref_id}  |  {meta['width']}x{meta['height']} {meta['fps']}fps {dur:.1f}s  |  amostragem uniforme")
    if cuts:
        ct = []
        for c in cuts[:24]:
            ct += [max(0, c - 0.15), min(dur - 0.05, c + 0.05)]
        sheet(path, ct, os.path.join(cs, f"{a.ref_id}_cuts.jpg"), 8 if vertical else 6,
              160 if vertical else 240, f"{a.ref_id}  |  pares antes/depois de cada corte seco")
    timeline_png(path, meta, mt, me, cuts, au, os.path.join(cs, f"{a.ref_id}_timeline.png"))

    if not is_ref:
        print("QA gravado em", qa_dir)
        print(json.dumps({k: metrics[k] for k in ("metadata", "cuts")}, ensure_ascii=False))
        print("holds", metrics["motion"]["near_static_holds_s"])
        return
    cat_path = os.path.join(LIB, "references", "catalog.json")
    cat = json.load(open(cat_path)) if os.path.exists(cat_path) else {"references": {}}
    entry = cat["references"].get(a.ref_id, {})
    entry.update({
        "file": os.path.relpath(path, LIB),
        "sha256": hashlib.sha256(open(path, "rb").read()).hexdigest(),
        "size_bytes": os.path.getsize(path),
        **{k: meta[k] for k in ("duration_s", "width", "height", "aspect", "aspect_family", "fps")},
        "has_audio": meta["audio"] is not None,
    })
    if a.original_name:
        entry["original_name"] = a.original_name
    entry.setdefault("added", str(date.today()))
    cat["references"][a.ref_id] = entry
    cat["references"] = dict(sorted(cat["references"].items()))
    with open(cat_path, "w") as fh:
        json.dump(cat, fh, ensure_ascii=False, indent=2)
    print(json.dumps({k: metrics[k] for k in ("ref_id", "metadata", "cuts", "cut_audio_sync")}, ensure_ascii=False))
    if au:
        print(json.dumps(au["summary"], ensure_ascii=False))
    print("holds", metrics["motion"]["near_static_holds_s"])


if __name__ == "__main__":
    main()
