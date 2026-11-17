"""Optional visualization stays closed until user opens it; visible code supplies SVG/DOT."""
import json
from pathlib import Path
import re
import shutil
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
LABS = ("labs/test.html", "labs/snippet.html", "labs/chapter.html", "labs/binary-search.html")


def python_visual_runner():
    src = (ROOT / "assets/python-console.js").read_text(encoding="utf-8")
    match = re.search(r'const script=\[([\s\S]*?)\]\.join\("\\n"\);', src)
    if not match:
        raise ValueError("No se encontró el runner opcional")
    lines = [json.loads(line.strip().rstrip(",")) for line in match.group(1).splitlines() if line.strip()]
    lines[-1] = "__eywa_result=" + lines[-1]
    return "\n".join(lines)


def run_visible(source):
    scope = {"__eywa_source": source}
    exec(python_visual_runner(), scope)
    return json.loads(scope["__eywa_result"])


class TestOptionalVisualPanel(unittest.TestCase):
    def test_existing_labs_visual_available_by_default(self):
        for path in LABS:
            with self.subTest(path=path):
                html = (ROOT / path).read_text(encoding="utf8")
                self.assertIn("../assets/eywa-visual-panel.css", html)
                self.assertIn("../assets/eywa-visual-panel.js", html)
                self.assertIn('class="eywa-visual-details" id="visual-details"', html)
                self.assertNotIn('id="visual-details" hidden', html)
                self.assertNotIn('id="visual-details" open', html)
                self.assertIn('get("visual")', html)
                self.assertIn('!=="0"', html.replace(" ", ""))
                self.assertIn("visualDetails.hidden=", html.replace(" ", ""))
                self.assertIn("EYWA_RUN_PYTHON_WITH_VISUAL", html)
                self.assertIn("EYWA_RUN_PYTHON(", html)
                self.assertIn("visualPanel.clear()", html)
                self.assertIn("visualPanel.setSvg(", html)
                self.assertIn("visualPanel.setDot(", html)

    def test_repl_keeps_state_and_explicit_visual(self):
        html = (ROOT / "labs/repl.html").read_text(encoding="utf8")
        self.assertIn("../assets/eywa-visual-panel.js", html)
        self.assertIn("../assets/eywa-visual-panel.css", html)
        self.assertIn('class="eywa-visual-details" id="visual-details"', html)
        self.assertIn('get("visual") !== "0"', html)
        self.assertIn("visualPanel.setSvg(", html)
        self.assertIn("visualPanel.setDot(", html)
        self.assertIn("py.runPythonAsync(codeEditor.getValue())", html)
        self.assertIn("__eywa_dot", html)
        self.assertIn("__eywa_svg", html)
        self.assertIn('get("example")==="github-import"', html)

    def test_tutorial_visual_starts_closed(self):
        html = (ROOT / "labs/tutorial00/index.html").read_text(encoding="utf8")
        self.assertIn('class="eywa-visual-details" id="visual-details"', html)
        self.assertNotIn('id="visual-details" open', html)
        self.assertIn("await visualPanel.setDot(", html)
        self.assertNotIn("showSvg(example.svg", html)

    def test_python_svg_output_requires_explicit_visible_variable(self):
        result = run_visible("__eywa_svg = '<svg xmlns=\"http://www.w3.org/2000/svg\"></svg>'\nprint('OK!')")
        self.assertEqual(result["console"], "OK!\n")
        self.assertTrue(result["svg"].startswith("<svg"))
        self.assertIsNone(result["dot"])

    def test_python_dot_output_requires_explicit_visible_variable(self):
        result = run_visible("__eywa_dot='digraph { A -> B }'\nassert True")
        self.assertEqual(result["console"], "")
        self.assertEqual(result["dot"], "digraph { A -> B }")
        self.assertIsNone(result["svg"])

    def test_failed_assert_never_produces_visual(self):
        result = run_visible("__eywa_svg='<svg></svg>'\nassert False, 'falló'")
        self.assertIn("AssertionError: falló", result["console"])
        self.assertIsNone(result["svg"])
        self.assertIsNone(result["dot"])

    def test_plain_code_keeps_clean_console(self):
        result = run_visible("assert 2+2 == 4\nprint('OK!')")
        self.assertEqual(result, {"console": "OK!\n", "svg": None, "dot": None})

    @unittest.skipUnless(shutil.which("node"), "Node.js no está disponible")
    def test_js_sources_parse(self):
        files = ("assets/eywa-visual-panel.js", "assets/python-console.js")
        for name in files:
            with self.subTest(file=name):
                proc = subprocess.run(["node", "--check", str(ROOT / name)],
                                      capture_output=True, text=True)
                self.assertEqual(proc.returncode, 0, proc.stderr)
        for name in ("labs/tutorial00/index.html", *LABS):
            html=(ROOT / name).read_text(encoding="utf8")
            for script in re.findall(r"<script(?:\s+[^>]*)?>(.*?)</script>", html, flags=re.S|re.I):
                if script.strip():
                    proc=subprocess.run(["node", "--check"], input=script, capture_output=True, text=True)
                    self.assertEqual(proc.returncode, 0, f"{name}: {proc.stderr}")

    @unittest.skipUnless(shutil.which("node"), "Node.js no está disponible")
    def test_viewer_does_not_auto_expand(self):
        script = r"""
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(process.argv[1],'utf8');
const canvas={nodes:[],replaceChildren(...items){this.nodes=items}};
const ready={textContent:""};
const details={open:false,querySelector(selector){
 return selector==='.eywa-visual-canvas'?canvas:selector==='.eywa-visual-ready'?ready:null;
}};
const browser={
 window:{},
 URL:{createObjectURL(){return 'blob:svg'},revokeObjectURL(){}},
 Blob:class Blob{constructor(content,opts){this.content=content;this.opts=opts}},
 Image:class Image{set src(s){this.value=s}},
};
vm.runInNewContext(source,browser);
const panel=browser.window.EYWA_VISUAL_PANEL.mount(details);
assert.strictEqual(details.open,false);
panel.setSvg('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
assert.strictEqual(details.open,false);
assert.strictEqual(panel.hasImage(),true);
assert.strictEqual(ready.textContent,'Imagen disponible');
assert.strictEqual(canvas.nodes.length,1);
details.open=true;
panel.clear(false);
assert.strictEqual(details.open,true);
assert.strictEqual(canvas.nodes.length,0);
panel.clear();
assert.strictEqual(details.open,false);
"""
        proc = subprocess.run(["node","-e",script,str(ROOT/"assets/eywa-visual-panel.js")],
                              capture_output=True,text=True)
        self.assertEqual(proc.returncode,0,proc.stderr)


if __name__=="__main__":
    unittest.main()
