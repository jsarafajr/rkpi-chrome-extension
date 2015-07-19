var bgPage = chrome.extension.getBackgroundPage();

// set saved volume value to slider
$("#volume_slider").val(bgPage.volume / 100);

// radio already playing
if (bgPage.isPlaying) {
    toggleActionButtons();
}

// getting song name
getSongNameInterval();

$("#play_btn").click(function() {
    bgPage.playRadio();
    toggleActionButtons();
});

$("#stop_btn").click(function() {
    bgPage.stopRadio();
    toggleActionButtons();
});

$("#search_btn").click(function() {
    bgPage.searchSong();
});

$("#volume_slider").bind("slider:changed", function(event, data) {
    // currently selected value of the slider
    bgPage.setVolume(data.value * 100);
});

$("#mute_btn, #unmute_btn").click(function() {
    bgPage.toggleMute();
    $("#mute_btn, #unmute_btn").toggle();
});

$("#options_btn").click(function() {
    // supported in (Chrome 42+).
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

function getSongNameInterval() {
    if (bgPage.songNameLoaded) {
        //$("#song_name").show();
        $("#search_btn").show();
    }

    //if (bgPage.songName === "Loading...") {
    //    $("#song_name").show();
    //}

    $("#song_name").html(bgPage.songName);
    $("#song_name").attr("title", bgPage.songName);
    setTimeout(getSongNameInterval, 1000)
}

function toggleActionButtons() {
    $("#play_btn").toggle();
    $("#stop_btn").toggle();
}
