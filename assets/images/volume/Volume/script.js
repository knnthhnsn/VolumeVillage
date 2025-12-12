// =====================================================
//   SAFE INIT FOR NAVIGATION (OSMO + PARALLAX)
// =====================================================
function initBoldFullScreenNavigation() {
  const navRoot = document.querySelector("[data-navigation-status]");
  if (!navRoot) return;

  // Toggle navigation
  document.querySelectorAll('[data-navigation-toggle="toggle"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const active = navRoot.getAttribute("data-navigation-status") === "active";
      navRoot.setAttribute("data-navigation-status", active ? "not-active" : "active");
    });
  });

  // ESC close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navRoot.setAttribute("data-navigation-status", "not-active");
    }
  });

  // -------------------------
  // STICKER PARALLAX
  // -------------------------
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
        `translate(${ -nx * d.strengthX * d.dx }px, ${ -ny * d.strengthY * d.dy }px)
         rotate(${d.baseRot})`;
    });
  });
}

// =====================================================
//   HERO SCROLL COLOR + SUN + BRO2
// =====================================================
function updateHeroUI() {
  const hero = document.querySelector(".vv-hero-bridge");
  if (!hero) return;

  const sun = document.querySelector(".vv-hero-bridge__sun");
  const bridgeOverlay = document.querySelector(".vv-hero-bridge__bridge--overlay");

  // LOGO + BURGER (DEFAULT)
  const defaultLogo = document.querySelector(".bold-nav-full__logo--default img");
  const defaultBurger = document.querySelector(".bold-nav-full__hamburger--default");

  const scroll = window.scrollY;
  const heroTop = hero.offsetTop;
  const heroH = hero.offsetHeight || window.innerHeight;

  let t = (scroll - heroTop) / (heroH * 0.3);
  t = Math.max(0, Math.min(1, t)); // clamp 0–1

  // -----------------------------------------
  // BACKGROUND COLOR FADE
  // -----------------------------------------
  const start = { r: 252, g: 76, b: 2 };
  const end   = { r: 4, g: 20, b: 48 };

  const R = Math.round(start.r + (end.r - start.r) * t);
  const G = Math.round(start.g + (end.g - start.g) * t);
  const B = Math.round(start.b + (end.b - start.b) * t);

  hero.style.setProperty("--hero-r", R);
  hero.style.setProperty("--hero-g", G);
  hero.style.setProperty("--hero-b", B);

  // -----------------------------------------
  // BRO2 OPACITY
  // -----------------------------------------
  if (bridgeOverlay) bridgeOverlay.style.opacity = t;

    // STARS – fade ind sammen med natten
    const stars = document.querySelector(".vv-hero-bridge__stars");
    if (stars) {
      stars.style.opacity = t;  // 0 ved dag, 1 ved nat
    }



  // -----------------------------------------
  // SUN VISIBILITY
  // -----------------------------------------
  if (sun) {
    const heroBottom = heroTop + heroH;
    sun.style.opacity = scroll < heroBottom ? 1 : 0;
  }

  // -----------------------------------------
  // DEFAULT LOGO + BURGER BRIGHTNESS (scroll-version)
  // -----------------------------------------
  if (defaultLogo) {
    defaultLogo.style.filter = `brightness(${t})`;
  }
  if (defaultBurger) {
    defaultBurger.style.filter = `brightness(${t})`;
    defaultBurger.style.color = `rgb(${R}, ${G}, ${B})`;
  }
}

// =====================================================
//   INIT ALL
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  initBoldFullScreenNavigation();
  updateHeroUI();
});

window.addEventListener("scroll", updateHeroUI);
window.addEventListener("resize", updateHeroUI);
