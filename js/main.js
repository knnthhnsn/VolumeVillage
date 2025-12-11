// Volume Village Hovedskript Indlæst

// Fælles værktøjsskript hvis nødvendigt
document.addEventListener('DOMContentLoaded', () => {
    // Menu Skifte Logik
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
        });
    }
});
