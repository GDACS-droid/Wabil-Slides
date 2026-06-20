#!/usr/bin/env python3
"""Regenerate slide_state.json by scanning seq_*.html (ordered by filename).
Each slide declares its title via an HTML comment: <!-- title: ... -->
Run from the slides/ directory:  python3 build_state.py
"""
import json, glob, re, os
HERE = os.path.dirname(os.path.abspath(__file__))
slides = []
for f in sorted(glob.glob(os.path.join(HERE, "seq_*.html"))):
    sid = os.path.basename(f)[:-5]
    txt = open(f, encoding="utf-8").read()
    m = re.search(r"<!--\s*title:\s*(.*?)\s*-->", txt)
    slides.append({"id": sid, "title": m.group(1) if m else sid})
json.dump({"slides": slides}, open(os.path.join(HERE, "slide_state.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=2)
print(f"{len(slides)} slides written to slide_state.json")
