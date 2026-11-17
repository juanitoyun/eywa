/* EYWA / universal collapsible SVG and Graphviz panel.
   Does not execute Python or add tests. Open/close is ALWAYS a user action. */
(function(){
  "use strict";
  let graphvizPromise = null;
  function loadGraphviz(){
    if(!graphvizPromise){
      graphvizPromise = import("https://cdn.jsdelivr.net/npm/@hpcc-js/wasm-graphviz@1.30.0/dist/index.js")
        .then(module=>module.Graphviz.load())
        .catch(error=>{graphvizPromise=null;throw error;});
    }
    return graphvizPromise;
  }
  function mount(details){
    if(!details)throw new Error("Falta el contenedor de visualización.");
    const canvas=details.querySelector(".eywa-visual-canvas");
    const ready=details.querySelector(".eywa-visual-ready");
    if(!canvas||!ready)throw new Error("La plantilla SVG está incompleta.");
    let pictureURL=null;
    function clear(collapse=true){
      if(pictureURL){URL.revokeObjectURL(pictureURL);pictureURL=null;}
      canvas.replaceChildren();
      ready.textContent="";
      if(collapse)details.open=false;
    }
    function setSvg(svg){
      if(typeof svg!=="string"||!/<svg(?:\s|>)/i.test(svg))throw new Error("Se esperaba SVG válido.");
      if(pictureURL)URL.revokeObjectURL(pictureURL);
      pictureURL=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml"}));
      const img=new Image();
      img.alt="Visualización generada por el código Python";
      img.src=pictureURL;
      canvas.replaceChildren(img);
      ready.textContent="Imagen disponible";
      // Intencional: NO se establece details.open = true.
    }
    async function setDot(dot,engine="dot"){
      if(typeof dot!=="string"||!dot.trim())throw new Error("DOT vacío.");
      const graphviz=await loadGraphviz();
      const svg=await graphviz.layout(dot,"svg",engine);
      setSvg(svg);
      return svg;
    }
    clear();
    return {details,clear,setSvg,setDot,hasImage:()=>Boolean(pictureURL)};
  }
  window.EYWA_VISUAL_PANEL={mount,loadGraphviz};
})();
