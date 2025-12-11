document.addEventListener('DOMContentLoaded', () => {
    // Vent på næste frame for at sikre at ikoner sandsynligvis er oprettet af det forrige skript
    requestAnimationFrame(() => {
        initIconInteractivity();
    });
});

function initIconInteractivity() {
    const icons = document.querySelectorAll('.bg-icon');
    if (icons.length === 0) {
        // Prøv igen hvis ikke fundet endnu (bare for en sikkerheds skyld)
        setTimeout(initIconInteractivity, 100);
        return;
    }

    let scrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Tildel tilfældige hastigheder til hvert ikon for parallakse dybde
    icons.forEach(icon => {
        // Hastighed spænder fra 0.05 til 0.2
        const speed = Math.random() * 0.15 + 0.05;
        icon.dataset.speed = speed;

        // Tilfældig retning for musesvæv (-1 eller 1)
        icon.dataset.direction = Math.random() > 0.5 ? 1 : -1;
    });

    // Begivenhedslyttere
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    window.addEventListener('mousemove', (e) => {
        // Normaliser museposition (-1 til 1) fra midten af skærmen
        // Dette gør bevægelsen relativ til midten
        targetX = (e.clientX - window.innerWidth / 2) * 0.05; // Scaling factor
        targetY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    // Animationsløkke
    function animate() {
        // Glat interpolation for musebevægelse
        mouseX += (targetX - mouseX) * 0.1;
        mouseY += (targetY - mouseY) * 0.1;

        icons.forEach(icon => {
            const speed = parseFloat(icon.dataset.speed);
            const direction = parseFloat(icon.dataset.direction);

            // Parallakse Y beregning: Flyt ikon mod rulning (eller med den)
            // Bevæger sig lidt *ned* relativt til viewport når vi ruller ned skaber dybde?
            // Normalt: 
            // Forgrund (hurtigere) bevæger sig OP hurtigere end Baggrund (langsommere) når man ruller NED.
            // Siden disse er "baggrund", skal de måske bevæge sig langsommere end indholdet (som bevæger sig ved 1x).
            // Så vi oversætter dem lodret baseret på scrollY.

            const parallaxY = scrollY * speed;

            // Musesvæv beregning
            const floatX = mouseX * speed * 20 * direction; // Forstærk effekt
            const floatY = mouseY * speed * 20 * direction;

            // Anvend transform. 
            // Parallakse: Vi ønsker at baggrundsikoner bevæger sig LANGSOMMERE end siden.
            // Når siden ruller ned (scrollY stiger), bevæger containeren sig op.
            // For at se langsommere ud, skal ikonet bevæge sig NED i forhold til containeren.
            // Så vi TILFØJER parallaxY.
            icon.style.transform = `translate3d(${floatX}px, ${floatY + parallaxY}px, 0)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}
