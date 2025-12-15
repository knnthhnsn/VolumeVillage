document.addEventListener('DOMContentLoaded', () => {
    /* 
       Accordion Funktionalitet (Fold-ud menu).
       Dette script styrer FAQ-sektionen. Når man klikker på et spørgsmål,
       foldes svaret ud, og alle andre svar lukkes automatisk (accordion style).
    */
    // FAQ Fold-ud
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = content.classList.contains('active');

            // Luk alle andre
            document.querySelectorAll('.accordion-content').forEach(c => {
                c.classList.remove('active');
            });

            // Skift nuværende
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });

    /* 
       Tidslinje Expand.
       Ligner FAQ'en, men specifikt for program-tidslinjen.
       Knappen skifter tekst mellem "LÆS MERE" og "LUK".
    */
    // Program Fold-ud
    const programButtons = document.querySelectorAll('.timeline .buy-btn-small');

    programButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Find den tilhørende content div
            // Knappen er inde i .timeline-row, og content er nextElementSibling til row
            const row = btn.closest('.timeline-row');
            const content = row.nextElementSibling;

            // Tjek om det er det rigtige element (sikkerhed)
            if (content && content.classList.contains('program-content')) {
                const isActive = content.classList.contains('active');

                // Luk alle andre program-contents
                document.querySelectorAll('.program-content').forEach(c => {
                    c.classList.remove('active');
                });

                // Skift nuværende
                if (!isActive) {
                    content.classList.add('active');
                    btn.textContent = "LUK"; // Valgfrit: Skift tekst
                } else {
                    btn.textContent = "LÆS MERE";
                }

                // Nulstil tekst på andre knapper
                programButtons.forEach(otherBtn => {
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
