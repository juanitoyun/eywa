/* EYWA / official GitHub source editor via Cloudflare Worker.
   Public reads, password-protected writes. Never stores the password. */
(function () {
  "use strict";

  const ENDPOINT = "https://eywa-editor-api.juan-reyes-marchant.workers.dev";
  const TARGETS = {
    intro: { path: "assets/intro-snippets.js", max: 28 },
    chapter: { path: "assets/chapter-labs.js", max: 10 },
    tutorial: { path: "labs/tutorial00/examples.json", max: 19 }
  };
  const SHA = /^[a-f0-9]{40}$/i;

  function configure(options) {
    const { kind, id, actions, getCode, setCode, onOfficial } = options || {};
    const target = TARGETS[kind];
    if (!target || !Number.isInteger(Number(id)) || Number(id) < 1 || Number(id) > target.max ||
        typeof getCode !== "function" || typeof setCode !== "function" || !actions) {
      throw new Error("No se puede asociar el editor con un ejercicio permitido.");
    }

    const button = (label, callback) => {
      const item = document.createElement("button");
      item.type = "button";
      item.textContent = label;
      item.addEventListener("click", callback);
      actions.appendChild(item);
      return item;
    };

    let officialCode = getCode();
    let fileSha = null;
    let busy = false;

    const publish = button("Guardar en GitHub", () => save());
    publish.title = "Publicar el código como nueva versión oficial (requiere contraseña)";
    publish.disabled = true;

    const sync = button("Actualizar oficial", () => refresh());
    sync.title = "Consultar la versión más reciente sin perder tus cambios locales";

    const history = document.createElement("a");
    history.href = "https://github.com/juanitoyun/eywa/commits/main/" + target.path;
    history.target = "_blank";
    history.rel = "noopener noreferrer";
    history.textContent = "Historial Git";
    history.className = "eywa-save-history";
    actions.appendChild(history);

    const status = document.createElement("span");
    status.className = "eywa-save-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    actions.after(status);

    function message(text, isError = false) {
      status.textContent = text;
      status.classList.toggle("is-error", isError);
    }

    function setBusy(value) {
      busy = value;
      publish.disabled = value || !fileSha;
      sync.disabled = value;
    }

    function requestURL() {
      const url = new URL(ENDPOINT + "/source");
      url.searchParams.set("kind", kind);
      url.searchParams.set("id", String(id));
      return url.href;
    }

    async function responseData(response) {
      let data;
      try { data = await response.json(); }
      catch (_) { throw new Error("Respuesta inesperada del servicio."); }
      if (!response.ok) throw new Error(data?.error || "Error HTTP " + response.status);
      return data;
    }

    async function refresh() {
      if (busy) return;
      setBusy(true);
      message("Consultando versión oficial…");
      try {
        const response = await fetch(requestURL(), { cache: "no-store" });
        const data = await responseData(response);
        if (typeof data.code !== "string" || !SHA.test(data.sha)) {
          throw new Error("La API no devolvió el código oficial esperado.");
        }
        // Protect ongoing edits from being silently overwritten.
        const hasLocalEdits = getCode() !== officialCode;
        const changed = !fileSha || officialCode !== data.code;
        officialCode = data.code;
        fileSha = data.sha;
        if (typeof onOfficial === "function") onOfficial(data.code);
        if (!hasLocalEdits) setCode(data.code);
        message(hasLocalEdits ?
          (changed ? "Hay una versión oficial distinta; tus cambios locales siguen intactos." :
                     "Versión comprobada. Tus cambios locales siguen intactos.") :
          "Código oficial actualizado. Puedes editar y publicar.");
      } catch (error) {
        fileSha = null;
        message("Sin conexión con GitHub: " + String(error.message || error), true);
      } finally {
        setBusy(false);
      }
    }

    async function save() {
      if (busy) return;
      if (!fileSha) { message("Primero pulsa Actualizar oficial.", true); return; }
      const code = getCode();
      if (code === officialCode) { message("Sin cambios respecto a la versión oficial."); return; }

      if (!window.confirm("¿Publicar este código en EYWA para todas las personas? Se conservará la versión anterior en GitHub.")) return;
      const password = window.prompt("Contraseña de edición de EYWA (no se guardará):");
      if (password === null) return;
      if (!password) { message("La contraseña no puede estar vacía.", true); return; }

      setBusy(true);
      message("Publicando en GitHub…");
      try {
        const response = await fetch(ENDPOINT + "/save", {
          method: "POST",
          mode: "cors",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "X-EYWA-Password": password
          },
          body: JSON.stringify({ kind, id: String(id), sha: fileSha, code })
        });
        const data = await responseData(response);
        if (!data.ok || !SHA.test(data.sha || "")) {
          throw new Error("GitHub no confirmó la actualización.");
        }
        fileSha = data.sha;
        officialCode = code;
        if (typeof onOfficial === "function") onOfficial(code);
        message(data.changed ?
          "Guardado en GitHub. Se creó un commit; GitHub Pages actualizará las slides." :
          "El código oficial ya coincide con el editor.");
      } catch (error) {
        message("No se guardó: " + String(error.message || error), true);
      } finally {
        setBusy(false);
      }
    }

    function restore() {
      setCode(officialCode);
      message("Restaurada la versión oficial conocida.");
    }

    // Never require the password to load public source. Never cache credentials.
    refresh();
    return { refresh, restore, getOfficial: () => officialCode, getSha: () => fileSha };
  }

  window.EYWA_REPO_SAVE = { configure };
})();