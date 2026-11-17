# Cobertura exhaustiva AED → EYWA

**Estado: inventario creado; migración académica completa todavía pendiente.**

Fuente fijada al commit 7d8ef60e45a1923f855b5777b60696b074a7a445 de https://github.com/ivansipiran/AED-Apuntes.

## Inventario

| Fuente | Notebooks | Celdas |
|---|---:|---:|
| Teoría 01–10 | 10 | 642 |
| Ejercicios 01–07 | 7 | 149 |
| Checkpoints + índice original | 5 | 45 |
| Tutorial 00 aportado por el usuario | 1 | 53 |
| **Total** | **23** | **889** |

El directorio original de recursos contiene **291 archivos**: 169 imágenes o animaciones, 106 fuentes de diagramas y 16 archivos de otros formatos. Se registran todos, incluso los no citados explícitamente por una celda.

## Archivos de auditoría

- **manifest.json:** 791 celdas canónicas, 291 recursos y vínculos detectados.
- **auxiliary.json:** 45 celdas en checkpoints e índice; duplicados señalados, no borrados del inventario.
- **tutorial00.json:** 53 celdas del notebook aportado por el usuario: 19 SVG adaptados, 33 pendientes, una celda final vacía con exclusión justificada.
- **index.html:** explorador público por capítulo, ID, estado y tipo de recurso.
- **build_manifest.py:** regenerador reproducible; conserva estados y destinos, consulta fuente original fijada, no copia el contenido académico.

## Criterio de cobertura

**Una slide existente no implica una celda verificada.** El capítulo 02 dispone de 19 correspondencias temáticas preliminares y 5 exclusiones justificadas. Los 28 ejemplos propios de Introducción y los laboratorios restantes siguen pendientes de correspondencia completa y verificación académica.

| Estado | Significado |
|---|---|
| pendiente | Unidad detectada, falta adaptar o revisar |
| adaptado | Destino EYWA existente, falta validación académica |
| verificado | Destino comprobado, código o visualización ejecutados cuando corresponde |
| excluido_justificado | Unidad redundante o vacía, con motivo explícito |

Los elementos adaptados o verificados deben incluir destino; las exclusiones deben incluir una justificación. Solo podemos declarar un capítulo completo cuando se haya resuelto cada elemento original.

## Próximas entregas

1. Completar capítulo 01: teoría T01-001…T01-158, ejercicios E01-001…E01-032, validando y aprovechando el código EYWA cuando sea equivalente.
2. Verificar la adaptación del capítulo 02 en navegador; repetir el proceso para capítulos 03–10, respetando el orden y ejemplos del origen.
3. Vincular los 291 recursos a una slide, laboratorio o justificación. Revisar especialmente los que no aparecen citados.
4. Auditar los cinco notebooks auxiliares, justificando los duplicados.
5. Verificar cada laboratorio en navegador y registrar su estado.

Para regenerar el inventario con Python estándar y acceso a Internet:

    python coverage/build_manifest.py

Para verificar el notebook 00 aportado por el usuario:

    python coverage/build_manifest.py --tutorial /ruta/00_Tutorial.ipynb

Para las comprobaciones offline del repositorio:

    python -m unittest discover -s tests -v

## Derechos y atribución

El repositorio original se presenta como material docente de la Universidad de Chile. No encontramos un archivo LICENSE explícito en su raíz en la versión inspeccionada. El manifiesto registra **solo metadatos**, no reproduce todo el texto o código ajeno. Antes de republicar directamente ilustraciones, animaciones o pasajes completos hay que aclarar los permisos o desarrollar versiones propias con atribución.

Los 19 SVG del tutorial 00 se vincularon a partir del notebook proporcionado por el usuario; esto no equivale a una verificación completa del circuito Pyodide + WebAssembly.
