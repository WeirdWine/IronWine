
document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("wineX JS imported successfully!");
  },
  false

);

/*
mapboxgl.accessToken = 'pk.eyJ1IjoidGljaHUwMCIsImEiOiJja2w4YnB6MXYwcGZzMnJyMnJkM3lpOXI1In0.o3phVJgL6V3TtAa7JiGkBw';
var geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
bbox: [13.274049, 52.452221, 13.522614, 52.565059],
  proximity: {
    longitude: 13.404954,
    latitude: 52.520008
  }
});
*/

geocoder.addTo('#geocoder');


