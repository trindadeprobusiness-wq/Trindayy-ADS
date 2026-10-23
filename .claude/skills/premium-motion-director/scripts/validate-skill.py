#!/usr/bin/env python3
"""Validate this skill's structure against the Claude Code skill conventions.

Checks: YAML frontmatter present and parseable (simple key: value), `name` matches the
directory and is kebab-case (≤ 64 chars), description+when_to_use ≤ 1536 chars, SKILL.md
< 500 lines, every relative path cited in SKILL.md exists, Python scripts compile.
Usage: python3 validate-skill.py [skill_dir]
"""
import json
import os
import re
import sys

root = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), ".."))
errors, info = [], {}
path = os.path.join(root, "SKILL.md")
text = open(path, encoding="utf-8").read()
m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
if not m:
    errors.append("missing YAML frontmatter")
    fm = {}
else:
    fm = {}
    for line in m.group(1).splitlines():
        if not line.strip():
            continue
        k, sep, v = line.partition(":")
        if not sep or not re.match(r"^[a-z_-]+$", k):
            errors.append(f"unparseable frontmatter line: {line[:60]}")
            continue
        fm[k] = v.strip()
name = fm.get("name", "")
if name != os.path.basename(root):
    errors.append(f"name '{name}' != directory '{os.path.basename(root)}'")
if not re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", name) or len(name) > 64:
    errors.append("name must be kebab-case, ≤ 64 chars")
desc_len = len(fm.get("description", "")) + len(fm.get("when_to_use", ""))
if not fm.get("description"):
    errors.append("description missing")
if desc_len > 1536:
    errors.append(f"description+when_to_use = {desc_len} chars (> 1536, will be truncated)")
# Portability: claude.ai uploads / Skills API accept only these keys and a description ≤ 1024 chars.
PORTABLE = {"name", "description", "license", "compatibility", "metadata", "allowed-tools"}
extra = sorted(set(fm) - PORTABLE)
if extra:
    errors.append(f"frontmatter keys not portable to claude.ai/API uploads: {extra}")
if len(fm.get("description", "")) > 1024:
    errors.append("description > 1024 chars (Agent Skills spec limit)")
lines = text.count("\n") + 1
if lines >= 500:
    errors.append(f"SKILL.md has {lines} lines (keep < 500)")
cited = sorted(set(re.findall(r"`(?:\$\{CLAUDE_SKILL_DIR\}/)?((?:references|scripts|templates|tests|examples)/[\w./-]+\.\w+)", text)))
missing = [c for c in cited if not os.path.exists(os.path.join(root, c))]
errors += [f"cited file missing: {c}" for c in missing]
for f in sorted(os.listdir(os.path.join(root, "scripts"))):
    if f.endswith(".py"):
        try:
            compile(open(os.path.join(root, "scripts", f), encoding="utf-8").read(), f, "exec")
        except SyntaxError as e:
            errors.append(f"script does not compile: {f}: {e}")
info.update({"skill": name, "description_chars": desc_len, "skill_md_lines": lines, "cited_files": len(cited)})
print(json.dumps({"pass": not errors, "errors": errors, **info}, indent=2, ensure_ascii=False))
sys.exit(0 if not errors else 1)
