/* =========================================
   HAGONOY WEBSITE JAVASCRIPT
========================================= */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let slideTimer;


function showSlide(index) {

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
}


function nextSlide() {

    let next = currentSlide + 1;

    if (next >= slides.length) {
        next = 0;
    }

    showSlide(next);
}


function startSlideshow() {

    clearInterval(slideTimer);

    slideTimer = setInterval(() => {
        nextSlide();
    }, 3500);
}


dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);
        startSlideshow();

    });

});


startSlideshow();


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================
   SMOOTH NAVIGATION
========================================= */

const navLinks = document.querySelectorAll('a[href^="#"]');


navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetID = link.getAttribute("href");

        if (targetID === "#") {
            return;
        }

        const target = document.querySelector(targetID);

        if (!target) {
            return;
        }

        event.preventDefault();

        const navbarHeight = navbar.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================
   HERO PARALLAX EFFECT
========================================= */

const hero = document.querySelector(".hero");


window.addEventListener("scroll", () => {

    if (!hero) {
        return;
    }

    const scrollPosition = window.scrollY;

    if (scrollPosition < window.innerHeight) {

        const slidesContainer =
            document.querySelector(".hero-slides");

        slidesContainer.style.transform =
            `translateY(${scrollPosition * 0.18}px)`;

    }

});


/* =========================================
   IMAGE LOAD EFFECT
========================================= */

const allImages = document.querySelectorAll("img");


allImages.forEach((image) => {

    image.addEventListener("load", () => {
        image.classList.add("loaded");
    });

});


/* =========================================
   CARD MOUSE EFFECT
========================================= */

const cards = document.querySelectorAll(
    ".category-card, .festival-card"
);


cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -5;

        const rotateY =
            ((x / rect.width) - 0.5) * 5;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================
   HERO TITLE LETTER EFFECT
========================================= */

const heroLetters =
    document.querySelectorAll(".hero-title span");


heroLetters.forEach((letter, index) => {

    letter.style.animationDelay =
        `${index * 0.08}s`;

});


/* =========================================
   ACTIVE NAV LINK
========================================= */

const sections = document.querySelectorAll(
    "section[id]"
);


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });


    document.querySelectorAll(".navbar nav a").forEach((link) => {

        link.classList.remove("active-link");

        const href =
            link.getAttribute("href");

        if (href === `#${current}`) {
            link.classList.add("active-link");
        }

    });

});