(function ($) {
    "use strict";

    var $window = $(window),
        $body = $('body'),
        isRtl = $body.hasClass('rtl');

    /*-----------------------------------------------------------------------------------*/
    /* Sliders
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().flexslider) {
        var homepageSlider = $('.homepage-slider'),
            gallerySlider = $('.gallery-slider'),
            gallerySliderTwo = $('.gallery-slider-two');

        homepageSlider.flexslider({
            slideshow: true,
            slideshowSpeed: 4000,
            pauseOnHover: true,
            touch: true,
            prevText: "",
            nextText: "",
            controlNav: false,
            rtl: isRtl,
            start: function (slider) {
                slider.delay(400).removeClass('slider-loader');
                centerSlideDetails(slider.h);
            }
        });

        gallerySlider.flexslider({
            animation: "slide",
            slideshow: true,
            rtl: isRtl,
            prevText: "",
            nextText: ""
        });

        gallerySliderTwo.flexslider({
            animation: "fade",
            slideshow: true,
            rtl: isRtl,
            directionNav: false
        });
    }

    function centerSlideDetails(slideHeight) {
        var slider = '',
            siteHeader = $('.site-header'),
            isHeaderOne = siteHeader.hasClass('header-variation-one') && $window.width() > 1182;

        if (homepageSlider.hasClass('slider-variation-two')) {
            slider = $('.slider-variation-two .slides li');
        }else if (homepageSlider.hasClass('slider-variation-three')) {
            slider = $('.slider-variation-three .slides li');
        }

        if( !slideHeight && slider ){
            slideHeight = slider.first().height();
        }

        if(slider){
            slider.each(function () {
                var slideOverlay = $(this).find('.slide-inner-container');
                if (isHeaderOne) {
                    slideOverlay.css('top', siteHeader.height() + 40);
                } else {
                    slideOverlay.css('top', Math.abs(((slideHeight - slideOverlay.outerHeight()) / 2)));
                }
            });
        }
    }

    $window.on('load resize', function () {
        centerSlideDetails();
    });


    if (jQuery().lightSlider) {
        $('#image-gallery').lightSlider({
            gallery: true,
            item: 1,
            thumbItem: 10,
            loop: true,
            slideMargin: 0,
            galleryMargin: 0,
            thumbMargin: 2,
            currentPagerPosition: 'middle',
            rtl: isRtl
        });
        $('.lSPager').wrap('<div class="slider-thumbnail-nav-wrapper"></div>');
    }

    /*-----------------------------------------------------------------------------------*/
    /*  Carousels
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().owlCarousel) {
        var similarPropertiesCarousel = $(".similar-properties-carousel .owl-carousel"),
            similarPropertiesCarouselNav = $('.similar-properties-carousel-nav'),
            similarPropertiesItem = $('.similar-properties-carousel .hentry'),
            recentPostsCarousel = $(".recent-posts-carousel .owl-carousel"),
            recentPostsCarouselNav = $('.recent-posts-carousel-nav'),
            recentPostsItem = $('.recent-posts-item'),
            carouselNext = $(".carousel-next-item"),
            carouselPrev = $(".carousel-prev-item");


        similarPropertiesCarousel.owlCarousel({
            onInitialized: navToggle(similarPropertiesItem,similarPropertiesCarouselNav,1),
            rtl: isRtl,
            items: 1,
            smartSpeed: 500,
            loop: similarPropertiesItem.length > 1,
            autoHeight: similarPropertiesItem.length > 1,
            dots: false
        });


        carouselNext.on( 'click', function () {
            similarPropertiesCarousel.trigger('next.owl.carousel');
        });

        carouselPrev.on( 'click', function () {
            similarPropertiesCarousel.trigger('prev.owl.carousel');
        });

        recentPostsCarousel.owlCarousel({
            onInitialized: navToggle(recentPostsItem,recentPostsCarouselNav,2),
            rtl: isRtl,
            smartSpeed: 500,
            margin: 20,
            dots: false,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                1199: {
                    items: 2
                }
            }
        });


        carouselNext.on( 'click', function (event) {
            recentPostsCarousel.trigger('next.owl.carousel');
            event.preventDefault();
        });

        carouselPrev.on( 'click', function (event) {
            recentPostsCarousel.trigger('prev.owl.carousel');
            event.preventDefault();
        });
    }

    // Carousel Nav Toggle
    function navToggle(element,nav,items) {
        element.length > items ? nav.show() : nav.hide();
    }

    /*-----------------------------------------------------------------------------------*/
    /* Select2
    /* URL: http://select2.github.io/select2/
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().select2) {
        var selectOptions = {
            //minimumResultsForSearch: -1,  // Disable search feature in drop down
            width: 'off'
        };

        if (isRtl) {
            selectOptions.dir = "rtl";
        }


        var AgentSelectOptions = {
            placeholder: "Select an Agent or more"
        }

        $('select').select2(selectOptions);
        $('#agent-selectbox').select2(AgentSelectOptions);
    }
    /*-----------------------------------------------------------------------------------*/
    /* Swipebox
    /* http://brutaldesign.github.io/swipebox/
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().swipebox) {
        $('.clone .swipebox').removeClass('swipebox');
        $(".swipebox").swipebox();

        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });
    }
    /*-----------------------------------------------------------------------------------*/
    /* Magnific Popup
    /* https://github.com/dimsemenov/Magnific-Popup
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().magnificPopup) {
        $(".video-popup").magnificPopup({
            type: 'iframe'
        });
    }

    /*-----------------------------------------------------------------------------------*/
    /*	Scroll to Top
     /*-----------------------------------------------------------------------------------*/
    $(function(){
        var scroll_anchor = $( '#scroll-top' ),
            post_nav = $( '.inspiry-post-nav' );
        $( window ).scroll(function () {
            if ( $( window ).width() > 980 ) {
                if ( $(this).scrollTop() > 250 ) {
                    scroll_anchor.fadeIn( 'fast' );
                    post_nav.fadeIn( 'fast' );
                    return;
                }
            }
            scroll_anchor.fadeOut( 'fast' );
            post_nav.fadeOut( 'fast' );
        });

        scroll_anchor.on( 'click', function ( event ) {
            event.preventDefault();
            $('html, body').animate( { scrollTop:0 }, 'slow' );
        });
    });


    /*-----------------------------------------------------------------------------------*/
    /* Sticky Header Function
    /*-----------------------------------------------------------------------------------*/
    var inspiryStickyHeader = $body.hasClass('inspiry-sticky-header');

    if( inspiryStickyHeader ) {
        var siteHeader = $('.site-header');

        $window.on( 'scroll', function() {
            var HeaderClasses = 'inspiry-sticked-header slideInDown animated',
                isHeaderVariationOne = siteHeader.hasClass('header-variation-one'),
                siteHeaderHeight = siteHeader.outerHeight(),
                windowPosition = $window.scrollTop(),
                adminbarOffset = $body.is( '.admin-bar' ) ? $( '#wpadminbar' ).height() : 0;

            if( windowPosition > siteHeaderHeight && $window.width() > 992 ){
                siteHeader.css('top', adminbarOffset ).addClass( HeaderClasses );

                if( isHeaderVariationOne ){
                    siteMainNav.show();
                    menuClose.show();
                } else {
                    $body.css('padding-top', siteHeaderHeight);
                }
            } else if ( windowPosition < 1 ) {
                siteHeader.css('top', 'auto' ).removeClass( HeaderClasses );
                $body.css('padding-top', 0);
            }
        });
    }

    /*-----------------------------------------------------------------------------------*/
    /* Main Menu
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().meanmenu) {
        $('#site-main-nav').meanmenu({
            meanMenuContainer: '#mobile-header',
            meanRevealPosition: "left",
            meanMenuCloseSize: "20px",
            meanScreenWidth: "991",
            meanExpand: '',
            meanContract: ''
        });
    }

    var mainMenuItem = $('#site-main-nav li');
    mainMenuItem.on( 'mouseenter',
        function () {
            $(this).children('ul').stop(true, true).slideDown(200);
        });

    mainMenuItem.on( 'mouseleave',
        function () {
            $(this).children('ul').stop(true, true).slideUp(200);
        }
    );

    // Code to show and hide main menu for home first variation.
    var siteMainNav = $('.header-menu-wrapper #site-main-nav'),
        menuReveal = $('.button-menu-reveal'),
        menuClose = $('.button-menu-close');

    menuReveal.css('display', 'inline-block');
    menuClose.hide();
    siteMainNav.hide();

    menuReveal.on('click', function (event) {
        $(this).stop(true, true).toggleClass('active');
        if (siteMainNav.is(":visible")) {
            siteMainNav.hide();
            menuClose.hide();
        } else {
            siteMainNav.show();
            menuClose.show();
        }
        event.preventDefault();
    });

    menuClose.on('click', function (event) {
        $(this).fadeToggle(20);
        siteMainNav.fadeToggle(20);
        menuReveal.stop(true, true).toggleClass('active');
        event.preventDefault();
    });

    // Function to add User Nav and Social Nav in Mean Menu
    function customNav() {
        var menu = $('.mean-nav'),
            meanMenuReveal = $('.meanmenu-reveal'),
            backdrop = '<div class="mobile-menu-backdrop fade in"></div>',
            mobileHeaderNav = $('.mobile-header-nav').html();

        if ( $window.width() < 991 && menu.find('.mobile-header-nav-wrapper').length < 1 ) {
            menu.append(mobileHeaderNav);
        }

        // Show and hide user and social nav. Also add menu backdrop.
        meanMenuReveal.on('click', function () {
            menu.find('.mobile-header-nav-wrapper').stop(true, true).slideToggle();
            menu.stop(true, true).toggleClass('mobile-menu-visible');
            if (menu.hasClass('mobile-menu-visible')) {
                $('body').append(backdrop);
            } else {
                $('.mobile-menu-backdrop').remove();
            }
        });

        // Resolve Model Backdrop issue.
        $('.login-register-link').on('click', function () {
            meanMenuReveal.trigger('click');
        });
    }
    customNav();
    $window.on( 'resize', function () {
        customNav();
        menuClose.hide();
        siteMainNav.hide();
        $('.mobile-menu-backdrop').remove();
    });

    /*-----------------------------------------------------------------------------------*/
    /*	Search Form Slide Toggle
    /*-----------------------------------------------------------------------------------*/
    // Function to show hidden fields on variation one
    var hiddenFields = $('.hidden-fields');

    $('.hidden-fields-reveal-btn').on( 'click', function (event) {
        $(this).stop(true, true).toggleClass('field-wrapper-expand');
        hiddenFields.stop(true, true).slideToggle(200);
        event.preventDefault();
    });

    var featureTitle = $('.extra-search-fields > .title > span'),
        featureWrapper = $('.extra-search-fields .features-checkboxes-wrapper');

    featureTitle.on( 'click', function () {
        $(this).stop(true, true).toggleClass('is-expand');
        featureWrapper.stop(true, true).slideToggle(200);
    });

    /*-----------------------------------------------------------------------------------*/
    /*	Equal Height Function
    /*-----------------------------------------------------------------------------------*/
    function equalHeights(element) {
        var $element = $(element),
            elementHeights = [];

        $element.each(function () {
            var $this = $(this);
            elementHeights.push($this.outerHeight());
        });

        if ($window.width() > 750) {
            $element.css('height', Math.max.apply(Math, elementHeights));
        }
    }

    equalHeights('.featured-properties-one .property-description');
    equalHeights('.agent-listing-post');
    /*-----------------------------------------------------------------------------------*/
    /*	Home Property Listing hover Effect
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().hoverIntent) {
        var propertyListing = $(".property-listing-two .property-description, .featured-properties-two .property-description");

        propertyListing.each(function(){
            var $this = $(this);
            $this.css( 'height', $this.find('.entry-header').outerHeight());
        });

        propertyListing.hoverIntent(
            function () {
                var $this = $(this);

                $this.find('.property-meta').show();
                $this.stop(true, true).animate({
                    height: '100%'
                }, 300).addClass('hovered');
            },
            function () {
                var $this = $(this);

                $this.removeClass('hovered').stop(true, true).animate({
                    height: $this.find('.entry-header').outerHeight()
                }, 300);
            }
        );
    }

    /*-----------------------------------------------------------------------------------*/
    /*	Isotope for gallery pages
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().isotope) {
        var galleryContainer = $('#gallery-container');

        $window.on('load', function () {
            galleryContainer.isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows'
            });
        });

        $('#gallery-items-filter').on('click', 'a', function (event) {
            var $this = $(this),
                filterValue = $this.attr('data-filter');
            $(this).addClass('active').siblings().removeClass('active');
            galleryContainer.isotope({
                filter: filterValue
            });
            event.preventDefault();
        });
    }

    /*----------------------------------------------------------------------------------*/
    /* Contact Form AJAX validation and submission
    /* Validation Plugin : http://bassistance.de/jquery-plugins/jquery-plugin-validation/
    /* Form Ajax Plugin : http://www.malsup.com/jquery/form/
    /*---------------------------------------------------------------------------------- */

    if (jQuery().validate && jQuery().ajaxSubmit) {

        var submitButton = $('#submit-button'),
            ajaxLoader = $('#ajax-loader'),
            messageContainer = $('#message-container'),
            errorContainer = $("#error-container");

        var formOptions = {
            beforeSubmit: function () {
                submitButton.attr('disabled', 'disabled');
                ajaxLoader.fadeIn('fast');
                messageContainer.fadeOut('fast');
                errorContainer.fadeOut('fast');
            },
            success: function (ajax_response, statusText, xhr, $form) {
                var response = $.parseJSON(ajax_response);
                ajaxLoader.fadeOut('fast');
                submitButton.removeAttr('disabled');
                if (response.success) {
                    $form.resetForm();
                    messageContainer.html(response.message).fadeIn('fast');
                } else {
                    errorContainer.html(response.message).fadeIn('fast');
                }
            }
        };

        $('#contact-form').each(function () {
            $(this).validate({
                errorLabelContainer: errorContainer,
                submitHandler: function (form) {
                    $(form).ajaxSubmit(formOptions);
                }
            });
        });


        /*-----------------------------------------------------------------------------------*/
        /*	Agent's Contact Form
        /*----------------------------------------------------------------------------------*/

        var agentFormOptions = {
            beforeSubmit: function ( formData, jqForm, options ) {
                var currentForm = $(jqForm[0]);
                currentForm.find('.agent-submit').attr('disabled', 'disabled');
                currentForm.find('.agent-loader').fadeIn('fast');
                currentForm.find('.agent-message').fadeOut('fast');
                currentForm.find('.agent-error').fadeOut('fast');
            },
            success: function ( ajax_response, statusText, xhr, $form ) {
                var response = $.parseJSON( ajax_response );
                $form.find('.agent-loader').fadeOut('fast');
                $form.find('.agent-submit').removeAttr('disabled');
                if ( response.success ) {
                    $form.resetForm();
                    $form.find('.agent-message').html(response.message).fadeIn('fast');
                } else {
                    $form.find('.agent-error').html(response.message).fadeIn('fast');
                }
            }
        };

        $('.agent-form').each(function () {
            $(this).validate({
                errorLabelContainer: $(this).find('.agent-error'),
                submitHandler: function (form) {
                    $(form).ajaxSubmit( agentFormOptions );
                }
            });
        });

        /*-----------------------------------------------------------------------------------*/
        /*	AJAX Login Form
        /*----------------------------------------------------------------------------------*/

        var loginButton = $('#login-button'),
            loginAjaxLoader = $('#login-loader'),
            loginError = $("#login-error" ),
            loginMessage = $('#login-message');

        var loginOptions = {
            beforeSubmit: function () {
                loginButton.attr('disabled', 'disabled');
                loginAjaxLoader.fadeIn('fast');
                loginMessage.fadeOut('fast');
                loginError.fadeOut('fast');
            },
            success: function (ajax_response, statusText, xhr, $form) {
                var response = $.parseJSON( ajax_response );
                loginAjaxLoader.fadeOut('fast');
                loginButton.removeAttr('disabled');
                if ( response.success ) {
                    loginMessage.html( response.message ).fadeIn('fast');
                    document.location.href = response.redirect;
                } else {
                    loginError.html( response.message ).fadeIn('fast');

                    // call reset function if it exists
                    if (typeof inspiryResetReCAPTCHA == 'function') {
                        inspiryResetReCAPTCHA();
                    }
                }
            }
        };

        $('#login-form').validate({
            submitHandler: function ( form ) {
                $(form).ajaxSubmit( loginOptions );
            }
        });

        /*-----------------------------------------------------------------------------------*/
        /*	AJAX Register Form
        /*----------------------------------------------------------------------------------*/

        var registerButton = $('#register-button'),
            registerAjaxLoader = $('#register-loader'),
            registerError = $("#register-error" ),
            registerMessage = $('#register-message');

        var registerOptions = {
            beforeSubmit: function () {
                registerButton.attr('disabled', 'disabled');
                registerAjaxLoader.fadeIn('fast');
                registerMessage.fadeOut('fast');
                registerError.fadeOut('fast');
            },
            success: function (ajax_response, statusText, xhr, $form) {
                var response = $.parseJSON( ajax_response );
                registerAjaxLoader.fadeOut('fast');
                registerButton.removeAttr('disabled');
                if ( response.success ) {
                    registerMessage.html( response.message ).fadeIn('fast');
                    $form.resetForm();
                } else {
                    registerError.html( response.message ).fadeIn('fast');

                    // call reset function if it exists
                    if (typeof inspiryResetReCAPTCHA == 'function') {
                        inspiryResetReCAPTCHA();
                    }
                }
            }
        };

        $('#register-form').validate({
            rules: {
                register_username: {
                    required: true
                },
                register_email: {
                    required: true,
                    email: true
                }
            },
            submitHandler: function ( form ) {
                $(form).ajaxSubmit( registerOptions );
            }
        });

        /*-----------------------------------------------------------------------------------*/
        /*	Forgot Password Form
        /*----------------------------------------------------------------------------------*/

        var forgotButton = $('#forgot-button'),
            forgotAjaxLoader = $('#forgot-loader'),
            forgotError = $("#forgot-error" ),
            forgotMessage = $('#forgot-message');

        var forgotOptions = {
            beforeSubmit: function () {
                forgotButton.attr('disabled', 'disabled');
                forgotAjaxLoader.fadeIn('fast');
                forgotMessage.fadeOut('fast');
                forgotError.fadeOut('fast');
            },
            success: function (ajax_response, statusText, xhr, $form) {
                var response = $.parseJSON( ajax_response );
                forgotAjaxLoader.fadeOut('fast');
                forgotButton.removeAttr('disabled');
                if ( response.success ) {
                    forgotMessage.html( response.message ).fadeIn('fast');
                    $form.resetForm();
                } else {
                    forgotError.html( response.message ).fadeIn('fast');

                    // call reset function if it exists
                    if (typeof inspiryResetReCAPTCHA == 'function') {
                        inspiryResetReCAPTCHA();
                    }
                }
            }
        };

        $('#forgot-form').validate({
            submitHandler: function ( form ) {
                $(form).ajaxSubmit( forgotOptions );
            }
        });

    }

    /*-----------------------------------------------------------------------------------*/
    /*	Animation CSS integrated with Appear Plugin
    /*----------------------------------------------------------------------------------*/
    function ie_10_or_older() {
        // check if IE10 or older
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            // return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            return true;
        }
        // other browser
        return false;
    }

    if (jQuery().appear) {
        if (($window.width() > 991) && (!ie_10_or_older())) {
            // apply animation on only big screens and browsers other than IE 10 and Older Versions of IE
            $('.animated').appear().fadeTo('fast', 0);

            $(document.body).on('appear', '.fade-in-up', function (event, $all_appeared_elements) {
                $(this).each(function () {
                    $(this).addClass('fadeInUp')
                });
            });

            $(document.body).on('appear', '.fade-in-down', function (event, $all_appeared_elements) {
                $(this).each(function () {
                    $(this).addClass('fadeInDown')
                });
            });

            $(document.body).on('appear', '.fade-in-right', function (event, $all_appeared_elements) {
                $(this).each(function () {
                    $(this).addClass('fadeInRight')
                });
            });

            $(document.body).on('appear', '.fade-in-left', function (event, $all_appeared_elements) {
                $(this).each(function () {
                    $(this).addClass('fadeInLeft')
                });
            });
        }
    }
    /*----------------------------------------------------------------------------------*/
    /* Placeholder Support for older browsers
    /*----------------------------------------------------------------------------------*/
    if (jQuery().placeholder) {
        $('input, textarea').placeholder();
    }

    /*----------------------------------------------------------------------------------*/
    /*	IE Browsers Detection
    /*----------------------------------------------------------------------------------*/
    function detectIE() {
        var ms_ie = false,
            ua = window.navigator.userAgent,
            new_ie = ua.indexOf('Trident/');
        if (ie_10_or_older() || (new_ie > -1)) {
            ms_ie = true;
        }
        if (ms_ie) {
            $(".gallery-slider-two").find('img').removeClass('img-responsive');
            $("body").addClass('ie-userAgent');
            return true;
        }
        return false;
    }

    detectIE();

    /*-----------------------------------------------------------------------------------*/
    /* WPML Language Selection
    /*-----------------------------------------------------------------------------------*/
    $(function () {
        var head = $("head"),
            inspiry_language_list = $('#inspiry_language_list'),
            headStyleLast = head.find("style[rel='stylesheet']:last"),
            styleElement = "<style rel='stylesheet' media='screen'>#inspiry_language_list{background-image: url('" + inspiry_language_list.find('li > img').attr("src") + "');}</style>";
        if (headStyleLast.length) {
            headStyleLast.after(styleElement);
        }
        else {
            head.append(styleElement);
        }
    });


    /*-----------------------------------------------------------------------------------*/
    /* Inspiry Highlighted Message
    /*-----------------------------------------------------------------------------------*/
    $('.inspiry-highlighted-message .close-message').on('click', function () {
        $('.inspiry-highlighted-message').remove();
    });


    /*-----------------------------------------------------------------------------------*/
    /* Page Loader
    /*-----------------------------------------------------------------------------------*/
    $window.load(function () {
        $(".page-loader-img").fadeOut();
        $(".page-loader").delay(300).fadeOut("slow", function () {
            $(this).remove();
        });

      // Trigger once to avoid the auto height issue.
      $('.similar-properties-carousel-nav .carousel-next-item').trigger('click');
    });

    /*-----------------------------------------------------------------------------------*/
    /*	Scroll to Top
    /*-----------------------------------------------------------------------------------*/
    $(function(){
        var scroll_anchor = $('#scroll-top');
        $( window ).scroll(function () {
            if ( $( window ).width() > 980 ) {
                if ( $(this).scrollTop() > 250 ) {
                    scroll_anchor.fadeIn('fast');
                    return;
                }
            }
            scroll_anchor.fadeOut('fast');
        });

        scroll_anchor.on( 'click', function ( event ) {
            event.preventDefault();
            $('html, body').animate( { scrollTop:0 }, 'slow' );
        });
    });

    /*-----------------------------------------------------------------*/
    /* Property Floor Plans
     /*-----------------------------------------------------------------*/
    $('.floor-plans-accordions .floor-plan:first-child').addClass('current')
        .children('.floor-plan-content').css('display', 'block').end()
        .find('i.fa').removeClass( 'fa-plus').addClass( 'fa-minus' );

    $('.floor-plan-title').on( 'click', function(){
        var parent_accordion = $(this).closest('.floor-plan');
        if ( parent_accordion.hasClass('current') ) {
            $(this).find('i.fa').removeClass( 'fa-minus').addClass( 'fa-plus' );
            parent_accordion.removeClass('current').children('.floor-plan-content').slideUp(300);
        } else {
            $(this).find('i.fa').removeClass('fa-plus').addClass( 'fa-minus' );
            parent_accordion.addClass('current').children('.floor-plan-content').slideDown(300);
        }
        var siblings = parent_accordion.siblings('.floor-plan');
        siblings.find('i.fa').removeClass( 'fa-minus').addClass( 'fa-plus' );
        siblings.removeClass('current').children('.floor-plan-content').slideUp(300);
    });


})(jQuery);
