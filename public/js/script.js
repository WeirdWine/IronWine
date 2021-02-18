
const targetDiv = document.querySelectorAll('.allWinesSelectWine > .allWineInfo');
const arrayfiedTargets = Array.from(targetDiv);

console.log(arrayfiedTargets);

document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("wineX JS imported successfully!");
  },
  false

);

const dataCatcher = arrayfiedTargets.forEach((el) => {
  if(el.getAttribute("data-colour") === 'red'){

  el.style.backgroundColor = '#ff6a5b';
} else if(el.getAttribute("data-colour") === 'white') {
  el.style.backgroundColor ='#45e9a6';
} else if(el.getAttribute("data-colour") === 'orange'){
  el.style.backgroundColor = "#ffe955"
} else if(el.getAttribute("data-colour") === 'rose') {
  el.style.backgroundColor = "#114BF2"
} else {
  el.style.backgroundColor ='#F3F7FE';
}
})

console.log(dataCatcher);

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWFkYW14IiwiYSI6ImNrbGI1M3Y5djBiN3MydW8xbTd3MHppdjAifQ.DbSeEgXsZugtVDeSYGSNOg';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/adamadamx/cklb5e7xz2jvk17nsiv4hhw5p', // style URL
center: [ 13.388860,  52.517036], // starting position [lng, lat]
zoom: 12 // starting zoom
});