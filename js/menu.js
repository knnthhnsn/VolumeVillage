document.addEventListener("DOMContentLoaded", () => {
    initBoldFullScreenNavigation();
});

function initBoldFullScreenNavigation() {
    /* 
       Find 'Root' elementet.
       Dette element indeholder 'data-navigation-status', som styrer hele menuens tilstand.
    */
    const navRoot = document.querySelector("[data-navigation-status]");
    if (!navRoot) return;

    // Skift navigation tilstand
    document.querySelectorAll('[data-navigation-toggle="toggle"]').forEach((btn) => {
        btn.addEventListener("click", () => {
            /* 
               Tjek nuværende status.
               navRoot.getAttribute("data-navigation-status") aflæser om menuen er 'active' eller 'not-active'.
            */
            const active = navRoot.getAttribute("data-navigation-status") === "active";

            /* 
               Skift status (Toggle).
               Hvis menuen var aktiv, sæt den til 'not-active'. Ellers 'active'.
               Vi bruger en ternary operator (active ? ... : ...) for at gøre koden kortere.
               CSS'en reagerer automatisk på denne ændring via attribute-selectors.
            */
            navRoot.setAttribute("data-navigation-status", active ? "not-active" : "active");
        });
    });

    // Luk med ESC tast
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            navRoot.setAttribute("data-navigation-status", "not-active");
        }
    });

    /* 
       Luk menuen når man klikker på et link.
       Hvorfor? Hvis man klikker på et anker-link (f.eks. til #events på forsiden),
       vil siden scrolle, men menuen ville blive hængende og dække for indholdet.
       Derfor tvinger vi den til at lukke ('not-active') ved klik, så brugeren kan se sektionen.
    */
    document.querySelectorAll(".bold-nav-full__link").forEach(link => {
        link.addEventListener("click", () => {
            navRoot.setAttribute("data-navigation-status", "not-active");
        });
    });


    // Parallaxe effekt for stickers
    const stickers = [...document.querySelectorAll(".sticker")];
    const dataMap = new Map();

    stickers.forEach((sticker, i) => {
        const baseRot = "0deg";
        const strengthX = 30 + Math.random() * 50;
        const strengthY = 20 + Math.random() * 40;

        /*
           Data Map Opsætning.
           Vi gemmer tilfældige værdier (styrke og retning) for hvert enkelt sticker-element.
           Dette sikrer, at de bevæger sig forskelligt ("kaotisk"), hvilket giver en mere levende effekt.
        */
        const dirs = [
            { dx: 1, dy: -1 },
            { dx: -1, dy: 1 },
            { dx: 0.7, dy: -1 },
            { dx: -0.8, dy: 0.6 },
        ];

        dataMap.set(sticker, {
            baseRot,
            strengthX,
            strengthY,
            dx: dirs[i % 4].dx,
            dy: dirs[i % 4].dy,
        });
    });

    document.addEventListener("mousemove", (e) => {
        if (navRoot.getAttribute("data-navigation-status") !== "active") return;

        /* 
           Beregn musens position ift. midten af skærmen.
           Vi normaliserer værdierne (clientX/Y) til at være mellem -1 og 1.
           Dette gør det nemmere at styre retningen af vores stickers.
           (0,0) er præcis i midten af skærmen.
        */
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;

        stickers.forEach((sticker) => {
            const d = dataMap.get(sticker);
            sticker.style.transform =
                /*
                  Beregn ny transform-position.
                  Vi ganger musens relative position (nx, ny) med styrken (strengthX/Y) og retningen (dx/dy).
                  Resultatet bruges i translate(), hvilket flytter elementet visuelt uden at påvirke layout (høj ydeevne).
               */
                `translate(${-nx * d.strengthX * d.dx}px, ${-ny * d.strengthY * d.dy}px)
         rotate(${d.baseRot})`;
        });
    });
}

/*
  Kilder & Inspiration:
  - MDN Web Docs: MouseEvent.clientX (https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
  - W3Schools: HTML Data Attributes (https://www.w3schools.com/tags/att_global_data.asp)
  - CSS-Tricks: CSS Transforms (https://css-tricks.com/almanac/properties/t/transform/)
  - MDN: Element.setAttribute (https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
*/
