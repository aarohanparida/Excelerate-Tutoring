$(document).ready(function () {

    /* STICKY NAVBAR */
    $(window).on("scroll", function () {
        if (window.scrollY > 20) {
            $(".navbar").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
        }
    });

    /* MOBILE MENU TOGGLE */
    function setupMobileMenu() {
        const isMobile = window.innerWidth <= 992;

        if (!isMobile) {
            $('.navbar .menu').removeClass('active');
            $('.menu-btn').remove();
            return;
        }

        if (!$('.navbar .menu-btn').length) {
            $('.navbar .max-width').append('<div class="menu-btn"><i class="fas fa-bars"></i></div>');
        }

        $('.menu-btn').off('click').on('click', function (e) {
            e.stopPropagation();
            $('.navbar .menu').toggleClass('active');
        });

        $(document).off('click.mobileMenu').on('click.mobileMenu', function (e) {
            if (!$(e.target).closest('.navbar').length) {
                $('.navbar .menu').removeClass('active');
            }
        });

        $('.navbar .menu li a').off('click').on('click', function () {
            $('.navbar .menu').removeClass('active');
        });
    }

    setupMobileMenu();
    $(window).on('resize', setupMobileMenu);

    /* PARALLAX HERO */
    const hero = $(".tutors-hero");
    $(window).on("scroll", function () {
        const scrollTop = window.scrollY;
        hero.css("background-position", `center ${scrollTop * 0.35}px`);
    });

    /* FADE-IN + FADE-OUT ANIMATION */
    function animateCards() {
        $(".tutor-card").each(function () {
            const rect = this.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                $(this).addClass("show");
            } else {
                $(this).removeClass("show");
            }
        });
    }

    $(window).on("scroll", animateCards);
    animateCards();

    /* CLICK TO EXPAND */
    $(".tutor-card").on("click", function () {
        const details = $(this).find(".tutor-details");
        $(".tutor-details").not(details).removeClass("open");
        details.toggleClass("open");
    });

});
