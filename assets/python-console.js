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


/* Optional visual output: a test may explicitly set __eywa_svg or __eywa_dot.
   These are output variables, not hidden tests. Nothing is rendered until
   the user expands the dedicated visual panel. */
(function(){
  "use strict";
  const script=[
    "import io, contextlib, traceback, json",
    "__eywa_out=io.StringIO()",
    "__eywa_scope={'__name__':'__main__'}",
    "__eywa_ok=True",
    "try:",
    "    with contextlib.redirect_stdout(__eywa_out), contextlib.redirect_stderr(__eywa_out):",
    "        exec(compile(__eywa_source,'<editor>','exec'),__eywa_scope)",
    "except BaseException:",
    "    __eywa_ok=False",
    "    __eywa_out.write(traceback.format_exc())",
    "__eywa_svg=__eywa_scope.get('__eywa_svg') if __eywa_ok else None",
    "__eywa_dot=__eywa_scope.get('__eywa_dot') if __eywa_ok else None",
    "json.dumps({'console':__eywa_out.getvalue(), 'svg':__eywa_svg if isinstance(__eywa_svg,str) else None, 'dot':__eywa_dot if isinstance(__eywa_dot,str) else None},ensure_ascii=False)"
  ].join("\n");
  window.EYWA_RUN_PYTHON_WITH_VISUAL=async function(pyodide,source){
    pyodide.globals.set("__eywa_source",source);
    return JSON.parse(await pyodide.runPythonAsync(script));
  };
})();
