/* =========================================================
   VINIT GUJRATHI PORTFOLIO
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


if (menuButton && navLinks) {

    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle("active");

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/* =========================================================
   THEME
========================================================= */

const themeButton =
    document.getElementById("themeButton");


const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme === "light") {

    document.body.classList.add(
        "light-theme"
    );

    if (themeButton) {

        themeButton.textContent = "☾";

    }

}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );


            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );


            localStorage.setItem(
                "portfolio-theme",
                isLight
                    ? "light"
                    : "dark"
            );


            themeButton.textContent =
                isLight
                    ? "☾"
                    : "☼";

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


function updateNavigation() {

    let currentSection = "";


    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop - 180;


            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navigationLinks.forEach(
        (link) => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute(
                    "href"
                ) ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateNavigation
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-label, " +
        ".section-title, " +
        ".about-content, " +
        ".experience-item, " +
        ".projects-intro, " +
        ".project, " +
        ".skills-heading, " +
        ".skill-row, " +
        ".achievements-heading, " +
        ".profile-row, " +
        ".achievement-row, " +
        ".beyond-layout, " +
        ".contact-copy, " +
        ".contact-form"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "reveal",
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.08
        }
    );


revealElements.forEach(
    (element) => {

        element.classList.add(
            "reveal"
        );

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const submitButton =
    document.getElementById(
        "submitButton"
    );


const formStatus =
    document.getElementById(
        "formStatus"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            if (!submitButton) {
                return;
            }


            const originalText =
                submitButton.innerHTML;


            submitButton.disabled =
                true;


            submitButton.innerHTML =
                "Sending...";


            if (formStatus) {

                formStatus.textContent =
                    "";

            }


            const formData =
                new FormData(
                    contactForm
                );


            try {

                const response =
                    await fetch(
                        "https://formsubmit.co/ajax/vinitgujrathi87@gmail.com",
                        {
                            method: "POST",

                            headers: {
                                "Accept":
                                    "application/json"
                            },

                            body: formData
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Request failed"
                    );

                }


                const result =
                    await response.json();


                if (
                    result.success === false
                ) {

                    throw new Error(
                        "Submission failed"
                    );

                }


                contactForm.reset();


                if (formStatus) {

                    formStatus.textContent =
                        "Message sent successfully.";

                }


                submitButton.innerHTML =
                    "Message sent ✓";


            } catch (error) {

                console.error(error);


                if (formStatus) {

                    formStatus.textContent =
                        "Couldn't send the message. Please email me directly.";

                }


                submitButton.innerHTML =
                    originalText;

            }


            setTimeout(
                () => {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalText;

                },
                4000
            );

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

updateNavigation();
