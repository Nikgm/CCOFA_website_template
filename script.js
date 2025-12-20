const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
const nextBtn = document.getElementById("nextSlide");
const prevBtn = document.getElementById("prevSlide");

let index = 0;
let interval;

/* Update slide position */
function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

/* Next / Prev */
function nextSlide() {
  index = (index + 1) % slides.length;
  updateCarousel();
  resetInterval();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
  resetInterval();
}

/* Auto slide every 10 seconds */
function startAutoSlide() {
  interval = setInterval(nextSlide, 10000);
}

function resetInterval() {
  clearInterval(interval);
  startAutoSlide();
}

/* Events */
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

/* Init */
startAutoSlide();

const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const mobileNav = document.getElementById("mobileNav");

function openMobileNav() {
  mobileNav.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
  mobileNav.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeMobileNav() {
  mobileNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  mobileNav.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

navToggle.addEventListener("click", openMobileNav);
navClose.addEventListener("click", closeMobileNav);

// Close if user clicks the overlay background (outside the panel)
mobileNav.addEventListener("click", (e) => {
  if (e.target === mobileNav) closeMobileNav();
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileNav.classList.contains("open")) {
    closeMobileNav();
  }
});

// Close menu when a mobile link is clicked
document.querySelectorAll(".mobile-nav-links a").forEach((a) => {
  a.addEventListener("click", closeMobileNav);
});
