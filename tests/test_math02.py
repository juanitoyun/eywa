"""Pruebas offline del capítulo 02 y su correspondencia con Quarto."""
import contextlib
import io
import json
from pathlib import Path
import re
import shutil
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]


class TestMath02(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.bank = json.loads((ROOT / "assets/math02-examples.json").read_text(encoding="utf8"))
        cls.qmd = (ROOT / "slides/02-analisis-matematico.qmd").read_text(encoding="utf8")
        cls.html = (ROOT / "labs/math02.html").read_text(encoding="utf8")

    def test_seven_distinct_editable_examples(self):
        self.assertEqual(self.bank["chapter"], "02")
        examples = self.bank["examples"]
        self.assertEqual([item["id"] for item in examples],
                         [f"{i:02d}" for i in range(1, 8)])
        self.assertEqual(len({item["title"] for item in examples}), 7)
        self.assertTrue(all("assert " in item["code"] for item in examples))
        self.assertTrue(all("#" in item["code"] for item in examples))
        ids = re.findall(r'../labs/math02\.html\?ex=(\d+)', self.qmd)
        self.assertEqual(ids, [f"{i:02d}" for i in range(1, 8)])

    def test_all_python_examples_run(self):
        for item in self.bank["examples"]:
            with self.subTest(id=item["id"]):
                ns = {"__name__": "__main__"}
                with contextlib.redirect_stdout(io.StringIO()):
                    exec(compile(item["code"], item["id"], "exec"), ns)

    def test_coverage_is_traceable_not_falsely_verified(self):
        manifest = json.loads((ROOT / "coverage/manifest.json").read_text(encoding="utf8"))
        books = [n for n in manifest["notebooks"] if n["chapter"] == "02"]
        self.assertEqual(len(books), 2)
        cells = [c for n in books for c in n["cells"]]
        self.assertEqual(len(cells), 24)
        self.assertEqual(sum(c["status"] == "adaptado" for c in cells), 19)
        self.assertEqual(sum(c["status"] == "excluido_justificado" for c in cells), 5)
        self.assertTrue(all(not c["verified"] for c in cells))
        for c in cells:
            with self.subTest(cell=c["id"]):
                if c["status"] == "adaptado":
                    anchor = c["destination"].split("#")[1]
                    self.assertIn("{#" + anchor + "}", self.qmd)
                else:
                    self.assertTrue(c["exclusion_reason"])

    def test_no_promise_of_server_save_in_separate_labs(self):
        self.assertIn("Guardar local", self.html)
        self.assertIn("localStorage.setItem", self.html)
        self.assertNotIn("EYWA_REPO_SAVE.configure", self.html)
        self.assertIn("chapter.html?c=02", self.html)
        self.assertIn("EYWA_RUN_PYTHON", self.html)

    @unittest.skipUnless(shutil.which("node"), "Node.js no disponible")
    def test_browser_javascript_syntax(self):
        scripts = re.findall(r"<script[^>]*>(.*?)</script>", self.html, re.DOTALL)
        inline = [s for s in scripts if s.strip()]
        self.assertEqual(len(inline), 1)
        result = subprocess.run(
            ["node", "--check"], input=inline[0],
            text=True, capture_output=True)
        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
