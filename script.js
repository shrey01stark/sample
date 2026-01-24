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

document.addEventListener('DOMContentLoaded', () => {
    const menuTrigger = document.getElementById('menuTrigger');
    const mobHeader = document.querySelector('.mob-header');

    menuTrigger.addEventListener('click', () => {
        // Toggle the Cross Icon
        menuTrigger.classList.toggle('active');
        
        // Toggle the Div visibility (0 to 100%)
        mobHeader.classList.toggle('open');
    });

    // Optional: Close menu when a link is clicked
    const mobLinks = document.querySelectorAll('.mob-a');
    mobLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuTrigger.classList.remove('active');
            mobHeader.classList.remove('open');
        });
    });
});


const header = document.querySelector('header');
const showAnim = gsap.from(header, { 
  yPercent: -120,
  paused: true,
  duration: 0.3
}).progress(1);

ScrollTrigger.create({
  start: "top top",
  end: 99999,
  onUpdate: (self) => {
    // self.direction is 1 when scrolling down, -1 when scrolling up
    if (self.direction === -1) {
      showAnim.play(); // Scrolling up: Show header
    } else {
      showAnim.reverse(); // Scrolling down: Hide header
    }
  }
});

/*
 JS to toggle scroll axis styles
*/
const control = document.getElementById("direction-toggle");
const marquees = document.querySelectorAll(".marquee");
const wrapper = document.querySelector(".wrapper");

control.addEventListener("click", () => {
  control.classList.toggle("toggle--vertical");
  wrapper.classList.toggle("wrapper--vertical");
  [...marquees].forEach((marquee) =>
    marquee.classList.toggle("marquee--vertical")
  );
});
