// --- BAGIAN 1: LOGIKA NAVBAR (Sama Persis dengan script.js) ---

// 1. Efek Navbar Berubah Warna saat Scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// 2. Fitur Hamburger Menu (Untuk Tampilan HP)
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });

    // Tutup menu otomatis saat link diklik
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });
}


// --- BAGIAN 2: LOGIKA ISI KONTEN DETAIL (Dinamis) ---

// Ambil parameter ?dest=... dari URL
const params = new URLSearchParams(window.location.search);
const dest = params.get('dest');

// Data Tour (Pastikan path gambarnya pakai ../ karena file ini dipanggil dari dalam folder detail)
const tourData = {
    bromo: {
        title: "Bromo Sunrise Tour",
        desc: "Petualangan tak terlupakan menyaksikan sunrise dari puncak Penanjakan, jeep di lautan pasir, dan mendaki kawah Bromo aktif.",
        img: "../IMAGES/unnamed.jpg", 
        itinerary: ["Pick up hotel jam 1 pagi", "Jeep ke Penanjakan view point", "Sunrise hunting", "Lautan pasir & kawah Bromo", "Sarapan & kembali hotel"],
        price: "Rp 850.000 / orang"
    },
    pantai: {
        title: "Crystal Beach Escape",
        desc: "Relaksasi di pantai air jernih, snorkeling, island hopping, dan sunset romantis.",
        img: "../IMAGES/unnamed (1).jpg",
        itinerary: ["Pick up hotel", "Snorkeling spot 1", "Island hopping", "Lunch seafood", "Sunset & kembali"],
        price: "Rp 1.200.000 / orang"
    },
    gunung: {
        title: "Mountain Trekking Adventure",
        desc: "Pendakian gunung menantang dengan camping, sunrise puncak, dan pemandangan 360°.",
        img: "../IMAGES/unnamed (2).jpg",
        itinerary: ["Briefing & start trek", "Camp malam", "Summit attack jam 3 pagi", "Sunrise puncak", "Descent & kembali"],
        price: "Rp 1.500.000 / orang"
    },
    rajaampat: {
        title: "Raja Ampat Diving Paradise",
        desc: "Surga diving dunia dengan biodiversitas laut tertinggi, liveaboard opsional.",
        img: "../IMAGES/unnamed.jpg",
        itinerary: ["Transfer bandara", "Check in resort", "3x dive/hari", "Night dive opsional", "Departure"],
        price: "Rp 15.000.000 / 4 hari"
    }
};

// Pilih data berdasarkan URL, kalau salah fallback ke bromo
const data = tourData[dest] || tourData.bromo; 

// Masukkan data ke HTML
if (document.getElementById("detail-title")) {
    document.getElementById("detail-title").textContent = data.title;
    document.getElementById("detail-desc").textContent = data.desc;
    document.getElementById("detail-img").src = data.img;
    document.getElementById("detail-price").textContent = data.price;

    const itineraryList = document.getElementById("detail-itinerary");
    itineraryList.innerHTML = "";
    data.itinerary.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        itineraryList.appendChild(li);
    });

    // Update link WA supaya otomatis ada nama tour-nya
    const waLink = document.querySelector(".btn-primary");
    if(waLink) {
        waLink.href = waLink.href.replace("[TOUR_NAME]", data.title);
    }
}