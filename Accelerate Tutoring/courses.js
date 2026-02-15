$(document).ready(function () {

    /* STICKY NAVBAR */
    $(window).on("scroll", function () {
        if (window.scrollY > 20) {
            $(".navbar").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
        }
    });

    /* PARALLAX HERO */
    const hero = $(".courses-hero");
    $(window).on("scroll", function () {
        const scrollTop = window.scrollY;
        hero.css("background-position", `center ${scrollTop * 0.35}px`);
    });

    /* FADE-IN + FADE-OUT ANIMATION */
    function animateCards() {
        $(".course-card").each(function () {
            const rect = this.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // When card enters viewport → fade in
            if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                $(this).addClass("show");
            } 
            // When card leaves viewport (scrolling up) → fade out
            else {
                $(this).removeClass("show");
            }
        });
    }

    $(window).on("scroll", animateCards);
    animateCards(); // run on load

    /* CLICK TO EXPAND */
    $(".course-card").on("click", function () {
        const details = $(this).find(".course-details");

        // Optional: collapse all others
        $(".course-details").not(details).removeClass("open");

        details.toggleClass("open");
    });

});
