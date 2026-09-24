const catalog = require('../data/resorts.json').resorts;
const HOUR = 3600000;
function snapshot(state = 'fresh') {
  const start = Math.floor(Date.now() / HOUR) * HOUR - (state === 'stale' ? 24 * HOUR : 0);
  return { schema_version: 2, resorts: catalog.map(r => ({
    resort_id: r.id, name: r.name, lat:r.lat,lng:r.lng,status:state,units:'in',data_source:'Open-Meteo',
    window_start:new Date(start).toISOString(),last_updated:new Date(start).toISOString(),
    window_ends: Object.fromEntries(['snowfall_24hr','snowfall_48hr','snowfall_7day'].map((k,i)=>[k,new Date(start+[24,48,168][i]*HOUR).toISOString()])),
    snowfall_24hr:0,snowfall_48hr:0,snowfall_7day:0
  })) };
}
// Deterministic Mapbox facade: actual DOM markers and source data, no network/GPU.
const mapboxStub = `
window.__maps = [];
window.mapboxgl = {
 Map: class {
  constructor(options) {this.container=typeof options.container==='string'?document.getElementById(options.container):options.container;this.sources={};window.__maps.push(this);}
  on(event,fn){if(event==='load')setTimeout(fn,0);return this;}
  addSource(id,value){this.sources[id]={data:value.data,setData(data){this.data=data;}};}
  getSource(id){return this.sources[id];}
  flyTo(options){this.lastFlight=options;return this;}
  addLayer(){} getZoom(){return 7;} remove(){}
 },
 Marker: class {constructor(el){this.el=el;}setLngLat(){return this;}setPopup(p){this.popup=p;return this;}addTo(map){map.container.append(this.el);return this;}togglePopup(){return this;}},
 Popup: class {setHTML(html){this.html=html;return this;}}
};`;
module.exports = { snapshot, mapboxStub };
