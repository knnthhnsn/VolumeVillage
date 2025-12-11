document.addEventListener('DOMContentLoaded', () => {
    // 1. Definer Mål Sektioner
    const targets = [
        document.querySelector('.cta-section'),
        document.querySelector('.site-footer'),
        document.querySelector('.menu-overlay')
    ];

    const icons = [
        'Group 5.svg', 'Group 6.svg', 'Group 7.svg', 'Group 8.svg',
        'Vector 20.svg', 'Vector 21.svg', 'Vector 22.svg', 'Vector 23.svg',
        'Vector 3.svg', 'Vector 4.svg'
    ];
    const basePath = 'assets/images/ikoner/';

    targets.forEach(section => {
        if (!section) return;

        // Sikr at sektionen er relativ så absolutte ikoner positioneres inde i den
        // Vi kan håndhæve dette i CSS eller her. Lad os gøre det her for at være sikre, medmindre det ødelægger layoutet.
        // tjek beregnet stil? Sikkert bare at tilføje klasse eller lade CSS håndtere det.
        // Lad os antage at CSS har position: relative på disse, eller tilføj det hvis det mangler.
        if (getComputedStyle(section).position === 'static') {
            section.style.position = 'relative';
        }

        // Overflow hidden for at klippe ikoner der går udenfor
        if (getComputedStyle(section).overflow !== 'hidden') {
            section.style.overflow = 'hidden';
        }

        // Beregn område for at gætte antal ikoner
        const area = section.offsetWidth * section.offsetHeight;
        // Tæthed: 1 ikon per 500x500 px område måske?
        const density = 250000;
        let count = Math.floor(area / density);
        if (count < 2) count = 2; // Minimum 2 per sektion
        if (count > 8) count = 8; // Maks loft

        for (let i = 0; i < count; i++) {
            const iconName = icons[Math.floor(Math.random() * icons.length)];
            const img = document.createElement('img');
            img.src = basePath + iconName;
            img.classList.add('bg-icon');

            // Tilfældig Størrelse
            const randomSize = Math.floor(Math.random() * (120 - 40 + 1)) + 40;

            // Pos
            const top = Math.random() * 80 + 10; // 10% to 90%
            const left = Math.random() * 80 + 10;

            img.style.position = 'absolute';
            img.style.top = `${top}%`;
            img.style.left = `${left}%`;
            img.style.width = `${randomSize}px`;

            section.appendChild(img); // Tilføj DIREKTE til sektion
        }
    });

    // Fjern den gamle globale container hvis den eksisterer (oprydning)
    const oldContainer = document.getElementById('global-icon-container');
    if (oldContainer) oldContainer.remove();
});
