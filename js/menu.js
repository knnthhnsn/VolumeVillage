document.addEventListener("DOMContentLoaded", () => {
    initBoldFullScreenNavigation();
});

function initBoldFullScreenNavigation() {
    const navRoot = document.querySelector("[data-navigation-status]");
    if (!navRoot) return;

    // Skift navigation tilstand
    document.querySelectorAll('[data-navigation-toggle="toggle"]').forEach((btn) => {
        btn.addEventListener("click", () => {
            const active = navRoot.getAttribute("data-navigation-status") === "active";
            navRoot.setAttribute("data-navigation-status", active ? "not-active" : "active");
        });
    });

    // Luk med ESC tast
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            navRoot.setAttribute("data-navigation-status", "not-active");
        }
    });


    // Parallaxe effekt for stickers
    const stickers = [...document.querySelectorAll(".sticker")];
    const dataMap = new Map();

    stickers.forEach((sticker, i) => {
        const baseRot = "0deg";
        const strengthX = 30 + Math.random() * 50;
        const strengthY = 20 + Math.random() * 40;

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

        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;

        stickers.forEach((sticker) => {
            const d = dataMap.get(sticker);
            sticker.style.transform =
                `translate(${-nx * d.strengthX * d.dx}px, ${-ny * d.strengthY * d.dy}px)
         rotate(${d.baseRot})`;
        });
    });
}
