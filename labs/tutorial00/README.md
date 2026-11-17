# Capítulo 00 — Herramientas visuales del AED

**Fuente:** `00_Tutorial.ipynb` facilitado por el usuario. Se han recuperado las **19 celdas que generan SVG** (no se sustituyeron sus gráficos por dibujos manuales).

## Qué incluye

- 6 visualizaciones de arreglos NumPy, 1D y 2D.
- 2 visualizaciones de listas enlazadas simple y doble.
- 11 visualizaciones de árboles binarios, NULL/centinelas y árbol de expresión.
- Código Python autónomo por ejemplo, con la preparación necesaria de las celdas anteriores.
- Vista previa: el SVG original guardado en el notebook; visible sin arrancar Python.
- Botón Ejecutar: código original → clases originales `aed-utilities` → DOT → Graphviz WebAssembly → nuevo SVG.
- Consola Python real: solo `print()` y excepciones; ningún test oculto.

## Integración

**Presentación Quarto (21 slides):** `https://juanitoyun.github.io/eywa/slides/00-herramientas-visuales.html`

**Laboratorio individual (Genially):** `https://juanitoyun.github.io/eywa/labs/tutorial00/index.html?ex=01` hasta `?ex=19`.

Los IDs `01..19` son **ejemplos del tutorial**, no tests numerados del programa EYWA. No se crearon tests solicitados por el usuario anteriormente.

## Fuente original y licencia

`visualizacion.py` es una copia textual del archivo `aed_utilities/visualizacion.py` en `ivansipiran/aed-utilities`, **tag v0.4.1**. Se incluye la licencia MIT original en `LICENSE.txt`.

Fuente: https://github.com/ivansipiran/aed-utilities/tree/v0.4.1

El código fuente del tutorial y sus 19 imágenes SVG se extrajeron directamente del notebook cargado por el usuario. Los gráficos de referencia son los de Jupyter; el resultado posterior se genera dinámicamente con la misma librería y Graphviz WASM.

## Estado de verificación

- GitHub Actions verifica mediante mocks del backend de Python que las **19 implementaciones originales generan DOT válido**.
- Los 19 SVG de referencia se comprueban como XML bien formado.
- El render Quarto y los enlaces se verifican en CI.
- **Pendiente de probar en un navegador con acceso externo:** el circuito completo Pyodide + descarga de `graphviz==0.21` + Graphviz WASM. Si el CDN es inaccesible, sigue disponible el SVG original como vista previa.

## Requisitos técnicos

- No hay servidor Jupyter ni kernel Python remoto.
- GitHub Pages sirve archivos estáticos; la primera ejecución descarga paquetes WASM desde jsDelivr y PyPI.
- En móvil puede consumir memoria: ejecuta uno o pocos ejemplos simultáneamente.
- La ejecución de código editable no tiene límites automáticos de tiempo. No ejecutar bucles infinitos.

El motor `index.html` se reutiliza para los 19 ejemplos: todos los datos visuales y su código residen en `examples.json`.
