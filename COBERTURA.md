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
| 02 Métodos matemáticos | 15 | 5 | 22 secciones y 7 laboratorios; 19 celdas adaptadas, 5 exclusiones justificadas (aún sin verificación de navegador) |
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

1. Expandir capítulos 03–10; revisar y verificar el capítulo 02 ya ampliado.
2. Rehacer diagramas y visualizaciones originales como gráficos y animaciones propias.
3. Convertir los ejercicios fuente en problemas equivalentes con código editable y `assert` visibles, sin evaluaciones ocultas.
4. Mejorar la persistencia del código y compartir una sola instancia de Python entre slides para ahorrar memoria en móviles.
5. Validar carga y lectura en pantallas pequeñas y funcionamiento dentro de Genially.

**Diez presentaciones disponibles no significa diez capítulos totalmente convertidos.** Los capítulos 01 y 02 tienen desarrollo ampliado; falta validar y completar la trazabilidad del resto.

### Cambio visual

Las explicaciones de los 28 ejemplos del capítulo 1 están ahora integradas como comentarios `#` en el propio Python (incluyendo notas al lado de líneas clave). Ya no se muestran tarjetas de texto en esas slides. El editor utiliza un tema oscuro similar a VS Code Dark, con colores de sintaxis y compatibilidad móvil.



## Auditoría 1:1 exhaustiva · noviembre 2026

Ya se construyó un manifiesto rastreable de los materiales originales. Consulta el [panel de cobertura](coverage/index.html) o los archivos de [coverage/](coverage/README.md).

| Bloque | Celdas registradas | Estado |
|---|---:|---|
| 10 notebooks teóricos | 642 | Mayoritariamente pendientes de correspondencia celda a slide |
| 7 notebooks de ejercicios | 149 | Pendientes de adaptación detallada |
| 4 checkpoints + índice | 45 | Auditados como auxiliares y pendientes de revisión |
| Tutorial 00 aportado por usuario | 53 | 19 SVG adaptados, 33 pendientes, 1 celda vacía justificada |

**Otros 291 recursos:** 169 imágenes o animaciones, 106 fuentes de diagramas y 16 archivos adicionales; todos inventariados.

**Advertencia de cobertura:** los 28 ejemplos propios de Introducción, los 9 laboratorios de los capítulos 02–10 y las 19 visualizaciones del tutorial son entregables existentes. Sin embargo, todavía no equivalen a migración ni verificación exhaustiva de las 791 celdas de los notebooks oficiales.

El manifiesto conserva cada identificador, tipo de celda, metadatos y vínculos detectados, fijado al commit `7d8ef60e45a1923f855b5777b60696b074a7a445` del repositorio AED-Apuntes. No reproduce material fuente completo sin permiso.

## Capítulo 02 · Adaptación en Quarto

El capítulo 02 contiene 22 secciones y siete editores Python independientes (`labs/math02.html?ex=01` hasta `07`) para crecimiento, cotas, recurrencias, Hanoi, Fibonacci, teorema maestro y Stooge sort. Los ejercicios son originales con `assert` visibles. El editor temático guarda únicamente en `localStorage`; el laboratorio principal `labs/chapter.html?c=02` conserva el guardado oficial protegido por contraseña.

De las 24 celdas de teoría y ejercicios identificadas, 19 tienen destino de adaptación y 5 están excluidas con justificación (directiva Jupyter, separadores o celda vacía). **Ninguna está marcada como verificada:** queda pendiente validar equivalencia académica exhaustiva, ejecución real en navegador y móvil.
