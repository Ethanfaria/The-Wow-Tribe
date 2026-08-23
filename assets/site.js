function initDrawer() {
  const hamBtn = document.getElementById("hamburger-btn");
  const drawerOverlay = document.getElementById("drawer-overlay");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const drawerClose = document.getElementById("drawer-close");
  if (!hamBtn || !drawerOverlay || !mobileDrawer || !drawerClose) return;

  function openDrawer() {
    mobileDrawer.classList.remove("translate-x-full");
    mobileDrawer.classList.add("translate-x-0");
    drawerOverlay.classList.remove("hidden");
    drawerOverlay.classList.add("block");
    mobileDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
  }
  function closeDrawer() {
    mobileDrawer.classList.add("translate-x-full");
    mobileDrawer.classList.remove("translate-x-0");
    drawerOverlay.classList.add("hidden");
    drawerOverlay.classList.remove("block");
    mobileDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");
  }

  hamBtn.addEventListener("click", openDrawer);
  drawerOverlay.addEventListener("click", closeDrawer);
  drawerClose.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
}

function initNavbarScroll(variant) {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const NAVBAR_SCROLLED_CLASSES = [
    "bg-orange-50/96",
    "shadow-[0_2px_16px_rgba(80,0,120,0.08)]",
    "backdrop-blur-sm",
  ];
  const navLinkEls = document.querySelectorAll("[data-nav-link]");
  const navActiveEls = document.querySelectorAll("[data-nav-active]");
  const hamburgerSpans = document.querySelectorAll("#hamburger-btn span");

  function setScrolled(isScrolled) {
    if (isScrolled) navbar.classList.add(...NAVBAR_SCROLLED_CLASSES);
    else navbar.classList.remove(...NAVBAR_SCROLLED_CLASSES);

    if (variant === "dark-hero") {
      const LINK_UNSCROLLED = ["text-white/90", "hover:text-white"];
      const LINK_SCROLLED = ["text-purple-900", "hover:text-purple-700"];
      const ACTIVE_UNSCROLLED = ["text-white", "border-white"];
      const ACTIVE_SCROLLED = ["text-purple-900", "border-purple-900"];

      navLinkEls.forEach((a) => {
        a.classList.remove(...(isScrolled ? LINK_UNSCROLLED : LINK_SCROLLED));
        a.classList.add(...(isScrolled ? LINK_SCROLLED : LINK_UNSCROLLED));
      });
      navActiveEls.forEach((a) => {
        a.classList.remove(
          ...(isScrolled ? ACTIVE_UNSCROLLED : ACTIVE_SCROLLED),
        );
        a.classList.add(...(isScrolled ? ACTIVE_SCROLLED : ACTIVE_UNSCROLLED));
      });
      hamburgerSpans.forEach((s) => {
        s.classList.remove(isScrolled ? "bg-white" : "bg-purple-900");
        s.classList.add(isScrolled ? "bg-purple-900" : "bg-white");
      });
    } else if (variant === "light-hover") {
      navLinkEls.forEach((a) => {
        a.classList.remove(
          isScrolled ? "hover:text-purple-600" : "hover:text-purple-700",
        );
        a.classList.add(
          isScrolled ? "hover:text-purple-700" : "hover:text-purple-600",
        );
      });
    }
    // "light-static": background swap only, nothing further to do.
  }

  window.addEventListener("scroll", () => setScrolled(window.scrollY > 30));
}
function initScrollReveal({ threshold = 0.1, offsetPx = 7, durationMs = 650 } = {}) {
  const TRANSLATE_Y_CLASSES = { 6: "translate-y-6", 7: "translate-y-7" };
  const DURATION_CLASSES = { 600: "duration-[600ms]", 650: "duration-[650ms]" };

  const translateYClass = TRANSLATE_Y_CLASSES[offsetPx];
  const durationClass = DURATION_CLASSES[durationMs];
  if (!translateYClass || !durationClass) {
    console.warn(`initScrollReveal: unsupported offsetPx=${offsetPx} or durationMs=${durationMs} — add them to site.js's lookup tables so Tailwind's CLI can see the literal class.`);
  }

  const REVEAL_BASE_CLASSES = [
    "opacity-0",
    translateYClass,
    "transition-all",
    durationClass,
    "ease-in-out",
  ];
  const REVEAL_VISIBLE_CLASSES = ["opacity-100", "translate-y-0"];

  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add(...REVEAL_BASE_CLASSES);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("opacity-0", translateYClass);
          e.target.classList.add(...REVEAL_VISIBLE_CLASSES);
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold },
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  return { revealObserver, REVEAL_BASE_CLASSES };
}