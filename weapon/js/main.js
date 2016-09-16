/**
 * Created by Miroslav on 07.08.2016.
 */
$(function () {

    var $body = $('body');
    var $leftArrow = $('.news-body-arrow-prev');
    var $rightArrow = $('.news-body-arrow-next');
    var $carouselList = $('.news-body-slider-list');

    var offset = 492;
    var currentPosition = 0;
    var currentOffset = offset;
    var $listLength = $carouselList.find('li').length;
    // var $element = $carouselList.find('img');
    // var $modal, $overlay;

    $leftArrow.css('display', 'none');

    function leftClick(){

        if (currentPosition > 0) {
            $carouselList.animate({
                right: currentPosition * offset - offset + 'px'
            }, 500);
            currentPosition--;
            $rightArrow.css('display', 'block');
            if (currentPosition == 0) {
                $leftArrow.css('display', 'none');
            };
        } else {
            currentPosition = $listLength - 1;
        };
    };

    function rightClick(){

        if (currentPosition < $listLength) {
            $carouselList.animate({
                right: currentPosition * offset + offset + 'px'
            }, 500);
            currentPosition++;

            $leftArrow.css('display', 'block');
            if (currentPosition == $listLength - 1){
                $rightArrow.css('display', 'none');
            };
        } else {
            currentPosition = -1;
        };
    };

    $leftArrow.on('click', leftClick);
    $rightArrow.on('click', rightClick);

});