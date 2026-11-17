#!/usr/bin/env python3
"""Regenera el inventario de AED-Apuntes: solo metadatos, sin copiar el curso.

Uso: python coverage/build_manifest.py
      python coverage/build_manifest.py --tutorial /ruta/00_Tutorial.ipynb

La versión fuente está fijada en SOURCE_COMMIT para que el inventario sea
reproducible. Las decisiones editoriales (estado/destino) se conservan.
Requiere conexión para leer los notebooks originales desde GitHub.
"""
from __future__ import annotations

import argparse
from datetime import date
import json
from pathlib import Path
import re
from urllib.parse import quote
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent
REPO = "ivansipiran/AED-Apuntes"
SOURCE_COMMIT = "7d8ef60e45a1923f855b5777b60696b074a7a445"
USER_AGENT = "EYWA-coverage-audit/1.0"
RESOURCE_IMAGES = {"png", "jpg", "jpeg", "gif", "svg", "webp"}
RESOURCE_DIAGRAMS = {"lyx", "drawio"}


def read_url(url: str) -> bytes:
    req = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(req, timeout=30) as response:
        return response.read()


def notebook(path: str) -> dict:
    url = "https://raw.githubusercontent.com/" + REPO + "/" + SOURCE_COMMIT + "/" + quote(path, safe="/")
    return json.loads(read_url(url))


def source(cell: dict) -> str:
    text = cell.get("source", "")
    return "".join(text) if isinstance(text, list) else text or ""


def describe(text: str, kind: str) -> str | None:
    expression = r"^\s*#{1,6}\s+\S.*$" if kind == "markdown" else r"^\s*(?:def|class|async def)\s+\S.*$"
    hit = re.search(expression, text, re.MULTILINE)
    return re.sub(r"^#+\s*", "", hit.group().strip())[:105] if hit else None


def mimes(cell: dict) -> list[str]:
    return sorted({mime for item in cell.get("outputs", []) for mime in item.get("data", {})})


def cell_record(cell: dict, index: int, prefix: str, chapter: str, resources: list[dict] | None = None) -> dict:
    src = source(cell)
    ident = f"{prefix}{chapter}-{index+1:03d}"
    linked = []
    for item in resources or []:
        path = item["path"]
        if path in src or quote(path, safe="/") in src:
            linked.append(path)
            item["referenced_by"].append(ident)
    return {
        "id": ident, "index": index, "kind": cell["cell_type"],
        "title": describe(src, cell["cell_type"]),
        "chars": len(src), "lines": len(src.splitlines()) if src else 0,
        "features": {
            "latex": bool(re.search(r"\\\[|\\\(|\$\$", src)),
            "image": bool(re.search(r"!\[[^\]]*\]\(|<img\b", src, re.I)),
            "html": bool(re.search(r"<(?:img|table|iframe|svg|video)\b", src, re.I)),
            "assert": bool(re.search(r"\bassert\b", src)),
        },
        "output_mimes": mimes(cell), "resources": linked,
        "status": "pendiente", "destination": None, "verified": False,
    }


def preserve_state(new: dict, old: dict | None, key: str):
    if not old:
        return
    previous = {x[key]: x for x in old["resources"]} if key == "path" else {
        cell["id"]: cell for n in old["notebooks"] for cell in n["cells"]
    }
    rows = new["resources"] if key == "path" else [
        cell for n in new["notebooks"] for cell in n["cells"]
    ]
    for row in rows:
        item = previous.get(row[key])
        if item:
            for field in ("status", "destination", "verified", "exclusion_reason"):
                if field in item:
                    row[field] = item[field]


def get_prior(path: Path) -> dict | None:
    return json.loads(path.read_text(encoding="utf8")) if path.exists() else None


def write_json(path: Path, value: dict):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf8")


