"""Check all 19 original tutorial visualizations without any Jupyter server."""
from contextlib import redirect_stdout
from io import StringIO
import json
import re
import shutil
import subprocess
from pathlib import Path
import sys
import types
import unittest
from unittest.mock import patch
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "labs" / "tutorial00" / "examples.json"
DRAWER = ROOT / "labs" / "tutorial00" / "visualizacion.py"
DECK = ROOT / "slides" / "00-herramientas-visuales.qmd"


class FakeArray:
    """Only the indexing/shape contract needed by the notebook's drawing examples."""
    def __init__(self, values):
        self.values = values
        self.shape = (len(values), len(values[0])) if values and isinstance(values[0], list) else (len(values),)

    def __getitem__(self, index):
        return self.values[index]

    def __str__(self):
        return repr(self.values)


class FakeNumpy(types.ModuleType):
    def array(self, values):
        return FakeArray(values)

    def arange(self, *values):
        return FakeArray(list(range(*values)))


class TestTutorial00(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.examples = json.loads(DATA.read_text(encoding="utf8"))["examples"]
        cls.drawer = DRAWER.read_text(encoding="utf8")
        cls.qmd = DECK.read_text(encoding="utf8")

    def test_all_notebook_visualizations_present(self):
        self.assertEqual(len(self.examples), 19)
        self.assertEqual([v["cell"] for v in self.examples], [
            5, 6, 7, 8, 10, 11, 19, 26,
            32, 33, 34, 35, 37, 38, 39, 40, 45, 47, 51
        ])
        self.assertEqual([v["group"] for v in self.examples].count("Arreglos"), 6)
        self.assertEqual([v["group"] for v in self.examples].count("Listas"), 2)
        self.assertEqual([v["group"] for v in self.examples].count("Árboles"), 11)
        self.assertEqual(len({e["svg"] for e in self.examples}), 19)

    def test_previews_are_valid_original_svg(self):
        for item in self.examples:
            with self.subTest(item=item["id"]):
                root = ET.fromstring(item["svg"])
                self.assertTrue(root.tag.endswith("svg"))
                self.assertGreater(len(item["svg"]), 1000)
                compile(item["source"], item["id"] + ".py", "exec")

    def test_all_19_slides_embed_unique_example(self):
        self.assertEqual(self.qmd.count('class="eywa-00-example"'), 19)
        for item in self.examples:
            self.assertIn('index.html?ex=' + item["id"], self.qmd)
        self.assertIn('00_Tutorial.ipynb', self.qmd)

    @unittest.skipUnless(shutil.which("node"), "Node.js no está disponible")
    def test_browser_script_syntax(self):
        html = (ROOT / "labs/tutorial00/index.html").read_text(encoding="utf8")
        scripts = re.findall(r"<script(?:\\s+[^>]*)?>(.*?)</script>", html, re.S | re.I)
        for source in scripts:
            if not source.strip():
                continue
            result = subprocess.run(["node", "--check"], input=source, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
        visual_js = (ROOT / "assets/eywa-visual-panel.js").read_text(encoding="utf8")
        self.assertIn("Graphviz.load()", visual_js)
        self.assertIn('loadPyodide(', html)
        self.assertIn('examples.json', html)

    def test_visual_panel_starts_closed_and_requires_click(self):
        html = (ROOT / "labs/tutorial00/index.html").read_text(encoding="utf8")
        visual_css = (ROOT / "assets/eywa-visual-panel.css").read_text(encoding="utf8")
        self.assertIn('class="eywa-visual-details" id="visual-details"', html)
        self.assertIn('class="eywa-visual-canvas" id="visual"', html)
        self.assertIn('window.EYWA_VISUAL_PANEL.mount(el("visual-details"))', html)
        self.assertIn("await visualPanel.setDot(last.dot", html)
        self.assertIn('runButton.addEventListener("click",execute)', html)
        self.assertIn("visualPanel.clear();", html)
        self.assertIn("background:#fff !important", visual_css)
        self.assertNotIn("showSvg(example.svg", html)
        self.assertNotIn('Cargando imagen del notebook', html)

    def test_original_drawer_kept_unmodified(self):
        self.assertIn("class NumpyArrayDrawer:", self.drawer)
        self.assertIn("class LinkedListDrawer:", self.drawer)
        self.assertIn("class BinaryTreeDrawer:", self.drawer)
        self.assertIn("src.render('lista.gv', view=True)", self.drawer)
        self.assertIn("src.pipe(format='svg')", self.drawer)
        self.assertTrue((ROOT / "labs/tutorial00/LICENSE.txt").is_file())

    def test_each_original_python_example_produces_dot(self):
        collected = []
        fake_graphviz = types.ModuleType("graphviz")
        class FakeSource:
            def __init__(self, content):
                self.source = content
                self.engine = "dot"
            def render(self, *args, **kwargs):
                return "browser://graphviz"
            def pipe(self, *args, **kwargs):
                collected.append((self.engine, self.source))
                return b'<svg xmlns="http://www.w3.org/2000/svg"/>'
        fake_graphviz.Source = FakeSource

        fake_ip = types.ModuleType("IPython")
        fake_display = types.ModuleType("IPython.display")
        class FakeSVG:
            def __init__(self, source): self.data = source
        fake_display.SVG = FakeSVG
        fake_display.display = lambda *a, **k: None
        fake_display.display_svg = lambda *a, **k: None
        fake_ip.display = fake_display

        stub_modules = {
            "graphviz": fake_graphviz,
            "IPython": fake_ip,
            "IPython.display": fake_display,
            "numpy": FakeNumpy("numpy"),
        }
        with patch.dict(sys.modules, stub_modules):
            original = types.ModuleType("aed_utilities")
            exec(compile(self.drawer, str(DRAWER), "exec"), original.__dict__)
            with patch.dict(sys.modules, {"aed_utilities": original}):
                for item in self.examples:
                    with self.subTest(cell=item["cell"], id=item["id"]):
                        collected.clear()
                        context = {"__name__": "__main__"}
                        with redirect_stdout(StringIO()):
                            exec(compile(item["source"], item["id"] + ".py", "exec"), context)
                        self.assertEqual(len(collected), 1, "La celda debe dibujar exactamente un SVG")
                        engine, dot = collected[0]
                        self.assertIn(engine, ("dot", "neato"))
                        self.assertTrue(dot.lstrip().startswith(("digraph ", "graph ")))
                        self.assertIn("{", dot)
                        self.assertIn("}", dot)


if __name__ == "__main__":
    unittest.main()
