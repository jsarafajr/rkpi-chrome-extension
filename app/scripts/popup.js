var bgPage = chrome.extension.getBackgroundPage();

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
    // The currently selected value of the slider
    bgPage.setVolume(data.value * 100);
});

$("#mute_btn, #unmute_btn").click(function() {
    bgPage.toggleMute();
    toggleMuteButtons();
});

function toggleActionButtons() {
    $("#play_btn").toggle();
    $("#stop_btn").toggle();
}

function toggleMuteButtons() {
    $("#mute_btn").toggle();
    $("#unmute_btn").toggle();
}
