/* EYWA Python editor with syntax highlighting. Uses CodeMirror 5 (pinned, MIT).
   If the code-editor CDN is unavailable, the ordinary textarea keeps working. */
(function () {
  "use strict";
  window.EYWA_EDITOR = {
    create(textarea, options = {}) {
      if (!textarea) throw new Error("EYWA Editor requires a textarea");
      const lineHeight = options.height || "237px";
      let cm = null;
      if (typeof window.CodeMirror !== "undefined") {
        try {
          cm = window.CodeMirror.fromTextArea(textarea, {
            mode: { name: "python", version: 3, singleLineStringErrors: false },
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 4,
            indentUnit: 4,
            indentWithTabs: false,
            smartIndent: true,
            autofocus: false,
            viewportMargin: 14,
            extraKeys: {
              Tab(editor) {
                if (editor.somethingSelected()) editor.indentSelection("add");
                else editor.replaceSelection("    ", "end");
              },
              "Shift-Tab"(editor) { editor.indentSelection("subtract"); },
              "Ctrl-Enter"() { options.run?.(); },
              "Cmd-Enter"() { options.run?.(); }
            }
          });
          cm.setSize("100%", lineHeight);
          cm.getWrapperElement().setAttribute("aria-label", options.label || "Editor Python");
        } catch (error) {
          console.warn("EYWA Editor: fallback to textarea", error);
          cm = null;
        }
      }
      if (!cm) {
        textarea.style.height = lineHeight;
        textarea.style.display = "block";
        textarea.addEventListener("keydown", event => {
          if (event.key === "Tab") {
            event.preventDefault();
            textarea.setRangeText("    ", textarea.selectionStart, textarea.selectionEnd, "end");
          }
          if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            options.run?.();
          }
        });
      }
      return {
        getValue() { return cm ? cm.getValue() : textarea.value; },
        setValue(value) { if (cm) cm.setValue(value); else textarea.value = value; },
        refresh() { if (cm) cm.refresh(); },
        focus() { if (cm) cm.focus(); else textarea.focus(); },
        usesHighlighting: Boolean(cm)
      };
    }
  };
})();
