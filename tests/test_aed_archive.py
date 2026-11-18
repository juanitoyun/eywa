"""Comprueba que el material útil de AED se archivó sin activar código legado."""
import ast
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "archive"


class TestAEDArchive(unittest.TestCase):
    def test_all_markdown_chapters_and_exercises_exist(self):
        source = ARCHIVE / "aed-mdbook" / "src"
        chapters = list(source.glob("[0-9][0-9]-*.md"))
        exercises = list((source / "ejercicios").glob("[0-9][0-9]-ejercicios.md"))
        self.assertEqual(len(chapters), 10)
        self.assertEqual(len(exercises), 7)
        self.assertTrue((source / "SUMMARY.md").is_file())
        self.assertTrue((ARCHIVE / "aed-mdbook" / "book.toml").is_file())

    def test_legacy_python_parses(self):
        source = ARCHIVE / "aed-utilities-web" / "aed_utilities"
        expected = [
            "__init__.py", "adapters.py", "display.py", "layouts.py",
            "models.py", "renderers.py", "visualizacion.py",
            "widgets/__init__.py",
        ]
        for name in expected:
            with self.subTest(path=name):
                path = source / name
                ast.parse(path.read_text(encoding="utf8"), filename=str(path))
        for name in ("convert_03.py", "convert_notebooks.py"):
            path = ARCHIVE / "aed-mdbook" / name
            ast.parse(path.read_text(encoding="utf8"), filename=str(path))

    def test_archive_not_part_of_quarto_render(self):
        quarto = (ROOT / "_quarto.yml").read_text(encoding="utf8")
        self.assertNotIn("archive/**", quarto)
        self.assertNotIn("archive/", quarto)
        for name in ("aed-mdbook", "aed-utilities-web"):
            self.assertTrue((ARCHIVE / name / "README.md").is_file())


if __name__ == "__main__":
    unittest.main()
