jQuery(document).ready(function ($) {
    "use strict";
    /*-----------------------------------------------------------------------------------*/
    /* Horizontal Scrolling
    /* https://github.com/darsain/sly
    /*-----------------------------------------------------------------------------------*/
    function startHorizontalSlider() {
        var $frame = $(".scrolling-frame"),
            $wrap = $frame.parent();

        $wrap.imagesLoaded(function () {
                $wrap.addClass("scrolling-frame-loaded");

                // Call Sly on frame
                $frame.sly({
                    horizontal: 1,
                    itemNav: 'basic',
                    smart: 1,
                    activateOn: 'click',
                    mouseDragging: 1,
                    touchDragging: 1,
                    releaseSwing: 1,
                    startAt: 1,
                    scrollBar: $wrap.find('.scrolling-frame-scrollbar'),
                    scrollBy: 1,
                    activatePageOn: 'click',
                    speed: 300,
                    elasticBounds: 1,
                    dragHandle: 1,
                    dynamicHandle: 1,
                    clickBar: 1,

                    // Buttons
                    prev: $wrap.find('.prev'),
                    next: $wrap.find('.next')
                });
            }
        );
    }

    setTimeout(startHorizontalSlider, 500);
});