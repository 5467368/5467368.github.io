// Avoid `console` errors in browsers that lack a console.
$(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/**
 * Created by Мирослав on 24.04.2016.
 *
 * Slider
 */
$(function () {

    var offset = 1160;
    var currentPosition = 0;

    $('.radio').on('click', 'li', function () {

        var $thisIndex = $('.radio').find("li").index(this);
        var move;

        if( $thisIndex != currentPosition) {
            $('.radio li').not(this).each(function () {
                $(this).removeClass('radio-selected');
            });
            $(this).addClass('radio-selected');
            move = $thisIndex * offset;
            $('.slider-list').animate({
                right: move + 'px'
            }, 500);
            currentPosition = $thisIndex;
        }
    })
});

/**
 * Created by Мирослав on 22.04.2016.
 *
 * Banners
 */
$(function () {

    var bannerSlide = $('.banner-slide');
    var panelText = $('.panel-text');

    bannerSlide.on('click', function (e) {
        var $sign = $('.sign');
        var $plusMinus = $(this).children('span:first-child');

        if ($plusMinus.text() == '+') {
            bannerSlide.not(this).each(function () {
                bannerSlide.siblings('span').slideUp(300);
                $('.banner-slide span').removeClass('banner-slide-selected');
                $('.banner-slide .sign').text('+');
            });
            $(this).siblings('span').slideDown(300);
            $(this).children('span').toggleClass('banner-slide-selected');
            $plusMinus.text('-');
        } else {
            $(this).siblings('span').slideUp(300);
            $(this).children('span').toggleClass('banner-slide-selected');
            $plusMinus.text('+');
        };
    });
});

//Date & Month
$(function () {
    var date = new Date();
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $('.date').text(date.getDate());
    $('.month').text(month[date.getMonth()]);
});

// Modal window
$(function () {

    var block = '<div class="modal">+</div>';
    var $image = $('.servises li');
    $image.hover(function () {
            $(this).append(block)
        },
    function () {
            $('.servises').find('div').remove()
        }
    )
});
