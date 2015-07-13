var radioThread;

var isPlaying = false;
var volume = 70;

function playRadio() {
    radioThread = new buzz.sound("http://77.47.130.190:8000/radiokpi");
    radioThread.play();
    radioThread.setVolume(volume);

    chrome.browserAction.setBadgeText({text: ".."});

    radioThread.bind("loadeddata", function(e) {
        setBadge(">")
    });

    isPlaying = true;
}

function stopRadio() {
    radioThread.stop();
    setBadge("");
    isPlaying = false;
}

function setVolume(value) {
    volume = value;

    if (radioThread != null) {
        radioThread.setVolume(value);
    }
}

function toggleMute() {
    radioThread.toggleMute();
}

function setBadge(text) {
    chrome.browserAction.setBadgeText({text: text});
}
