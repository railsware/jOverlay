/*global $, jQuery, window: true */
jQuery.aManshinOverlay = {
    show: function (options) {
        options = $.extend({
            loader: false
        },
        options);
        $('<div/>').attr('id', 'overlay').prependTo('body');

        var overlay = $('div#overlay').css({
            'display': 'none',
            'position': 'absolute',
            'opacity': '0.7',
            'background': 'black',
            'top': '0',
            'left': '0',
            'text-align': 'center',
            'z-index': '5',
            'width': document.body.clientWidth,
            'height': document.body.clientHeight
        }).fadeIn();

        $(window).resize(function () {
            overlay.css({
                'width': document.body.clientWidth
            });
        });

        if (options['loader']) {
            overlay.after('<div id="loader"><img src="tmp/ajax-loader.gif"></div>');

            var loader = $('div#loader').css({
                'display': 'none',
                'position': 'fixed',
                'top': '50%',
                'left': '50%',
                'z-index': '6'
            }).fadeIn();
        }
        return overlay;
    },

    hide: function () {
        var overlay = $('div#overlay');
        var loader = $('div#loader');

        if (overlay.get(0)) {
            overlay.fadeOut('slow', function () {
                $(this).remove();
            });
            if (loader.get(0)) {
                loader.fadeOut('slow', function () {
                    $(this).remove();
                });
            }
        }
        return overlay;
    }
};
