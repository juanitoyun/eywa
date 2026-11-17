# EYWA — Python Learning Lab

Presentaciones **Quarto + Reveal.js** con diseño minimalista, ejercicios Python editables y una consola persistente. Los módulos Python viven en este repositorio.

## Qué contiene

- `index.qmd`: prototipo de cinco slides, incluyendo portada.
- `styles/eywa.scss`: tema visual reutilizable.
- `labs/binary-search.html`: editor de búsqueda binaria con `assert` visibles y consola Python.
- `labs/repl.html`: consola Python con Pyodide; importa archivos públicos desde GitHub.
- `assets/console-loader.html`: panel lateral que mantiene su sesión al navegar entre slides.
- `eywa/search.py`: módulo importable de búsqueda binaria.
- `.github/workflows/deploy.yml`: compilación y publicación en GitHub Pages.

## Previsualizar localmente

Instala [Quarto](https://quarto.org/docs/get-started/) y ejecuta desde la raíz:

~~~bash
quarto preview index.qmd
~~~

También puedes abrir los mini laboratorios con un servidor estático:

~~~bash
python -m http.server 8000
~~~

Abre `http://localhost:8000/labs/binary-search.html`. La primera ejecución necesita descargar Pyodide de jsDelivr.

## Publicar gratis en GitHub Pages

1. En el repositorio, entra a **Settings → Pages**.
2. En **Build and deployment → Source**, selecciona **GitHub Actions**.
3. Abre **Actions → Publicar slides EYWA** y comprueba que el workflow termine correctamente.
4. Cuando GitHub confirme la publicación, la URL esperada será: https://juanitoyun.github.io/eywa/

El workflow se ejecuta al actualizar `main`. La URL es prevista, no verificada, hasta que haya un despliegue correcto.

## Incrustar por iframe

**Slides completos**

~~~html
<iframe src="https://juanitoyun.github.io/eywa/"
        width="960" height="540" allowfullscreen
        title="EYWA Slides"></iframe>
~~~

**Mini tester independiente**

~~~html
<iframe src="https://juanitoyun.github.io/eywa/labs/binary-search.html"
        width="960" height="470"
        title="EYWA Mini Tester"></iframe>
~~~

**Consola Python independiente**

~~~html
<iframe src="https://juanitoyun.github.io/eywa/labs/repl.html"
        width="800" height="580"
        title="EYWA Python REPL"></iframe>
~~~

Se puede insertar este HTML en sitios que permitan iframes. Hay que comprobar específicamente Genially: puede imponer límites sobre iframes o scripts. La consola flotante de los slides conserva su estado **dentro de la misma presentación**; cambiar de página de Genially puede destruir y reconstruir el iframe.

## Importar un módulo Python público desde GitHub

En la consola PYODIDE, pulsa «Importar módulo de GitHub», o ejecuta:

~~~python
from pyodide.http import pyfetch
import importlib

url = "https://raw.githubusercontent.com/juanitoyun/eywa/main/eywa/search.py"
r = await pyfetch(url)
if not r.ok:
    raise RuntimeError("Error de descarga")
open("search.py", "wb").write(await r.bytes())

importlib.invalidate_caches()
from search import binary_search
print(binary_search([2, 4, 6, 8], 6))
~~~

Requiere conexión a Internet y que el servidor permita CORS. Si has modificado el módulo y ya lo habías importado, utiliza `importlib.reload(search)`.

## Limitaciones del primer prototipo

- Python en vivo usa **Pyodide** (versión fijada por CDN), no un kernel JupyterLite.
- El código se ejecuta dentro del navegador, sin backend. Los bucles infinitos pueden bloquear un iframe; falta un Worker con límite de ejecución.
- El editor y los tests se diseñaron para código educativo confiable, no para recibir código arbitrario de terceros en un entorno aislado.
- La primera carga requiere Internet; GitHub Pages/Genially y el CDN deben ser accesibles.
- No se ha verificado todavía la publicación ni la incrustación real en Genially.

## Próximos pasos

Reutilizar el tema y mini testers con pilas, colas, árboles, grafos y ordenamientos. Evaluar reemplazar el REPL por una instancia JupyterLite propia cuando necesitemos compatibilidad plena con notebooks.


## Curso completo de AED — diez capítulos

La página inicial, al publicarse, funciona como índice navegable: https://juanitoyun.github.io/eywa/

Cada capítulo tiene **una presentación Quarto Reveal.js** con cinco secciones de aprendizaje, más portada, y un editor Python ejecutable con `assert` visibles.

| Capítulo | Presentación | Tester |
| --- | --- | --- |
| 01 Introducción | [Slides](slides/01-introduccion.qmd) | [Python](labs/chapter.html?c=01) |
| 02 Análisis matemático | [Slides](slides/02-analisis-matematico.qmd) | [Python](labs/chapter.html?c=02) |
| 03 Diseño eficiente | [Slides](slides/03-diseno-eficiente.qmd) | [Python](labs/chapter.html?c=03) |
| 04 Estructuras elementales | [Slides](slides/04-estructuras-elementales.qmd) | [Python](labs/chapter.html?c=04) |
| 05 Pilas, colas y prioridad | [Slides](slides/05-pilas-colas-prioridad.qmd) | [Python](labs/chapter.html?c=05) |
| 06 Diccionarios | [Slides](slides/06-diccionarios.qmd) | [Python](labs/chapter.html?c=06) |
| 07 Ordenación | [Slides](slides/07-ordenacion.qmd) | [Python](labs/chapter.html?c=07) |
| 08 Búsqueda en texto | [Slides](slides/08-busqueda-texto.qmd) | [Python](labs/chapter.html?c=08) |
| 09 Compresión | [Slides](slides/09-compresion.qmd) | [Python](labs/chapter.html?c=09) |
| 10 Grafos | [Slides](slides/10-grafos.qmd) | [Python](labs/chapter.html?c=10) |

Formato de publicación previsto para un capítulo:

- Presentación: `https://juanitoyun.github.io/eywa/slides/01-introduccion.html`
- Tester aislado: `https://juanitoyun.github.io/eywa/labs/chapter.html?c=01`

Por ejemplo, para insertar un ejercicio independiente en Genially:

~~~html
<iframe
  src="https://juanitoyun.github.io/eywa/labs/chapter.html?c=01&amp;visual=1"
  width="960" height="520"
  title="EYWA · Introducción"
  allow="clipboard-write">
</iframe>
~~~

### Metodología y créditos

Contenido y código **originales**, tomando el temario y orden como referencia de [AED-Apuntes](https://github.com/ivansipiran/AED-Apuntes) (Ivan Sipiran, curso AED del DCC de la Universidad de Chile; basado en antiguos apuntes de Patricio Poblete y Benjamín Bustos). Los cuadernos ajenos **no se reproducen ni redistribuyen** en este repositorio.

Esta es la **primera síntesis visual de los diez capítulos**, no una conversión íntegra de sus textos, figuras y ejercicios. El siguiente trabajo será profundizar subtemas y crear visualizaciones/animaciones y tests específicos adicionales.

### Biblioteca Python

Implementaciones propias en `eywa/lessons.py` y `eywa/search.py`. Para probar los algoritmos desde un clon local:

~~~python
from eywa.lessons import merge_sort, bfs, fibonacci
print(merge_sort([8, 1, 5, 2]))
~~~

Pruebas locales:

~~~bash
python -m unittest discover -s tests -v
~~~

La validación automática de pull requests comprueba tanto el render Quarto como las pruebas estándar de Python.

## Capítulo 01: versión ampliada y móvil (sin notebooks)

- 28 mini editores Python ejecutables dentro de diapositivas Quarto.
- Cada ejemplo incluye `assert` visibles; no requiere Colab, Jupyter ni PC.
- Reveal.js ofrece vista vertical para móviles mediante `?view=scroll` (activación automática en pantallas pequeñas).
- El código también puede abrirse en una página independiente a pantalla completa.
- [Estado real de la adaptación](COBERTURA.md): los capítulos 02–10 mantienen por ahora la síntesis inicial.

Enlaces después de la publicación:

- [Capítulo 01 — móvil](https://juanitoyun.github.io/eywa/slides/01-introduccion.html?view=scroll)
- [Ejemplo 15 — potencia binaria](https://juanitoyun.github.io/eywa/labs/snippet.html?s=15)

Los códigos son implementaciones originales de los conceptos del curso, no reproducciones literales de los notebooks.

## Interfaz minimalista (noviembre de 2026)

- **Comentarios `#`**: el contenido explicativo del capítulo 01 vive ahora dentro del código Python, con anotaciones breves a la derecha de las instrucciones.
- **Editor con colores de sintaxis Python**: CodeMirror con una paleta inspirada en VS Code Dark+ (comentarios verdes, cadenas naranjas, palabras clave violetas).
- **Interfaz uniforme**: mini tester por slide, tester por capítulo, consola libre y búsqueda binaria reutilizan el mismo editor.
- **Celular primero**: optamos por CodeMirror, ya que Monaco —el editor de VS Code— no ofrece soporte oficial para navegadores móviles.
- **Fallback**: si el CDN del editor no carga, sigue disponible el `textarea` y la ejecución de Python.
- **Slides sin distracciones**: cada uno de los 28 temas del capítulo 1 muestra el título y su editor; diagramas comparativos y cierre se mantienen como excepciones didácticas.

La biblioteca CodeMirror está fijada a `5.65.21`; el diseño no depende de instalar VS Code.


## Consola Python sin tests ocultos

Todos los laboratorios ejecutan exclusivamente el código que se ve en el editor. Los `assert` escritos en él son las únicas verificaciones durante la ejecución en el navegador.

- Un `assert` correcto no imprime nada; sin `print()` ni excepciones, la consola queda vacía.
- `print(...)` muestra únicamente lo que imprime Python.
- Un `assert` falso u otro fallo muestra su traza de error Python.

No hay contadores, «Test 1» ni evaluaciones adicionales. Los tests de GitHub Actions verifican el propio proyecto, no agregan comprobaciones a los ejercicios del navegador.

## Plantilla para tests independientes de Genially

Preparada una plantilla sin tests numerados: [ver instrucciones](templates/README.md).

- Vista previa del editor vacío: `https://juanitoyun.github.io/eywa/labs/test.html` (muestra solo `# Test`).
- Cuando se solicite expresamente un número y un código, se crearán dos archivos: `labs/tests/test-NNN.py` y `slides/tests/test-NNN.qmd`.
- Cada test tendrá una URL Quarto y otra URL directa para iframe de Genially, sin duplicar el motor Python.
- El código es modificable, se ejecuta mediante Pyodide y la consola muestra exclusivamente `print()` o errores. Sin tests ocultos.
- No se crean archivos numerados antes de recibir la instrucción.

## Capítulo 00 · Herramientas visuales

Publicamos una presentación Quarto con **19 ejemplos gráficos originales de `00_Tutorial.ipynb`**, cada uno con su editor de código y visor SVG. No se utilizan servidores Jupyter.

- [Abrir capítulo 00](https://juanitoyun.github.io/eywa/slides/00-herramientas-visuales.html)
- [Ejemplo 01: arreglo NumPy 1D](https://juanitoyun.github.io/eywa/labs/tutorial00/index.html?ex=01)
- [Ejemplo 07: lista simple](https://juanitoyun.github.io/eywa/labs/tutorial00/index.html?ex=07)
- [Ejemplo 08: lista doble](https://juanitoyun.github.io/eywa/labs/tutorial00/index.html?ex=08)
- [Ejemplo 19: árbol de expresión](https://juanitoyun.github.io/eywa/labs/tutorial00/index.html?ex=19)

El panel «Visualización» comienza **colapsado**. Solo al pulsar Ejecutar se intenta generar una imagen mediante Python en Pyodide + clases sin modificar de `aed-utilities v0.4.1` + Graphviz WebAssembly. El circuito web completo necesita validación en un navegador con Internet; los tests de CI prueban que la biblioteca original genera DOT para cada ejemplo. Ver [documentación técnica](labs/tutorial00/README.md).

Este capítulo es una presentación distinta de los tests numerados de Genially; **no se creó ningún test numerado nuevo**.


### Visualización opcional en cualquier laboratorio

El editor estándar puede abrir una subventana **Visualización** manual, sin alterar la consola ni los tests visibles. Ahora está **habilitada por defecto en todo el curso**. No es necesario agregar `visual=1`: simplemente abre «Visualización» cuando la necesites. El parámetro `visual=1` se mantiene en enlaces existentes para compatibilidad.

Ejemplo de plantilla: `https://juanitoyun.github.io/eywa/labs/test.html`.

Para generar un dibujo, el código visible puede asignar `__eywa_dot = 'digraph { A -> B }'` o `__eywa_svg = '<svg ...></svg>'`. El resultado queda preparado, pero la subventana no se abre automáticamente. Detalles en [templates/README.md](templates/README.md).
