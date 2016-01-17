
$(document).ready(function () {
    var font_size = parseFloat($('#dr').css('font-size'), 10);
    var width = Math.floor($(window).width() / font_size);
    var height = Math.floor($(window).height() / font_size);

    var cells = init(width, height);

    var rain = function (drops) {
        var now = (new Date()).getTime();

        var next = [], n;
        for (var i=0; i<drops.length; i++) {
            n = render_raindrop(cells, drops[i], height);
            if (n) {
                next.push(n);
            }
        }

        for (var j=0; j < Math.random() * 10; j++) {
            if (Math.random() > 0.2) {
                next.push(make_raindrop(parseInt(Math.random() * width, 10), 0, parseInt(Math.random() * 10 + 5, 10)));
            }
        }

        var then = (new Date()).getTime();
        window.setTimeout(function () { rain(next); }, now - then + 50);
    };

    rain([]);
});

var init = function (width, height) {
    var m = $('#dr');

    var cells = new Array(width);
    for (var i=0; i<width; i++) {
        cells[i] = new Array(height);
    }

    for (var i=0; i<width; i++) {
        for (var j=0; j<height; j++) {
            var cell = $('<div class="box">' + sym + '</div');
            //var sym = String.fromCharCode(12448 + Math.random() * 96);
            var sym = String.fromCharCode(65280 + Math.random() * 159);
            cell.html(sym).css({'left': i + 'em', 'top' : j + 'em', 'opacity': 0});
            m.append(cell);

            cells[i][j] = cell;
        }
    }

    return cells;
};

var make_raindrop = function (col, row, len) {
    return {
        'col': col,
        'row': row,
        'len': len
    };
};

var render_raindrop = function (cells, r, height) {
    if (r.row < height) {
        (cells[r.col][r.row]).removeClass('header');
    }

    var n = r.row + 1;
    if (n < height) {
        (cells[r.col][n]).addClass('header').css({'opacity': 1});
    }

    for (var i=1; i <= r.len; i++) {
        var h = n - i;
        if (h >= 0 && h < height) {
            (cells[r.col][h]).css({'opacity': 1 - (i / r.len)});
        }
    }

    if (r.row - r.len < height) {
        return make_raindrop(r.col, r.row + 1, r.len);
    }
};
