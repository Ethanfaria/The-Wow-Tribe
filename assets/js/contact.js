initDrawer();
initNavbarScroll("light-hover");
initScrollReveal({ threshold: 0.1, offsetPx: 6, durationMs: 600 });

const TAB_INACTIVE_CLASSES = ["text-purple-800", "hover:text-purple-600"];
const TAB_ACTIVE_CLASSES = ["text-violet-600", "border-violet-600", "font-bold"];
const TAB_INACTIVE_BORDER = "border-transparent";

function switchTab(tab, btn) {
  document
    .querySelectorAll('[id^="panel-"]')
    .forEach((p) => p.classList.add("hidden"));
  document.querySelectorAll(".tab-bar-btn, [role='tab']").forEach((b) => {
    b.classList.remove(...TAB_ACTIVE_CLASSES);
    b.classList.add(...TAB_INACTIVE_CLASSES, TAB_INACTIVE_BORDER);
    b.setAttribute("aria-selected", "false");
  });
  document.getElementById("panel-" + tab).classList.remove("hidden");
  btn.classList.remove(...TAB_INACTIVE_CLASSES, TAB_INACTIVE_BORDER);
  btn.classList.add(...TAB_ACTIVE_CLASSES);
  btn.setAttribute("aria-selected", "true");
}

document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const icon = item.querySelector(".faq-icon");
    const answer = item.querySelector(".faq-a");
    const isOpen = icon.classList.toggle("rotate-45");
    btn.setAttribute("aria-expanded", isOpen);
    if (isOpen) {
      answer.classList.remove("max-h-0", "pb-0");
      answer.classList.add("max-h-[200px]", "pb-[1.1rem]");
    } else {
      answer.classList.remove("max-h-[200px]", "pb-[1.1rem]");
      answer.classList.add("max-h-0", "pb-0");
    }
  });
});

if (window.location.hash === "#coaching") {
  document.getElementById("coaching-tab").click();
}