document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    const randomBtn = document.querySelector('.slider-btn.random-btn');

    if (!track || !prevBtn || !nextBtn) return;

    const cardWidth = 330; // Kort bredde (300) + mellemrum (30)

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            const cards = track.querySelectorAll('.event-card');
            if (cards.length === 0) return;

            const randomIndex = Math.floor(Math.random() * cards.length);
            const scrollPos = randomIndex * cardWidth;

            track.scrollTo({ left: scrollPos, behavior: 'smooth' });

            // Valgfri fremhævning
            cards.forEach(card => card.style.borderColor = '');
            // Vent på at rulning sandsynligvis slutter eller fremhæv straks
            setTimeout(() => {
                cards[randomIndex].style.borderColor = 'var(--accent-orange)';
                setTimeout(() => {
                    cards[randomIndex].style.borderColor = '';
                }, 1000); // Fjern fremhævning efter 1s
            }, 300);
        });
    }
});
