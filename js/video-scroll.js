document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.video-scroll-section');
    const video = document.querySelector('.scroll-video');

    if (!section || !video) return;

    let hasPlayed = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Når sektionen dækker det meste af skærmen (tærskel 0.5 eller lignende)
            if (entry.isIntersecting && !hasPlayed) {
                lockAndPlay();
            }
        });
    }, { threshold: 0.2 }); // Udløs tidligt

    observer.observe(section);

    function lockAndPlay() {
        // Udløs ikke hvis menuen allerede er åben
        const nav = document.querySelector('[data-navigation-status]');
        if (nav && nav.getAttribute('data-navigation-status') === 'active') return;

        /* 
           Vi bruger block: 'start' i stedet for 'center'. 
           Når sektionen er 100vh, sikrer 'start', at toppen flugter præcist med viewportens top.
           'Center' kan nogle gange medføre afrundingsfejl (sub-pixel rendering), 
           der skaber en uønsket hvid sprække i bunden eller toppen.
        */
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Lås rulning (Lenis + native)
        if (window.lenis) window.lenis.stop();
        document.body.style.overflow = 'hidden';
        document.body.classList.add('video-playing'); // Markér tilstand


        // Afspil video
        video.currentTime = 0;
        const cta = document.querySelector('.video-overlay-cta');
        if (cta) cta.classList.remove('show'); // Skjul ved start

        video.play().catch(e => console.error("Video play failed", e));

        hasPlayed = true;

        // Når video slutter, lås op og vis knap
        video.onended = () => {
            /* 
               Vi viser først knappen 'BLIV FRIVILLIG' når videoen er helt færdig (onended).
               Tidligere brugte vi en timer til at vise den før slut, men det gjorde koden
               unødigt kompleks. Simpelhed vinder her for en mere robust løsning.
            */
            if (cta) cta.classList.add('show');

            document.body.classList.remove('video-playing');
            // Lås kun op hvis menuen IKKE er åben
            if (nav && nav.getAttribute('data-navigation-status') === 'active') {
                return; // Bevar lås hvis menu åbnede imens
            }

            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        };
    }
});
