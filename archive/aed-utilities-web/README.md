# aed-utilities-web (código rescatado)

Copia del experimento de visualización Python de `juanitoyun/AED`, commit `29c1fe06db6401ecff7eeb9d5ad4916592d6658d`.

Incluye adaptadores de listas, arreglos, árboles y grafos, modelos de escenas, layouts, renderizadores SVG y texto, y demos con ipywidgets. Es una implementación **distinta** del generador Graphviz que usa el tutorial 00 de EYWA.

Estado: **archivado y no integrado**. No se importa automáticamente desde `eywa`, no se enlaza desde las slides y no afecta a Cloudflare ni a los editores. Conservar como base de experimentación: antes de integrarlo, validar dependencias, fidelidad visual, rendimiento y seguridad.

El `pyproject.toml` original declara la versión `0.2.0`. El wheel histórico `0.1.0` se omitió por obsoleto y puede reconstruirse con las fuentes si se requiere.

Ejemplo de uso desde esta carpeta, tras instalar sus dependencias opcionales donde corresponda:

```python
from aed_utilities.models import VisualNode, VisualScene
from aed_utilities.layouts import layout_linear
from aed_utilities.renderers import render_svg

scene = VisualScene(title="Demo")
scene.add_node(VisualNode("a", "8"))
scene.add_node(VisualNode("b", "13"))
layout_linear(scene)
print(render_svg(scene)[:100])
```

Se preservan los archivos fuente sin refactorizaciones para facilitar la comparación con el historial anterior.
