# EYWA-CODE/1 — Receta visual y semántica

Regla obligatoria para **cualquier código Python mostrado en slides, mini testers y consola EYWA**. La composición sigue la referencia visual aportada por el usuario: editor oscuro tipo VS Code, comentarios verdes laterales y código como protagonista.

## Estructura estándar

```python
""" AED / 04 · Búsqueda binaria """

# binary_search: list[int], int -> int
# INPUT : arreglo ordenado a y elemento x
# OUTPUT: índice de x o -1 si no existe

def binary_search(a, x):
    i, j = 0, len(a) - 1                        # Intervalo activo  // O(1)
    while i <= j:                               # Reduce por mitades  // O(log n)
        k = (i + j) // 2                        # Centro  // O(1)
        if a[k] == x:
            return k                           # Éxito  // O(1)
        if a[k] < x:
            i = k + 1
        else:
            j = k - 1
    return -1                                   # Fracaso  // O(1)

# Complejidad: O(log n) tiempo; O(1) espacio

assert binary_search([1, 3, 5], 3) == 1
assert binary_search([], 7) == -1
```

### Reglas de edición

1. **Título** en docstring triple comilla, sin banners decorativos ni grandes bloques externos.
2. **Contrato** inmediatamente bajo el título: nombre, tipos, `INPUT`, `OUTPUT`. Agregar precondición si es esencial.
3. **Notas al costado** en el MISMO renglón que explican: `# motivo  // costo`. El texto `// ...` pertenece al comentario Python; no se usa como operador.
4. Alinear comentarios alrededor de la columna 46 con espacios, no tabs; aceptar líneas largas y desplazamiento horizontal.
5. **Complejidad** al final: costo temporal y espacial, con matices cuando corresponda.
6. **Solo `assert` visibles**: cada laboratorio ejecuta exclusivamente el código del editor; el runner no inyecta casos ni mensajes de éxito.
7. **Una idea por slide**: encabezado, editor y consola literal (vacía si no hubo `print` ni errores). Conservar diagramas solo si aportan.
8. **Código ejecutable**: los fragmentos en diapositivas deben abrir un runner Python, no ser bloques estáticos no interactivos.
9. En el editor, `lineWrapping: false`, barra horizontal independiente y scroll vertical; jamás partir los renglones según el ancho del marco.
10. El tema actual usa **CodeMirror 5 + paleta VS Code Dark**, con fallback a `textarea wrap="off"`.

## Implementación y control de calidad

- Estilos: `assets/python-editor.css`.
- Motor del editor: `assets/python-editor.js`.
- Ejemplos ejecutables de introducción: `assets/intro-snippets.js`.
- Laboratorios por capítulo: `assets/chapter-labs.js`.
- Ejecutor Python sin tests ocultos: `assets/python-console.js`. Tests internos de mantenimiento: `tests/test_console_contract.py`, `tests/test_intro_snippets.py`, `tests/test_annotated_chapter_labs.py`, `tests/test_minimal_editor.py`.

Cualquier nuevo material AED debe respetar esta receta y pasar `python -m unittest discover -s tests -v`.


## Paleta obligatoria — Deep Navy (todas las diapositivas)

Mantener la estética minimalista de Quarto, pero **sin fondos claros**: cada portada, índice, tarjeta, tabla, bloque estático, iframe y consola debe quedar en modo oscuro.

| Uso | Color |
| --- | --- |
| Fondo profundo | `#071421` |
| Fondo principal | `#081727` |
| Azul marino alternativo | `#0b2034` |
| Superficie de tarjeta | `#11273e` |
| Elevación / hover | `#172f49` |
| Borde sutil | `#294660` |
| Texto | `#e6f0fa` |
| Títulos | `#f2f8ff` |
| Texto secundario | `#adc2d4` |
| Cian técnico | `#76d9f8` |
| Menta para acentos | `#72e1c6` |

Reglas: fondo navy, tarjetas más claras, texto blanco-azulado, cian principal y menta secundaria. Gradientes muy suaves, sin brillos neón ni adornos excesivos. El código conserva panel oscuro estilo VS Code, comentarios verdes y líneas sin ajuste horizontal.

Archivos: `styles/eywa.scss` (slides, portada e índice), `assets/eywa-dark.css` (todos los laboratorios Python), `assets/python-editor.css` (código) y `assets/console-loader.html` (consola flotante). Los nuevos laboratorios deben cargar `../assets/eywa-dark.css` **después** de su CSS local para evitar paneles claros.
