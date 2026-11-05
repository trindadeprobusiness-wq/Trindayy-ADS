#!/usr/bin/env python3
"""Align a corrected script (lines '#section text...') to ASR word timings ('<sec> <word>' per line).

Usage: align-script.py script.txt words.txt out.json [--total SEC]
Output: {"sections":[{"id","start","end"}], "words":[{"w","t","sec"}], "captions":[{"t","end","text"}]}
Script words get the time of the matching ASR word; unmatched words are interpolated between anchors.
"""
import difflib, json, re, sys, unicodedata

NUM = {'0': 'zero', '1': 'um', '2': 'dois', '3': 'tres', '4': 'quatro', '5': 'cinco', '7': 'sete', '10': 'dez', '12': 'doze',
       '15': 'quinze', '20': 'vinte', '30': 'trinta', '59': 'cinquenta'}


def norm(w):
    w = unicodedata.normalize('NFD', w.lower())
    w = ''.join(c for c in w if unicodedata.category(c) != 'Mn')
    w = re.sub(r'[^a-z0-9]', '', w)
    return NUM.get(w, w)


def main():
    script, words, out = sys.argv[1:4]
    total = float(sys.argv[sys.argv.index('--total') + 1]) if '--total' in sys.argv else None
    toks = []  # (word, section)
    for line in open(script, encoding='utf-8'):
        line = line.strip()
        if not line.startswith('#'):
            continue
        sec, text = line[1:].split(' ', 1)
        toks += [(w, sec) for w in text.split()]
    asr = []
    for line in open(words, encoding='utf-8'):
        p = line.split(maxsplit=1)
        if len(p) == 2:
            asr.append((float(p[0]), p[1].strip()))
    a = [norm(w) for w, _ in toks]
    b = [norm(w) for _, w in asr]
    times = [None] * len(toks)
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    for blk in sm.get_matching_blocks():
        for k in range(blk.size):
            times[blk.a + k] = asr[blk.b + k][0]
    # enforce monotonic anchors, drop outliers
    last = -1.0
    for i, t in enumerate(times):
        if t is not None and t < last:
            times[i] = None
        elif t is not None:
            last = t
    anchors = [i for i, t in enumerate(times) if t is not None]
    end_t = total or (asr[-1][0] + 0.6)
    for i in range(len(times)):
        if times[i] is None:
            prev = max([j for j in anchors if j < i], default=None)
            nxt = min([j for j in anchors if j > i], default=None)
            t0, i0 = (times[prev], prev) if prev is not None else (0.0, -1)
            t1, i1 = (times[nxt], nxt) if nxt is not None else (end_t, len(times))
            times[i] = t0 + (t1 - t0) * (i - i0) / (i1 - i0)
    matched = len(anchors) / len(toks)
    wordsj = [{'w': w, 't': round(t, 3), 'sec': s} for (w, s), t in zip(toks, times)]
    # sections
    secs = []
    for i, x in enumerate(wordsj):
        if not secs or secs[-1]['id'] != x['sec']:
            secs.append({'id': x['sec'], 'start': x['t']})
    for i, s in enumerate(secs):
        s['end'] = secs[i + 1]['start'] if i + 1 < len(secs) else end_t
    # captions: break on sentence end, comma after >=4 words, or 7 words / 44 chars
    caps, cur = [], []
    for i, x in enumerate(wordsj):
        cur.append(x)
        text = ' '.join(c['w'] for c in cur)
        nxt = wordsj[i + 1] if i + 1 < len(wordsj) else None
        brk = (nxt is None or nxt['sec'] != x['sec'] or re.search(r'[.?!:]$', x['w'])
               or (re.search(r'[,;]$', x['w']) and len(cur) >= 4) or len(cur) >= 7 or len(text) >= 44)
        if brk:
            caps.append({'t': cur[0]['t'], 'text': text})
            cur = []
    for i, c in enumerate(caps):
        c['end'] = round(min(caps[i + 1]['t'] if i + 1 < len(caps) else end_t, c['t'] + 0.38 * len(c['text'].split()) + 1.4), 3)
    json.dump({'matched': round(matched, 3), 'total': end_t, 'sections': secs, 'words': wordsj, 'captions': caps},
              open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'words {len(toks)} matched {matched:.0%} sections {len(secs)} captions {len(caps)}')


if __name__ == '__main__':
    main()
