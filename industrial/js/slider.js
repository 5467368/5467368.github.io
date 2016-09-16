/**
 * Created by Мирослав on 24.04.2016.
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
