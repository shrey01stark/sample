gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", function() {
const preloader = document.getElementById("preloader");


setTimeout(function() {
    // Hide the loader
    preloader.classList.add("loader-hidden");
    // Re-enable scrolling
    document.body.style.overflow = "auto";
}, 2000); // 3 seconds
});

gsap.from(".h1", {
    y: 100,
    opacity: 0,
    duration: 3,
    delay: 0.5,
    ease: "power4.out"
});

gsap.from(".header-center", {
    y: -40,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
});

gsap.from(".connect", {
    x: 100,
    opacity: 0,
    duration: 3,
    delay: 0.5,
    ease: "power4.out"  
});


document.addEventListener("DOMContentLoaded", () => {

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function applyScrambleEffect(selector) {
        document.querySelectorAll(selector).forEach(el => {
            const originalText = el.innerText;
            let interval = null;

            el.addEventListener("mouseenter", () => {
                let iteration = 0;
                clearInterval(interval);

                interval = setInterval(() => {
                    el.innerText = originalText
                        .split("")
                        .map((char, index) => {
                            if (index < iteration) {
                                return originalText[index];
                            }
                            return letters[Math.floor(Math.random() * letters.length)];
                        })
                        .join("");

                    if (iteration >= originalText.length) {
                        clearInterval(interval);
                    }

                    iteration += 0.8;
                }, 30);
            });

            el.addEventListener("mouseleave", () => {
                clearInterval(interval);
                el.innerText = originalText;
            });
        });
    }

    applyScrambleEffect(".header-center a");

});

gsap.to(".text-highlight", {
  backgroundPositionX: "0%",
  ease: "none",
  delay:2,
  duration:3
});

const panels = [document.querySelector(".main-div1")];

panels.forEach((panel) => {
    gsap.timeline({
        scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: true
        }
    })
    .to(panel, {
        scale: 0.9,
        y: -80,
        opacity: 0.5,
        ease: "power2.out"
    });
});



CustomEase.create(
    "hop",
    "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
);

const carouselSlides = [
    { title: "Bhavye — Marketing Director", image: "carousel/slide-img-1.jpg" },
    { title: "Vatsal — Prez", image: "carousel/slide-img-2.jpg" },
    { title: "Siddhant — Vice Prez", image: "carousel/slide-img-3.jpg" },
    { title: "Garima — Gen Sec", image: "carousel/slide-img-4.jpg" },
    { title: "Divisha — Consulting Head", image: "carousel/slide-img-5.jpg" },
];

let carousel, carouselImages, prevBtn, nextBtn;
let currentIndex = 0;
let carouselTextElements = [];
let splitTextInstances = [];
let isAnimating = false;

function initCarousel() {
    carousel = document.querySelector(".carousel");
    carouselImages = document.querySelector(".carousel-images");
    prevBtn = document.querySelector(".prev-btn");
    nextBtn = document.querySelector(".next-btn");

    createCarouselTitles();
    createInitialSlide();
    bindCarouselControls();

    document.fonts.ready.then(() => {
        splitTitles();
        hideAllTitles();      // STEP 1
        initFirstSlide();    // STEP 2
    });
}

function createCarouselTitles() {
    carouselSlides.forEach((slide) => {
        const slideTitleContainer = document.createElement("div");
        slideTitleContainer.classList.add("slide-title-container");

        const slideTitle = document.createElement("h1");
        slideTitle.classList.add("title");
        slideTitle.textContent = slide.title;

        slideTitleContainer.appendChild(slideTitle);
        carousel.appendChild(slideTitleContainer);

        carouselTextElements.push(slideTitleContainer);
    });
}

function createInitialSlide() {
    const initialSlideImgContainer = document.createElement("div");
    initialSlideImgContainer.classList.add("img");

    const initialSlideImg = document.createElement("img");
    initialSlideImg.classList.add("img-carousel");
    initialSlideImg.src = carouselSlides[0].image;

    initialSlideImgContainer.appendChild(initialSlideImg);
    carouselImages.appendChild(initialSlideImgContainer);
}

function splitTitles() {
    carouselTextElements.forEach((slide) => {
        const slideTitle = slide.querySelector(".title");
        const splitText = new SplitText(slideTitle, {
            type: "words",
            wordsClass: "word",
        });
        splitTextInstances.push(splitText);
    });
}

/* =========================
   STEP 1 – HARD HIDE ALL
========================= */
function hideAllTitles() {
    carouselTextElements.forEach((slide) => {
        const words = slide.querySelectorAll(".word");
        gsap.set(words, {
            filter: "blur(75px)",
            opacity: 0
        });
    });
}

/* =========================
   STEP 2 – FIRST SLIDE IN
========================= */
function initFirstSlide() {
    currentIndex = 0;

    const words = carouselTextElements[0].querySelectorAll(".word");

    gsap.fromTo(words,
        {
            y: 80,
            opacity: 0,
            filter: "blur(40px)",
            skewY: 6,
            scaleY: 1.3
        },
        {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            skewY: 0,
            scaleY: 1,
            duration: 1.6,
            ease: "power4.out",
            stagger: {
                each: 0.08,
                from: "center"
            }
        }
    );
}


function bindCarouselControls() {
    nextBtn.addEventListener("click", () => {
        if (isAnimating) return;
        currentIndex = (currentIndex + 1) % carouselSlides.length;
        animateSlide("right");
    });

    prevBtn.addEventListener("click", () => {
        if (isAnimating) return;
        currentIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
        animateSlide("left");
    });
}

