
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

  el.style.backgroundColor = '#D19F9F';
} else if(el.getAttribute("data-colour") === 'white') {
  el.style.backgroundColor ='#F3F7FE'
}
})

console.log(dataCatcher);


/* Mouse effect landing */

$(document).on("mousemove",function(ev){

  var mouseX = ev.originalEvent.pageX;
  var mouseY = ev.originalEvent.pageY;
  
    $("img").each(function(){
      var imgX = $(this).position().left + 0;
      var imgY =  $(this).position().top + 90;
  
      var diffX = mouseX - imgX;
      var diffY = mouseY - imgY;
  
      var radians = Math.atan2(diffY,diffX);
  
      var angle = radians * 360 / Math.PI
  
      $(this).css("transform","rotate("+ angle + "deg)")
  
    })
  
  });