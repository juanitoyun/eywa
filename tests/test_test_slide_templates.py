"""Verifica la plantilla iframe, sin generar tests concretos ni código oculto."""
from pathlib import Path
import re
import shutil
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]


class TestStandaloneTemplate(unittest.TestCase):
    def test_quarto_template_is_not_in_project_render(self):
        config = (ROOT / "_quarto.yml").read_text(encoding="utf-8")
        template = (ROOT / "templates/test-slide.qmd").read_text(encoding="utf-8")
        self.assertNotIn("templates/*.qmd", config)
        self.assertIn("{{TEST_ID}}", template)
        self.assertIn('../../labs/test.html?id={{TEST_ID}}', template)
        self.assertIn("controls: false", template)
        self.assertIn("progress: false", template)
        self.assertIn("slide-number: false", template)

    def test_only_placeholder_code_is_prepared(self):
        code = (ROOT / "templates/test-code.py").read_text(encoding="utf-8")
        self.assertEqual(code.strip(), "# Test {{TEST_ID}}")

    def test_iframe_reuses_existing_runner_without_hidden_tests(self):
        html = (ROOT / "labs/test.html").read_text(encoding="utf-8")
        for expected in (
            "../assets/python-editor.js",
            "../assets/python-editor.css",
            "../assets/python-console.js",
            "../assets/eywa-dark.css",
            "codemirror@5.65.21",
            'id="code"',
            'id="output"',
            'wrap="off"',
            'EYWA_RUN_PYTHON(py, source)',
            'new URL("./tests/test-" + testId + ".py", location.href)',
            'rawId.padStart(3, "0")',
            '# Test',
        ):
            self.assertIn(expected, html)
        for absent in (
            "Tests automáticos",
            "Ejecutar tests",
            'id="score"',
            "__eywa_cases",
            "__eywa_checks",
            "✓ Test",
        ):
            self.assertNotIn(absent, html)

    @unittest.skipUnless(shutil.which("node"), "Node no está disponible")
    def test_iframe_javascript_parses(self):
        html = (ROOT / "labs/test.html").read_text(encoding="utf-8")
        for i, body in enumerate(re.findall(r"<script(?:\s+[^>]*)?>(.*?)</script>", html, re.S | re.I)):
            if not body.strip():
                continue
            with self.subTest(script=i):
                result = subprocess.run(
                    ["node", "--check"], input=body, capture_output=True, text=True
                )
                self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
