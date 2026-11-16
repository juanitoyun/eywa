# EYWA — Python Learning Lab

Presentaciones **Quarto + Reveal.js** con diseño minimalista, ejercicios Python editables y una consola persistente. Los módulos Python viven en este repositorio.

## Qué contiene

- `index.qmd`: prototipo de cinco slides, incluyendo portada.
- `styles/eywa.scss`: tema visual reutilizable.
- `labs/binary-search.html`: mini tester con 7 tests ejecutados en Python real.
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

Cada capítulo tiene **una presentación Quarto Reveal.js** con cinco secciones de aprendizaje, más portada, y un mini tester Python autocorregible.

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
  src="https://juanitoyun.github.io/eywa/labs/chapter.html?c=01"
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
