var radioThread;

var isPlaying = false;
var volume = 70; // default 70% volume

var RADIO_LOCATIONS = [
    "http://77.47.130.190:8000/radiokpi",
    "http://77.47.130.190:8000/64kbps"
];

var SEARCH_ENGINES = [
    // VK
    function(query) {
        return "http://vk.com/search?c%5Bq%5D=" + query + "&c%5Bsection%5D=audio"
    },
    // YouTube
    function() {
        // todo
    },
    // Google
    function() {
        // todo
    }
];

var radioUrlIndex = 0;
var searchIndex = 0;

loadOptions();

function loadOptions() {
    chrome.storage.sync.get({
        searchEngineIndex: 0,
        qualityIndex: 0
    }, function(options) {
        searchIndex = options.searchEngineIndex;
        radioUrlIndex = options.qualityIndex;

        if (isPlaying) {
            stopRadio();
            playRadio();
        }
    });
}

function playRadio() {
    radioThread = new buzz.sound(RADIO_LOCATIONS[radioUrlIndex]);
    radioThread.play();
    radioThread.setVolume(volume);

    setBadge("..");

    // when is buffered
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
