/* Offline integration checks for EYWA's official-code browser editor. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source=fs.readFileSync(path.join(__dirname,"../assets/eywa-repo-save.js"),"utf8");
assert(!source.includes("localStorage"),"No se almacena la contraseña");
assert(!source.includes("sessionStorage"),"No se almacena la contraseña");
assert(source.includes("juanitoyun.github.io") === false, "No auth via public origin text");

function setup(getResponse) {
 const elements=[];
 const calls=[];
 let currentCode="print('stale')";
 let currentOfficial=null, modalCount=0, dialog=null;
 const actions={
  elements:[],
  appendChild(el){this.elements.push(el);},
  after(el){this.status=el;}
 };
 const document={
  body:{appendChild(el){dialog=el;modalCount++;}},
  createElement(name){
   const el={tag:name,textContent:"",className:"",disabled:false,title:"",open:false,children:[],
     classList:{toggle(){}},setAttribute(){},
     appendChild(child){this.children.push(child);},
     append(...children){this.children.push(...children);},
     focus(){},remove(){},showModal(){this.open=true;},
     close(){this.open=false;},
     addEventListener(event,cb){this[event]=cb;}};
   elements.push(el);
   return el;
  }
 };
 const window={confirm(){return true;}};
 async function submitPassword(save,secret="private-example-password"){
   const pending=save.click();
   assert(dialog && dialog.tag==="dialog","Debe pedir una contraseña en un diálogo");
   const form=dialog.children[0];
   const input=form.children[1].children[0];
   assert.equal(input.type,"password","La contraseña debe permanecer oculta");
   input.value=secret;
   form.submit({preventDefault(){}});
   await pending;
   assert.equal(input.value,"","La contraseña debe borrarse tras el guardado");
 }
 const fetch=async (url,opts={})=>{
   const res=await getResponse(String(url),opts);
   calls.push({url:String(url),opts, response:res});
   return {ok:res.status>=200 && res.status<300,status:res.status,
     json:async()=>res.body};
 };
 const context={window,document,fetch,URL,console};
 vm.runInNewContext(source,context,{filename:"eywa-repo-save.js"});
 const app=window.EYWA_REPO_SAVE.configure({
  kind:"intro",id:"7",actions,
  getCode:()=>currentCode,
  setCode:code=>{currentCode=code},
  onOfficial:code=>{currentOfficial=code}
 });
 return {app,window,actions,calls,getCode:()=>currentCode,setCode:code=>{currentCode=code},
   getOfficial:()=>currentOfficial,getModalCount:()=>modalCount,submitPassword};
}
const tick=()=>new Promise(resolve=>setImmediate(resolve));
const oldSha="a".repeat(40),newSha="b".repeat(40);
const ok=async (url,opts)=>{
 if(url.includes("/source?")){
  return {status:200,body:{code:"print('repo original')",sha:oldSha}};
 }
 if(url.includes("/save")){
  assert.equal(opts.method,"POST");
  assert.equal(opts.headers["X-EYWA-Password"],"private-example-password");
  assert(!opts.body.includes("private-example-password"));
  assert.equal(JSON.parse(opts.body).sha,oldSha);
  assert.equal(JSON.parse(opts.body).kind,"intro");
  assert.equal(JSON.parse(opts.body).id,"7");
  return {status:200,body:{ok:true,changed:true,sha:newSha,commit:"c".repeat(40)}};
 }
 throw new Error(url);
};
(async()=>{
 const x=setup(ok);
 assert.equal(x.actions.elements.length,3);
 const [save,sync,history]=x.actions.elements;
 assert.equal(save.disabled,true,"No publicar antes de verificar GitHub");
 assert(history.href.endsWith("/commits/main/assets/intro-snippets.js"));
 await tick();await tick();
 assert.equal(x.getCode(),"print('repo original')");
 assert.equal(x.getOfficial(),"print('repo original')");
 assert.equal(save.disabled,false);
 assert.equal(x.calls.length,1);
 assert.equal(x.getModalCount(),0);
 x.setCode("print('my change')");
 await x.submitPassword(save);
 assert.equal(x.calls.length,2);
 assert.equal(x.getModalCount(),1);
 assert.equal(x.app.getSha(),newSha);
 assert.equal(x.getOfficial(),"print('my change')");
 assert.equal(x.actions.status.textContent.includes("Guardado"),true);
 await save.click();
 assert.equal(x.getModalCount(),1,"No solicita contraseña cuando no hubo cambios");
 x.setCode("draft");
 x.app.restore();
 assert.equal(x.getCode(),"print('my change')");

 // Do not destroy fast user input while source fetch is pending.
 const y=setup(ok);
 y.setCode("work in progress");
 await tick();await tick();
 assert.equal(y.getCode(),"work in progress");
 assert.equal(y.getOfficial(),"print('repo original')");

 // Permission failure and concurrent edit keep the user's draft.
 const bad=setup(async (url,options)=>url.includes("/source?")
   ? {status:200,body:{code:"official",sha:oldSha}}
   : {status:401,body:{error:"Contraseña incorrecta."}});
 await tick();await tick();
 bad.setCode("unsaved draft");
 await bad.submitPassword(bad.actions.elements[0]);
 assert.equal(bad.getCode(),"unsaved draft");
 assert.equal(bad.getOfficial(),"official");
 assert(bad.actions.status.textContent.includes("No se guardó"));

 const conflict=setup(async (url,options)=>url.includes("/source?")
   ? {status:200,body:{code:"official",sha:oldSha}}
   : {status:409,body:{error:"Conflicto al guardar."}});
 await tick();await tick();
 conflict.setCode("my draft");
 await conflict.submitPassword(conflict.actions.elements[0]);
 assert.equal(conflict.getCode(),"my draft");
 assert.equal(conflict.app.getSha(),oldSha);
 assert(conflict.actions.status.textContent.includes("Conflicto"));

 // Read failure means the save button is unusable.
 const offline=setup(async()=>({status:502,body:{error:"GitHub offline"}}));
 await tick();await tick();
 assert.equal(offline.actions.elements[0].disabled,true);
 assert.equal(offline.getCode(),"print('stale')");

 console.log("PASS EYWA GitHub Save: read-only start, password, original restore, history, no auto overwrite, conflict, offline");
})().catch(error=>{console.error(error);process.exitCode=1;});