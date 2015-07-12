var sound = new Audio("http://77.47.130.190:8000/radiokpi");

var isPlaying = false;

function playRadio() {
    sound.play();

    chrome.browserAction.setBadgeText({text: "|>"});

    isPlaying = true;
}

function stopRadio() {
    sound.pause();

    isPlaying = false;
}
