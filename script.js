// NAVBAR SHRINK
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// FADE IN ON SCROLL
const faders = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// SMOOTH SCROLL
document.querySelectorAll("a[href^='#']").forEach(a => {
    a.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(a.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// HERO SLIDESHOW SUPER SMOOTH
let heroIndex = 0;
const heroSlides = document.querySelectorAll(".hero-slide");

function changeHeroSlide() {
    heroSlides.forEach(s => s.classList.remove("active"));

    heroIndex = (heroIndex + 1) % heroSlides.length;

    heroSlides[heroIndex].classList.add("active");
}

// 7 detik sudah sinkron dengan animasi CSS
setInterval(changeHeroSlide, 7000);

// PRELOADER / LOADING SCREEN
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    const body = document.body;

    setTimeout(() => {
        preloader.classList.add("hidden");
        body.classList.add("loaded");
    }, 5500); // Ubah ke 5500 kalau mau lebih lama lagi
});

// HERO SLIDESHOW - AUTO + MANUAL ARROW (VERSI FINAL, NO DUPES)
const totalSlides = heroSlides.length;

// Fungsi tampilkan slide
function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove("active"));
    heroSlides[index].classList.add("active");
}

function nextSlide() {
    heroIndex = (heroIndex + 1) % totalSlides;
    showSlide(heroIndex);
}

function prevSlide() {
    heroIndex = (heroIndex - 1 + totalSlides) % totalSlides;
    showSlide(heroIndex);
}

// Auto slideshow setiap 7 detik
let autoSlideInterval = setInterval(nextSlide, 7000);

// Manual control dengan arrow
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

if (rightArrow) {
    rightArrow.addEventListener("click", () => {
        nextSlide();
        // Reset timer auto biar nggak ganti tiba-tiba
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 7000);
    });
}

if (leftArrow) {
    leftArrow.addEventListener("click", () => {
        prevSlide();
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 7000);
    });
}

// Tampilkan slide pertama saat load
showSlide(heroIndex);

// MOBILE HAMBURGER MENU TOGGLE
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });

    // Close menu pas link diklik (biar langsung scroll & close)
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });
}

// DOTS INDICATOR
const dotsContainer = document.querySelector(".hero-dots");

// Generate dots otomatis berdasarkan jumlah slide
heroSlides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("hero-dot");
    if (i === heroIndex) dot.classList.add("active");
    dot.addEventListener("click", () => {
        heroIndex = i;
        showSlide(heroIndex);
        updateDots();
        // Reset auto timer
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 7000);
    });
    dotsContainer.appendChild(dot);
});

// Update active dot
function updateDots() {
    document.querySelectorAll(".hero-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === heroIndex);
    });
}

// Panggil updateDots setiap ganti slide
function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove("active"));
    heroSlides[index].classList.add("active");
    updateDots();
}

// Di nextSlide & prevSlide juga panggil updateDots()
function nextSlide() {
    heroIndex = (heroIndex + 1) % totalSlides;
    showSlide(heroIndex);
}

function prevSlide() {
    heroIndex = (heroIndex - 1 + totalSlides) % totalSlides;
    showSlide(heroIndex);
}

// Initial
updateDots();

// TOUCH SWIPE FOR MOBILE HERO SLIDESHOW
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50; 
const heroSection = document.querySelector(".hero");

heroSection.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

heroSection.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
        resetAutoTimer();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
        resetAutoTimer();
    }
}

function resetAutoTimer() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 7000);
}

