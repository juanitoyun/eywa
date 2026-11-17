# Cobertura del apunte AED → EYWA

## Principio de diseño

Una idea por diapositiva; el Python se ejecuta dentro del navegador. Quarto Reveal.js usa Scroll View en celulares.
**No se incrustan notebooks.** Se crean slides originales y código Python editable con botones de ejecución.

Referencia académica: https://github.com/ivansipiran/AED-Apuntes

## Inventario del material fuente

Conteo de celdas inspeccionadas en los diez cuadernos principales del repositorio de referencia:

| Capítulo | Markdown | Código | Estado EYWA |
| --- | ---: | ---: | --- |
| 01 Introducción | 71 | 87 | Desarrollo ampliado: 28 ejemplos propios ejecutables |
| 02 Métodos matemáticos | 15 | 5 | Síntesis inicial |
| 03 Diseño eficiente | 27 | 28 | Síntesis inicial |
| 04 Estructuras elementales | 36 | 60 | Síntesis inicial |
| 05 Pilas, colas y prioridad | 25 | 32 | Síntesis inicial |
| 06 Diccionarios | 88 | 67 | Síntesis inicial |
| 07 Ordenación | 25 | 15 | Síntesis inicial |
| 08 Búsqueda en texto | 12 | 11 | Síntesis inicial |
| 09 Compresión de datos | 5 | 1 | Síntesis inicial |
| 10 Grafos | 23 | 9 | Síntesis inicial |

Además existen siete notebooks separados de ejercicios que aún requieren adaptación.

## Capítulo 1: cobertura temática

- Números, booleanos, strings, listas y diccionarios.
- Funciones incorporadas, funciones propias y expresiones condicionales.
- Decisiones con if, ciclos for y while.
- Invariantes: inicialización, preservación y terminación.
- Partición por pivote, potencias lineales y exponenciación binaria.
- Representación binaria del exponente; polinomios por Horner.
- NumPy y arreglos; inserción, selección y burbuja.
- Recursión, potencia recursiva, iteración, Torres de Hanoi.
- Diagramas de estado y conteo de palabras.

Todos los ejemplos *incluidos* en las slides de este capítulo tienen un mini editor, consola literal, `assert` visibles y panel de visualización desplegable.
Los 87 bloques de código originales no se han copiado literalmente ni todos se han migrado: son material de referencia para aumentar progresivamente el nivel de detalle.

## Trabajo siguiente

1. Expandir capítulos 2–10 con la misma granularidad temática.
2. Rehacer diagramas y visualizaciones originales como gráficos y animaciones propias.
3. Convertir los ejercicios fuente en problemas equivalentes con código editable y `assert` visibles, sin evaluaciones ocultas.
4. Mejorar la persistencia del código y compartir una sola instancia de Python entre slides para ahorrar memoria en móviles.
5. Validar carga y lectura en pantallas pequeñas y funcionamiento dentro de Genially.

**Diez presentaciones disponibles no significa diez capítulos totalmente convertidos.** El capítulo 1 es el primero desarrollado a fondo.

### Cambio visual

Las explicaciones de los 28 ejemplos del capítulo 1 están ahora integradas como comentarios `#` en el propio Python (incluyendo notas al lado de líneas clave). Ya no se muestran tarjetas de texto en esas slides. El editor utiliza un tema oscuro similar a VS Code Dark, con colores de sintaxis y compatibilidad móvil.

