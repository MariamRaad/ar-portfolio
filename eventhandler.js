/* To add interactivity to the site with Javascript */

let isVideoPlaying = false;

/* Videohandler Function: to let the video play when the arSession is ready */
AFRAME.registerComponent("videohandler", {
	init: function() {
		// the clicks may fire prematurely for some reason
		this.el.sceneEl.addEventListener("arSessionReady", this.addListeners.call(this));
	},
	addListeners: function() {
		this.video_src_1 = document.querySelector("#asset_vid_1");
		this.button_play_1 = document.querySelector("#button_play_1");
		this.video_src_2 = document.querySelector("#asset_vid_2");
		this.button_play_2 = document.querySelector("#button_play_2");
		this.video_src_3 = document.querySelector("#asset_vid_3");
		this.button_play_3 = document.querySelector("#button_play_3");
		
	    	const marker = document.querySelector("#marker");
		this.video_plane_1 = document.querySelector("#video_1");
		this.video_plane_2 = document.querySelector("#video_2");
		this.video_plane_3 = document.querySelector("#video_3");
		
		this.audio = document.querySelector("#asset_audio_click");
			
		marker.addEventListener("markerFound", function () {
			this.video_src_1.pause(); //needs to be set or otherwise the video will start automatically
			this.video_src_2.pause(); //needs to be set or otherwise the video will start automatically
			this.video_src_3.pause(); //needs to be set or otherwise the video will start automatically
			isVideoPlaying = false;
			
			//wenn gewünschte Szene vorliegt und das Video vom User bereits abgespielt wurde und das Video zwischenzeitlich pausiert hat (weil Marker verloren)
       			//when specific scene is shown and video was already startet from the user (so the play button should be hidden) and the video paused in between (e.g. marker was lost)
			if ( ((this.video_plane_1.getAttribute("visible") == true) && (this.button_play_1.getAttribute("visible") == false)) && (isVideoPlaying == false) ) {
				this.video_src_1.play();
			 	isVideoPlaying = true;
			} else if ( ((this.video_plane_2.getAttribute("visible") == true) && (this.button_play_2.getAttribute("visible") == false)) && (isVideoPlaying == false) ) {
				this.video_src_2.play();
			 	isVideoPlaying = true;
			} else if ( ((this.video_plane_3.getAttribute("visible") == true) && (this.button_play_3.getAttribute("visible") == false)) && (isVideoPlaying == false) ) {
				this.video_src_3.play();
			 	isVideoPlaying = true;
			}
    		}.bind(this));
    
   		 marker.addEventListener("markerLost", function () {
			 if (this.video_plane_1.getAttribute("visible") == true && isVideoPlaying) {
				this.video_src_1.pause();
			 	isVideoPlaying = false;
			 } else if (this.video_plane_2.getAttribute("visible") == true && isVideoPlaying) {
				this.video_src_2.pause();
			 	isVideoPlaying = false;
			 } else if (this.video_plane_3.getAttribute("visible") == true && isVideoPlaying) {
				this.video_src_3.pause();
			 	isVideoPlaying = false;
			 }
    		}.bind(this));
			
		this.el.addEventListener("click", e => {
			if (this.el === this.button_play_1) {
				this.button_play_1.setAttribute("visible", false);
				this.audio.play();					
				this.video_src_1.play();
				isVideoPlaying = true;
				
			} else if (this.el === this.button_play_2) {
				this.button_play_2.setAttribute("visible", false);
				this.audio.play();
				this.video_src_2.play();
				isVideoPlaying = true;
				
			} else if (this.el === this.button_play_3) {
				this.button_play_3.setAttribute("visible", false);
				this.audio.play();
				this.video_src_3.play();
				isVideoPlaying = true;
			}
			
			
		})
	}
})

