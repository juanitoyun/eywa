"""Validate mobile-friendly slides, code comments, and browser JavaScript syntax."""
import json
from pathlib import Path
import re
import shutil
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
HTML_LABS = ("labs/snippet.html", "labs/chapter.html", "labs/repl.html", "labs/binary-search.html")


class TestMinimalEditor(unittest.TestCase):
    def test_all_labs_use_same_highlighted_editor(self):
        for name in HTML_LABS:
            with self.subTest(lab=name):
                html = (ROOT / name).read_text(encoding="utf-8")
                self.assertIn("../assets/python-editor.js", html)
                self.assertIn("../assets/python-editor.css", html)
                self.assertIn("codemirror@5.65.21", html)
                self.assertIn("window.EYWA_EDITOR", html)

    def test_visual_noise_removed_from_intro(self):
        content = (ROOT / "slides/01-introduccion.qmd").read_text(encoding="utf-8")
        self.assertNotIn('class="eywa-concept"', content)
        self.assertNotIn('class="eywa-compact-points"', content)
        self.assertEqual(content.count('<iframe class="eywa-snippet-frame"'), 28)

    def test_every_example_explained_with_python_comments(self):
        js = (ROOT / "assets/intro-snippets.js").read_text(encoding="utf-8")
        prefix = "window.EYWA_SNIPPETS = "
        source = js[js.index(prefix) + len(prefix):].strip().removesuffix(";")
        lessons = json.loads(source)["slides"]
        self.assertEqual(len(lessons), 28)
        for index, example in enumerate(lessons, 1):
            with self.subTest(example=index):
                code = example["code"]
                self.assertTrue(code.startswith('""" AED /'), "Se requiere encabezado de estilo")
                self.assertIn("# INPUT :", code)
                self.assertIn("# OUTPUT:", code)
                self.assertIn("# Complejidad:", code)
                self.assertIn("assert ", code)
                self.assertIn("  // ", code)
                self.assertNotIn("tests", example)
                self.assertGreaterEqual(sum("  # " in l for l in code.splitlines()), 1)
                compile(code, f"chapter01_{index}.py", "exec")

    def test_horizontal_scrolling_and_fallback(self):
        js = (ROOT / "assets/python-editor.js").read_text(encoding="utf-8")
        css = (ROOT / "assets/python-editor.css").read_text(encoding="utf-8")
        self.assertIn("lineWrapping: false", js)
        self.assertIn('setAttribute("wrap", "off")', js)
        self.assertIn("overflowX", js)
        self.assertIn("white-space:pre", css)
        self.assertIn("font-style:italic", css)

    def test_chapter_decks_use_executable_editors(self):
        slides_dir = ROOT / "slides"
        for number in range(2, 11):
            paths = list(slides_dir.glob(f"{number:02}-*.qmd"))
            self.assertEqual(len(paths), 1)
            qmd = paths[0].read_text(encoding="utf-8")
            self.assertIn(f'../labs/chapter.html?c={number:02}', qmd)
            self.assertNotIn("## Laboratorio Python", qmd)
            self.assertNotIn("`" * 3 + "python", qmd)

    @unittest.skipUnless(shutil.which("node"), "Node.js no está disponible")
    def test_javascript_syntax(self):
        scripts = ["assets/python-editor.js", "assets/python-console.js", "assets/intro-snippets.js", "assets/chapter-labs.js"]
        for filename in scripts:
            with self.subTest(file=filename):
                subprocess.run(["node", "--check", str(ROOT / filename)], check=True,
                               stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        for filename in HTML_LABS:
            with self.subTest(file=filename):
                html = (ROOT / filename).read_text(encoding="utf-8")
                snippets = re.findall(r"<script(?:\s+[^>]*)?>(.*?)</script>", html, flags=re.S | re.I)
                for body in snippets:
                    if not body.strip():
                        continue
                    check = subprocess.run(["node", "--check"], input=body, text=True,
                                           capture_output=True)
                    self.assertEqual(check.returncode, 0,
                                     f"{filename}: {check.stderr}")


if __name__ == "__main__":
    unittest.main()
