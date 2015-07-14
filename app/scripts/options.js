var qualitySelect = document.getElementById("quality");
var searchSelect = document.getElementById("search_engine");

restoreOptions();

qualitySelect.addEventListener("change", function() {
    saveOptions();
});

searchSelect.addEventListener("change", function() {
    saveOptions();
});

function saveOptions() {
    var searchEngine = searchSelect.selectedIndex;
    var quality = qualitySelect.selectedIndex;

    chrome.storage.sync.set({
        searchEngineIndex: searchEngine,
        qualityIndex: quality
    }, function() {
        restoreOptions();
        chrome.extension.getBackgroundPage().loadOptions();
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        searchEngineIndex: 0,
        qualityIndex: 0
    }, function(options) {
        searchSelect.selectedIndex = options.searchEngineIndex;
        qualitySelect.selectedIndex = options.qualityIndex;
    });
}