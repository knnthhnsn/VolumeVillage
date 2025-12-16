document.addEventListener("DOMContentLoaded", () => {
    /* 
       Initialiser Lenis Smooth Scroll.
       Lenis er et værktøj (bibliotek) vi har hentet udefra.
       Det gør, at når du scroller på siden, føles det blødt og lækkert ("smooth"), 
       i stedet for den normale "hakkede" scroll.
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
           For at Lenis kan virke, skal den opdateres hele tiden ca. 60 gange i sekundet (hver gang skærmen tegnes).
           `requestAnimationFrame` fortæller browseren: "Næste gang du tegner skærmen, så kør denne funktion (raf)".
           Og inde i funktionen kalder vi `requestAnimationFrame` igen, så det kører i ring (loop).
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
