/* To add interactivity to the site with Javascript */

AFRAME.registerComponent('videohandler', {
  init: function () {
	  //var marker = this.el;
    	  const new_marker = document.querySelector("#marker");
	  const scanner = document.querySelector("#scanner");
    	  const video = document.querySelector("#Video_Asset_0");
	  //var scanOverlay = document.querySelector("#scanner");
	  //var displayProperty = scanOverlay.style.display 
    	  //const on = document.getElementsByClassName("scannerImage").style.display = "block"; //document.getElementById("scanner")
	  //console.log(on);
    	  //const off = document.getElementsByClassName("scannerImage").style.display = "none";
	  //this.vid = document.querySelector("#Video_Asset_0");
	  
	  // Functions to set an Overlay
          function on() {
		  document.getElementsByClassName("scannerImage").style.visibility = "visible" ;
          }

          function off() {
            	  document.getElementsByClassName("scannerImage").style.visibility = "hidden";
          } 

    	  new_marker.addEventListener('markerFound', function () {
		  //scanner.off();
		  scanner.hidden = true;
	          video.play(); //this.vid.play();
    	  }.bind(this));
    
	  new_marker.addEventListener('markerLost', function () {
		  //scanner.on();
		  scanner.hidden = false;
		  video.pause(); //this.vid.pause();
		  // this.vid.currentTime = 0;
          }.bind(this));
  }
 });


AFRAME.registerComponent('navigate-on-click', {
  schema: {
    url: {
      default: 'https://www.google.com/'
    }
  },
  init: function () {
    console.log("hello")
    console.log(this.el)
    var data = this.data;
    var el = this.el;
    el.addEventListener('click', function () {
      //window.location.href = data.url;
      window.open(data.url, '_blank');
    });
  }
});

AFRAME.registerComponent('color-randomizer', {
  init: function () {
    let colors = ["red", "green", "blue", "black", "orange", "white"]
    var el = this.el;
    el.addEventListener('click', (e) => {     
      this.el.setAttribute('color', colors[Math.floor(Math.random() * colors.length)])
    });
  }
});

AFRAME.registerComponent('markerhandler', {
    init: function() {
        const animatedMarker = document.querySelector("#animated-marker");
        const aEntity = document.querySelector("#animated-model");

        // every click, we make our model grow in size :)
        animatedMarker.addEventListener('click', function(ev, target){
            const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
            if (aEntity && intersectedElement === aEntity) {
                const scale = aEntity.getAttribute('scale');
                Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
                aEntity.setAttribute('scale', scale);
            }
        });
}});
