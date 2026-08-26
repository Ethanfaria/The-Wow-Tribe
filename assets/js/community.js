initDrawer();
initNavbarScroll("dark-hero");
const { revealObserver, REVEAL_BASE_CLASSES } = initScrollReveal({
  threshold: 0.1,
});

// ── Events data ──
const EVENTS = [
  {
    date: "2026-06-14",
    title: "Workshop: Converting Your Vision into Market Fit",
    meta: "Goa · Full Day · Basic Track",
    type: "workshop",
    badge: "8 seats left",
    link: "contact.html#join",
  },
  {
    date: "2026-06-21",
    title: "WOW Mumbai City Meetup — Member Spotlight Evening",
    meta: "Mumbai · 5:30 PM onwards",
    type: "meetup",
    membersOnly: true,
  },
  {
    date: "2026-07-05",
    title: "Workshop: Marketing & Brand Positioning",
    meta: "Mumbai · Full Day · Basic Track · 15 seats",
    type: "workshop",
    link: "contact.html#join",
  },
  {
    date: "2026-07-12",
    title: "Monthly Mastermind — Growth Circle",
    meta: "Online · 10:00 AM · Growth Circle members",
    type: "mastermind",
    membersOnly: true,
  },
  {
    date: "2026-07-19",
    title: "Workshop: From Market Fit Product to Brand",
    meta: "Bangalore · Full Day · Advanced Track · 12 seats",
    type: "workshop",
    link: "contact.html#join",
  },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// ── Events renderer ──
function renderEvents() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = EVENTS.map((e) => ({ ...e, _date: new Date(e.date) }))
    .filter((e) => e._date >= today)
    .sort((a, b) => a._date - b._date);

  const list = document.getElementById("events-list");
  const empty = document.getElementById("events-empty");

  if (upcoming.length === 0) {
    empty.classList.remove("hidden");
    return;
  }

  upcoming.forEach((e) => {
    const day = e._date.getDate();
    const month = MONTHS[e._date.getMonth()];

    let rightHTML = "";
    if (e.membersOnly) {
      rightHTML = `<span class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium whitespace-nowrap">Members Only</span>`;
    } else {
      const badgePill = e.badge
        ? `<span class="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium whitespace-nowrap">${e.badge}</span>`
        : "";
      const btn = e.link
        ? `<a href="${e.link}" class="px-4 py-2 bg-purple-800 text-white text-xs rounded-full hover:bg-purple-700 transition font-medium whitespace-nowrap">Reserve Seat</a>`
        : "";
      rightHTML = badgePill + btn;
    }

    const card = document.createElement("div");
    card.className =
      "bg-white rounded-2xl border border-orange-100 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:shadow-md transition reveal";
    card.innerHTML = `
      <div class="flex-shrink-0 text-center bg-violet-50 rounded-xl px-4 py-3 w-fit">
        <p class="text-3xl font-bold text-violet-900 leading-none">${day}</p>
        <p class="text-xs uppercase tracking-widest text-gray-400 mt-1">${month}</p>
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-gray-900 text-sm sm:text-base">${e.title}</h4>
        <p class="text-gray-500 text-xs sm:text-sm mt-1">${e.meta}</p>
      </div>
      <div class="flex items-center gap-3 flex-shrink-0">${rightHTML}</div>
    `;
    list.appendChild(card);
    card.classList.add(...REVEAL_BASE_CLASSES);
  });

  list
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));
}

renderEvents();