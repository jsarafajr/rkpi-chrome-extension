var radioStream;

var isPlaying = false;
var volume = 70; // default 70% volume

var RADIO_LOCATIONS = [
    "http://rkpi.me/getStream",
    "http://rkpi.me/getStream"
];

var radioUrlIndex = 0;
var searchEngineIndex = 0;

var songName = "Click on <b>Play</b> button";
var songNameLoaded = false;

loadOptions();

function loadOptions() {
    chrome.storage.sync.get({
        searchEngineIndex: 0,
        qualityIndex: 0
    }, function(options) {
        searchEngineIndex = options.searchEngineIndex;
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
    chrome.tabs.create({url: getSearchUrl(songName)});
}

function setBadge(text) {
    chrome.browserAction.setBadgeText({text: text});
}

function getSearchUrl(query) {
    switch (searchEngineIndex) {
        case 0:
            return "http://vk.com/search?c%5Bq%5D=" + query + "&c%5Bsection%5D=audio";
        case 1:
            return "https://www.youtube.com/results?search_query=" + query;
        case 2:
            return "https://www.google.com.ua/?gws_rd=ssl#safe=off&q=" + query;
    }
}

function songNameRequestInterval() {
    if (!isPlaying) return;

    var request = new XMLHttpRequest();
    request.open("GET", "http://rkpi.me/getMeta", true);

    request.onreadystatechange = function () {
        if (request.readyState != 4 || request.status != 200) return;

        songName = JSON.parse(request.responseText).song;
        songNameLoaded = true;
    };

    request.send();

    setTimeout(songNameRequestInterval, 5000);
}
