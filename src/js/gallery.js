var Gallery = (function() {
    'use strict';

    var $gallery = $('.gallery');
    var $items = $gallery.find('.gallery__item__image');
    var $overlay = $('.gallery__item-view');


    function view(event) {
        var $item = $(event.target);

        var imgUrl = $item.css('background-image')
            .replace(/url\(\"?/g,"")
            .replace(/\"?\)/g,"");

        $overlay.find('.gallery__item-view__image')
            .attr('src', imgUrl);

        var title = $item.closest('.gallery__item')
            .find('.gallery__item__title')
            .clone()
            .html();

        $overlay.find('.gallery__item-view__title')
            .html(title);

        $('body').addClass('gallery__prevent-body-scroll');

        $overlay.animate({
            opacity: "toggle"
        }, 200, function() {});
    }


    function close(event) {
        $overlay.animate({
            opacity: "toggle"
        }, 600, function() {
            $overlay.find('.gallery__item-view__image')
                .removeAttr('style');
            $(this).hide();
        });

        $('body').removeClass('gallery__prevent-body-scroll');
    }


    function init() {
        $items.on('click', Gallery.view);
        $overlay.on('click', Gallery.close);
    }


    return {
        view: view,
        close: close,
        init: init
    };
})();