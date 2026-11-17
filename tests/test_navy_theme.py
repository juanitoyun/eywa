"""Color parity for every EYWA slide, iframe, and Python console."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
LABS = (
    "labs/snippet.html",
    "labs/chapter.html",
    "labs/repl.html",
    "labs/binary-search.html",
)


class TestNavyDarkTheme(unittest.TestCase):
    def test_reveal_palette_covers_slides_and_sections(self):
        theme = (ROOT / "styles/eywa.scss").read_text(encoding="utf-8")
        self.assertIn("$body-bg: #081727;", theme)
        self.assertIn("$body-color: #e6f0fa;", theme)
        self.assertIn("--eywa-ice: #76d9f8;", theme)
        self.assertIn("--eywa-teal: #72e1c6;", theme)
        self.assertIn(".reveal .slides section", theme)
        self.assertIn(".reveal .eywa-index-grid .eywa-index-card", theme)
        self.assertIn(".reveal .eywa-card", theme)
        self.assertIn(".reveal .eywa-snippet-frame", theme)
        self.assertIn(".reveal .eywa-lesson-frame", theme)
        self.assertIn(".reveal pre.sourceCode", theme)
        self.assertIn(".reveal table", theme)
        self.assertIn(".reveal .eywa-array span", theme)
        self.assertIn(".reveal.reveal-scroll .scroll-page", theme)
        self.assertIn("background-color: var(--eywa-base) !important;", theme)

    def test_all_embedded_labs_load_dark_style_last(self):
        shared = ROOT / "assets/eywa-dark.css"
        self.assertTrue(shared.is_file())
        css = shared.read_text(encoding="utf-8")
        for required in (
            "color-scheme: dark",
            "--eywa-bg: #081727;",
            ".output, pre.output, .tests",
            "button.primary",
            ".CodeMirror-lines .CodeMirror-line",
            "textarea[wrap=\"off\"]",
        ):
            self.assertIn(required, css)
        for path in LABS:
            with self.subTest(lab=path):
                html = (ROOT / path).read_text(encoding="utf-8")
                self.assertIn('href="../assets/eywa-dark.css"', html)
                # The shared palette comes AFTER the lab's own inline light defaults.
                self.assertLess(
                    html.index("</style>"),
                    html.index('href="../assets/eywa-dark.css"'),
                )
                self.assertLess(
                    html.index('href="../assets/python-editor.css"'),
                    html.index('href="../assets/eywa-dark.css"'),
                )
                self.assertIn("../assets/python-editor.js", html)

    def test_console_drawer_is_also_dark(self):
        drawer = (ROOT / "assets/console-loader.html").read_text(encoding="utf-8")
        self.assertIn("#eywa-console-panel", drawer)
        self.assertIn("background:#081727;", drawer)
        self.assertIn("#eywa-console-open", drawer)
        self.assertIn("border-left:1px solid #294660;", drawer)
        self.assertNotIn("background:#fff;", drawer)
        self.assertIn('iframe.src = new URL(labUrl, document.baseURI).href;', drawer)

    def test_editor_palette_preserves_existing_behavior(self):
        css = (ROOT / "assets/python-editor.css").read_text(encoding="utf-8")
        js = (ROOT / "assets/python-editor.js").read_text(encoding="utf-8")
        self.assertIn("background:#0b1829!important", css)
        self.assertIn("color:#8dd09b;font-style:italic", css)
        self.assertIn("lineWrapping: false", js)
        self.assertIn('setAttribute("wrap", "off")', js)

    def test_quarto_config_uses_dark_code_highlighting(self):
        config = (ROOT / "_quarto.yml").read_text(encoding="utf-8")
        self.assertIn("theme: [simple, styles/eywa.scss]", config)
        self.assertIn("highlight-style: github-dark", config)
        self.assertIn("activation-width: 960", config)

    def test_no_static_slides_define_white_backgrounds(self):
        pages = [ROOT / "index.qmd", ROOT / "demo.qmd", *sorted((ROOT / "slides").glob("*.qmd"))]
        self.assertEqual(len(pages), 12)
        for page in pages:
            with self.subTest(page=page.name):
                src = page.read_text(encoding="utf-8")
                self.assertFalse(re.search(r'(?i)background(?:-color)?\s*:\s*(?:#fff(?:fff)?|white)', src))


if __name__ == "__main__":
    unittest.main()
