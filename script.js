/* =========================
   CAROUSEL (only if present)
   ========================= */
const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
const nextBtn = document.getElementById("nextSlide");
const prevBtn = document.getElementById("prevSlide");

let index = 0;
let interval;

/* Update slide position */
function updateCarousel() {
  if (!track) return;
  track.style.transform = `translateX(-${index * 100}%)`;
}

/* Next / Prev */
function nextSlide() {
  if (!slides.length) return;
  index = (index + 1) % slides.length;
  updateCarousel();
  resetInterval();
}

function prevSlide() {
  if (!slides.length) return;
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

/* Init carousel only if the elements exist */
if (track && slides.length && nextBtn && prevBtn) {
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
  startAutoSlide();
}

/* =========================
   MOBILE NAV
   ========================= */
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const mobileNav = document.getElementById("mobileNav");

function openMobileNav() {
  if (!mobileNav || !navToggle) return;
  mobileNav.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
  mobileNav.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeMobileNav() {
  if (!mobileNav || !navToggle) return;
  mobileNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  mobileNav.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (navToggle) navToggle.addEventListener("click", openMobileNav);
if (navClose) navClose.addEventListener("click", closeMobileNav);

// Close if user clicks the overlay background (outside the panel)
if (mobileNav) {
  mobileNav.addEventListener("click", (e) => {
    if (e.target === mobileNav) closeMobileNav();
  });
}

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileNav && mobileNav.classList.contains("open")) {
    closeMobileNav();
  }
});

// Close menu when a mobile link is clicked
document.querySelectorAll(".mobile-nav-links a").forEach((a) => {
  a.addEventListener("click", closeMobileNav);
});
