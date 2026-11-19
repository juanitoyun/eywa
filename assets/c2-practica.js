/* EYWA · C2 practice. Public cases, client-side Python, and reference-only visual traces. */
(async function () {
  "use strict";
  const $=id=>document.getElementById(id);
  let bank, current=null, editor=null, pyPromise=null, running=false;
  let demoFrames=[], demoIndex=0;
  const safeGet=key=>{try{return localStorage.getItem(key)}catch(_){return null}};
  const safeSet=(key,value)=>{try{localStorage.setItem(key,value)}catch(_){}};
  const safeRemove=key=>{try{localStorage.removeItem(key)}catch(_){}};
  const draftKey=id=>"eywa:c2:draft:"+id;
  const doneKey=id=>"eywa:c2:passed:"+id;
  const get=()=>editor?editor.getValue():$("editor").value;
  const set=value=>{if(editor)editor.setValue(value);else $("editor").value=value};
  function status(message){$("state").textContent=message}
  function saveDraft(){if(current&&editor)safeSet(draftKey(current.id),get())}
  function progress(){
    const total=bank.exercises.length;
    const done=bank.exercises.filter(e=>safeGet(doneKey(e.id))==="1").length;
    $("progress-bar").style.width=(done/total*100)+"%";
    $("progress-bar").title=done+" de "+total+" problemas con casos aprobados";
    $("counter").textContent=done+"/"+total+" resueltos";
    [...$("task").options].forEach((opt,i)=>{const e=bank.exercises[i];opt.textContent=(safeGet(doneKey(e.id))==="1"?"✓ ":"")+(i+1)+". "+e.title});
  }
  function makeCases(e){
    return e.cases.map(([label,code],i)=>"# Caso "+(i+1)+": "+label+"\n"+code).join("\n\n");
  }
  function loadTask(id){
    const e=bank.exercises.find(e=>e.id===id)||bank.exercises[0];
    if(current&&current.id===e.id)return;
    saveDraft();current=e;
    const idx=bank.exercises.indexOf(e);
    $("task").selectedIndex=idx;
    $("prev").disabled=idx===0;
    $("next").disabled=idx===bank.exercises.length-1;
    $("title").textContent=e.title;
    $("focus").textContent=e.focus;
    $("prompt").textContent=e.prompt;
    $("signature").textContent=e.signature;
    $("complexity").textContent="Costo objetivo · "+e.complexity;
    $("meta").replaceChildren();
    for(const item of [e.area,e.level,e.minutes+" min",e.year]){
      const tag=document.createElement("span");tag.textContent=item;$("meta").append(tag);
    }
    $("source").textContent=e.source;
    $("hint").textContent=e.hint;
    $("tests").textContent=makeCases(e);
    set(safeGet(draftKey(e.id))??e.starter);
    $("output").textContent="Pulsa «Ejecutar casos» para validar tu solución. Todos los casos son públicos.";
    $("quiz-question").textContent=e.quiz.question;
    $("quiz-feedback").textContent="";
    $("quiz-options").replaceChildren();
    e.quiz.options.forEach((choice,i)=>{
      const label=document.createElement("label");label.className="quiz-option";
      const input=document.createElement("input");
      input.type="radio";input.name="quiz";input.value=i;
      label.append(input,document.createTextNode(choice));
      $("quiz-options").append(label);
    });
    renderDemo(e);
    const params=new URLSearchParams(location.search);params.set("task",e.id);
    history.replaceState(null,"",location.pathname+"?"+params.toString());
    document.title=e.title+" · EYWA C2";
    status(safeGet(draftKey(e.id))!==null?"Borrador local restaurado":"Editor listo");
    progress();
    editor?.refresh();
  }
  function heapFrames(){
    const original=[95,82,75,70,80,64,56,45,60,72,40,30,27,50,36,20,31,44,50,26];
    const a=original.slice();let i=9;a[i]=85;
    const states=[{type:"cells",cells:a.slice(),current:i,other:-1,note:"Aumentamos 72 a 85 en el casillero 10 (índice Python 9)."}];
    while(i>0){
      const parent=Math.floor((i-1)/2);
      if(a[i]<=a[parent]){states.push({type:"cells",cells:a.slice(),current:i,other:parent,note:"El padre es mayor o igual: el heap vuelve a ser válido."});break}
      [a[i],a[parent]]=[a[parent],a[i]];
      i=parent;
      states.push({type:"cells",cells:a.slice(),current:i,other:-1,note:"Intercambio con el padre; continúa ascendiendo la nueva clave."});
    }
    if(states.length===1||i===0)states.push({type:"cells",cells:a.slice(),current:i,other:-1,note:"Heap restaurado: cada padre es mayor o igual que sus hijos."});
    return states;
  }
  function radixFrames(){
    let words=['cena','hilo','beta','vals','dedo','loro','ruca','yema','cruz','juez','cuba','polo'];
    const frames=[{type:"lines",title:"Entrada original",lines:words.slice(),note:"Clasificaremos desde la última columna hasta la primera (LSD)."}];
    for(let col=3;col>=0;col--){
      const buckets=Array.from({length:26},()=>[]);
      for(const word of words)buckets[word.charCodeAt(col)-97].push(word);
      words=buckets.flat();
      frames.push({type:"lines",title:"Columna "+(col+1)+" de 4",lines:words.slice(),note:"Agrupación estable por la letra de la columna "+(col+1)+"; se conserva el orden previo dentro de cada bucket."});
    }
    return frames;
  }
  function bipartiteFrames(){
    return [
      {type:"graph",colors:{A:0},note:"Coloreamos A con el grupo 0 y comenzamos el BFS."},
      {type:"graph",colors:{A:0,B:1,C:1},note:"Los dos vecinos de A quedan en el grupo 1."},
      {type:"graph",colors:{A:0,B:1,C:1},conflict:true,note:"Existe la arista B—C y ambos extremos tienen color 1. El triángulo NO es bipartito."}
    ];
  }
  function hashFrames(){
    const a=[null,21,42,12,51,23,14,null,48,null];
    const b=[null,21,42,null,51,23,14,null,48,null];
    const c=[null,21,42,51,23,14,null,null,48,null];
    return [
      {type:"cells",cells:a,current:3,other:-1,note:"Se elimina la llave 12 del índice 3. Un hueco directo cortaría la búsqueda."},
      {type:"cells",cells:b,current:3,other:-1,note:"Hay un hueco temporal en el medio del bloque de colisiones."},
      {type:"cells",cells:c,current:3,other:6,note:"Se desplazan 51, 23 y 14 hacia la izquierda. El hueco termina en el índice 6."}
    ];
  }
  function renderDemo(e){
    const generators={heap:heapFrames,radix:radixFrames,bipartito:bipartiteFrames,hash:hashFrames};
    demoFrames=generators[e.demo]?.()||[];
    demoIndex=0;
    $("demo-actions").hidden=demoFrames.length<=1;
    if(!demoFrames.length){$("demo").textContent="Este ejercicio se comprueba mediante Python y casos de prueba visibles.";return}
    showDemo();
  }
  function showDemo(){
    const f=demoFrames[demoIndex];
    $("demo").replaceChildren();
    const p=document.createElement("p");p.className="small";p.textContent=f.note;$("demo").append(p);
    if(f.type==="cells"){
      const cells=document.createElement("div");cells.className="demo-cells";
      f.cells.forEach((v,i)=>{
        const box=document.createElement("div");
        box.className="demo-cell"+(i===f.current?" current":"")+(i===f.other?" other":"");
        const idx=document.createElement("small");idx.textContent=i+1;
        box.append(idx,document.createTextNode(v===null?"·":String(v)));
        cells.append(box);
      });$("demo").append(cells);
    }else if(f.type==="lines"){
      const t=document.createElement("div");t.className="demo-text";
      t.textContent=f.title+"\n"+f.lines.join(" · ");
      $("demo").append(t);
    }else if(f.type==="graph"){
      const NS="http://www.w3.org/2000/svg";
      const svg=document.createElementNS(NS,"svg");
      svg.setAttribute("viewBox","0 0 340 150");svg.setAttribute("class","demo-svg");
      const nodes={A:[85,80],B:[245,35],C:[245,125]};
      for(const [u,v] of [["A","B"],["A","C"],["B","C"]]){
        const line=document.createElementNS(NS,"line");
        line.setAttribute("x1",nodes[u][0]);line.setAttribute("y1",nodes[u][1]);line.setAttribute("x2",nodes[v][0]);line.setAttribute("y2",nodes[v][1]);
        line.setAttribute("stroke",f.conflict&&u==="B"?"#ff8b75":"#668eaa");line.setAttribute("stroke-width",f.conflict&&u==="B"?"4":"2");svg.append(line);
      }
      for(const [id,xy] of Object.entries(nodes)){
        const circle=document.createElementNS(NS,"circle");
        circle.setAttribute("cx",xy[0]);circle.setAttribute("cy",xy[1]);circle.setAttribute("r","23");
        circle.setAttribute("stroke","#9abfce");circle.setAttribute("stroke-width","1.5");
        circle.setAttribute("fill",f.colors[id]===0?"#007e79":f.colors[id]===1?"#8b5f36":"#203c50");svg.append(circle);
        const label=document.createElementNS(NS,"text");
        label.setAttribute("x",xy[0]);label.setAttribute("y",xy[1]+5);label.setAttribute("fill","#fff");
        label.setAttribute("text-anchor","middle");label.setAttribute("font-size","16");label.textContent=id;svg.append(label);
      }
      $("demo").append(svg);
    }
    $("demo-count").textContent=(demoIndex+1)+" / "+demoFrames.length;
    $("demo-prev").disabled=demoIndex===0;
    $("demo-next").disabled=demoIndex===demoFrames.length-1;
  }
  async function python(){
    if(!pyPromise){
      if(typeof loadPyodide!=="function")throw Error("No se pudo cargar Pyodide. Comprueba la conexión.");
      pyPromise=loadPyodide().catch(e=>{pyPromise=null;throw e});
    }
    return pyPromise;
  }
  async function run(){
    if(running||!current)return;
    running=true;$("run").disabled=true;
    saveDraft();status("Preparando Python…");
    $("output").textContent="Ejecutando…";
    const e=current;
    try{
      const py=await python();
      status("Probando…");
      const source=get()+"\n\n# --- Casos públicos de EYWA C2 ---\n"+
        e.cases.map(([label,code],i)=>"\n# "+(i+1)+": "+label+"\n"+code+"\nprint("+JSON.stringify("✓ Caso "+(i+1)+": "+label)+")").join("\n")+
        "\nprint("+JSON.stringify("APROBADO: "+e.cases.length+" casos correctos")+")";
      const output=await window.EYWA_RUN_PYTHON(py,source);
      $("output").textContent=output||"Sin salida.";
      if(output.includes("APROBADO: "+e.cases.length+" casos correctos")){
        safeSet(doneKey(e.id),"1");
        status("✓ Casos aprobados");progress();
      }else status("Revisar código o casos");
    }catch(err){$("output").textContent=String(err);status("Error de ejecución")}
    finally{running=false;$("run").disabled=false}
  }
  $("prev").addEventListener("click",()=>loadTask(bank.exercises[Math.max(0,bank.exercises.indexOf(current)-1)].id));
  $("next").addEventListener("click",()=>loadTask(bank.exercises[Math.min(bank.exercises.length-1,bank.exercises.indexOf(current)+1)].id));
  $("task").addEventListener("change",()=>loadTask(bank.exercises[$("task").selectedIndex].id));
  $("run").addEventListener("click",run);
  $("reset").addEventListener("click",()=>{
    if(!current||!confirm("¿Restablecer el código de este problema?"))return;
    set(current.starter);safeRemove(draftKey(current.id));safeRemove(doneKey(current.id));
    $("output").textContent="Editor restablecido.";progress();status("Restablecido");
  });
  $("copy").addEventListener("click",async()=>{
    try{await navigator.clipboard.writeText(get());status("Código copiado")}
    catch(_){status("No se pudo copiar automáticamente")}
  });
  $("demo-prev").addEventListener("click",()=>{demoIndex=Math.max(0,demoIndex-1);showDemo()});
  $("demo-next").addEventListener("click",()=>{demoIndex=Math.min(demoFrames.length-1,demoIndex+1);showDemo()});
  $("quiz-check").addEventListener("click",()=>{
    const selected=document.querySelector('input[name="quiz"]:checked');
    if(!selected){$("quiz-feedback").textContent="Selecciona una alternativa.";return}
    const ok=Number(selected.value)===current.quiz.answer;
    $("quiz-feedback").textContent=(ok?"✓ Correcto. ":"Aún no. ")+current.quiz.explanation;
  });
  window.addEventListener("beforeunload",saveDraft);
  setInterval(saveDraft,4000);
  try{
    const response=await fetch("../assets/c2-practica.json",{cache:"no-store"});
    if(!response.ok)throw Error("No se pudo obtener el banco de práctica C2.");
    bank=await response.json();
    if(!Array.isArray(bank.exercises)||bank.exercises.length===0)throw Error("Banco de ejercicios vacío.");
    $("task").replaceChildren();
    bank.exercises.forEach(e=>{const option=document.createElement("option");option.value=e.id;option.textContent=e.title;$("task").append(option)});
    editor=window.EYWA_EDITOR?.create($("editor"),{height:"345px",label:"Python C2",run})||null;
    loadTask(new URLSearchParams(location.search).get("task"));
  }catch(error){$("title").textContent="No se pudo iniciar";$("prompt").textContent=String(error);$("run").disabled=true;status("Error")}
})();
