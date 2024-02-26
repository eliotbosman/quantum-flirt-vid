document.addEventListener("DOMContentLoaded", function () {
    var controller = new ScrollMagic.Controller();
    var fadeElements = document.querySelectorAll('.fade-element');
    var featureVideo = document.querySelector(".feature video");
    var mainContainer = document.getElementById("mainContentContainer");
    var openCloseOverlayButton = document.getElementById("openCloseOverlayButton");
    var overlay = document.getElementById("overlay");
    var videos = document.querySelectorAll(".grid video");
    var fullScreenButton = document.getElementById("fullScreenButton");
    var title = document.getElementById("title");
    var navButton = document.getElementById("openCloseOverlayButton");

    openCloseOverlayButton.addEventListener("click", function () {
        toggleOverlay();
        toggleButton();
        toggleNavColor();
    });

    function toggleOverlay() {
        var isOverlayVisible = overlay.style.display === "block";
        mainContainer.style.display = isOverlayVisible ? "block" : "none";
        overlay.style.display = isOverlayVisible ? "none" : "block";
    }

    function toggleButton() {
        var buttonText = openCloseOverlayButton.textContent;
        openCloseOverlayButton.textContent = buttonText === "INFO" ? "CLOSE" : "INFO";
    }

    function toggleNavColor() {
        if (navButton.textContent === "CLOSE") {
            navButton.style.color = "white";
        } else {
            navButton.style.color = "black";
        }
    }

    // Define an array of colors
    var colors = ["#344b33", "#b78d6a", "#c5ae96", "#7f886e", "#fef8e6"];

    title.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default behavior of anchor tags
        changeBackgroundColor();
    });

    function changeBackgroundColor() {
        // Generate a random index to select a color from the array
        var randomIndex = Math.floor(Math.random() * colors.length);
        
        // Get the randomly selected color
        var randomColor = colors[randomIndex];
        
        // Apply the random color as the background color of the document body
        document.body.style.backgroundColor = randomColor;
    }

    fullScreenButton.addEventListener("click", function (event) {
        event.preventDefault();
        handleVideoClick(featureVideo);
    });

    function handleVideoClick(video) {
        if (!video.classList.contains("enlarged")) {
            openFullscreen(video);
            video.classList.add("enlarged");
            video.controls = true;
        } else {
            closeFullscreen();
            video.classList.remove("enlarged");
            video.controls = false;
        }
    }

    function openFullscreen(video) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { /* Firefox */
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE/Edge */
            video.msRequestFullscreen();
        }
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }

    function scrollToBottom() {
        var lastVideo = document.querySelector(".grid video.enlarged");
        if (lastVideo) {
            lastVideo.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }

    videos.forEach(function (video) {
        video.addEventListener("click", function () {
            handleVideoClick(video);
        });
    });

    fadeElements.forEach(function (element) {
        new ScrollMagic.Scene({
            triggerElement: element,
            triggerHook: 0.6,
            reverse: true,
        })
            .setTween(gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1.4 }))
            .addTo(controller);
    });
});
