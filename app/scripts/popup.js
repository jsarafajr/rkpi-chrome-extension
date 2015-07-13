var bgPage = chrome.extension.getBackgroundPage();

// radio already playing
if (bgPage.isPlaying) {
    toggleButtons();
}

$("#play_btn").click(function() {
    bgPage.playRadio();

    toggleButtons();
});

$("#stop_btn").click(function() {
    bgPage.stopRadio();

    toggleButtons();
});

function toggleButtons() {
    $("#play_btn").toggle();
    $("#stop_btn").toggle();
}
