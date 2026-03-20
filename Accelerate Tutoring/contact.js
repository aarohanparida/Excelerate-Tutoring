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
    const hero = $(".contact-hero");
    $(window).on("scroll", function () {
        const scrollTop = window.scrollY;
        hero.css("background-position", `center ${scrollTop * 0.35}px`);
    });

    /* POPUP */
    const popup = $("#contact-popup");
    const closeBtn = $("#popup-close");
    const submitBtn = $("#submitBtn");
    const contactForm = $("#contactForm");

    // Form submission with validation
    contactForm.on("submit", function (e) {
        e.preventDefault();

        // clear previous errors
        $(".error").text('');

        const name = $("#contactName").val().trim();
        const email = $("#contactEmail").val().trim();
        const message = $("#contactMessage").val().trim();

        let valid = true;

        // validate name
        if (!name || name.length < 2) {
            $("#nameError").text('Please enter a valid name.');
            valid = false;
        }

        // validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            $("#emailError").text('Please enter a valid email address.');
            valid = false;
        }

        // validate message
        if (!message || message.length < 5) {
            $("#messageError").text('Please enter a message (at least 5 characters).');
            valid = false;
        }

        if (!valid) {
            // focus first error field
            const firstErr = $(".error").filter(function() { return $(this).text().length > 0; }).first();
            if (firstErr.length) {
                const related = firstErr.prevAll('input,textarea').first();
                if (related.length) related.focus();
            }
            return;
        }

        // form is valid: submit to Web3Forms
        submitBtn.prop('disabled', true).addClass('loading');
        submitBtn.text('Sending...');

        // Use fetch to submit form and show success popup
        const formData = new FormData(contactForm[0]);
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                popup.css("display", "flex");
                contactForm[0].reset();
                submitBtn.text('Send Message');
            } else {
                $("#messageError").text('Failed to send message. Please try again.');
                submitBtn.text('Send Message');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            $("#messageError").text('An error occurred. Please try again.');
            submitBtn.text('Send Message');
        })
        .finally(() => {
            submitBtn.prop('disabled', false).removeClass('loading');
        });
    });

    closeBtn.on("click", function () {
        popup.hide();
    });

    $(window).on("click", function (e) {
        if (e.target.id === "contact-popup") {
            popup.hide();
        }
    });

});
