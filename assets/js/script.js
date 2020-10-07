jQuery(document).ready(function ($) {

    "use strict";

    /*--
        loading page
    --*/
    $(window).on("load", function () {
        $(".loading-page h5").fadeOut(2000, function () {
            $(this).parent().fadeOut(2000);
        });
    });

    /* social media slide out toggle*/
    var right = 0,
        down = 0,
        x = 0;
    $(".open-social").on("click", function () {
        if (x === 0) {
            var anotherCount = 1;

            $('.social-media a').each(function () {
                if (anotherCount <= Math.ceil($(".social-media a").length / 2)) {
                    $(this).css({
                        right: right += 60
                    });
                } else {
                    $(this).css({
                        top: down += 60
                    });
                }
                anotherCount++;

            });
            return [x = 1, right = 0, down = 0];
        }

        if (x === 1) {
            $('.social-media a').css({

                top: 0,
                right: 0

            });
            return x = 0;
        }

    });

    /* ApplyClickEvent */
    function applyClickEvent() {
        if ($('body').hasClass('classy-resume-home')) {
            $('.navigation a[href*=\\#]:not([href=\\#]), .profile .info a[href*=\\#]:not([href=\\#])').on('click', function (e) {
                e.preventDefault();

                if ($($.attr(this, 'href')).length > 0) {
                    $('html, body').animate({
                        scrollTop: $($.attr(this, 'href')).offset().top
                    }, 1000);
                }
                return false;
            });
        }
    }
    applyClickEvent();

    /*
     Navigation trigger close/open
     */
    var nav = $('.navigation');
    $('.nav-open').on("click", function () {

        if ( $(window).width() >= 991 ) {
            nav.toggleClass('nav-big-screen-close');
            nav.removeClass('nav-small-screen-open');

        } else {
            nav.toggleClass('nav-small-screen-open');
            nav.removeClass('nav-big-screen-close');
        }
    });

    // responsive nav when you resize the window
    $(window).on("resize", function () {
        if( $(this).width() >= 991 ) {
            nav.removeClass('nav-small-screen-open');

        } else {
            nav.removeClass('nav-big-screen-close');
        }
    });

    /* Scroll spy */
    $('body').scrollspy({ target: '#navigation' });

    /*--
     tooltip
    --*/
    $('[data-toggle="tooltip"]').tooltip();

    /*--
     Trigger MixitUp
     --*/
    $("#Container").mixItUp();

    /*--
     magnfic-popup
     --*/
    $('.gallery').each(function() { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: '.portfolio-item-links > ul > li:first-of-type > a', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled:true
            }
        });
    });

    // responsive portfolio
    $(window).on("load", function () {

        var cols = $(".mix .portfolio-item");
        cols.parent().css("display", "inline-block");


        for (var i = 0; i < cols.length; i++ ) {
            var heights = [];
            cols.each(function() {
                return heights.push($(this).height());
            });

        }

        var max = Math.max.apply(null, heights),
            min = Math.min.apply(null, heights);


        cols.each(function () {
            if ( $(this).height() < max) {
                $(this).parent().css("margin-bottom", max-min+2);
            }
        });

    });

    // Run owl carousel plugin
    var owl = $(".owl-carousel");
    if ( owl.hasClass("other-projects") ) {
        owl.owlCarousel({
            autoPlay: false, //Set AutoPlay to 3 seconds
            loop:true,
            margin:10,
            nav:true,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },

                480:{
                    items:2,
                    nav:true
                },

                768:{
                    items:3,
                    nav:true
                }
            }
        });
        
        // Go to the next item
        $('.owl-left').on("click", function() {
            owl.trigger('prev.owl.carousel');
        });

        $('.owl-right').on("click", function() {
            owl.trigger('next.owl.carousel');
        });

    }

    if (owl.hasClass("clients-carousel")) {
        owl.owlCarousel({
            autoplay:true,
            autoplayTimeout:1000,
            autoplayHoverPause:true,
            loop:true,
            margin:10,
            nav:true,
            responsiveClass:true,
            responsive:{
                0:{
                    items:2,
                    nav:true
                },

                480:{
                    items:3,
                    nav:true
                },

                768:{
                    items:6,
                    nav:true
                }
            }
        });

        $('.owl-left').on("click", function() {
            owl.trigger('prev.owl.carousel');
        });

        $('.owl-right').on("click", function() {
            owl.trigger('next.owl.carousel');
        });
    }

    // nice scroll trigger
    if ($(window).width() > 1024) {
        $(".nav-content").niceScroll();
    }


    // Faqs collapse function
    $(".collapse-in .answer").hide();
    $(".faqs .question header a").on("click", function (e) {
        e.preventDefault()

        var $this = $(this);
        $this.parent().parent().next().slideToggle();

    });

    // option box
    var z = 0;
    $(".open-close").on("click", function () {
        if (z == 0 ) {
            $(this).parent().css("left", 0);
            return z = 1
        }

        if (z == 1 ) {
            $(this).parent().css("left", "-255px");
            return z = 0;
        }
    });

    $(".themes span").on("click", function () {
        var theme = $(this).attr("class") + "-theme.css";
        $('link[href*="theme.css"]').attr("href", "assets/css/" + theme);
        $('.themes span').children().appendTo(this);
    });

    $(".colors span").on("click", function () {
        var colors = $(this).attr("class") + "-color.css";
        $('link[href*="color.css"]').attr("href", "assets/css/" + colors);
        $('.colors span').children().appendTo(this);
    });

    // Submit the contact form via ajax call
    $(".contact-form form").submit(function(e){

        e.preventDefault();
        var $ = jQuery;

        var postData 		= $(this).serializeArray(),
            formURL 		= $(this).attr("action"),
            $cfResponse 	= $('#contactFormResponse'),
            $cfsubmit 		= $("#cfsubmit"),
            cfsubmitText 	= $cfsubmit.text();

        $cfsubmit.text("Sending...");


        $.ajax(
            {
                url : formURL,
                type: "POST",
                data : postData,
                success:function(data)
                {
                    $cfResponse.html(data);
                    $cfsubmit.text(cfsubmitText);
                },
                error: function(data)
                {
                    alert("Error occurd! Please try again");
                }
            });

        return false;

    });



});


