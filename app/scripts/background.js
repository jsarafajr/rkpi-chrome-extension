var radioStream;

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
    function(query) {
        return "https://www.youtube.com/results?search_query=" + query;
    },
    // Google
    function(query) {
        return "https://www.google.com.ua/?gws_rd=ssl#safe=off&q=" + query;
    }
];

var radioUrlIndex = 0;
var searchIndex = 0;

var songName = "Click on <b>Play</b> button";
var songNameLoaded = false;

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
    radioStream = new buzz.sound(RADIO_LOCATIONS[radioUrlIndex]);
    radioStream.play();
    radioStream.setVolume(volume);

    setBadge("..");

    // when is buffered
    radioStream.bind("loadeddata", function(e) {
        setBadge(">");
    });

    isPlaying = true;
    songNameLoaded = false;

    songName = "Loading...";
    songNameRequestInterval();
}

function stopRadio() {
    radioStream.stop();
    setBadge("");
    isPlaying = false;
}

function setVolume(value) {
    volume = value;

    if (radioStream != null) {
        radioStream.setVolume(value);
    }
}

function toggleMute() {
    radioStream.toggleMute();
}

function searchSong() {
    chrome.tabs.create({url: SEARCH_ENGINES[searchIndex](songName)});
}

function setBadge(text) {
    chrome.browserAction.setBadgeText({text: text});
}

function songNameRequestInterval() {
    if (!isPlaying) return;

    var request = new XMLHttpRequest();
    request.open("GET", "http://77.47.130.190:7000/getmeta", true);

    request.onreadystatechange = function () {
        if (request.readyState != 4 || request.status != 200) return;
        var responseJSON = JSON.parse(request.responseText);
        songName = responseJSON["artist"] + " - " + responseJSON["title"];
        songNameLoaded = true;
    };
    request.send();

    setTimeout(songNameRequestInterval, 5000);
}
