"""Audit all existing EYWA presentations and executable labs for unified visuals."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
SLIDES = ROOT / "slides"
ALL_LABS = (
    "labs/tutorial00/index.html",
    "labs/snippet.html",
    "labs/chapter.html",
    "labs/binary-search.html",
    "labs/repl.html",
    "labs/test.html",
)

class TestWholeCourseUnifiedFormat(unittest.TestCase):
    def test_all_chapter_decks_exist(self):
        self.assertTrue((SLIDES / "00-herramientas-visuales.qmd").is_file())
        for number in range(1, 11):
            self.assertEqual(len(list(SLIDES.glob(f"{number:02}-*.qmd"))), 1)

    def test_all_19_tutorial_examples_stay_independent(self):
        qmd = (SLIDES / "00-herramientas-visuales.qmd").read_text(encoding="utf8")
        self.assertEqual(qmd.count('class="eywa-00-example"'), 19)
        for i in range(1, 20):
            self.assertIn(f'../labs/tutorial00/index.html?ex={i:02}', qmd)

    def test_all_28_chapter_01_examples_use_unified_iframe(self):
        qmd = (SLIDES / "01-introduccion.qmd").read_text(encoding="utf8")
        matches = re.findall(r'../labs/snippet\.html\?s=(\d+)&amp;visual=1', qmd)
        self.assertEqual([int(i) for i in matches], list(range(1, 29)))
        self.assertNotIn('\x60\x60\x60{.python}', qmd)

    def test_chapters_02_through_10_use_shared_visual_labs(self):
        for num in range(2, 11):
            source = next(SLIDES.glob(f"{num:02}-*.qmd")).read_text(encoding="utf8")
            with self.subTest(chapter=num):
                self.assertIn(f'../labs/chapter.html?c={num:02}&amp;visual=1', source)
                self.assertEqual(source.count('class="eywa-frame eywa-lesson-frame"'), 1)
                self.assertNotIn('\x60\x60\x60{.python}', source)

    def test_demo_contains_only_editable_python(self):
        demo = (ROOT / "demo.qmd").read_text(encoding="utf8")
        self.assertIn('labs/binary-search.html?visual=1', demo)
        self.assertIn('labs/repl.html?visual=1&amp;example=github-import', demo)
        self.assertEqual(demo.count('<iframe'), 2)
        self.assertNotIn('\x60\x60\x60{.python}', demo)
        self.assertNotIn("Ejecutar tests", demo)

    def test_all_six_labs_have_collapsible_svg_component(self):
        for path in ALL_LABS:
            src = (ROOT / path).read_text(encoding="utf8")
            with self.subTest(lab=path):
                prefix = "../../assets" if "tutorial00/" in path else "../assets"
                self.assertIn(prefix + "/eywa-visual-panel.css", src)
                self.assertIn(prefix + "/eywa-visual-panel.js", src)
                self.assertIn('class="eywa-visual-details" id="visual-details"', src)
                self.assertNotIn('id="visual-details" open', src)
                self.assertIn("EYWA_VISUAL_PANEL.mount(", src)
                self.assertIn("visualPanel.clear(", src)
                self.assertIn("visualPanel.setDot(", src)
                self.assertIn('id="output"', src)
                self.assertNotIn('id="score"', src)
                self.assertNotIn("Ejecutar tests", src)

    def test_every_standard_lab_has_panel_without_url_opt_in(self):
        for path in ALL_LABS[1:]:
            src = (ROOT / path).read_text(encoding="utf8")
            with self.subTest(lab=path):
                self.assertNotIn('id="visual-details" hidden', src)
                self.assertIn('!=="0"', src.replace(" ", ""))
                self.assertIn("hidden=", src)

    def test_viewer_only_opens_by_manual_user_action(self):
        visual=(ROOT / "assets/eywa-visual-panel.js").read_text(encoding="utf8")
        self.assertIn("details.open=false", visual)
        self.assertNotIn("details.open=true", visual)
        self.assertIn("Imagen disponible", visual)

    def test_both_generic_quarto_templates_follow_same_contract(self):
        for file in ("templates/test-slide.qmd", "templates/test-slide-visual.qmd"):
            source=(ROOT / file).read_text(encoding="utf8")
            with self.subTest(template=file):
                self.assertIn("labs/test.html?id={{TEST_ID}}", source)
                self.assertIn("visual=1", source)
        self.assertFalse((ROOT / "labs/tests").exists())

    def test_index_promotes_the_same_learning_flow(self):
        source=(ROOT / "index.qmd").read_text(encoding="utf8")
        self.assertIn("visualización", source.lower())
        self.assertIn("assert", source)
        self.assertNotIn("tests autocorregibles", source)

if __name__ == "__main__":
    unittest.main()