def main(user_tutorial: Path | None):
    source_tree_url = f"https://api.github.com/repos/{REPO}/git/trees/{SOURCE_COMMIT}?recursive=1"
    tree = json.loads(read_url(source_tree_url))
    if tree.get("truncated"):
        raise RuntimeError("GitHub devolvió un árbol truncado: abortando.")
    entries = [f for f in tree["tree"] if f["type"] == "blob"]

    resources = []
    for f in entries:
        if not f["path"].startswith("recursos/") or f["path"].endswith(".ipynb"):
            continue
        ext = Path(f["path"]).suffix.lstrip(".").lower()
        kind = ("imagen" if ext in RESOURCE_IMAGES else
                "fuente_diagrama" if ext in RESOURCE_DIAGRAMS else
                "documento" if ext == "pdf" else
                "texto" if ext in {"txt", "md"} else "otro")
        resources.append({
            "path": f["path"], "git_blob_sha": f["sha"], "bytes": f["size"],
            "kind": kind, "extension": ext, "referenced_by": [],
            "status": "pendiente", "destination": None,
        })

    canonical, aux = [], []
    for f in entries:
        path = f["path"]
        if not path.endswith(".ipynb"):
            continue
        if re.fullmatch(r"\d\d_.*\.ipynb", path):
            family, kind, prefix = canonical, "teoria", "T"
        elif re.fullmatch(r"Ejercicios/\d\d_.*\.ipynb", path):
            family, kind, prefix = canonical, "ejercicios", "E"
        else:
            family, kind, prefix = aux, (
                "revisar_checkpoint" if ".ipynb_checkpoints" in path else "revisar_indice"
            ), "A"
        nb = notebook(path)
        chapter = (re.search(r"(\d\d)_", path) or [None, "00"])[1]
        if family is canonical:
            cells = [cell_record(c, i, prefix, chapter, resources) for i, c in enumerate(nb["cells"])]
            family.append({
                "path": path, "git_blob_sha": f["sha"], "bytes": f["size"],
                "chapter": chapter, "category": kind, "cells": cells,
            })
        else:
            identifier = len(aux)+1
            cells = [{
                "id": f"A{identifier}-{i+1:03d}", "index": i, "kind": c["cell_type"],
                "title": describe(source(c), c["cell_type"]), "chars": len(source(c)),
                "output_mimes": mimes(c), "status": "pendiente", "destination": None,
            } for i, c in enumerate(nb["cells"])]
            aux.append({
                "path": path, "git_blob_sha": f["sha"], "bytes": f["size"],
                "classification": kind, "exact_duplicate_of": None, "cells": cells,
            })

    canonical.sort(key=lambda n: n["path"])
    aux.sort(key=lambda n: n["path"])
    exercises = {
        n["git_blob_sha"]: n["path"] for n in canonical if n["category"] == "ejercicios"
    }
    for n in aux:
        n["exact_duplicate_of"] = exercises.get(n["git_blob_sha"])

    summary = {
        "notebooks": len(canonical),
        "cells": sum(len(n["cells"]) for n in canonical),
        "cell_types": {
            kind: sum(c["kind"] == kind for n in canonical for c in n["cells"])
            for kind in ("markdown", "code")
        },
        "resources": len(resources),
        "images": sum(r["kind"] == "imagen" for r in resources),
        "diagram_sources": sum(r["kind"] == "fuente_diagrama" for r in resources),
        "linked_resources": sum(bool(r["referenced_by"]) for r in resources),
        "unlinked_resources": sum(not r["referenced_by"] for r in resources),
        "by_notebook": [{
            "path": n["path"], "chapter": n["chapter"], "category": n["category"],
            "cells": len(n["cells"]),
            "markdown": sum(c["kind"] == "markdown" for c in n["cells"]),
            "code": sum(c["kind"] == "code" for c in n["cells"]),
            "linked_assets": len({r for c in n["cells"] for r in c["resources"]}),
        } for n in canonical],
    }
    manifest_file = ROOT / "manifest.json"
    previous = get_prior(manifest_file)
    manifest = {
        "schema": "EYWA-COVERAGE-1", "generated_date": date.today().isoformat(),
        "source": {
            "repository": REPO, "commit": SOURCE_COMMIT, "license_review_required": True,
            "note": "Metadatos de celdas y assets solamente. No contiene código ni texto fuente.",
        },
        "policy": {
            "status": ["pendiente", "adaptado", "verificado", "excluido_justificado"],
            "completion": "Cada celda y recurso requiere destino y evidencia de revisión, o motivo de exclusión.",
        },
        "summary": summary, "notebooks": canonical, "resources": resources,
        "existing_eywa": previous["existing_eywa"] if previous else {},
    }
    preserve_state(manifest, previous, "id")
    preserve_state(manifest, previous, "path")
    write_json(manifest_file, manifest)

    old_aux = get_prior(ROOT / "auxiliary.json")
    if old_aux:
        old_cells = {c["id"]: c for n in old_aux["notebooks"] for c in n["cells"]}
        for n in aux:
            for c in n["cells"]:
                old = old_cells.get(c["id"], {})
                for k in ("status", "destination", "exclusion_reason"):
                    if k in old: c[k] = old[k]
    aux_summary = {
        "auxiliary_notebooks": len(aux),
        "auxiliary_cells": sum(len(n["cells"]) for n in aux),
        "checkpoint_notebooks": sum(n["classification"] == "revisar_checkpoint" for n in aux),
        "index_notebooks": sum(n["classification"] == "revisar_indice" for n in aux),
        "exact_checkpoint_duplicates": [
            {"path": n["path"], "duplicate_of": n["exact_duplicate_of"]}
            for n in aux if n["exact_duplicate_of"]
        ],
        "by_notebook": [
            {"path": n["path"], "cells": len(n["cells"]), "duplicate_of": n["exact_duplicate_of"]}
            for n in aux
        ],
    }
    write_json(ROOT / "auxiliary.json", {
        "schema": "EYWA-COVERAGE-AUX-1",
        "source": {"repository": REPO, "commit": SOURCE_COMMIT},
        "note": "Archivos auxiliares auditados por separado; no se cuentan como capítulos.",
        "summary": aux_summary, "notebooks": aux,
    })
    print(f"{summary['cells']} celdas principales; {aux_summary['auxiliary_cells']} auxiliares; "
          f"{summary['resources']} recursos; {len(canonical)} notebooks principales.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--tutorial", type=Path,
                        help="Ruta opcional del notebook 00 aportado por el usuario (solo verificar)")
    args = parser.parse_args()
    if args.tutorial:
        import hashlib
        original_hash = hashlib.sha256(args.tutorial.read_bytes()).hexdigest()
        expected = json.loads((ROOT / "tutorial00.json").read_text(encoding="utf8"))["source"]["sha256"]
        if original_hash != expected:
            parser.error("El notebook 00 no coincide con la versión auditada.")
    main(args.tutorial)