/* =========================
   STEP 3 – CLEAN STATE TEXT
========================= */
function updateActiveTextSlide() {
    carouselTextElements.forEach((slide, i) => {
        const words = slide.querySelectorAll(".word");

        if (i === currentIndex) {
            gsap.fromTo(words,
                {
                    y: 80,
                    opacity: 0,
                    filter: "blur(40px)",
                    skewY: 6,
                    scaleY: 1.3
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    skewY: 0,
                    scaleY: 1,
                    duration: 1.4,
                    ease: "power4.out",
                    stagger: {
                        each: 0.08,
                        from: "center"
                    },
                    overwrite: true
                }
            );
        } else {
            gsap.to(words, {
                y: -60,
                opacity: 0,
                filter: "blur(60px)",
                skewY: -6,
                duration: 0.8,
                ease: "power3.in",
                overwrite: true
            });
        }
    });
}

const turbulence = document.querySelector('#liquid-distortion feTurbulence');

gsap.to(turbulence, {
    attr: {
        baseFrequency: "0.02 0.04"
    },
    duration: 6,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
});



/* =========================
   SLIDE ANIMATION
========================= */
function animateSlide(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const viewportWidth = window.innerWidth;
    const slideOffset = Math.min(viewportWidth * 0.5, 500);

    const currentSlide = carouselImages.querySelector(".img:last-child");
    const currentSlideImage = currentSlide.querySelector("img");

    const newSlideImgContainer = document.createElement("div");
    newSlideImgContainer.classList.add("img");

    const newSlideImg = document.createElement("img");
    newSlideImg.classList.add("img-carousel");
    newSlideImg.src = carouselSlides[currentIndex].image;

    gsap.set(newSlideImg, {
        x: direction === "left" ? -slideOffset : slideOffset,
    });

    newSlideImgContainer.appendChild(newSlideImg);
    carouselImages.appendChild(newSlideImgContainer);

    gsap.to(currentSlideImage, {
        x: direction === "left" ? slideOffset : -slideOffset,
        duration: 1.5,
        ease: "hop",
    });

    gsap.fromTo(
        newSlideImgContainer,
        {
            clipPath: direction === "left"
                ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        },
        {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "hop",
            onComplete: () => {
                cleanupCarouselSlides();
                isAnimating = false;
            },
        }
    );

    gsap.to(newSlideImg, {
        x: 0,
        duration: 1.5,
        ease: "hop",
    });

    updateActiveTextSlide();   // STEP 4 – always after index change
}

function cleanupCarouselSlides() {
    const imgElements = carouselImages.querySelectorAll(".img");
    if (imgElements.length > 1) {
        for (let i = 0; i < imgElements.length - 1; i++) {
            imgElements[i].remove();
        }
    }
}

document.addEventListener("DOMContentLoaded", initCarousel);



// Custom cursor

const cursor = document.querySelector(".custom-cursor");
const clickableElements = document.querySelectorAll("a, h1, button, .connect");

let cursorVisible = false;

// Show cursor on first move
document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursor.style.transform = `translate(${x}px, ${y}px) scale(${cursor.classList.contains("link-hover") ? 1 : 0.3})`;

    if (!cursorVisible) {
        cursor.classList.add("active");
        cursorVisible = true;
    }
});

// Hide when leaving window
document.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
    cursorVisible = false;
});

// Hover effect for links/buttons
clickableElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("link-hover");
    });

    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("link-hover");
    });
});

// Meet Our Core Animation

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ===============================
   CORE TEAM SCROLL ANIMATION
=============================== */

const coreText = document.querySelector(".animated-text");
const splitCore = new SplitText(coreText, { type: "words" });

gsap.set(splitCore.words, {
    opacity: 0,
    y: 100,
    filter: "blur(40px)"
});

const coreTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".main-div2",
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        anticipatePin: 1
    }
});


coreTimeline
    .to(splitCore.words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power4.out",
        stagger: {
            each: 0.4,
            from: "start"
        }
    })
    .to(".edge-glow", {
        x: "30%",
        opacity: 1,
        duration: 2,
        ease: "sine.inOut"
    }, 0)
gsap.set(".animated-text", {
    x: "30%"   // start 30% inside the container
});

coreTimeline.to(".animated-text", {
    x: "-40%",   // move left so it exits
    ease: "none",
    duration: 2
}, 0.3);


gsap.from(".main-div2", {
    y: 150,
    opacity: 0,
    scrollTrigger: {
        trigger: ".main-div2",
        start: "top 80%",
        end: "top 40%",
        scrub: true
    }
});
gsap.from(".main-div3", {
    y: 150,
    opacity: 0,
    scrollTrigger: {
        trigger: ".main-div2",
        start: "top 80%",
        end: "top 40%",
        scrub: true
    }
});

gsap.from(".main-div4", {
    y: 150,
    opacity: 0,
    scrollTrigger: {
        trigger: ".main-div2",
        start: "top 80%",
        end: "top 40%",
        scrub: true
    }
});

gsap.from(".main-div5", {
    y: 150,
    opacity: 0,
    scrollTrigger: {
        trigger: ".main-div2",
        start: "top 80%",
        end: "top 40%",
        scrub: true
    }
});

const backToTop = document.querySelector(".footer-backtotop");

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

