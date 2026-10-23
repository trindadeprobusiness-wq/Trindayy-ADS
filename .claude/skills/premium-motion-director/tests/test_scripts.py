#!/usr/bin/env python3
"""Unit/integration tests for the skill scripts. Run: python3 -m unittest tests/test_scripts.py -v
Uses ffmpeg to synthesize tiny media fixtures in a temp dir; no network."""
import hashlib
import json
import os
import subprocess
import sys
import tempfile
import unittest
import wave

HERE = os.path.dirname(os.path.abspath(__file__))
SKILL = os.path.dirname(HERE)
SCRIPTS = os.path.join(SKILL, "scripts")
ENGINE = os.path.join(SKILL, "engine")


def run(script, *args):
    p = subprocess.run([sys.executable, os.path.join(SCRIPTS, script), *args], capture_output=True, text=True)
    return p.returncode, p.stdout, p.stderr


def ffmpeg(*args):
    subprocess.run(["ffmpeg", "-y", "-v", "error", *args], check=True)


class Alignment(unittest.TestCase):
    def test_elevenlabs_fixture(self):
        code, out, err = run("alignment-to-timeline.py", os.path.join(HERE, "fixtures", "elevenlabs-alignment.json"), "--fps", "30")
        self.assertEqual(code, 0, err)
        d = json.loads(out)
        self.assertEqual(d["precision"], "word")
        self.assertEqual(len(d["words"]), 30)
        self.assertEqual(d["words"][0]["text"], "Enquanto")
        self.assertEqual(d["words"][0]["startFrame"], 6)  # floor(0.20*30)
        self.assertEqual(d["words"][-1]["text"], "Trindade.")
        self.assertEqual(len(d["phrases"]), 10)
        for w in d["words"]:
            self.assertGreater(w["endFrame"], w["startFrame"])

    def test_word_list_and_phrase_fallback(self):
        with tempfile.TemporaryDirectory() as t:
            a = os.path.join(t, "w.json")
            json.dump([{"word": "Olá", "start": 0.0, "end": 0.4}, {"word": "mundo.", "start": 0.5, "end": 1.0},
                       {"word": "Tchau", "start": 1.6, "end": 2.0}], open(a, "w"))
            d = json.loads(run("alignment-to-timeline.py", a, "--fps", "24")[1])
            self.assertEqual([p["text"] for p in d["phrases"]], ["Olá mundo.", "Tchau"])
            self.assertEqual(d["pauses"][0]["dur"], 0.6)
            self.assertEqual(d["words"][2]["startFrame"], 38)  # floor(1.6*24)
            b = os.path.join(t, "p.json")
            json.dump({"phrases": [{"text": "Frase um", "start": 0.0, "end": 1.2}]}, open(b, "w"))
            d = json.loads(run("alignment-to-timeline.py", b)[1])
            self.assertEqual(d["precision"], "phrase")
            self.assertTrue(d["notes"])

    def test_rejects_bad_input(self):
        with tempfile.TemporaryDirectory() as t:
            a = os.path.join(t, "bad.json")
            json.dump({"alignment": {"characters": ["a"], "character_start_times_seconds": [0, 1],
                                     "character_end_times_seconds": [1]}}, open(a, "w"))
            self.assertNotEqual(run("alignment-to-timeline.py", a)[0], 0)


