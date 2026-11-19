"""Validate public C2 practice data and Python challenge contracts."""
import ast
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK = ROOT / "assets" / "c2-practica.json"
HTML = ROOT / "labs" / "c2-practica.html"
JS = ROOT / "assets" / "c2-practica.js"
SLIDES = ROOT / "slides" / "c2-practica.qmd"


class TestC2Practice(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.bank = json.loads(BANK.read_text(encoding="utf-8"))

    def test_has_nine_distinct_challenges(self):
        exercises = self.bank["exercises"]
        self.assertEqual(len(exercises), 9)
        self.assertEqual(len({ex["id"] for ex in exercises}), len(exercises))

    def test_starters_and_public_cases_are_valid_python(self):
        for ex in self.bank["exercises"]:
            with self.subTest(ex=ex["id"]):
                self.assertIn("raise NotImplementedError", ex["starter"])
                ast.parse(ex["starter"])
                self.assertGreaterEqual(len(ex["cases"]), 3)
                for label, case in ex["cases"]:
                    self.assertTrue(label.strip())
                    ast.parse(ex["starter"] + "\n" + case)
                self.assertTrue(ex["quiz"]["options"])
                self.assertIn(ex["quiz"]["answer"], range(len(ex["quiz"]["options"])))
                self.assertTrue(ex["source"].startswith("Inspirado en C2 "))

    def test_all_challenges_have_lab_and_slides(self):
        html = HTML.read_text(encoding="utf-8")
        slides = SLIDES.read_text(encoding="utf-8")
        javascript = JS.read_text(encoding="utf-8")
        self.assertIn("c2-practica.js", html)
        self.assertIn("c2-practica.json", javascript)
        self.assertIn("EYWA_RUN_PYTHON", javascript)
        self.assertIn("localStorage", javascript)
        for ex in self.bank["exercises"]:
            with self.subTest(ex=ex["id"]):
                self.assertIn("?task=" + ex["id"], slides)


if __name__ == "__main__":
    unittest.main()
