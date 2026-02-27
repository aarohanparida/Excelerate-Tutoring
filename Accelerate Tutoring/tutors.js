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
