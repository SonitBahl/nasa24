(function ($) {

    "use strict";

    // Page loading animation
    $(window).on('load', function() {
        $('#js-preloader').addClass('loaded');

        if($('.cover').length){
            $('.cover').parallax({
                imageSrc: $('.cover').data('image'),
                zIndex: '1'
            });
        }

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });
    });

    // Scroll effect for header background
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var box = $('.header-text').height();
        var header = $('header').height();

        if (scroll >= box - header) {
            $("header").addClass("background-header");
        } else {
            $("header").removeClass("background-header");
        }
    });

    // Handle window resize
    var width = $(window).width();
    $(window).resize(function() {
        if ((width > 767 && $(window).width() < 767) || (width < 767 && $(window).width() > 767)) {
            location.reload();
        }
    });

    // Isotope filter
    const elem = document.querySelector('.trending-box');
    const filtersElem = document.querySelector('.trending-filter');
    if (elem) {
        const rdn_events_list = new Isotope(elem, {
            itemSelector: '.trending-items',
            layoutMode: 'masonry'
        });
        if (filtersElem) {
            filtersElem.addEventListener('click', function(event) {
                if (!matchesSelector(event.target, 'a')) {
                    return;
                }
                const filterValue = event.target.getAttribute('data-filter');
                rdn_events_list.arrange({
                    filter: filterValue
                });
                filtersElem.querySelector('.is_active').classList.remove('is_active');
                event.target.classList.add('is_active');
                event.preventDefault();
            });
        }
    }

    // Menu Dropdown Toggle
    if ($('.menu-trigger').length) {
        $(".menu-trigger").on('click', function() {    
            $(this).toggleClass('active');
            $('.header-area .nav').slideToggle(200);
        });
    }

    // Menu elevator animation
    $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                var width = $(window).width();
                if (width < 991) {
                    $('.menu-trigger').removeClass('active');
                    $('.header-area .nav').slideUp(200);    
                }                
                $('html,body').animate({
                    scrollTop: (target.offset().top) - 80
                }, 700);
                return false;
            }
        }
    });

    // Manage active class for navbar
    $(document).ready(function() {
        var navLinks = $('.main-nav .nav li a');
        
        // Function to remove active class from all links
        function removeActiveClass() {
            navLinks.removeClass('active');
        }
        
        // Add click event listener to each link
        navLinks.on('click', function() {
            removeActiveClass();
            $(this).addClass('active');
        });

        // Optionally, handle the active class on page load
        var currentPath = window.location.pathname.split('/').pop();
        navLinks.each(function() {
            if ($(this).attr('href') === currentPath) {
                removeActiveClass();
                $(this).addClass('active');
            }
        });
    });

})(window.jQuery);