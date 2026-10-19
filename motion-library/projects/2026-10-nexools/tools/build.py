#!/usr/bin/env python3
"""Build + mix + render de um criativo Nexools.
Uso: python3 tools/build.py GEM-A [--no-render] [--dur 37.8]
"""
import json, os, shutil, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(HERE)
LIB = os.path.normpath(os.path.join(P, "..", ".."))
ENGINE = os.path.join(LIB, "engine"); HF = os.path.join(ENGINE, "node_modules/.bin/hyperframes")
BRAND = os.path.join(LIB, "brands/nexools/assets")
CHROME = os.path.expanduser("~/.cache/hyperframes/chrome/chrome-headless-shell/linux-152.0.7977.30/chrome-headless-shell-linux64/chrome-headless-shell")
SFX = {"whoosh": "sfx_whoosh.wav", "tick": "sfx_tick.wav", "pop": "sfx_pop.wav", "click": "sfx_click.wav", "impact": "sfx_impact.wav",
       "strike": "sfx_strike.wav", "stamp": "sfx_stamp.wav", "riser": "sfx_riser.wav", "typing": "sfx_typing.wav", "chime": "sfx_chime.wav"}

def run(cmd, **k):
    r = subprocess.run(cmd, capture_output=True, text=True, **k)
    if r.returncode: print(r.stdout[-3000:], r.stderr[-3000:]); raise SystemExit(f"falhou: {cmd[0]}")
    return r.stdout

def main():
    vid = sys.argv[1]; render = "--no-render" not in sys.argv
    vo = os.path.join(P, "audio", f"{vid}.mp3")
    vodur = float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", vo]))
    dur = float(sys.argv[sys.argv.index("--dur") + 1]) if "--dur" in sys.argv else round(vodur + 1.1, 2)
    B = os.path.join(P, "build", vid)
    if os.path.exists(B): shutil.rmtree(B)
    os.makedirs(os.path.join(B, "audio")); os.makedirs(os.path.join(B, "assets"))
    shutil.copytree(os.path.join(ENGINE, "assets/fonts"), os.path.join(B, "fonts"))
    for f in ["nexo.css", "nexo.js"]: shutil.copy(os.path.join(P, "shared", f), B)
    shutil.copy(os.path.join(ENGINE, "vendor/gsap.min.js"), B)
    for f in ["hyperframes.json", "meta.json"]: shutil.copy(os.path.join(ENGINE, f), B)
    for f in os.listdir(BRAND):
        if f.endswith(".png"): shutil.copy(os.path.join(BRAND, f), os.path.join(B, "assets"))
    shutil.copy(os.path.join(P, "videos", f"{vid}.js"), os.path.join(B, "video.js"))
    html = open(os.path.join(P, "shared/template.html")).read().replace("{DUR}", str(dur)).replace("{ID}", vid)
    open(os.path.join(B, "index.html"), "w").write(html)
    # efeitos sonoros declarados pelas cenas
    out = json.loads(run(["node", os.path.join(HERE, "cues.mjs"), B, CHROME]).strip().splitlines()[-1])
    if out["errs"] or not out["timeline"]: raise SystemExit(f"erro na página: {out['errs']}")
    cues = out["cues"]; json.dump(cues, open(os.path.join(B, "cues.json"), "w"), indent=1)
    # mix: VO normalizada + trilha com ducking + efeitos
    A = os.path.join(BRAND, "audio")
    ins = ["-i", vo, "-i", os.path.join(A, "bed_tech.wav")]
    fx = [c for c in cues if c["name"] != "bed"]
    for c in fx: ins += ["-i", os.path.join(A, SFX[c["name"]])]
    g = [f"[0:a]aresample=44100,aformat=channel_layouts=stereo,loudnorm=I=-16:TP=-2:LRA=7,adelay=0|0,apad=whole_dur={dur}[vo]",
         "[vo]asplit=2[vo1][vo2]",
         f"[1:a]atrim=0:{dur},volume=-17dB,afade=t=out:st={dur-1.6}:d=1.6[bed]",
         "[bed][vo2]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350:makeup=1[bedd]"]
    labels = ["[vo1]", "[bedd]"]
    for i, c in enumerate(fx):
        ms = max(0, int(c["t"] * 1000))
        g.append(f"[{i+2}:a]aformat=channel_layouts=stereo,adelay={ms}|{ms},volume={c['db']-3}dB[f{i}]"); labels.append(f"[f{i}]")
    g.append("".join(labels) + f"amix=inputs={len(labels)}:normalize=0:duration=longest,atrim=0:{dur},loudnorm=I=-14:TP=-1:LRA=9[out]")
    mix = os.path.join(B, "audio/mix.wav")
    run(["ffmpeg", "-y", "-v", "error", *ins, "-filter_complex", ";".join(g), "-map", "[out]", "-ar", "48000", mix])
    print(f"{vid}: dur {dur}s, {len(fx)} efeitos, mix ok")
    if render:
        os.makedirs(os.path.join(P, "renders"), exist_ok=True)
        ck = subprocess.run([HF, "check"], cwd=B, capture_output=True, text=True)
        print("CHECK:", "passou" if ck.returncode == 0 else "FALHOU"); print(ck.stdout[-2500:])
        if ck.returncode and "--force" not in sys.argv: raise SystemExit("check falhou")
        o = run([HF, "render", "-o", os.path.join(P, "renders", f"NEXOOLS_{vid}.mp4"), "--quality", "high"], cwd=B)
        print(o[-600:])

main()
