var bgPage = chrome.extension.getBackgroundPage();

// set saved volume to slider
$("#volume_slider").val(bgPage.volume / 100);

// radio already playing
if (bgPage.isPlaying) {
    toggleActionButtons();
}

$("#play_btn").click(function() {
    bgPage.playRadio();
    toggleActionButtons();
});

$("#stop_btn").click(function() {
    bgPage.stopRadio();
    toggleActionButtons();
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

function toggleActionButtons() {
    $("#play_btn").toggle();
    $("#stop_btn").toggle();
}
