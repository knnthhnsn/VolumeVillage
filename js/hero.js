document.addEventListener("DOMContentLoaded", () => {
    updateHeroUI();
});

// Vi lytter på sidens scroll-hændelse.
// Hver gang brugeren scroller én pixel, køres funktionen 'updateHeroUI'.
window.addEventListener("scroll", updateHeroUI);

// Vi lytter også på 'resize' (hvis brugeren ændrer vinduets størrelse).
// Dette er vigtigt, fordi højden af hero-sektionen kan ændre sig.
window.addEventListener("resize", updateHeroUI);

function updateHeroUI() {
    const hero = document.querySelector(".vv-hero-bridge");

    // Logo og burger menu (standard)
    /* 
       Fallback elementer.
       Vi finder logoet og burger-menuen, så vi kan justere deres farve/lysstyrke
       afhængigt af baggrundens farve (kontrast).
    */
    const defaultLogo = document.querySelector(".bold-nav-full__logo--default img");
    const defaultBurger = document.querySelector(".bold-nav-full__hamburger--default");

    if (!hero) {
        // Fallback for sider uden hero: Sæt logo og burger til synlig
        if (defaultLogo) defaultLogo.style.filter = "brightness(1) invert(0)";
        if (defaultBurger) {
            defaultBurger.style.color = "#FF5500"; // Accent Orange
            defaultBurger.style.filter = "none";
        }
        return;
    }

    const sun = document.querySelector(".vv-hero-bridge__sun");
    const bridgeOverlay = document.querySelector(".vv-hero-bridge__bridge--overlay");

    // `scrollY` fortæller os, hvor mange pixels vi har scrollet ned fra toppen.
    const scroll = window.scrollY;
    const heroTop = hero.offsetTop;
    const heroH = hero.offsetHeight || window.innerHeight;

    /* 
       Beregn 't' (Tids-faktor / Progress).
       Dette er matematikken bag animationen.
       Vi vil gerne have et tal mellem 0 og 1, der fortæller hvor langt vi er i animationen.
       0 = Starten (helt orange)
       1 = Slutningen (helt mørk)
    */
    let t = (scroll - heroTop) / (heroH * 0.3);

    // `Math.max(0, ...)` sikrer at tallet ikke bliver mindre end 0.
    // `Math.min(1, ...)` sikrer at tallet ikke bliver større end 1.
    // Resultat: 't' holder sig altid pænt indenfor 0.0 til 1.0.
    t = Math.max(0, Math.min(1, t));

    // Baggrundsfarve der fader
    const start = { r: 252, g: 76, b: 2 };
    const end = { r: 4, g: 20, b: 48 };

    /*
       Farve-blanding (Linear Interpolation).
       Vi blander start-farven og slut-farven baseret på vores 't'-værdi.
       Hvis t er 0.5 (halvvejs), får vi en farve lige midt imellem.
       Formel: start + (forskel * t)
    */
    const R = Math.round(start.r + (end.r - start.r) * t);
    const G = Math.round(start.g + (end.g - start.g) * t);
    const B = Math.round(start.b + (end.b - start.b) * t);

    /* 
       Opdatering af CSS Variabler.
       Vi sender de nye farve-værdier direkte ind i CSS-motoren.
       CSS-filen bruger `var(--hero-r)`, og her opdaterer vi værdien af den variabel.
       Det er supersmart, fordi vi styrer designet fra JavaScript!
    */
    hero.style.setProperty("--hero-r", R);
    hero.style.setProperty("--hero-g", G);
    hero.style.setProperty("--hero-b", B);

    // Opacitet på bro overlay
    if (bridgeOverlay) bridgeOverlay.style.opacity = t;

    // Solens synlighed
    if (sun) {
        const heroBottom = heroTop + heroH;
        sun.style.opacity = scroll < heroBottom ? 1 : 0;
    }

    // Justering af logo og burger menuens lysstyrke ved scroll
    if (defaultLogo) {
        defaultLogo.style.filter = `brightness(${t})`;
    }
    if (defaultBurger) {
        // Vi skal skifte fra Sort (0,0,0) til Accent Orange (255, 85, 0)
        // Lerp for hver kanal:
        const burgerR = Math.round(0 + (255 - 0) * t);
        const burgerG = Math.round(0 + (85 - 0) * t);
        const burgerB = 0; // forbliver 0

        defaultBurger.style.color = `rgb(${burgerR}, ${burgerG}, ${burgerB})`;
        defaultBurger.style.filter = "none"; // nulstil filter
    }
}

/*
  Kilder & Inspiration:
  - MDN Web Docs: Window.scrollY (https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY)
  - Wikipedia: Linear interpolation (https://en.wikipedia.org/wiki/Linear_interpolation)
  - W3Schools: CSS Variables (https://www.w3schools.com/css/css3_variables.asp)
  - MDN: CSSStyleDeclaration.setProperty (https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)
*/
