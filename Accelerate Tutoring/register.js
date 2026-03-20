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

    /* POPUP */
    const popup = $("#register-popup");
    const closeBtn = $("#popup-close");

    // helper: update selected counts for courses (checkbox list) and for selects
    function updateCountFor(selector, countId) {
        let count = 0;
        const el = $(selector);
        if (el.is('select')) {
            count = el.find('option:selected').length;
        } else {
            count = $(selector + " input:checked").length;
        }
        $(`#${countId}`).text(count);
    }

    // initialize counts
    updateCountFor('#coursesList', 'coursesCount');
    updateCountFor('#teachersList', 'teachersCount');

    // courses: checkboxes inside #coursesList
    $(document).on('change', "#coursesList input[type='checkbox']", function () { updateCountFor('#coursesList', 'coursesCount'); });
    // teachers: checkboxes inside #teachersList
    $(document).on('change', "#teachersList input[type='checkbox']", function () { updateCountFor('#teachersList', 'teachersCount'); });

    // searchable filter for courses
    $("#courseSearch").on('input', function () {
        const q = $(this).val().toLowerCase().trim();
        $("#coursesList label").each(function () {
            const text = $(this).text().toLowerCase();
            if (q === '' || text.indexOf(q) !== -1) {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        });
    });

    // searchable filter for teachers
    $("#teacherSearch").on('input', function () {
        const q = $(this).val().toLowerCase().trim();
        $("#teachersList label").each(function () {
            const text = $(this).text().toLowerCase();
            if (q === '' || text.indexOf(q) !== -1) {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        });
    });

    $("#registerForm").on("submit", function (e) {
        e.preventDefault();

        // clear previous errors
        $(".error").text('');

        const phone = $("#parentPhone").val().trim();
        const coursesSelected = $("input[name='courses[]']:checked").length;

        let valid = true;

        // basic phone validation (digits, spaces, parentheses, +, - allowed)
        const phonePattern = /^[0-9()\s+\-]{7,20}$/;
        if (!phonePattern.test(phone)) {
            $("#phoneError").text('Please enter a valid phone number.');
            valid = false;
        }

        if (coursesSelected < 1) {
            $("#coursesError").text('Please select at least one course.');
            valid = false;
        }

        if (!valid) {
            // focus first visible error (special-case courses)
            const firstErr = $('.error').filter(function(){ return $(this).text().length>0; }).first();
            if (firstErr.length) {
                if (firstErr.attr('id') === 'coursesError') {
                    $('#courseSearch').focus();
                } else {
                    const related = firstErr.prevAll('input,select').first();
                    if (related.length) related.focus();
                }
            }
            return;
        }

        // prepare form data for Web3Forms
        const formEl = this;
        const formData = new FormData(formEl);

        fetch(formEl.action, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                popup.css("display", "flex");
                formEl.reset();
                // clear any filtering and update counts
                $('#courseSearch').val('');
                $('#coursesList label').removeClass('hidden');
                updateCountFor('#coursesList', 'coursesCount');
                updateCountFor('#teachersList', 'teachersCount');
            } else {
                alert('Submission failed – please try again.');
                console.error('Web3Forms error', data);
            }
        })
        .catch(err => {
            alert('An error occurred while submitting.');
            console.error(err);
        });
    });

    closeBtn.on("click", function () {
        popup.hide();
    });

    $(window).on("click", function (e) {
        if (e.target.id === "register-popup") {
            popup.hide();
        }
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
            // Refresh to force top of register page when already on register.html
            window.location.href = "register.html";
        });
    }

    enforceRegisterLinks();

    // Make sure any current register page loads from top
    if (window.location.pathname.replace(/.*\//, "") === "register.html") {
        window.scrollTo(0, 0);
    }

});
