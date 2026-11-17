/* EYWA: ejecutar exclusivamente el código visible.
   No existe una batería de tests adicional en el navegador. */
(function () {
  "use strict";
  const script = [
    "import io, contextlib, traceback",
    "__eywa_output = io.StringIO()",
    "try:",
    "    with contextlib.redirect_stdout(__eywa_output), contextlib.redirect_stderr(__eywa_output):",
    "        exec(compile(__eywa_source, '<editor>', 'exec'), {'__name__': '__main__'})",
    "except BaseException:",
    "    __eywa_output.write(traceback.format_exc())",
    "__eywa_output.getvalue()"
  ].join("\n");

  window.EYWA_RUN_PYTHON = async function (pyodide, source) {
    pyodide.globals.set("__eywa_source", source);
    const result = await pyodide.runPythonAsync(script);
    return String(result ?? "");
  };
})();
