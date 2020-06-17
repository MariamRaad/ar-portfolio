Requirements for Videos:

Videos should have mpeg-4 format and AAC audio in order to be played with Android and iOS Smartphones.
(found here: https://gist.github.com/RobTranquillo/8132191d48596dae68cef8e9cf48f812 visited 03.06.2020)
Beforehand I used mp4-format and mp3 audio and it didn't work with iOS.

The size of the video should be as small as possible - the smaller the faster the video will be loaded in the Browser.
I tried different sizes:
50mb - way too big! 	the application will only show a thumbnail of the video
 7mb - is okay		the application needs maybe a bit of time to load the video (especially with iOS), but it works within a second.
 5mb - is good		the application will show the video right away


In order to play videos on iOS the following code segments are needed:
<meta name="apple-mobile-web-app-capable" content="yes">
(found here: https://aframe.io/docs/1.0.0/primitives/a-video.html#sidebar visited 03.06.2020)

<!-- Videohandler to let video autoplay when marker is tracked -->
<!-- Code für direkt in HTML, nicht in extra JS Datei -->
        <script>
        window.onload = function() {
            AFRAME.registerComponent('videohandler', {
                init: function () {
                    var marker = this.el;
		    this.vid = document.querySelector("#vid");

                    marker.addEventListener('markerFound', function () {
                        this.vid.play();
                    }.bind(this));
    
		    marker.addEventListener('markerLost', function() {
		    	this.vid.pause();
			this.vid.currentTime = 0;
		    }.bind(this));
                }
            });
        };
        </script>
	

	(found here: https://github.com/jeromeetienne/AR.js/issues/504 visited 03.06.2020)
	<!-- Click-Function to pause and/or start a video -->
	<!-- this is REQUIRED for iOS -->
	<script>
            window.addEventListener('click', function () {
                var video = document.querySelector('#vid');
                if (video.paused == true) {
                    video.play();
                } else {
                    video.pause();
                }
            }, false);
        </script> 
