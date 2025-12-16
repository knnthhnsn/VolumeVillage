// Vi venter på at HTML'en er klar (DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    /* 
       Element-kald (querySelector).
       Vi bruger `document.querySelector` til at finde elementer baseret på deres CSS-klasse (f.eks. .slider-track).
       Det svarer til at sige "Find mig det første element, der har denne klasse".
       Vi tjekker altid om elementerne findes (if !track...), før vi kører koden, for at undgå fejl på sider hvor slideren mangler.
    */
    const track = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    const randomBtn = document.querySelector('.slider-btn.random-btn');

    if (!track || !prevBtn || !nextBtn) return;

    const cardWidth = 330; // Kort bredde (300) + mellemrum (30)

    // Tilføj en "klik-lytter" på næste-knappen.
    nextBtn.addEventListener('click', () => {
        // `scrollBy` beder elementet om at scrolle et bestemt stykke til venstre eller højre.
        // `left: cardWidth` betyder "scroll mod højre" (positivt tal).
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            const cards = track.querySelectorAll('.event-card');
            if (cards.length === 0) return;

            /* 
               Vælg en tilfældig vinder.
               Vi bruger Math.random() som giver et tal mellem 0 og 1.
               Dette ganges med antallet af kort (cards.length) for at få et spænd.
               Math.floor() runder ned til nærmeste heltal, så vi får et gyldigt index (fx 0, 1, 2, 3...).
            */
            const randomIndex = Math.floor(Math.random() * cards.length);

            /* 
               Beregn scroll-position.
               Vi kender bredden på hvert kort (cardWidth: 330px).
               For at finde positionen for vinder-kortet ganger vi bare dets index med bredden.
               Dette er hurtigere og mere præcist end at søge i DOM'en.
            */
            const scrollPos = randomIndex * cardWidth;

            /* 
               Start scroll-bevægelsen.
               Vi bruger scrollTo() med 'smooth' behavior.
               Dette får browseren til at animere bevægelsen hen til vinder-kortet.
            */
            track.scrollTo({ left: scrollPos, behavior: 'smooth' });

            // Visuel fremhævning
            cards.forEach(card => card.style.borderColor = '');

            // Vent lidt før highlight
            /* 
               Timing af visuel feedback (kant-farve).
               Vi venter 300ms med setTimeout(), fordi scroll-animationen tager lidt tid.
               Vi vil først tænde lyset (den orange kant), når kortet er ankommet i midten.
            */
            setTimeout(() => {
                cards[randomIndex].style.borderColor = 'var(--accent-orange)';

                /* 
                   Sluk lyset igen efter 1 sekund.
                   Dette giver en nice "puls" effekt og signalerer, at spillet er slut.
                */
                setTimeout(() => {
                    cards[randomIndex].style.borderColor = '';
                }, 1000); // Fjern fremhævning efter 1s
            }, 300);
        });
    }
});

/*
  Kilder & Inspiration:
  - W3Schools: JavaScript Random (https://www.w3schools.com/js/js_random.asp)
  - MDN Web Docs: Element.scrollTo (https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo)
  - W3Schools: JavaScript Timing Events (https://www.w3schools.com/js/js_timing.asp)
  - MDN: Element.scrollBy (https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy)
*/
