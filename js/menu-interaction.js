document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    // Vi skal synkronisere med main.js som også lytter til .menu-toggle
    // ELLER vi kan håndtere alt her hvis main.js logik er minimal.
    // main.js skifter i øjeblikket kun 'active' på knappen.

    // Lad os tilføje en observatør til menuToggle for at opdage klasseændringer
    // Dette tillader main.js at beholde sin logik, og vi reagerer bare på det.
    // robust måde at afkoble de to skripter.

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (menuToggle.classList.contains('active')) {
                    openMenu();
                } else {
                    closeMenu();
                }
            }
        });
    });

    if (menuToggle) {
        observer.observe(menuToggle, { attributes: true });
    }

    function openMenu() {
        if (menuOverlay) {
            menuOverlay.classList.add('active');
            body.classList.add('menu-open');
            body.style.overflow = 'hidden'; // Forhindr baggrundsrulning
        }
    }

    function closeMenu() {
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            // Lås kun scroll op hvis video ikke låser det i øjeblikket
            if (!body.classList.contains('video-playing')) {
                body.style.overflow = '';
            }
        }
    }
});
