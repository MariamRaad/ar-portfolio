/* To add interactivity to the site with Javascript */

/* Vcannerhandler Function: to let the video play when the arSession is ready */
AFRAME.registerComponent('videohandler_1', {
	init: function() {
		// the clicks may fire prematurely for some reason ¯\_(ツ)_/¯
		// TODO: is there any disadvantage that it fires prematurely?
		this.el.sceneEl.addEventListener("arSessionReady", this.addListeners.call(this));
	},
	addListeners: function() {
		let toggle = false
		let isMarkerVisible = false
		this.vid = document.querySelector("#asset_video_1");
		const btn = document.querySelector("#button_play_1"); //a-plane button
		//const btnPause = document.querySelector("#btn_pause_1");
		//const btnPauseMaterial = btnPause.getAttribute("material", "src", this.btnPause);
		//this.btnPlay = document.querySelector("#btn_play_1");
	
		this.el.addEventListener("click", e => {
			/*
			if (toggle)
				this.el.setAttribute('material', 'color', 'red')
			else
				this.el.setAttribute('material', 'color', 'green')
		
			toggle = !toggle
			*/
			
			//this.btn.setAttribute("material", btnPauseMaterial);
  			//this.btn.setAttribute("material", "src", this.btnPauseMaterial);
			btn.setAttribute("visible", false);
			this.vid.play();
		})
	}
})

/* Scannerhandler Function: to let the image of the scanner show or hide when marker is tracked or not tracked */
AFRAME.registerComponent('scannerhandler', {
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
AFRAME.registerComponent('ar-session-notifier', {
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
AFRAME.registerComponent('cursor-hack', {
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