/* Forwardhandler Function: to arrange new objects in the scene */
AFRAME.registerComponent("forwardhandler", {
	init: function() {
		// the clicks may fire prematurely for some reason
		this.el.sceneEl.addEventListener("arSessionReady", this.addListeners.call(this));
	},
	addListeners: function() {
		/* Transition from scene 0(Onboarding) to scene 1(SafeNetKids) */
		this.description_0 = document.querySelector("#description_0");
		this.button_forward_0 = document.querySelector("#button_forward_0");
		
		/* Transition from scene 1(SafeNetKids) to scene 2(Zauberwald) */
		this.button_play_1 = document.querySelector("#button_play_1");
		this.video_src_1 = document.querySelector("#asset_vid_1");
		this.video_plane_1 = document.querySelector("#video_1");
		this.description_1 = document.querySelector("#description_1");
		this.button_forward_1 = document.querySelector("#button_forward_1");
		this.button_backward_1 = document.querySelector("#button_backward_1");
		
		this.button_play_2 = document.querySelector("#button_play_2");
		this.video_plane_2 = document.querySelector("#video_2");
		this.description_2 = document.querySelector("#description_2");
		this.button_forward_2 = document.querySelector("#button_forward_2");
		this.button_backward_2 = document.querySelector("#button_backward_2");
		
		
		/* Transition from scene 2(Zauberwald) to scene 3(FlyingEagle) */
		this.button_play_2 = document.querySelector("#button_play_2");
		this.video_src_2 = document.querySelector("#asset_vid_2");
		this.video_plane_2 = document.querySelector("#video_2");
		this.description_2 = document.querySelector("#description_2");
		this.button_forward_2 = document.querySelector("#button_forward_2");
		this.button_backward_2 = document.querySelector("#button_backward_2");
		
		this.button_play_3 = document.querySelector("#button_play_3");
		this.video_plane_3 = document.querySelector("#video_3");
		this.description_3 = document.querySelector("#description_3");
		this.button_forward_3 = document.querySelector("#button_forward_3");
		this.button_backward_3 = document.querySelector("#button_backward_3");
		
		
		/* Transition from scene 3(FlyingEagle) to scene 4(Offboarding/Weblinks) */
		this.button_play_3 = document.querySelector("#button_play_3");
		this.video_src_3 = document.querySelector("#asset_vid_3");
		this.video_plane_3 = document.querySelector("#video_3");
		this.description_3 = document.querySelector("#description_3");
		this.button_forward_3 = document.querySelector("#button_forward_3");
		this.button_backward_3 = document.querySelector("#button_backward_3");
		
		this.description_4 = document.querySelector("#description_4");
		this.button_linkedin = document.querySelector("#button_linkedin");
		this.button_xing = document.querySelector("#button_xing");
		this.button_website = document.querySelector("#button_website");
		this.button_backward_4 = document.querySelector("#button_backward_4");
		
		this.audio = document.querySelector("#asset_audio_click");
	
		this.el.addEventListener("click", e => {
			if (this.el === this.button_forward_0) {
				this.audio.play();
				
				this.description_0.setAttribute("visible", false);
				this.button_forward_0.setAttribute("visible", false);
				
				this.button_play_1.setAttribute("visible", true);
				this.video_plane_1.setAttribute("visible", true);
				this.description_1.setAttribute("visible", true);
				this.button_forward_1.setAttribute("visible", true);
				this.button_backward_1.setAttribute("visible", true);
				
			} else if (this.el === this.button_forward_1) {
				this.video_src_1.pause();
				this.video_src_1.currentTime = 0;
				isVideoPlaying = false;
				this.audio.play();
				
				this.button_play_1.setAttribute("visible", false);
				this.video_plane_1.setAttribute("visible", false);
				this.description_1.setAttribute("visible", false);
				this.button_forward_1.setAttribute("visible", false);
				this.button_backward_1.setAttribute("visible", false);
			
				this.button_play_2.setAttribute("visible", true);
				this.video_plane_2.setAttribute("visible", true);
				this.description_2.setAttribute("visible", true);
				this.button_forward_2.setAttribute("visible", true);
				this.button_backward_2.setAttribute("visible", true);
				
			} else if (this.el === this.button_forward_2) {
				this.video_src_2.pause();
				this.video_src_2.currentTime = 0;
				isVideoPlaying = false;
				this.audio.play();
				
				this.button_play_2.setAttribute("visible", false);
				this.video_plane_2.setAttribute("visible", false);
				this.description_2.setAttribute("visible", false);
				this.button_forward_2.setAttribute("visible", false);
				this.button_backward_2.setAttribute("visible", false);
			
				this.button_play_3.setAttribute("visible", true);
				this.video_plane_3.setAttribute("visible", true);
				this.description_3.setAttribute("visible", true);
				this.button_forward_3.setAttribute("visible", true);
				this.button_backward_3.setAttribute("visible", true);
				
			} else if (this.el === this.button_forward_3) {
				this.video_src_3.pause();
				this.video_src_3.currentTime = 0;
				isVideoPlaying = false;
				this.audio.play();
				
				this.button_play_3.setAttribute("visible", false);
				this.video_plane_3.setAttribute("visible", false);
				this.description_3.setAttribute("visible", false);
				this.button_forward_3.setAttribute("visible", false);
				this.button_backward_3.setAttribute("visible", false);
			
				this.description_4.setAttribute("visible", true);
				this.button_linkedin.setAttribute("visible", true);
				this.button_xing.setAttribute("visible", true);
				this.button_website.setAttribute("visible", true);
				this.button_backward_4.setAttribute("visible", true);
			}
		})
	}
})

