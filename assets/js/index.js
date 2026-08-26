initDrawer();
initNavbarScroll("light-static");
initScrollReveal({ threshold: 0.1 });

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