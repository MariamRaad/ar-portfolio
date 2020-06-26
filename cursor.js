/* To add interactivity to the site with Javascript */

/* Videohandler Function: to let the video play when the arSession is ready */
AFRAME.registerComponent("videohandler_1", {
	init: function() {
		// the clicks may fire prematurely for some reason ¯\_(ツ)_/¯
		// TODO: is there any disadvantage that it fires prematurely?
		this.el.sceneEl.addEventListener("arSessionReady", this.addListeners.call(this));
	},
	addListeners: function() {
		this.video_src_1 = document.querySelector("#asset_vid_1");
		this.btn = document.querySelector("#button_play_1"); //a-plane button
	
		this.el.addEventListener("click", e => {
			this.btn.setAttribute("visible", false);
			this.video_src_1.play();
		})
	}
})

/* Continue Function: to arrange new objects in the scene */
AFRAME.registerComponent("continuehandler_1", {
	init: function() {
		// the clicks may fire prematurely for some reason ¯\_(ツ)_/¯
		// TODO: is there any disadvantage that it fires prematurely?
		this.el.sceneEl.addEventListener("arSessionReady", this.addListeners.call(this));
	},
	addListeners: function() {
		this.button_play_1 = document.querySelector("#button_play_1");
		this.video_src_1 = document.querySelector("#asset_vid_1");
		this.video_1 = document.querySelector("#video_1");
		this.description_1 = document.querySelector("#description_1");
		this.button_continue_1 = document.querySelector("#button_continue_1");
		
		/*
		const button_play_2 = document.querySelector("#button_play_2");
		const video_2 = document.querySelector("#video_2");
		const description_2 = document.querySelector("#description_2");
		const button_continue_2 = document.querySelector("#button_continue_2");
		const button_back_1 = document.querySelector("#button_back_1");
		*/
	
		this.el.addEventListener("click", e => {
			this.video_src_1.pause();
			
			this.button_play_1.setAttribute("visible", false);
			this.video_1.setAttribute("visible", false);
			this.description_1.setAttribute("visible", false);
			this.button_continue_1.setAttribute("visible", false);
			
			/*
			button_play_2.setAttribute("visible", true);
			video_2.setAttribute("visible", true);
			description_2.setAttribute("visible", true);
			button_continue_2.setAttribute("visible", true);
			button_back_1.setAttribute("visible", true);
			*/
		})
	}
})

/* Logohandler Function: to let the image of the logo show. Otherwise it would start to flicker or hide when the user clicks somewhere*/
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

/* Cursor-hack Function: */
AFRAME.registerComponent("cursor-hack", {
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
					// TODO: why does it need to be tracked? to align the matrices?
					point = event.touches.item(0);
				} else {
					point = event;
				}
				// Calculate mouse position based on the canvas element
				var rect = scene.renderer.domElement.getBoundingClientRect(); // TODO: are that just the boundaries/borders of the canvas?
				mouse.x = ((point.clientX - rect.left) / rect.width) * 2 - 1  // TODO: what does this do?
				mouse.y = -((point.clientY - rect.top) / rect.height) * 2 + 1 // TODO: what does this do?
				raycaster.setFromCamera(mouse, camera); 		      // TODO: what does this do?
				// if there are any intersections - send the clicks
				var intersects = raycaster.intersectObjects(scene.object3D.children, true);
				if (intersects.length > 0) {
					// this click is stripped of any info it should have
					intersects[0].object.el.emit("click") // TODO: what other info would it have?
				}
				event.stopPropagation(); // TODO: why does it need to stop?
			}
			window.addEventListener('mousedown', mousedown, false);
			//window.addEventListener('touchstart', mousedown, false);
		})
	}
})