/* Backwardhandler Function: to arrange new objects in the scene */
AFRAME.registerComponent("backwardhandler", {
	init: function() {
		// the clicks may fire prematurely for some reason
		this.el.sceneEl.addEventListener("arSessionReady", this.addListeners.call(this));
	},
	addListeners: function() {
		/* Transition from scene 1(SafeNetKids) to scene 0(Onboarding)  */
		this.button_play_1 = document.querySelector("#button_play_1");
		this.video_plane_1 = document.querySelector("#video_1");
		this.description_1 = document.querySelector("#description_1");
		this.button_forward_1 = document.querySelector("#button_forward_1");
		this.button_backward_1 = document.querySelector("#button_backward_1");
		
		this.description_0 = document.querySelector("#description_0");
		this.button_forward_0 = document.querySelector("#button_forward_0");
		
		/* Transition from scene 2(Zauberwald) to scene 1(SafeNetKids)  */
		this.button_play_2 = document.querySelector("#button_play_2");
		this.video_src_2 = document.querySelector("#asset_vid_2");
		this.video_plane_2 = document.querySelector("#video_2");
		this.description_2 = document.querySelector("#description_2");
		this.button_forward_2 = document.querySelector("#button_forward_2");
		this.button_backward_2 = document.querySelector("#button_backward_2");
		
		this.button_play_1 = document.querySelector("#button_play_1");
		this.video_plane_1 = document.querySelector("#video_1");
		this.description_1 = document.querySelector("#description_1");
		this.button_forward_1 = document.querySelector("#button_forward_1");
		this.button_backward_1 = document.querySelector("#button_backward_1");
		
	
		/* Transition from scene 3(FlyingEagle) to scene 2(Zauberwald)  */
		this.button_play_3 = document.querySelector("#button_play_3");
		this.video_src_3 = document.querySelector("#asset_vid_3");
		this.video_plane_3 = document.querySelector("#video_3");
		this.description_3 = document.querySelector("#description_3");
		this.button_forward_3 = document.querySelector("#button_forward_3");
		this.button_backward_3 = document.querySelector("#button_backward_3");
		
		this.button_play_2 = document.querySelector("#button_play_2");
		this.video_plane_2 = document.querySelector("#video_2");
		this.description_2 = document.querySelector("#description_2");
		this.button_forward_2 = document.querySelector("#button_forward_2");
		this.button_backward_2 = document.querySelector("#button_backward_2");
		
		
		/* Transition from scene 4(Offboarding/Weblinks) to scene 3(FlyingEagle)  */
		this.description_4 = document.querySelector("#description_4");
		this.button_linkedin = document.querySelector("#button_linkedin");
		this.button_xing = document.querySelector("#button_xing");
		this.button_website = document.querySelector("#button_website");
		this.button_backward_4 = document.querySelector("#button_backward_4");
		
		this.button_play_3 = document.querySelector("#button_play_3");
		this.video_plane_3 = document.querySelector("#video_3");
		this.description_3 = document.querySelector("#description_3");
		this.button_forward_3 = document.querySelector("#button_forward_3");
		this.button_backward_3 = document.querySelector("#button_backward_3");
		
		this.audio = document.querySelector("#asset_audio_click");
	
		this.el.addEventListener("click", e => {
			if (this.el === this.button_backward_1) {
				this.audio.play();
				
				this.button_play_1.setAttribute("visible", false);
				this.video_plane_1.setAttribute("visible", false);
				this.description_1.setAttribute("visible", false);
				this.button_forward_1.setAttribute("visible", false);
				this.button_backward_1.setAttribute("visible", false);
				
				this.description_0.setAttribute("visible", true);
				this.button_forward_0.setAttribute("visible", true);
				
				
			} else if (this.el === this.button_backward_2) {
				this.video_src_2.pause();
				this.video_src_2.currentTime = 0;
				isVideoPlaying = false;
				this.audio.play();
				
				this.button_play_2.setAttribute("visible", false);
				this.video_plane_2.setAttribute("visible", false);
				this.description_2.setAttribute("visible", false);
				this.button_forward_2.setAttribute("visible", false);
				this.button_backward_2.setAttribute("visible", false);
			
				this.button_play_1.setAttribute("visible", true);
				this.video_plane_1.setAttribute("visible", true);
				this.description_1.setAttribute("visible", true);
				this.button_forward_1.setAttribute("visible", true);
				this.button_backward_1.setAttribute("visible", true);
				
			} else if (this.el === this.button_backward_3) {
				this.video_src_3.pause();
				this.video_src_3.currentTime = 0;
				isVideoPlaying = false;
				this.audio.play();
				
				this.button_play_3.setAttribute("visible", false);
				this.video_plane_3.setAttribute("visible", false);
				this.description_3.setAttribute("visible", false);
				this.button_forward_3.setAttribute("visible", false);
				this.button_backward_3.setAttribute("visible", false);
			
				this.button_play_2.setAttribute("visible", true);
				this.video_plane_2.setAttribute("visible", true);
				this.description_2.setAttribute("visible", true);
				this.button_forward_2.setAttribute("visible", true);
				this.button_backward_2.setAttribute("visible", true);
				
			} else if (this.el === this.button_backward_4) {
				this.audio.play();
				
				this.description_4.setAttribute("visible", false);
				this.button_linkedin.setAttribute("visible", false);
				this.button_xing.setAttribute("visible", false);
				this.button_website.setAttribute("visible", false);
				this.button_backward_4.setAttribute("visible", false);
			
				this.button_play_3.setAttribute("visible", true);
				this.video_plane_3.setAttribute("visible", true);
				this.description_3.setAttribute("visible", true);
				this.button_forward_3.setAttribute("visible", true);
				this.button_backward_3.setAttribute("visible", true);
			}
		})
	}
})

