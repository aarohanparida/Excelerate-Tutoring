$(document).ready(function () {

    /* ===================== STICKY NAVBAR ===================== */
    $(window).on("scroll", function () {
        if (window.innerWidth <= 992) return;
        if (window.scrollY > 20) {
            $(".navbar").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
        }
    });

    /* ===================== MOBILE MENU TOGGLE ===================== */
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

    /* ===================== HOME HERO PARALLAX ===================== */
    const homeHero = $(".home");
    const heroContent = $(".home-content");
    const heroGraphic = $(".graphic");

    if (homeHero.length) {
        $(window).on("scroll", function () {
            if (window.innerWidth <= 992) return; // disabled on mobile

            const scrollY = window.scrollY;

            // Background parallax
            homeHero.css(
                "background-position",
                `center ${scrollY * 0.25}px`
            );

            // Content fade + slide
            const heroHeight = homeHero.outerHeight();
            let progress = scrollY / heroHeight;
            progress = Math.min(Math.max(progress, 0), 1);

            heroContent.css({
                opacity: 1 - progress,
                transform: `translateX(${-progress * 80}px)`
            });

            heroGraphic.css({
                opacity: 1 - progress,
                transform: `translateY(${scrollY * 0.35}px) translateX(${progress * 80}px)`
            });
        });
    }

    /* ===================== SCROLL FADE-UP (STATS ETC) ===================== */
    $(window).on("scroll", function () {
        $(".scroll-fade-up").each(function () {
            const rect = this.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const trigger = windowHeight * 0.85;

            let progress = 1 - rect.top / trigger;
            progress = Math.max(0, Math.min(1, progress));

            $(this).css({
                opacity: progress,
                transform: `translateY(${60 - progress * 60}px)`
            });
        });
    });

    $(window).on("scroll", function () {
        const stats = $(".stats");
        if (!stats.length) return;
        if (window.innerWidth <= 992) return; // disabled on mobile

        const scrollY = window.scrollY;
        const statsTop = stats.offset().top;
        const windowHeight = window.innerHeight;

        const triggerStart = statsTop - windowHeight;
        const triggerEnd = statsTop;

        let progress = (scrollY - triggerStart) / (triggerEnd - triggerStart);
        progress = Math.max(0, Math.min(1, progress));

        const offset = -120 * progress;
        stats.css("transform", `translateY(${offset}px)`);
    });

    $(window).on("scroll", function () {
        const statsContent = $(".stats-content");
        if (!statsContent.length) return;

        const rect = statsContent[0].getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const statsCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;

        let progress = 1 - Math.abs(statsCenter - screenCenter) / (windowHeight * 0.5);
        progress = Math.max(0, Math.min(1, progress));

        statsContent.css("opacity", progress);
    });

    /* ===================== REGISTER BUTTON NAVIGATION FOR NAVBAR/FOOTER ===================== */
    function enforceRegisterLinks() {
        const registerLinks = $(".navbar a, .footer a").filter(function () {
            const txt = $(this).text().trim().toLowerCase();
            return txt === "register" || txt.includes("register");
        });

        registerLinks.attr("href", "register.html");

        registerLinks.on("click", function (e) {
            e.preventDefault();
            window.location.href = "register.html";
        });
    }

    enforceRegisterLinks();

    /* ===================== GENERIC PARALLAX FOR ANY SECTION ===================== */
    $(window).on("scroll", function () {
        if (window.innerWidth <= 992) return; // disabled on mobile

        const scrollY = window.scrollY;
        $(".parallax").each(function () {
            const sec = $(this);
            const offset = sec.offset().top;
            const relative = scrollY - offset;
            sec.css("background-position", `center ${relative * 0.25}px`);
        });
    });
});
