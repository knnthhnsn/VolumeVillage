// Vent til siden er indlæst
document.addEventListener('DOMContentLoaded', () => {
    /* 
       Accordion Funktionalitet (Fold-ud menu).
       Dette script styrer FAQ-sektionen. Når man klikker på et spørgsmål,
       foldes svaret ud, og alle andre svar lukkes automatisk (accordion style).
    */
    // FAQ Fold-ud funktion
    // `querySelectorAll` finder ALLE elementer med klassen '.accordion-header' og lægger dem i en liste.
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Vi løber listen igennem med `forEach` (for hver).
    accordionHeaders.forEach(header => {
        // Tilføj en klik-lytter til hver overskrift.
        header.addEventListener('click', () => {
            // Find det næste element i HTML-koden (som er svaret/teksten).
            // `nextElementSibling` betyder "naboen lige nedenunder".
            const content = header.nextElementSibling;

            // Tjek om svaret allerede er åbent (har klassen 'active').
            const isActive = content.classList.contains('active');

            // 1. Luk ALLE svar først (for at lave "accordion"-effekten hvor kun én er åben).
            document.querySelectorAll('.accordion-content').forEach(c => {
                c.classList.remove('active'); // Fjern klassen 'active'
            });

            // 2. Hvis det vi klikkede på IKKE var åbent, så åbn det nu.
            // Hvis det VAR åbent, gør vi ingenting (og så forbliver det lukket pga. trin 1).
            if (!isActive) {
                content.classList.add('active'); // Tilføj klassen 'active'
            }
        });
    });

    /* 
       Tidslinje Expand.
       Ligner FAQ'en, men specifikt for program-tidslinjen.
       Knappen skifter tekst mellem "LÆS MERE" og "LUK".
    */
    // Program Fold-ud knapper
    const programButtons = document.querySelectorAll('.timeline .buy-btn-small');

    programButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Vi skal finde indholdet, men knappen ligger dybt inde i HTML'en.
            // `closest` kigger "opad" i forældrene, indtil den finder en række (.timeline-row).
            const row = btn.closest('.timeline-row');

            // Indholdet ligger lige efter rækken.
            const content = row.nextElementSibling;

            // Sikkerheds-tjek: Findes indholdet, og er det det rigtige element?
            if (content && content.classList.contains('program-content')) {
                const isActive = content.classList.contains('active');

                // Luk alle andre program-punkter først
                document.querySelectorAll('.program-content').forEach(c => {
                    c.classList.remove('active');
                });

                // Håndter åben/luk logik
                if (!isActive) {
                    content.classList.add('active');
                    btn.textContent = "LUK"; // Ændr teksten på knappen
                } else {
                    // Hvis den var åben, er den nu lukket (pga. "luk alle" ovenover), så vi skifter tekst tilbage.
                    btn.textContent = "LÆS MERE";
                }

                // Sørg for at alle ANDRE knapper viser "LÆS MERE" (hvis vi lige har lukket en andens punkt).
                programButtons.forEach(otherBtn => {
                    // Hvis knappen ikke er DENNE knap...
                    if (otherBtn !== btn) {
                        otherBtn.textContent = "LÆS MERE";
                    }
                });
            }
        });
    });

});

/*
  Kilder & Inspiration:
  - W3Schools: Accordion (https://www.w3schools.com/howto/howto_js_accordion.asp)
  - MDN: Element.nextElementSibling (https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling)
  - MDN: DOMTokenList.toggle/add/remove (https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList)
*/
