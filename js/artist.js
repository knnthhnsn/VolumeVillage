document.addEventListener('DOMContentLoaded', () => {
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

    // Tilfældige Billet Links hvis nødvendigt (pladsholder)
});
