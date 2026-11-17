"""Comprueba que cada código visible en las slides sea ejecutable y tenga tests."""

import contextlib
import io
import json
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]


def load_examples():
    javascript = (ROOT / "assets" / "intro-snippets.js").read_text(encoding="utf-8")
    prefix = "window.EYWA_SNIPPETS = "
    if not javascript.startswith(prefix):
        raise ValueError("Formato de datos de slides inesperado")
    return json.loads(javascript[len(prefix):].rstrip().removesuffix(";"))


class TestIntroSlides(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.chapter = load_examples()
        cls.slides = cls.chapter["slides"]

    def test_coverage(self):
        self.assertEqual(self.chapter["id"], "01")
        self.assertEqual(len(self.slides), 28)
        self.assertEqual(len({item["t"] for item in self.slides}), len(self.slides))
        for index, item in enumerate(self.slides, 1):
            with self.subTest(slide=index):
                self.assertTrue(item["idea"])
                self.assertGreaterEqual(len(item["bullets"]), 1)
                self.assertTrue(item["code"])
                self.assertGreaterEqual(len(item["tests"]), 1)
                compile(item["code"], f"intro-slide-{index}", "exec")

    def test_every_example_is_embedded(self):
        qmd = (ROOT / "slides" / "01-introduccion.qmd").read_text(encoding="utf-8")
        ids = [int(match) for match in re.findall(r'../labs/snippet\.html\?s=(\d+)" title=', qmd)]
        self.assertEqual(ids, list(range(1, len(self.slides) + 1)))
        # El enlace de ampliación se movió dentro del editor para reducir ruido visual.
        html = (ROOT / "labs" / "snippet.html").read_text(encoding="utf-8")
        self.assertIn('id="expand"', html)

    def test_python_behaviour(self):
        for index, item in enumerate(self.slides, 1):
            with self.subTest(index=index, title=item["t"]):
                if item.get("packages"):
                    # NumPy se carga en el navegador con pyodide.loadPackage
                    # y se comprueba separadamente a nivel de integración.
                    continue
                ns = {"__name__": "__main__"}
                with contextlib.redirect_stdout(io.StringIO()):
                    exec(compile(item["code"], f"slide-{index}", "exec"), ns)
                    for check in item["tests"]:
                        exec(compile(check, f"check-{index}", "exec"), ns)


if __name__ == "__main__":
    unittest.main()
