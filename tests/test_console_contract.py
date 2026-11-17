"""EYWA ejecuta exclusivamente el código del editor, sin casos ocultos."""

import contextlib
import io
import json
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]


def extract_console_script():
    javascript = (ROOT / "assets" / "python-console.js").read_text(encoding="utf-8")
    match = re.search(r'const script = \[([\s\S]*?)\]\.join\("\\n"\);', javascript)
    if match is None:
        raise ValueError("No se encontró el runner Python de EYWA")
    return "\n".join(
        json.loads(line.strip().rstrip(","))
        for line in match.group(1).splitlines() if line.strip()
    )


def execute_editor_source(source: str) -> str:
    globals_ = {"__eywa_source": source}
    exec(extract_console_script(), globals_)
    return globals_["__eywa_output"].getvalue()


class TestVisiblePythonOnly(unittest.TestCase):
    def test_asserts_are_silent_when_true(self):
        self.assertEqual(execute_editor_source("assert 2 + 2 == 4"), "")

    def test_stdout_is_exactly_print_output(self):
        self.assertEqual(
            execute_editor_source("print('BFS')\nassert [1, 2][0] == 1"),
            "BFS\n"
        )

    def test_false_assert_shows_python_exception(self):
        output = execute_editor_source("assert False, 'Caso incorrecto'")
        self.assertIn("AssertionError: Caso incorrecto", output)
        self.assertNotIn("✓ Test", output)

    def test_other_python_errors_are_visible(self):
        self.assertIn("ZeroDivisionError", execute_editor_source("1 / 0"))

    def test_no_extra_automated_browser_tests(self):
        for filename in ("assets/intro-snippets.js", "assets/chapter-labs.js"):
            data = (ROOT / filename).read_text(encoding="utf-8")
            for banned in ('"tests":', '"cases":', "__eywa_checks", "__eywa_cases"):
                self.assertNotIn(banned, data)
        for filename in ("labs/snippet.html", "labs/chapter.html", "labs/binary-search.html"):
            html = (ROOT / filename).read_text(encoding="utf-8")
            self.assertIn("../assets/python-console.js", html)
            self.assertIn("EYWA_RUN_PYTHON", html)
            self.assertNotIn('id="score"', html)
            self.assertNotIn("Test 1", html)
            self.assertNotIn("Tests automáticos", html)
            self.assertNotIn("Ejecutar tests", html)

    def test_repl_does_not_invent_success_messages(self):
        html = (ROOT / "labs" / "repl.html").read_text(encoding="utf-8")
        self.assertNotIn("✓ Ejecutado sin salida", html)


if __name__ == "__main__":
    unittest.main()
