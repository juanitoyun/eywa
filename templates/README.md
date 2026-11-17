# EYWA · Plantillas para tests numerados

**No hay tests numerados creados todavía.** Este directorio contiene únicamente moldes.

## Arquitectura

- Quarto / Reveal.js: una presentación independiente de una sola diapositiva por test.
- GitHub Pages: publicación y enlace permanente.
- `labs/test.html`: editor Python y consola reutilizables, CodeMirror navy + Pyodide.
- `labs/tests/test-NNN.py`: archivo Python autónomo por test, creado **solo cuando se solicite**.
- `slides/tests/test-NNN.qmd`: presentación Quarto independiente, creada en esa misma solicitud.

No existen tests ocultos ni contadores. El contenido ejecutado es exclusivamente el código del editor. Un `assert` correcto es silencioso; `print("OK!")` se utiliza solo si figura en el código entregado.

## Cuando el usuario pida "Test NNN"

1. Crear `labs/tests/test-NNN.py` con el código que indique el usuario.
2. Crear `slides/tests/test-NNN.qmd` a partir de `test-slide.qmd`, reemplazando `{{TEST_ID}}`.
3. Incorporar `- slides/tests/*.qmd` a `project.render` en `_quarto.yml` en la primera creación, sin alterar el material existente.
4. Validar, compilar Quarto y publicar mediante el workflow del repositorio.
5. Entregar ambos enlaces al usuario.

## URLs estables una vez publicado el test

- Slide Quarto: `https://juanitoyun.github.io/eywa/slides/tests/test-NNN.html`
- Editor directo para Genially: `https://juanitoyun.github.io/eywa/labs/test.html?id=NNN`

El editor directo evita iframes anidados; la slide Quarto está disponible para quienes prefieran incrustar la presentación.

## Vista previa de la plantilla

`https://juanitoyun.github.io/eywa/labs/test.html` abre el editor sin ID con un solo comentario `# Test`, editable. No crea ningún test numerado.

El diseño sigue [EYWA-CODE/1](../DESIGN_RECIPE.md): Deep Navy, sintaxis Python coloreada, código sin ajuste de línea, scroll horizontal/vertical y salida Python literal.
