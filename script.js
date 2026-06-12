/* ================= CAROUSEL ================= */
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

/* Advance to next or previous slide */
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

/* Auto-advance every 10 seconds */
function startAutoSlide() {
  interval = setInterval(nextSlide, 10000);
}

function resetInterval() {
  clearInterval(interval);
  startAutoSlide();
}

/* Initialize carousel only when required elements exist */
if (track && slides.length && nextBtn && prevBtn) {
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
  startAutoSlide();
}

/* ================= MOBILE NAV ================= */
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const mobileNav = document.getElementById("mobileNav");
const navDropdowns = document.querySelectorAll(".nav-dropdown");
const navDropdownToggles = document.querySelectorAll(".nav-dropdown-toggle");
const mobileNavDropdownToggles = document.querySelectorAll(".mobile-nav-dropdown-toggle");

function closeDesktopDropdowns() {
  navDropdowns.forEach((dropdown) => {
    dropdown.classList.remove("open");
    const toggle = dropdown.querySelector(".nav-dropdown-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });
}

function openMobileNav() {
  if (!mobileNav || !navToggle) return;
  mobileNav.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
  mobileNav.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; /* Prevent background scroll */
}

function closeMobileNav() {
  if (!mobileNav || !navToggle) return;
  mobileNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  mobileNav.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  document.querySelectorAll(".mobile-nav-dropdown").forEach((dropdown) => {
    dropdown.classList.remove("open");
  });
  mobileNavDropdownToggles.forEach((toggle) => toggle.setAttribute("aria-expanded", "false"));
}

if (navToggle) navToggle.addEventListener("click", openMobileNav);
if (navClose) navClose.addEventListener("click", closeMobileNav);

navDropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dropdown = e.currentTarget.closest(".nav-dropdown");
    if (!dropdown) return;

    const isOpen = dropdown.classList.contains("open");
    closeDesktopDropdowns();

    if (!isOpen) {
      dropdown.classList.add("open");
      e.currentTarget.setAttribute("aria-expanded", "true");
    }
  });
});

mobileNavDropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dropdown = e.currentTarget.closest(".mobile-nav-dropdown");
    if (!dropdown) return;

    const isOpen = dropdown.classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", String(isOpen));
  });
});

/* Close menu when clicking the overlay background */
if (mobileNav) {
  mobileNav.addEventListener("click", (e) => {
    if (e.target === mobileNav) closeMobileNav();
  });
}

/* Close menu on Escape key */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDesktopDropdowns();
  if (e.key === "Escape" && mobileNav && mobileNav.classList.contains("open")) {
    closeMobileNav();
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-dropdown")) {
    closeDesktopDropdowns();
  }
});

/* Close menu when a mobile nav link is clicked */
document.querySelectorAll(".mobile-nav-links a").forEach((a) => {
  a.addEventListener("click", closeMobileNav);
});
