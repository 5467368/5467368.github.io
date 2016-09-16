/**
 * Created by Мирослав on 22.04.2016.
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

$(function () {
    var date = new Date();
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $('.date').text(date.getDate());
    $('.month').text(month[date.getMonth()]);
});