/* Linkhandler Function: to arrange new objects in the scene */
AFRAME.registerComponent("linkhandler", {
	init: function() {
		// the clicks may fire prematurely for some reason
		this.el.sceneEl.addEventListener("arSessionReady", this.addListeners.call(this));
	},
	addListeners: function() {
		this.button_linkedin = document.querySelector("#button_linkedin");
		this.button_xing = document.querySelector("#button_xing");
		this.button_website = document.querySelector("#button_website");
		
		this.audio = document.querySelector("#asset_audio_click");
		
		this.el.addEventListener("click", e => {
			if (this.el === this.button_linkedin) {
				this.audio.play();
				window.open("https://www.linkedin.com/in/mariam-raad", "_blank", true);
			} else if (this.el === this.button_xing) {
				this.audio.play();
				window.open("https://www.xing.com/profile/Mariam_Raad/cv", "_blank", true);
			} else if (this.el === this.button_website) {
				this.audio.play();
				window.open("https://github.com/MariamRaad", "_blank", true);
			} 
		})
	}
})

/* Logohandler Function: to let the image of the logo show. Otherwise it would start to flicker or hide when the user clicks somewhere
   It still disappears sometimes on iOS (Vers. 13.5.1, Safari) */
AFRAME.registerComponent("logohandler", {
	init: function () {
    		const marker = document.querySelector("#marker");
    		const logo = document.querySelector("#logo");

    		marker.addEventListener('markerFound', function () {
       			logo.hidden = false;
    		}.bind(this));
    
    		marker.addEventListener('markerLost', function () {
       			logo.hidden = false;
    		}.bind(this));
  	}
});

