# Respaldo mdBook del repositorio AED

Se conservan `src/` (10 capítulos, 7 ejercicios e índice), `book.toml`, `convert_notebooks.py`, `convert_03.py`, `mdbook.sh`, `mdbook.ps1` y `README_MDBOOK.md`.

Estas conversiones son mayoritariamente exportaciones de los apuntes académicos originales. Se incluyen como **referencia de migración**, sin incorporarse al render de Quarto. No son nuevos textos originales ni sustituyen el análisis del curso.

**Faltan deliberadamente:** los 22 notebooks y 291 recursos (son idénticos por SHA a los de la fuente pública `ivansipiran/AED-Apuntes`). Las imágenes de las páginas mdBook requieren restaurar `recursos/`, y el conversor necesita los `.ipynb`.

Para restaurar temporalmente las dependencias originales:

```bash
git clone https://github.com/ivansipiran/AED-Apuntes.git /tmp/AED-Apuntes
git -C /tmp/AED-Apuntes checkout 7d8ef60e45a1923f855b5777b60696b074a7a445
cp -R /tmp/AED-Apuntes/recursos ./recursos
cp /tmp/AED-Apuntes/*.ipynb .
mkdir -p Ejercicios
cp /tmp/AED-Apuntes/Ejercicios/*.ipynb Ejercicios/
```

Ejecutar estos comandos **desde esta carpeta** (cuando se desee recrear el antiguo sitio). Necesitarás además `mdbook`; los comandos de la guía histórica pueden requerir ajustes. No ejecutar el conversor sin una copia de seguridad si modificas los `.md` archivados.

**Autoría de la fuente:** Ivan Sipirán, DCC Universidad de Chile, con base en apuntes previos de Patricio Poblete y Benjamín Bustos. La procedencia académica no implica permiso general de republicación. Ver también `../../coverage/README.md`.
