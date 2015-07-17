setInterval(function() {
    var outer = $(".song-title");
    var inner = $("#song_name");

    if (inner.width() > outer.width()) {
        var left = inner.position().left - 0.5;

        if (left + inner.width() < 0) {
            left = outer.width();
        }

        inner.css({left: left});
    }


}, 17);