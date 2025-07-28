// Countdown Timer with leading zeros
const endDate = new Date("2025-12-31T23:59:59").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function addLeadingZero(num) {
  return num < 10 ? `0${num}` : num;
}

function updateCountdown() {
  const now = new Date().getTime();
  const gap = endDate - now;

  if (gap <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));
  const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((gap % (1000 * 60)) / 1000);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}
setInterval(updateCountdown, 1000);
updateCountdown();


// Animated Counter-Up Effect
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  const statsSection = document.getElementById('stats');
  const rect = statsSection.getBoundingClientRect();

  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const duration = 2000; // duration in ms
      const startTime = performance.now();

      function update(timestamp) {
        const elapsed = timestamp - startTime;
        if (elapsed < duration) {
          count = easeOutQuad(elapsed, 0, target, duration);
          counter.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target.toLocaleString();
        }
      }

      requestAnimationFrame(update);
    });
    countersStarted = true;
  }
}

// Easing function for smooth animation
function easeOutQuad(t, b, c, d) {
  t /= d;
  return -c * t*(t-2) + b;
}

window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters); // Trigger on load also


// Swiper init with fade effect and modern config
const swiper = new Swiper(".mySwiper", {
  effect: 'fade',
  loop: true,
  speed: 800,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  fadeEffect: {
    crossFade: true
  }
});


// AOS Init
AOS.init({
  once: true,
  duration: 900,
  easing: 'ease-in-out',
});


function toggleChat() {
  const chatBox = document.getElementById("chat-box");
  if (chatBox.classList.contains("hidden")) {
    chatBox.classList.remove("hidden");
    chatBox.style.opacity = 0;
    let opacity = 0;
    const fadeIn = setInterval(() => {
      opacity += 0.1;
      chatBox.style.opacity = opacity;
      if (opacity >= 1) clearInterval(fadeIn);
    }, 30);
  } else {
    let opacity = 1;
    const fadeOut = setInterval(() => {
      opacity -= 0.1;
      chatBox.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(fadeOut);
        chatBox.classList.add("hidden");
      }
    }, 30);
  }
}

// Attach event listener
const chatToggleBtn = document.getElementById("chat-toggle");
if (chatToggleBtn) {
  chatToggleBtn.addEventListener("click", toggleChat);
}


// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.remove("hidden");
    scrollToTopBtn.style.opacity = 1;
    scrollToTopBtn.style.visibility = 'visible';
  } else {
    scrollToTopBtn.style.opacity = 0;
    scrollToTopBtn.style.visibility = 'hidden';
    setTimeout(() => scrollToTopBtn.classList.add("hidden"), 400);
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


// Sticky Header Shadow Toggle
const header = document.getElementById("mainHeader");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// Mobile menu toggle for small screens
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('hidden');
});