/* Scannerhandler Function: to let the image of the scanner show or hide when marker is tracked or not tracked */
AFRAME.registerComponent("scannerhandler", {
	init: function () {
    		const marker = document.querySelector("#marker");
    		const scanner = document.querySelector("#scanner");

    		marker.addEventListener('markerFound', function () {
       			scanner.hidden = true;
    		}.bind(this));
    
    		marker.addEventListener('markerLost', function () {
       			scanner.hidden = false;
    		}.bind(this));
  	}
});

/* Ar-session-notifier Function: to set a flag when the arSession is ready 
   "ready"-state means: when other components can access the system, and use the ar.js core. */
AFRAME.registerComponent("ar-session-notifier", {
	init: function() {
		var scene = this.el.sceneEl
		var arSession = null
		// wait until the arSession is ready
		var idx = setInterval(function() {
			arSession = scene.systems["arjs"]._arSession
			if (!arSession) return; // It just checks when the _arSession is not undefined, or null - and emits a signal.
			scene.emit("arSessionReady")
			clearInterval(idx)
		})
	}
})

/* Cursor-hack Function: to adjust the jsartoolkit5 projection matrix and the threejs projection matrix and emitting click-events */
AFRAME.registerComponent("cursor-modifier", {
	init: function() {
		var scene = this.el

		// wait until the arSession is ready
		scene.addEventListener("arSessionReady", function() {
			var arSession = scene.systems["arjs"]._arSession
			// helpers
			var raycaster = new THREE.Raycaster();
			var mouse = new THREE.Vector2();
			// useful references
			var cursorElement = document.querySelector("[cursor]")
			var arToolkitContext = arSession.arContext
			var camera = scene.camera

			function mousedown(event) {
				// core of this 'hack' - using the arToolkitContext projection matrix
				// makes sure that jsartoolkit5 projection matrix is not out of sync with the threejs projection matrix
				camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
				camera.projectionMatrixInverse.getInverse(camera.projectionMatrix);

				var point
				if (event.type === "touchmove" || event.type === "touchstart") {
					// Track the first touch for simplicity.
					point = event.touches.item(0);
				} else {
					point = event;
				}
				// Calculate mouse position based on the canvas element
				var rect = scene.renderer.domElement.getBoundingClientRect();
				mouse.x = ((point.clientX - rect.left) / rect.width) * 2 - 1  
				mouse.y = -((point.clientY - rect.top) / rect.height) * 2 + 1 
				raycaster.setFromCamera(mouse, camera); 		     
				// if there are any intersections - send the clicks
				var intersects = raycaster.intersectObjects(scene.object3D.children, true);
				if (intersects.length > 0) {
					// this click is stripped of any info it should have
					intersects[0].object.el.emit("click")
				}
				event.stopPropagation();
			}
			window.addEventListener('mousedown', mousedown, false);
			//window.addEventListener('touchstart', mousedown, false);
		})
	}
})
