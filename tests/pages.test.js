const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM, VirtualConsole } = require('jsdom');
const Babel = require('@babel/standalone');
const { snapshot, mapboxStub } = require('./page-fixtures.cjs');
const root = path.join(__dirname,'..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');
async function page(name,state='fresh',map=true) {
  const errors=[];
  const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM(read(name),{runScripts:'outside-only',url:'https://local.test/'+name,virtualConsole:vc});
  const w=dom.window;
  w.SKIBUM_CONFIG={mapboxPublicToken:'test-public-token'};
  w.setInterval=()=>0;
  w.AbortSignal={timeout:()=>undefined};
  w.fetch=async()=>{if(state==='network-error')throw Error('offline');return{ok:true,json:async()=>snapshot(state)};};
  w.alert=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
  w.addEventListener('error',e=>errors.push(e.message));
  if(map)w.eval(mapboxStub);
  for(const file of ['assets/resorts.js','assets/forecast.js','assets/data-client.js'])w.eval(read(file));
  if(name==='map.html'){
    w.eval(fs.readFileSync(path.join(path.dirname(require.resolve('react/package.json')),'umd/react.production.min.js'),'utf8'));
    w.eval(fs.readFileSync(path.join(path.dirname(require.resolve('react-dom/package.json')),'umd/react-dom.production.min.js'),'utf8'));
  }
  for(const script of w.document.querySelectorAll('script:not([src])')){
    if(script.textContent.includes('emrld.ltd'))continue;
    w.eval(script.type==='text/babel'?Babel.transform(script.textContent,{presets:['react']}).code:script.textContent);
  }
  await new Promise(resolve=>setTimeout(resolve,100));
  assert.deepEqual(errors,[]);
  return dom;
}
for(const name of ['index.html','map.html','mammoth.html']){
 for(const state of ['fresh','stale','network-error']){
  test(`${name}: ${state} renders honest availability`,async()=>{
   const dom=await page(name,state);try{
    const d=dom.window.document;
    const status=[...d.querySelectorAll('[role="status"]')].map(el=>el.textContent).join(' ');
    if(state==='fresh')assert.equal(d.querySelector('[role="status"]').hidden,true);
    if(state==='stale')assert.match(status,/Forecasts? need[s]? an update/);
    if(state==='network-error')assert.match(status,/Forecast unavailable/);
    if(name==='mammoth.html')assert.equal(d.getElementById('snow-24hr').textContent,state==='fresh'?'0.0″':'Unavailable');
    else {
      assert.equal(d.querySelectorAll('.marker').length,103);
      assert.equal(d.querySelector('.marker').dataset.availability,state==='network-error'?'unavailable':state);
      if(name==='index.html'){
        d.getElementById('findResortsBtn').click();
        const result=d.getElementById('resultsList').textContent;
        if(state==='fresh')assert.match(result,/0\.0/);else assert.match(result,/No fresh forecasts/);
      }
    }
   }finally{dom.window.close();}
  });
 }
 test(`${name}: map library failure does not block forecasts`,async()=>{
   const dom=await page(name,'fresh',false);try{
     const d=dom.window.document;assert.equal(d.querySelector('[role="status"]').hidden,true);
     if(name==='mammoth.html')assert.equal(d.getElementById('snow-24hr').textContent,'0.0″');
     else assert.match(d.body.textContent,/Map unavailable/);
   }finally{dom.window.close();}
 });
}
test('standalone map detail uses unavailable, not a zero fallback',async()=>{
 const dom=await page('map.html','network-error');try{
  dom.window.document.querySelector('.marker').click();await new Promise(r=>setTimeout(r,10));
  assert.match(dom.window.document.querySelector('.resort-detail-container').textContent,/Unavailable/);
 }finally{dom.window.close();}
});
