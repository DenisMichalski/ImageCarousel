document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  const nav = document.querySelector('.carousel-nav');

  let currentIndex = 0;
  let interval;

  // Erstelle die Dots
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    nav.appendChild(dot);
  });

  const dots = Array.from(document.querySelectorAll('.carousel-dot'));

  const updateSlide = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    dots.forEach((dot) => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  };

  const goToSlide = (index) => {
    currentIndex = index;
    updateSlide();
    resetInterval();
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 10) % slides.length;
    updateSlide();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
  };

  const resetInterval = () => {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  };

  nextButton.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  prevButton.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  // Start automatic rotation
  interval = setInterval(nextSlide, 5000);

  // Adjust layout when resize
  window.addEventListener('resize', updateSlide);
});
