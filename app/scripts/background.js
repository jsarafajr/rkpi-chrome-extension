var radioThread;

var isPlaying = false;

function playRadio() {
    radioThread = new buzz.sound("http://77.47.130.190:8000/radiokpi");
    radioThread.play();

    chrome.browserAction.setBadgeText({text: ".."});

    radioThread.bind("loadeddata", function(e) {
        chrome.browserAction.setBadgeText({text: ">"});
    });

    isPlaying = true;
}

function stopRadio() {
    radioThread.stop();

    chrome.browserAction.setBadgeText({text: ""});

    isPlaying = false;
}

