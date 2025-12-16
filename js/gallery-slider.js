// Vi starter med at vente på at indholdet er indlæst.
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.gallery-track');
    const prevBtn = document.querySelector('.prev-gallery');
    const nextBtn = document.querySelector('.next-gallery');

    if (!track || !prevBtn || !nextBtn) return;

    /* 
       Konfiguration af scroll-afstand.
       Vi sætter en fast værdi (scrollAmount) baseret på vores CSS-design.
       Dette sikrer, at vi scroller præcis ét billede frem ad gangen.
       (Bemærk: Kodeblokken herunder overskriver faktisk denne værdi dynamisk, hvilket er smartere).
    */
    const scrollAmount = 420;

    nextBtn.addEventListener('click', () => {
        // `track.querySelector('a')`: Vi leder EFTER et element (her et 'a'-tag) INDE i vores track-element.
        // Det er smart, fordi vi så kun finder links, der faktisk er en del af slideren.
        const firstItem = track.querySelector('a');
        if (firstItem) {
            /* 
               Dynamisk beregning af bredde.
               I stedet for at gætte på bredden (420px), måler vi det første element direkte (offsetWidth).
               `offsetWidth` er elementets synlige bredde i pixels, inklusiv padding og borders.
               Vi lægger 20px til for at inkludere mellemrummet (gap) mellem billederne.
            */
            const itemWidth = firstItem.offsetWidth + 20; // bredde + gap
            track.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
    });

    prevBtn.addEventListener('click', () => {
        const firstItem = track.querySelector('a');
        if (firstItem) {
            const itemWidth = firstItem.offsetWidth + 20; // bredde + gap
            track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
    });
});

/*
  Kilder & Inspiration:
  - MDN Web Docs: Element.scrollBy (https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy)
  - MDN Web Docs: HTMLElement.offsetWidth (https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
*/
