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
        if (document.body.classList.contains('menu-open')) return;

        // Rul sektion helt ind i visning jævnt først?
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Lås rulning
        document.body.style.overflow = 'hidden';
        document.body.classList.add('video-playing'); // Markér tilstand

        // Afspil video
        video.currentTime = 0;
        video.play().catch(e => console.error("Video play failed", e));

        hasPlayed = true;

        // Når video slutter, lås op
        video.onended = () => {
            document.body.classList.remove('video-playing');
            // Lås kun op hvis menuen IKKE er åben
            if (!document.body.classList.contains('menu-open')) {
                document.body.style.overflow = '';
            }
        };
    }
});
