const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const path=require('node:path');
const {snapshot,mapboxStub}=require('../page-fixtures.cjs');
function vendor(pkg,file){return fs.readFileSync(path.join(path.dirname(require.resolve(pkg+'/package.json')),file),'utf8');}
const react=vendor('react','umd/react.production.min.js');
const reactDOM=vendor('react-dom','umd/react-dom.production.min.js');
const babel=vendor('@babel/standalone','babel.min.js');
async function setup(page,state,mapAvailable=true){
 await page.route('**/*',async route=>{
  const url=route.request().url();
  if(url.endsWith('/assets/runtime-config.js'))return route.fulfill({contentType:'application/javascript',body:'window.SKIBUM_CONFIG={mapboxPublicToken:"test-public-token"};'});
  if(url.endsWith('/forecast-data.json'))return state==='network-error'?route.abort():route.fulfill({json:snapshot(state)});
  if(url.includes('mapbox-gl.js'))return route.fulfill({contentType:'application/javascript',body:mapAvailable?mapboxStub:''});
  if(url.includes('/react.production.min.js'))return route.fulfill({contentType:'application/javascript',body:react});
  if(url.includes('/react-dom.production.min.js'))return route.fulfill({contentType:'application/javascript',body:reactDOM});
  if(url.includes('/babel.min.js'))return route.fulfill({contentType:'application/javascript',body:babel});
  if(!url.startsWith('http://127.0.0.1:8000'))return route.fulfill({body:''});
  return route.continue();
 });
}
for(const width of [390,1440])for(const name of ['index.html','map.html','mammoth.html'])for(const state of ['fresh','stale','network-error']){
 test(`${name} ${state} ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:1000});await setup(page,state);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/'+name);
  const status=page.locator('[role="status"]').first();
  if(state==='fresh')await expect(status).toBeHidden();
  else await expect(status).toContainText(state==='stale'?(/Forecasts? need[s]? an update/):(/Forecast unavailable/));
  if(name==='mammoth.html')await expect(page.locator('#snow-24hr')).toHaveText(state==='fresh'?'0.0″':'Unavailable');
  if(name==='index.html'){
    await page.locator('#showRecommendations').click();await page.locator('#findResortsBtn').click();
    await expect(page.locator('#resultsList')).toContainText(state==='fresh'?'0.0':'No fresh forecasts');
    await expect(page.locator('.pass-chip').first()).toBeDisabled();
  }
  if(name!=='mammoth.html'){
    await expect(page.locator('.marker')).toHaveCount(103);
    await expect(page.locator('.marker').first()).toHaveAttribute('data-availability',state==='network-error'?'unavailable':state);
  }
  expect(errors).toEqual([]);
  if(name!=='map.html')expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 });
}
for(const name of ['index.html','map.html'])test(`${name} survives missing map library`,async({page})=>{
 await setup(page,'fresh',false);await page.goto('/'+name);
 await expect(page.locator('[role="status"]').first()).toBeHidden();
 await expect(page.getByText(/Map unavailable/).first()).toBeVisible();
});
