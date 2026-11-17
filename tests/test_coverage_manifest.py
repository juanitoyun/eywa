"""Pruebas offline de cobertura de TODAS las fuentes incluidas en la auditoría."""
import ast
from collections import Counter
import json
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
COVERAGE = ROOT / "coverage"
PIN = "7d8ef60e45a1923f855b5777b60696b074a7a445"


def load(name):
    return json.loads((COVERAGE / name).read_text(encoding="utf8"))


class TestFullCoverageManifest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.main = load("manifest.json")
        cls.aux = load("auxiliary.json")
        cls.tutorial = load("tutorial00.json")

    def test_pinned_original_source(self):
        self.assertEqual(self.main["source"]["repository"], "ivansipiran/AED-Apuntes")
        self.assertEqual(self.main["source"]["commit"], PIN)
        self.assertEqual(self.aux["source"]["commit"], PIN)
        self.assertTrue(self.main["source"]["license_review_required"])

    def test_17_canonical_notebooks_and_all_791_cells(self):
        books = self.main["notebooks"]
        self.assertEqual(len(books), 17)
        self.assertEqual(Counter(n["category"] for n in books), {"teoria": 10, "ejercicios": 7})
        counts = Counter(c["kind"] for n in books for c in n["cells"])
        self.assertEqual(counts, {"markdown": 396, "code": 395})
        self.assertEqual(sum(map(lambda n: len(n["cells"]), books)), 791)
        self.assertEqual(self.main["summary"]["cells"], 791)
        self.assertEqual(sum(n["category"] == "teoria" for n in books), 10)
        self.assertEqual(
            sum(len(n["cells"]) for n in books if n["category"] == "teoria"), 642
        )
        self.assertEqual(
            sum(len(n["cells"]) for n in books if n["category"] == "ejercicios"), 149
        )
        paths = [n["path"] for n in books]
        self.assertEqual(len(set(paths)), 17)
        for book in books:
            with self.subTest(notebook=book["path"]):
                self.assertRegex(book["git_blob_sha"], r"^[a-f0-9]{40}$")
                for position, item in enumerate(book["cells"]):
                    self.assertEqual(item["index"], position)
                    self.assertEqual(item["id"], ("T" if book["category"] == "teoria" else "E")
                        + book["chapter"] + f"-{position+1:03d}")
                    self.assertIn(item["status"], self.main["policy"]["status"])

    def test_resources_are_tracked_even_if_unreferenced(self):
        resources = self.main["resources"]
        self.assertEqual(len(resources), 291)
        self.assertEqual(len(set(r["path"] for r in resources)), 291)
        self.assertEqual(sum(r["kind"] == "imagen" for r in resources), 169)
        self.assertEqual(sum(r["kind"] == "fuente_diagrama" for r in resources), 106)
        self.assertEqual(self.main["summary"]["linked_resources"],
                         sum(bool(r["referenced_by"]) for r in resources))
        self.assertEqual(self.main["summary"]["unlinked_resources"],
                         sum(not r["referenced_by"] for r in resources))
        valid_ids = {c["id"] for book in self.main["notebooks"] for c in book["cells"]}
        by_path = {r["path"]: r for r in resources}
        for resource in resources:
            with self.subTest(resource=resource["path"]):
                self.assertTrue(resource["path"].startswith("recursos/"))
                self.assertRegex(resource["git_blob_sha"], r"^[a-f0-9]{40}$")
                self.assertIn(resource["status"], self.main["policy"]["status"])
                self.assertTrue(set(resource["referenced_by"]) <= valid_ids)
        for book in self.main["notebooks"]:
            for cell in book["cells"]:
                for name in cell["resources"]:
                    self.assertIn(name, by_path)
                    self.assertIn(cell["id"], by_path[name]["referenced_by"])

    def test_auxiliary_notebooks_not_silently_discarded(self):
        aux = self.aux
        self.assertEqual(len(aux["notebooks"]), 5)
        self.assertEqual(aux["summary"]["auxiliary_notebooks"], 5)
        self.assertEqual(aux["summary"]["auxiliary_cells"], 45)
        self.assertEqual(aux["summary"]["checkpoint_notebooks"], 4)
        self.assertEqual(aux["summary"]["index_notebooks"], 1)
        self.assertEqual(
            sum(len(n["cells"]) for n in aux["notebooks"]), 45
        )
        duplicates = [(n["path"], n["exact_duplicate_of"]) for n in aux["notebooks"]
                      if n["exact_duplicate_of"]]
        self.assertEqual(duplicates, [
            ("Ejercicios/.ipynb_checkpoints/02_Ejercicios-checkpoint.ipynb",
             "Ejercicios/02_Ejercicios.ipynb")
        ])

    def test_all_53_user_notebook_cells_recorded(self):
        t = self.tutorial
        cells = t["cells"]
        self.assertEqual(len(cells), 53)
        self.assertEqual(len({c["id"] for c in cells}), 53)
        self.assertEqual(Counter(c["kind"] for c in cells), {"code": 36, "markdown": 17})
        self.assertEqual(sum(c["produces_svg"] for c in cells), 19)
        self.assertEqual(t["summary"]["adapted_original_svg"], 19)
        self.assertEqual(sum(c["status"] == "adaptado" for c in cells), 19)
        self.assertEqual(sum(c["status"] == "pendiente" for c in cells), 33)
        self.assertEqual(sum(c["status"] == "excluido_justificado" for c in cells), 1)
        self.assertRegex(t["source"]["sha256"], r"^[a-f0-9]{64}$")
        mapped = [c for c in cells if c["status"] == "adaptado"]
        ids = {c["destination"].split("#")[1] for c in mapped}
        self.assertEqual(ids, {f"{i:02d}" for i in range(1, 20)})
        self.assertTrue(all(c["verified"] == "svg_original_preservado" for c in mapped))

    def test_every_decision_has_a_destination_or_justification(self):
        all_objects = [
            *(c for b in self.main["notebooks"] for c in b["cells"]),
            *self.main["resources"],
            *(c for b in self.aux["notebooks"] for c in b["cells"]),
            *self.tutorial["cells"],
        ]
        for item in all_objects:
            state = item["status"]
            with self.subTest(id=item.get("id", item.get("path"))):
                if state in ("adaptado", "verificado"):
                    self.assertTrue(item["destination"])
                if state == "excluido_justificado":
                    self.assertTrue(item.get("exclusion_reason"))
        self.assertEqual(len(all_objects), 791 + 291 + 45 + 53)

    def test_dashboard_is_published_and_queries_manifest(self):
        html = (COVERAGE / "index.html").read_text(encoding="utf8")
        for file in ("manifest.json", "auxiliary.json", "tutorial00.json"):
            self.assertIn(file, html)
        qmd = (ROOT / "_quarto.yml").read_text(encoding="utf8")
        self.assertIn("- coverage/**", qmd)
        index = (ROOT / "index.qmd").read_text(encoding="utf8")
        self.assertIn("coverage/index.html", index)

    def test_builder_parses_and_never_embeds_notebook_source(self):
        script = (COVERAGE / "build_manifest.py").read_text(encoding="utf8")
        ast.parse(script)
        self.assertIn("SOURCE_COMMIT", script)
        self.assertIn("preserve_state", script)
        self.assertNotIn("GITHUB_TOKEN", script)
        self.assertNotIn("EDITOR_PASSWORD", script)
        self.assertNotIn('"source_text"', json.dumps(self.main, ensure_ascii=False))
        self.assertNotIn('"source_text"', json.dumps(self.aux, ensure_ascii=False))


if __name__ == "__main__":
    unittest.main()
