initDrawer();
initNavbarScroll("light-static");
const { revealObserver, REVEAL_BASE_CLASSES } = initScrollReveal({
  threshold: 0.1,
});

// ── Upcoming events ──
const EVENTS = [
  {
    date: "2026-09-22",
    city: "Chandigarh",
    audience: "Women Founders Only",
    time: "12:00 PM – 5:00 PM",
    badge: "₹2,499 · Limited Seats",
    link: "https://tagmango.app/cc29a08cb6",
    image: "assets/events/founders-table-chandigarh-women.webp",
  },
  {
    date: "2026-09-23",
    city: "Chandigarh",
    audience: "All Founders",
    time: "12:00 PM – 5:00 PM",
    badge: "₹2,499 · Limited Seats",
    link: "https://tagmango.app/fdbdf6bd56",
    image: "assets/events/founders-table-chandigarh-all.webp",
  },
  {
    date: "2026-09-26",
    city: "Gurugram",
    audience: "Women Founders Only",
    time: "12:00 PM – 5:00 PM",
    badge: "₹2,499 · Limited Seats",
    link: "https://tagmango.app/5baea4dc20",
    image: "assets/events/founders-table-gurugram-women.webp",
  },
  {
    date: "2026-09-27",
    city: "Gurugram",
    audience: "All Founders",
    time: "12:00 PM – 5:00 PM",
    badge: "₹2,499 · Limited Seats",
    link: "https://tagmango.app/4c24d4438f",
    image: "assets/events/founders-table-gurugram-all.webp",
  },
];

const EVENT_MONTHS = [
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

function renderEventCards() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = EVENTS.map((e) => ({ ...e, _date: new Date(e.date) }))
    .filter((e) => e._date >= today)
    .sort((a, b) => a._date - b._date)
    .slice(0, 4);

  const grid = document.getElementById("events-grid");
  const empty = document.getElementById("events-empty");
  if (!grid) return;

  if (upcoming.length === 0) {
    empty.classList.remove("hidden");
    return;
  }

  upcoming.forEach((e) => {
    const day = e._date.getDate();
    const month = EVENT_MONTHS[e._date.getMonth()];

    const card = document.createElement("div");
    card.className =
      "group bg-white rounded-2xl sm:rounded-3xl border border-orange-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 reveal flex flex-col";
    card.innerHTML = `
      <div class="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-violet-100">
        <img
          src="${e.image}"
          alt="The Founders' Table — Reset &amp; Root, ${e.city}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0"></div>

        <div
          class="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl px-1.5 py-1 sm:px-3 sm:py-1.5 text-center shadow-sm leading-none"
        >
          <p class="text-xs sm:text-lg font-bold text-violet-900 leading-none">${day}</p>
          <p class="text-[6px] sm:text-[9px] uppercase tracking-widest text-gray-500 mt-0.5">${month}</p>
        </div>

        <span
          class="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 text-[7px] sm:text-[10px] font-semibold uppercase tracking-wide bg-purple-800/90 text-white px-1.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm max-w-[65%] text-right leading-tight"
        >
          ${e.audience}
        </span>

        <div class="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
          <p
            class="text-orange-200 text-[7px] sm:text-[10px] uppercase tracking-widest font-semibold mb-0.5"
          >
            The Founders' Table
          </p>
          <h3 class="text-white text-sm sm:text-2xl font-bold leading-tight">
            ${e.city}
          </h3>
        </div>
      </div>

      <div class="p-2.5 sm:p-5 flex flex-col flex-1">
        <p
          class="flex items-center gap-1 sm:gap-1.5 text-gray-500 text-[10px] sm:text-sm mb-2 sm:mb-4"
        >
          <svg
            class="w-3 h-3 sm:w-4 sm:h-4 text-purple-700 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          ${e.time}
        </p>
        <span
          class="inline-block w-fit text-[9px] sm:text-sm font-semibold text-orange-700 bg-orange-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full mb-2.5 sm:mb-5"
          >${e.badge}</span
        >
        <a
          href="${e.link}"
          class="mt-auto inline-block text-center px-2.5 py-1.5 sm:px-4 sm:py-2.5 bg-purple-800 text-white text-[11px] sm:text-sm rounded-full hover:bg-purple-700 transition font-medium"
          >Reserve Seat</a
        >
      </div>
    `;
    grid.appendChild(card);
    card.classList.add(...REVEAL_BASE_CLASSES);
  });

  grid
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));
}

renderEventCards();

