document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.gallery-track');
    const prevBtn = document.querySelector('.prev-gallery');
    const nextBtn = document.querySelector('.next-gallery');

    if (!track || !prevBtn || !nextBtn) return;

    /* 
    Vi scroller 420px af gangen.
    Billederne har en højde på 400px (defineret i CSS .gallery-track a).
    Der er 20px gap mellem billederne (CSS .gallery-track gap: 20px).
    Total bredde per "item" er derfor ca. 400px + 20px = 420px
    (Bemærk: Hvis billedbredden varierer meget, kan dette evt. skulle gøres dynamisk senere).
    */
    const scrollAmount = 420;

    nextBtn.addEventListener('click', () => {
        const firstItem = track.querySelector('a');
        if (firstItem) {
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
