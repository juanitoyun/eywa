"""Verifica la receta común y que sus asserts visibles sean ejecutables."""
import contextlib
import io
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


def load_labs():
    source = (ROOT / "assets" / "chapter-labs.js").read_text(encoding="utf-8")
    marker = "window.EYWA_LABS = "
    return json.loads(source[source.index(marker) + len(marker):].strip().removesuffix(";"))


class TestAnnotatedChapterLabs(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.labs = load_labs()

    def test_code_recipe_covers_all_chapters(self):
        self.assertEqual(sorted(self.labs), [f"{i:02}" for i in range(1, 11)])
        for chapter, entry in self.labs.items():
            with self.subTest(chapter=chapter):
                source = entry["code"]
                self.assertTrue(source.startswith('""" AED /'))
                self.assertIn("# INPUT :", source)
                self.assertIn("# OUTPUT:", source)
                self.assertIn("# Complejidad:", source)
                self.assertIn("  // ", source)
                self.assertIn("assert ", source)
                self.assertEqual(entry["recipeVersion"], "EYWA-CODE/1")
                self.assertNotIn("cases", entry)
                self.assertNotIn("tests", entry)
                compile(source, f"chapter-{chapter}", "exec")

    def test_all_visible_asserts_execute(self):
        for chapter, entry in self.labs.items():
            with self.subTest(chapter=chapter):
                namespace = {"__name__": "__main__"}
                with contextlib.redirect_stdout(io.StringIO()):
                    exec(compile(entry["code"], f"chapter-{chapter}", "exec"), namespace)



if __name__ == "__main__":
    unittest.main()