class Assets(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # The engine ships without generated audio; synthesize the palette into a temp "public" dir.
        cls.tmp = tempfile.TemporaryDirectory()
        cls.public = cls.tmp.name
        run("synth-sfx.py", os.path.join(cls.public, "sfx"), "--bed-seconds", "20")

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()

    def test_example_timelines_pass(self):
        for ex in ("premium-product", "dynamic-ad", "saas-showcase"):
            tl = os.path.join(ENGINE, "src", "examples", ex, "timeline.json")
            code, out, err = run("validate-assets.py", tl, "--public", self.public)
            self.assertEqual(code, 0, f"{ex}: {out}{err}")

    def test_detects_gap_missing_asset_and_absolute_path(self):
        with tempfile.TemporaryDirectory() as t:
            tl = {"id": "x", "fps": 30, "width": 100, "height": 100, "durationInFrames": 100,
                  "scenes": [{"id": "a", "from": 0, "duration": 40, "intent": "i"}, {"id": "b", "from": 50, "duration": 50, "intent": "i"}],
                  "audio": {"music": {"src": "/abs/music.wav"}, "sfx": [{"at": 10, "src": "nope.wav"}, {"at": 200, "src": "nope.wav", "why": "x"}]}}
            p = os.path.join(t, "tl.json")
            json.dump(tl, open(p, "w"))
            code, out, _ = run("validate-assets.py", p, "--public", t)
            self.assertEqual(code, 1)
            r = json.loads(out)
            joined = " ".join(r["errors"])
            self.assertIn("unplanned gap", joined)
            self.assertIn("absolute path", joined)
            self.assertIn("asset not found", joined)
            self.assertIn("outside composition", joined)
            self.assertTrue(any("why" in w for w in r["warnings"]))


class Sfx(unittest.TestCase):
    def test_deterministic_and_valid(self):
        with tempfile.TemporaryDirectory() as t:
            run("synth-sfx.py", os.path.join(t, "a"), "--only", "tick,click_ui")
            run("synth-sfx.py", os.path.join(t, "b"), "--only", "tick,click_ui")
            for n in ("tick", "click_ui"):
                fa, fb = os.path.join(t, "a", f"{n}.wav"), os.path.join(t, "b", f"{n}.wav")
                with wave.open(fa) as w:
                    self.assertEqual((w.getframerate(), w.getnchannels(), w.getsampwidth()), (48000, 2, 2))
                self.assertEqual(hashlib.md5(open(fa, "rb").read()).hexdigest(), hashlib.md5(open(fb, "rb").read()).hexdigest())


class Media(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        t = cls.tmp.name
        cls.good = os.path.join(t, "good.mp4")
        # 3 s: red → blue cut at 1.5 s, with a quiet tone.
        ffmpeg("-f", "lavfi", "-i", "color=c=red:s=320x240:r=30:d=1.5", "-f", "lavfi", "-i", "color=c=blue:s=320x240:r=30:d=1.5",
               "-f", "lavfi", "-i", "sine=f=440:d=3", "-filter_complex", "[0][1]concat=n=2:v=1:a=0[v];[2]volume=0.1[a]",
               "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-shortest", cls.good)
        cls.black = os.path.join(t, "black.mp4")
        ffmpeg("-f", "lavfi", "-i", "color=c=white:s=320x240:r=30:d=1", "-f", "lavfi", "-i", "color=c=black:s=320x240:r=30:d=1",
               "-f", "lavfi", "-i", "color=c=white:s=320x240:r=30:d=1", "-f", "lavfi", "-i", "sine=f=440:d=3",
               "-filter_complex", "[0][1][2]concat=n=3:v=1:a=0[v]", "-map", "[v]", "-map", "3:a", "-af", "volume=3",
               "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", cls.black)

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()

    def test_inspect_detects_cut_and_loudness(self):
        code, out, err = run("inspect-media.py", self.good, "--frames", "4", "--out", os.path.join(self.tmp.name, "f"))
        self.assertEqual(code, 0, err)
        d = json.loads(out)
        self.assertEqual((d["video"]["width"], d["video"]["height"]), (320, 240))
        self.assertTrue(any(abs(c - 1.5) < 0.1 for c in d["scene_cuts_s"]), d["scene_cuts_s"])
        self.assertIsNotNone(d["loudness"]["integrated_lufs"])
        self.assertEqual(len(d["extracted"]["frames"]), 4)

    def test_validate_render_pass_and_fail(self):
        code, out, _ = run("validate-render.py", self.good, "--expect", "320x240@30", "--duration", "3", "--expect-audio")
        self.assertEqual(code, 0, out)
        code, out, _ = run("validate-render.py", self.good, "--expect", "1920x1080@30")
        self.assertEqual(code, 1)
        self.assertIn("resolution", out)
        code, out, _ = run("validate-render.py", self.black, "--expect", "320x240@30")
        self.assertEqual(code, 1)
        self.assertIn("black segment", out)

    def test_master_hits_target_and_keeps_duration(self):
        out = os.path.join(self.tmp.name, "mastered.mp4")
        code, _, err = run("master-audio.py", self.good, "--out", out, "--lufs", "-16")
        self.assertEqual(code, 0, err)
        d = json.loads(run("validate-render.py", out, "--expect", "320x240@30", "--duration", "3", "--lufs-target", "-16")[1])
        self.assertTrue(d["pass"], d)
        self.assertLess(abs(d["audio"]["integrated_lufs"] + 16), 1.5)


class InitStudio(unittest.TestCase):
    def test_scaffold_and_update(self):
        with tempfile.TemporaryDirectory() as t:
            target = os.path.join(t, "studio")
            sh = os.path.join(SCRIPTS, "init-studio.sh")
            p = subprocess.run(["bash", sh, target, "--no-install"], capture_output=True, text=True)
            self.assertEqual(p.returncode, 0, p.stderr)
            for f in ("package.json", "remotion.config.ts", "src/lib/index.ts", "src/Root.tsx", "scripts/render.mjs",
                      "scripts/tools/synth-sfx.py", "scripts/tools/master-audio.py", "src/examples/dynamic-ad/word-map.json"):
                self.assertTrue(os.path.exists(os.path.join(target, f)), f)
            # second run without --update must refuse (never overwrite a user's studio)
            self.assertNotEqual(subprocess.run(["bash", sh, target, "--no-install"], capture_output=True).returncode, 0)
            root = os.path.join(target, "src", "Root.tsx")
            open(root, "a").write("// user edit\n")
            os.remove(os.path.join(target, "src", "lib", "ui.tsx"))
            p = subprocess.run(["bash", sh, target, "--update", "--no-install"], capture_output=True, text=True)
            self.assertEqual(p.returncode, 0, p.stderr)
            self.assertTrue(os.path.exists(os.path.join(target, "src", "lib", "ui.tsx")))
            self.assertIn("// user edit", open(root).read())
            empty = os.path.join(t, "empty")
            subprocess.run(["bash", sh, empty, "--no-install", "--no-examples"], check=True, capture_output=True)
            self.assertFalse(os.path.exists(os.path.join(empty, "src", "examples")))


class SkillStructure(unittest.TestCase):
    def test_validate_skill(self):
        code, out, _ = run("validate-skill.py", SKILL)
        self.assertEqual(code, 0, out)


if __name__ == "__main__":
    unittest.main(verbosity=2)
