document.addEventListener("DOMContentLoaded", () => {
    /* 
       Initialiser Lenis Smooth Scroll.
       Lenis er et tredjeparts-bibliotek, der normaliserer scrolling på tværs af browsere 
       og giver en moderne, "træghed" (inertia) fornemmelse.
    */
    // Initialiser Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        window.lenis = new Lenis({
            lerp: 0.1,
            wheelMultiplier: 0.7,
            gestureOrientation: "vertical",
            normalizeWheel: false,
            smoothTouch: false
        });

        /* 
           Request Animation Frame (RAF) Loop.
           Lenis kræver, at vi kalder deres 'raf' metode i hver eneste frame
           for at beregne den glatte scrolling.
        */
        function raf(time) {
            window.lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }
});

/*
  Kilder & Inspiration:
  - Github: Lenis Smooth Scroll (https://github.com/darkroomengineering/lenis)
  - MDN: Window.requestAnimationFrame (https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
*/
