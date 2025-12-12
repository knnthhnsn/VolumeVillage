document.addEventListener("DOMContentLoaded", () => {
    updateHeroUI();
});

window.addEventListener("scroll", updateHeroUI);
window.addEventListener("resize", updateHeroUI);

function updateHeroUI() {
    const hero = document.querySelector(".vv-hero-bridge");

    // Logo og burger menu (standard)
    const defaultLogo = document.querySelector(".bold-nav-full__logo--default img");
    const defaultBurger = document.querySelector(".bold-nav-full__hamburger--default");

    if (!hero) {
        // Fallback for sider uden hero: Sæt logo og burger til synlig (f.eks. hvid/original)
        if (defaultLogo) defaultLogo.style.filter = "brightness(1) invert(0)";
        if (defaultBurger) {
            defaultBurger.style.color = "#F5F5F5";
            defaultBurger.style.filter = "brightness(1)";
        }
        return;
    }

    const sun = document.querySelector(".vv-hero-bridge__sun");
    const bridgeOverlay = document.querySelector(".vv-hero-bridge__bridge--overlay");

    const scroll = window.scrollY;
    const heroTop = hero.offsetTop;
    const heroH = hero.offsetHeight || window.innerHeight;

    let t = (scroll - heroTop) / (heroH * 0.3);
    t = Math.max(0, Math.min(1, t)); // Begræns værdi mellem 0 og 1

    // Baggrundsfarve der fader
    const start = { r: 252, g: 76, b: 2 };
    const end = { r: 4, g: 20, b: 48 };

    /*
       Lineær interpolation (Lerp) af RGB værdier.
       Vi beregner farven mellem start (orange) og slut (mørkegrå) baseret på 't' (scroll faktor).
       Dette skaber den flydende overgang fra dag til nat.
    */
    const R = Math.round(start.r + (end.r - start.r) * t);
    const G = Math.round(start.g + (end.g - start.g) * t);
    const B = Math.round(start.b + (end.b - start.b) * t);

    hero.style.setProperty("--hero-r", R);
    hero.style.setProperty("--hero-g", G);
    hero.style.setProperty("--hero-b", B);

    // Opacitet på bro overlay
    if (bridgeOverlay) bridgeOverlay.style.opacity = t;

    // Stjernerne kommer frem når det bliver mørkt
    const stars = document.querySelector(".vv-hero-bridge__stars");
    if (stars) {
        stars.style.opacity = t;  // 0 ved dag, 1 ved nat
    }

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
        defaultBurger.style.filter = `brightness(${t})`;
        defaultBurger.style.color = `rgb(${R}, ${G}, ${B})`;
    }
}
