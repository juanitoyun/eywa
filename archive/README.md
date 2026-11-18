# Archivo de rescate de juanitoyun/AED

Estos archivos se trasladaron antes de retirar el repositorio histórico. **No forman parte del sitio Quarto ni se importan en los laboratorios activos.** La finalidad es conservar los desarrollos que no están en EYWA.

- `aed-mdbook/`: 10 capítulos y 7 juegos de ejercicios en Markdown, archivos índice y herramientas antiguas de conversión y publicación mdBook.
- `aed-utilities-web/`: implementación Python experimental de visualizadores SVG/ASCII y widgets para JupyterLite/Pyodide.

**Procedencia:**
- mdBook: `juanitoyun/AED`, rama `main`, commit `4dc5256e9e775c43bbc68435d5630b2a356975df`.
- Visualizadores: `juanitoyun/AED`, rama `copilot/implement-functionalities-for-jupyterlite`, commit `29c1fe06db6401ecff7eeb9d5ad4916592d6658d`.

Los notebooks y 291 archivos `recursos/` no se duplicaron: coinciden por SHA con `ivansipiran/AED-Apuntes` fijado en `7d8ef60e45a1923f855b5777b60696b074a7a445`. Su inventario reproducible ya existe en `coverage/manifest.json`, `coverage/auxiliary.json` y `coverage/build_manifest.py`. El archivo mdBook es textual y **no autónomo** sin los recursos.

El material de teoría y ejercicios deriva de apuntes de terceros. La copia se conserva como referencia de migración, no como contenido académico original de EYWA. Revisar permisos antes de volver a redistribuir o integrar pasajes/figuras completos.

Se omitieron instaladores obsoletos, workflows de despliegue y el wheel binario antiguo (versión anterior a las fuentes `0.2.0`). No se ha eliminado `juanitoyun/AED`.
