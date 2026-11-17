"""Secure browser-to-Worker GitHub publishing across EYWA's official code banks."""
from pathlib import Path
import re
import shutil
import subprocess
import unittest

ROOT=Path(__file__).resolve().parents[1]
LABS={
    "labs/snippet.html": ("intro", "index + 1"),
    "labs/chapter.html": ("chapter", "id"),
    "labs/tutorial00/index.html": ("tutorial", "example.id"),
}


class TestRepoSaveIntegration(unittest.TestCase):
    def test_each_editable_course_lab_installs_git_publisher(self):
        for path,(kind,identifier) in LABS.items():
            with self.subTest(path=path):
                html=(ROOT / path).read_text(encoding="utf8")
                prefix="../../assets" if "tutorial00" in path else "../assets"
                self.assertIn(prefix+"/eywa-repo-save.js",html)
                self.assertIn(prefix+"/eywa-repo-save.css",html)
                self.assertIn("EYWA_REPO_SAVE.configure(",html)
                self.assertIn(f'kind: "{kind}"',html)
                self.assertIn("onOfficial:",html)
                self.assertIn("getCode:",html)
                self.assertIn("setCode:",html)
                self.assertIn("Restablecer",html)

    def test_publisher_never_embeds_secrets_or_auto_saves(self):
        src=(ROOT / "assets/eywa-repo-save.js").read_text(encoding="utf8")
        self.assertIn('ENDPOINT + "/source"',src)
        self.assertIn('ENDPOINT + "/save"',src)
        self.assertIn('"X-EYWA-Password": password',src)
        self.assertIn('input.type = "password"',src)
        self.assertIn('await requestPassword()',src)
        self.assertNotIn('window.prompt(',src)
        self.assertIn('confirm(',src)
        self.assertNotIn("localStorage",src)
        self.assertNotIn("sessionStorage",src)
        self.assertIn("if (!fileSha)",src)
        self.assertIn('publish.disabled = true',src)
        self.assertIn('changed = !fileSha',src)
        self.assertIn('hasLocalEdits',src)
        self.assertIn('sha: fileSha',src)
        self.assertNotIn("github_pat_",src)

    @unittest.skipUnless(shutil.which("node"), "Node.js no disponible")
    def test_browser_code_runs_offline_simulation(self):
        checks=[
          ["node","--check",str(ROOT/"assets/eywa-repo-save.js")],
          ["node",str(ROOT/"tests/test_repo_save_browser.cjs")],
        ]
        for args in checks:
            with self.subTest(command=args):
                result=subprocess.run(args,capture_output=True,text=True)
                self.assertEqual(result.returncode,0,result.stderr+result.stdout)

if __name__=="__main__":
    unittest.main()