// ── Testimonials carousel ──
const testimonials = [
  {
    name: "Sneha Parab",
    position: "Social Expertise",
    testimonial:
      "I had the pleasure of attending Massarat's Vibes & Verbs session during our business networking meeting, and it was truly insightful. Her approach was clear, engaging, and full of practical value. The session brought great energy to the room and left us all with meaningful takeaways. It was a wonderful experience, and I'm glad I got to be a part of it.",
  },
  {
    name: "Asha Mahadevaswamy",
    position: "The Kamala Flow",
    testimonial:
      "Massarat Ma'am is truly inspiring and has played a significant role in the growth of my business. Her guidance brings clarity, confidence, and a fresh perspective that pushed me to become my best.",
  },
  {
    name: "Nandini Karmarkar",
    position: "Nutrilite",
    testimonial:
      "Massarat Kang is one of the best trainers I have ever seen. I have done a few workshops with her and each one has been excellent value. She has the ability to simplify the most difficult concepts. She has a thorough knowledge of various types of businesses and offers valuable and practical advice to enhance your business.",
  },
  {
    name: "Flora Lopes",
    position: "Co-Founder - Da Baker",
    testimonial:
      "Massarat Kang is a well-established holistic business coach with extensive knowledge and deep expertise in the world of business. She provides valuable guidance to startups, supports independent businesswomen, and helps established organizations put effective systems in place. Attending her workshops is an enriching experience — practical, real-world examples you can apply to your own ventures with ease.",
  },
  {
    name: "Divya Sharma",
    position: "Glam up by Divyaa",
    testimonial:
      "Massarat Kang is a highly accomplished business coach with exceptional command over professional growth and leadership development. Her structured methodologies, strategic insights, and clear, outcome-oriented guidance truly distinguish her in her field. Beyond her expertise, she is remarkably kind-hearted, approachable, and genuinely committed to understanding the unique needs of each individual.",
  },
  {
    name: "Tricia Saldanha",
    position: "Green Aura",
    testimonial:
      "Massarat Kaur Kang comes up with unique business coaching subjects. Her coaching style is interactive, interesting and motivational — offering personalized attention and fostering a wonderful learning environment. She is well versed with all modern day issues regarding business startups and is an expert in business scaling and revenue growth. Highly recommended!",
  },
  {
    name: "Sneha",
    position: "Insurance",
    testimonial:
      "Thank you Massarat Kaur Kang for holding such an insightful session — it really helped us think beyond our comfort zones and find answers to the questions we went clueless about, but which were necessary when it came to scaling our businesses.",
  },
  {
    name: "Aisha Shaikh",
    position: "Aisha's Kitchen",
    testimonial:
      "Massarat Kaur Kang is really good at giving business tips, and she makes everything sound easy to understand. She has a thorough knowledge and offers practical advice. She's very empathetic, a kind person, and exactly the right person to approach when needing business guidance.",
  },
];

const track = document.getElementById("track");
const dotsContainer = document.getElementById("dots");
const total = testimonials.length;
let current = 0;
let isAnimating = false;
let autoPlay;

// Build slides
testimonials.forEach((t) => {
  const slide = document.createElement("div");
  slide.className = "w-full flex-[0_0_100%] px-4";
  slide.innerHTML = `
    <div class="bg-orange-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-orange-100">
      <span class="text-4xl sm:text-5xl text-purple-700 italic font-bold leading-none block mb-3">"</span>
      <div class="relative">
        <p class="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed italic line-clamp-5 testimonial-text">${t.testimonial}</p>
        <button class="read-more-btn text-purple-700 text-xs sm:text-sm font-semibold mt-2 underline hidden">Read more</button>
      </div>
      <div class="flex items-center mt-5 sm:mt-6 gap-3 sm:gap-4">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-bold text-sm sm:text-lg shrink-0">${t.name.charAt(0)}</div>
        <div>
          <p class="font-bold text-gray-900 text-sm sm:text-base">${t.name}</p>
          <p class="text-purple-600 text-xs sm:text-sm">${t.position}</p>
        </div>
      </div>
    </div>`;
  const p = slide.querySelector(".testimonial-text");
  const btn = slide.querySelector(".read-more-btn");
  btn.addEventListener("click", () => {
    const clamped = p.classList.toggle("line-clamp-5");
    btn.textContent = clamped ? "Read more" : "Read less";
  });
  track.appendChild(slide);
});

// Build dots
testimonials.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = [
    "w-2.5 h-2.5 rounded-full border-0 cursor-pointer transition-[background-color,transform] duration-200",
    i === 0 ? "bg-violet-700 scale-[1.3]" : "bg-violet-300",
  ].join(" ");
  dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
  dot.addEventListener("click", () => goTo(i));
  dotsContainer.appendChild(dot);
});

function updateDots() {
  Array.from(dotsContainer.children).forEach((d, i) => {
    if (i === current) {
      d.classList.add("bg-violet-700", "scale-[1.3]");
      d.classList.remove("bg-violet-300");
    } else {
      d.classList.remove("bg-violet-700", "scale-[1.3]");
      d.classList.add("bg-violet-300");
    }
  });
}

function checkReadMore(index) {
  const slide = track.children[index];
  if (!slide) return;
  const p = slide.querySelector(".testimonial-text");
  const btn = slide.querySelector(".read-more-btn");
  if (!p || !btn) return;
  p.classList.add("line-clamp-5");
  btn.textContent = "Read more";
  requestAnimationFrame(() => {
    btn.classList.toggle("hidden", p.scrollHeight <= p.clientHeight);
  });
}

function goTo(index, animate = true) {
  if (isAnimating) return;
  current = (index + total) % total;
  isAnimating = true;
  track.style.transition = animate
    ? "transform 0.5s cubic-bezier(0.4,0,0.2,1)"
    : "none";
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
  checkReadMore(current);
  setTimeout(
    () => {
      isAnimating = false;
    },
    animate ? 520 : 0,
  );
}

document.getElementById("prev-btn").onclick = () => goTo(current - 1);
document.getElementById("next-btn").onclick = () => goTo(current + 1);

function startAutoPlay() {
  autoPlay = setInterval(() => goTo(current + 1), 5000);
}
function stopAutoPlay() {
  clearInterval(autoPlay);
}

const carousel = document.getElementById("carousel");
carousel.addEventListener("mouseenter", stopAutoPlay);
carousel.addEventListener("mouseleave", startAutoPlay);

// Touch swipe
let touchStartX = 0;
carousel.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
  },
  { passive: true },
);
carousel.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
});

goTo(0, false);
startAutoPlay();
document.fonts.ready.then(() => checkReadMore(current));