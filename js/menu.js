// Vi starter med at lytte efter at hele hjemmesiden er indlæst ("DOMContentLoaded").
// "() =>" er en Arrow Function (pil-funktion). Det er en moderne og kortere måde at skrive "function() { ... }" på.
document.addEventListener("DOMContentLoaded", () => {
    initBoldFullScreenNavigation();
});

function initBoldFullScreenNavigation() {
    /* 
       Find 'Root' elementet.
       Vi bruger `document.querySelector` til at finde det første element i HTML'en, der har attributten [data-navigation-status].
       `const` bruges til variabler, der ikke skal ændres senere.
    */
    const navRoot = document.querySelector("[data-navigation-status]");
    if (!navRoot) return;

    // Find alle knapper der åbner/lukker menuen og tilføj en klik-lytter til dem hver især
    document.querySelectorAll('[data-navigation-toggle="toggle"]').forEach((btn) => {
        // "addEventListener" venter på at brugeren gør noget – her et "click".
        btn.addEventListener("click", () => {
            /* 
               Tjek nuværende status.
               `getAttribute` henter værdien af attributten. Her tjekker vi: Er status "active"?
               Resultatet (true eller false) gemmes i variablen `active`.
            */
            const active = navRoot.getAttribute("data-navigation-status") === "active";

            /* 
               Skift status (Toggle).
               Vi bruger en "Ternary Operator": `betingelse ? værdi_hvis_sand : værdi_hvis_falsk`.
               Oversat: Hvis menuen er aktiv (active), så sæt den til 'not-active'. Ellers sæt den til 'active'.
            */
            navRoot.setAttribute("data-navigation-status", active ? "not-active" : "active");
        });
    });

    // Luk menuen når man trykker på en tast på tastaturet ("keydown")
    // Her ser du "(e)". 'e' står for 'event' (hændelse).
    // Det er en pakke med information, som browseren sender til os, f.eks. hvilken tast der blev trykket på.
    document.addEventListener("keydown", (e) => {
        // Vi kigger i 'e' pakken: Hvis tasten der blev trykket på er "Escape", så lukker vi menuen.
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


    // Parallaxe effekt for stickers (De små klistermærker, der svæver rundt).

    // Vi finder alle elementer med klassen '.sticker'. 
    // `[...document.querySelectorAll(...)]` laver listen om til et rigtigt Array, som er nemmere at arbejde med.
    const stickers = [...document.querySelectorAll(".sticker")];

    // `new Map()` opretter et smart "bibliotek" (Key-Value store).
    // Her kan vi gemme data for hvert enkelt sticker (f.eks. hvilken retning den skal flyve).
    const dataMap = new Map();

    stickers.forEach((sticker, i) => {
        /*
           Data Map Opsætning.
           Vi gemmer tilfældige værdier for hvert klistermærke, så de ikke bevæger sig ens.
           
           Math.random() giver et tal mellem 0 og 1.
           * 50 gør det til 0-50.
           + 30 gør det til 30-80.
           Så vi får en tilfældig styrke mellem 30 og 80.
        */
        const strengthX = 30 + Math.random() * 50;
        const strengthY = 20 + Math.random() * 40;

        // En liste af mulige retninger (dx = horizontal, dy = vertical).
        const dirs = [
            { dx: 1, dy: -1 },
            { dx: -1, dy: 1 },
            { dx: 0.7, dy: -1 },
            { dx: -0.8, dy: 0.6 },
        ];

        // Vi gemmer (set) vores beregnede data i vores Map.
        dataMap.set(sticker, {
            baseRot,
            strengthX,
            strengthY,
            // `i % 4` sørger for, at vi vælger en af de 4 retninger i rækkefølge.
            dx: dirs[i % 4].dx,
            dy: dirs[i % 4].dy,
        });
    });

    document.addEventListener("mousemove", (e) => {
        if (navRoot.getAttribute("data-navigation-status") !== "active") return;

        /* 
           Beregn musens position ift. midten af skærmen.
           `e.clientX` er musens X-position (i pixels).
           `window.innerWidth` er skærmens bredde.
           Ved at dividere får vi et tal mellem 0 og 1 (0 = venstre kant, 1 = højre kant).
           - 0.5 flytter "nulpunktet" ind i midten (-0.5 til 0.5).
           * 2 gør spændet større, så det går fra -1 til 1.
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
