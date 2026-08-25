"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const html = document.documentElement;

const header = document.getElementById("header");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const revealElements = document.querySelectorAll(".reveal");

const sections = document.querySelectorAll("section[id]");

const mouseGlow = document.getElementById("mouseGlow");

const yearElement = document.getElementById("currentYear");


/* =========================================================
   DARK / LIGHT THEME

   Default = DARK
========================================================= */

function applyTheme(theme) {

    html.setAttribute("data-theme", theme);


    if (theme === "dark") {

        themeIcon.textContent = "☀";

        document
            .querySelector('meta[name="theme-color"]')
            .setAttribute(
                "content",
                "#181c24"
            );

    } else {

        themeIcon.textContent = "☾";

        document
            .querySelector('meta[name="theme-color"]')
            .setAttribute(
                "content",
                "#edf1f6"
            );

    }

}


/*
    Check if the visitor previously selected
    a theme.

    If no saved choice exists, DARK is used.
*/

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    applyTheme("light");

} else {

    applyTheme("dark");

}


/* Theme toggle */

themeToggle.addEventListener("click", () => {

    const currentTheme =
        html.getAttribute("data-theme");


    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";


    applyTheme(newTheme);


    localStorage.setItem(
        "portfolio-theme",
        newTheme
    );

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function closeMobileMenu() {

    navMenu.classList.remove("open");

    menuToggle.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


menuToggle.addEventListener("click", () => {

    const isOpen =
        navMenu.classList.toggle("open");


    menuToggle.classList.toggle(
        "active",
        isOpen
    );


    document.body.classList.toggle(
        "menu-open",
        isOpen
    );


    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});


navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMobileMenu
    );

});


/*
    Close menu when user clicks outside
    of mobile navigation.
*/

document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        navMenu.contains(event.target);


    const clickedMenuButton =
        menuToggle.contains(event.target);


    if (
        navMenu.classList.contains("open") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        closeMobileMenu();

    }

});


/* =========================================================
   HEADER STYLE ON SCROLL
========================================================= */

function updateHeader() {

    if (window.scrollY > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


updateHeader();


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add("visible");


                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -40px 0px"
        }

    );


revealElements.forEach((element) => {

    element.classList.add("reveal-ready");

    revealObserver.observe(element);

});


/* =========================================================
   STAGGER INITIAL HERO ANIMATIONS
========================================================= */

const heroRevealElements =
    document.querySelectorAll(
        "#home .reveal"
    );


heroRevealElements.forEach(
    (element, index) => {

        element.style.transitionDelay =
            `${index * 80}ms`;

    }
);


/* =========================================================
   ACTIVE NAV LINK WHILE SCROLLING
========================================================= */

function updateActiveNavigation() {

    let currentSection = "home";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 170;


        if (
            window.scrollY >= sectionTop
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (
            href ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


updateActiveNavigation();


/* =========================================================
   SUBTLE CURSOR GLOW

   Only enabled on desktop devices.
========================================================= */

const canUseMouseGlow =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


if (canUseMouseGlow && mouseGlow) {

    window.addEventListener(
        "mousemove",
        (event) => {

            mouseGlow.style.left =
                `${event.clientX}px`;

            mouseGlow.style.top =
                `${event.clientY}px`;

        }
    );

} else if (mouseGlow) {

    mouseGlow.style.display = "none";

}


/* =========================================================
   PROJECT CARD POINTER EFFECT
========================================================= */

const cards =
    document.querySelectorAll(
        ".project-card, .skill-card, .achievement-card"
    );


if (canUseMouseGlow) {

    cards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );

    });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SMOOTH INTERNAL LINK SCROLLING
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((anchor) => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   BUTTON PRESS EFFECT
========================================================= */

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach((button) => {

    button.addEventListener(
        "mousedown",
        () => {

            button.style.transform =
                "translateY(-1px) scale(0.98)";

        }
    );


    button.addEventListener(
        "mouseup",
        () => {

            button.style.transform = "";

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform = "";

        }
    );

});


/* =========================================================
   REMOVE HERO ANIMATION DELAYS AFTER LOAD

   This prevents the delays from affecting elements
   if they re-render.
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        heroRevealElements.forEach(
            (element) => {

                element.style.transitionDelay =
                    "0ms";

            }
        );

    }, 1200);

});
