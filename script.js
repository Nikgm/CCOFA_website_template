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
