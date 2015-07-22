/**
 * Portfolio
 * Main
 *
 */

/**
 * Navigation
 *
 */
var NavManager = (function() {
    'use strict';

    var $window = $(window);
    var $nav = $('.nav');
    var $menu = $('.nav__links');

    function animate() {
        var headerHeight = $('.header').height();
        var fromTop = $window.scrollTop();
        var animationTriggerOffset = headerHeight * 0.4;

        // CSS for logo animation in nav
        var logoImage = {
            hide: {
                '-webkit-transform': 'translate(0, -50px) rotate(-360deg)',
                '-moz-transform': 'translate(0, -50px) rotate(-360deg)',
                'transform': 'translate(0, -50px) rotate(-360deg)'
            },
            show: {
                '-webkit-transform': 'translate(0, 56px) rotate(360deg)',
                '-moz-transform': 'translate(0, 56px) rotate(360deg)',
                'transform': 'translate(0, 56px) rotate(360deg)'
            }
        };

        var logoText = {
            hide: {
                '-webkit-transform': 'translate(0, -50px)',
                '-moz-transform': 'translate(0, -50px)',
                'transform': 'translate(0, -50px)'
            },
            show: {
                '-webkit-transform': 'translate(0, 62px)',
                '-moz-transform': 'translate(0, 62px)',
                'transform': 'translate(0, 62px)'
            }
        };

        var isFrontPage = $('body').hasClass('front-page');

        if (isFrontPage) {
            if (fromTop > animationTriggerOffset) {
                $nav.find('.logo').css(logoImage.show);
                $nav.find('.name').css(logoText.show);
            }
            else {
                $nav.find('.logo').css(logoImage.hide);
                $nav.find('.name').css(logoText.hide);
            }
        }

        // Navbar animations
        var currentAmount = (fromTop - animationTriggerOffset) / headerHeight;
        var maxAmount = 0.15;

        if (fromTop <= animationTriggerOffset) {
            setShadowAmount($nav, 0);
        }
        else if (currentAmount < maxAmount) {
            setShadowAmount($nav, currentAmount);
        }
        else {
            setShadowAmount($nav, maxAmount);
        }
    }

    function setShadowAmount(elem, amount) {
        var boxShadow = 'none',
            borderBottom = 'none';

        if (amount > 0) {
            boxShadow = '0 5px 20px rgba(20,20,20, ' + amount + ')';
            borderBottom = '1px solid rgba(20,20,20, ' + amount + ')'
        }

        elem.css({
            'box-shadow': boxShadow,
            'border-bottom': borderBottom
        });
    }

    function onClick(event) {
        event.preventDefault();
        $menu.toggleClass('show-as-menu', 500, 'easeOutExpo');
    }

    return {
        animate: animate,
        onClick: onClick
    };
})();




/**
 * Header
 *
 */
var HeaderManager = (function() {
    'use strict';

    var headerHeight = $('.header').height();
    var $titleElem = $('.header__title');

    function animate() {
        var animationTriggerOffset = headerHeight * 0.4;
        var fromTop = $(window).scrollTop();

        if (fromTop > animationTriggerOffset) {
            $titleElem.addClass('fade');
        }
        else {
            $titleElem.removeClass('fade');
        }
    }

    return {
        animate: animate
    };
})();



var UI = (function() {
    'use strict';

    function onScroll() {
        var isFrontPage = $('body').hasClass('front-page');
        
        if (isFrontPage) {
            NavManager.animate();
            HeaderManager.animate();
        }
        else {
            NavManager.animate();
        }
    }

    return {
        onScroll: onScroll
    };
})();



$(document).ready(function() {
    'use strict';

    var $window = $(window);
    var $document = $(document);

    $document.on('click', '.nav__menu__btn', NavManager.onClick);
    $window.on('scroll', UI.onScroll);

    Gallery.init();
}());
