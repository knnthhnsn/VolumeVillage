document.addEventListener("DOMContentLoaded", () => {
    // Initialiser Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        window.lenis = new Lenis({
            lerp: 0.1,
            wheelMultiplier: 0.7,
            gestureOrientation: "vertical",
            normalizeWheel: false,
            smoothTouch: false
        });

        function raf(time) {
            window.lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }
});
