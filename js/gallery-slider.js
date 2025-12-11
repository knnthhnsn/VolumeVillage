document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.gallery-track');
    const prevBtn = document.querySelector('.prev-gallery');
    const nextBtn = document.querySelector('.next-gallery');

    if (!track || !prevBtn || !nextBtn) return;

    // Rulle beløb kunne være dynamisk baseret på billedbredde, antager fuld bredde eller fast
    // Indtil videre, lad os rulle med et klart beløb (f.eks. 400px + mellemrum)
    const scrollAmount = 420;

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
});
