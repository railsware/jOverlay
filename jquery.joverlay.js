/*global $, jQuery, window: true */
var railswareOverlay = function () {
    var options;
    var overlay;
    var loader;
    var size;

    var defaults = {
        loader: false,
        opacity: 0.7,
        background: 'black',
        index: 5,
        loader_path : '16_cycle_one_24.gif',
        loader_top : '50%',
        loader_left: '50%'
    };

    // Public method
    var init = function(opts) {
        options = $.extend({}, defaults, opts);
        size = viewport();
        return this;
    };

    // Borrowed from jQuery Tools project
    var viewport = function() {
        // the horror case
        if ($.browser.msie) {
            // if there are no scrollbars then use window.height
            var d = $(document).height(), w = $(window).height();
            return [
                window.innerWidth || // ie7+
                document.documentElement.clientWidth || // ie6
                document.body.clientWidth, // ie6 quirks mode
                d - w < 20 ? w : d
            ];
        }
        // other well behaving browsers
        return [$(window).width(), $(document).height()];
    };

    var initOverlay = function() {
        $('<div/>').attr('id', 'overlay').prependTo('body');
        overlay = $('div#overlay');

        overlay.css({
            'display': 'none',
            'position': 'absolute',
            'opacity': options['opacity'],
            'background': options['background'],
            'top': '0',
            'left': '0',
            'text-align': 'center',
            'z-index': options['index'],
            'width': size[0],
            'height': size[1]
        });
    };

    var initLoader = function() {
        if (options['loader']) {
            overlay.after('<div id="loader"><img src="' + options['loader_path'] + '" alt="" /></div>');
            loader = $('div#loader');

            loader.css({
                'display': 'none',
                'position': 'fixed',
                'top': options['loader_top'],
                'left': options['loader_left'],
                'z-index': options['index'] + 1
            }).fadeIn();
        }
    };

    // Public method
    var show = function() {
        initOverlay();
        overlay.fadeIn();
        initLoader();

        $(window).resize(function () {
            overlay.css({
                'width': size[0],
                'height': size[1]
            });
        });

        return overlay;
    };

    // Public method
    var hide = function() {
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
    };

    return {
        // declare which properties and methods are supposed to be public
        init: init,
        show: show,
        hide: hide
    }
}();

(function($) {
    $.fn.joverlay = function(options) {
        return railswareOverlay.init(options);
    };
})(jQuery);