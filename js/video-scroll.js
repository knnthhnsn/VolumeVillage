document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.video-scroll-section');
    const video = document.querySelector('.scroll-video');

    if (!section || !video) return;

    let hasPlayed = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Når sektionen dækker det meste af skærmen (tærskel 0.5 eller lignende)
            /* 
               Opdagelse (Detection).
               IntersectionObserver holder øje med elementer. 'isIntersecting' er sand, når sektionen er synlig.
               Vi bruger også flaget '!hasPlayed' for at sikre, at vi kun hijacker scroll én gang pr. besøg.
            */
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
        /* 
           Lås skærmen (Lock).
           Vi bruger scrollIntoView() med 'block: start' for at rulle sektionen helt op i toppen.
           Derefter sætter vi 'overflow: hidden' på body, hvilket fjerner scrollbaren og forhindrer brugeren i at scrolle væk.
           Dette er en "tvungen" handling, så den skal bruges varsomt.
        */
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Lås rulning (Lenis + native)
        if (window.lenis) window.lenis.stop();
        document.body.style.overflow = 'hidden';
        document.body.classList.add('video-playing'); // Markér tilstand


        // Afspil video
        // Afspil video
        video.currentTime = 0;
        const cta = document.querySelector('.video-overlay-cta');
        if (cta) cta.classList.remove('show'); // Skjul ved start

        /* 
           Start videoen.
           Browseren tillader normalt kun auto-play, hvis lyden er slukket (muted), eller hvis brugeren har interageret.
           Da brugeren lige har scrollet, tæller det som interaktion, så vi kan starte videoen med lyd.
        */
        video.play().catch(e => console.error("Video play failed", e));

        hasPlayed = true;

        // Når video slutter, lås op og vis knap
        video.onended = () => {

            /* 
               Vi viser først knappen 'Bliv Frivillig' når videoen er helt færdig (onended).
               Tidligere brugte vi en timer til at vise den før slut, men det gjorde koden
               unødigt kompleks. Simpelhed vinder her for en mere robust løsning.
            */
            if (cta) cta.classList.add('show');

            document.body.classList.remove('video-playing');
            // Lås kun op hvis menuen IKKE er åben
            if (nav && nav.getAttribute('data-navigation-status') === 'active') {
                return; // Bevar lås hvis menu åbnede imens
            }

            /* 
               Frigivelse (Release).
               Når videoen er slut (onended), giver vi kontrollen tilbage til brugeren brugeren.
               Vi fjerner 'overflow: hidden', så scrollbaren kommer tilbage.
               Vi genstarter også Lenis (smooth scroll biblioteket) hvis det findes.
            */
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        };
    }
});

/*
  Kilder & Inspiration:
  - MDN Web Docs: IntersectionObserver API (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
  - W3Schools: CSS Overflow Property (https://www.w3schools.com/cssref/pr_pos_overflow.php)
  - MDN: HTMLMediaElement.play() (https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)
  - MDN: Element.scrollIntoView() (https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
*/
