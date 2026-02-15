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
    const hero = $(".register-hero");
    $(window).on("scroll", function () {
        const scrollTop = window.scrollY;
        hero.css("background-position", `center ${scrollTop * 0.35}px`);
    });

    /* POPUP */
    const popup = $("#register-popup");
    const closeBtn = $("#popup-close");

    $("#registerForm").on("submit", function (e) {
        e.preventDefault();
        popup.css("display", "flex");
        this.reset();
    });

    closeBtn.on("click", function () {
        popup.hide();
    });

    $(window).on("click", function (e) {
        if (e.target.id === "register-popup") {
            popup.hide();
        }
    });

});
