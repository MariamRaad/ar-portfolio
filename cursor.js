
AFRAME.registerComponent('ar-session-notifier', {
	init: function() {
		var scene = this.el.sceneEl
		var arSession = null
		// wait until the arSession is ready
		var idx = setInterval(function() {
			arSession = scene.systems["arjs"]._arSession
			if (!arSession) return;
			scene.emit("arSessionReady")
			clearInterval(idx)
		})
	}
})

AFRAME.registerComponent('foo', {
	init: function() {
		// the clicks may fire prematurely for some reason ¯\_(ツ)_/¯
		this.el.sceneEl.addEventListener("arSessionReady", this.addListeners.call(this));
	},
	addListeners: function() {
		let toggle = false
		let isMarkerVisible = false
		this.vid = document.querySelector("#Video_Asset_1");
		const btn = document.querySelector("#button"); //plane button
		const btnPauseMaterial = document.querySelector("#btn_pause_1"); //plane button
		//this.btnPlay = document.querySelector("#btn_play_1");
	
		this.el.addEventListener("click", e => {
			/*
			if (toggle)
				this.el.setAttribute('material', 'color', 'red')
			else
				this.el.setAttribute('material', 'color', 'green')
		
			toggle = !toggle
			*/
			this.vid.play();
			//this.btn.setAttribute("material", btnPauseMaterial);
  			this.btn.setAttribute("material", "src", this.btnPauseMaterial)
			//btn.setAttribute("visible", false);
		})
	}
})

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
