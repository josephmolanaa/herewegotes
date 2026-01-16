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


// --- BAGIAN 2: LOGIKA ISI KONTEN DETAIL ---

const params = new URLSearchParams(window.location.search);
const dest = params.get("dest");
const tourIndex = parseInt(params.get("tour"), 0);

const tourData = {        
    CustomizedPrivateTripDetail: [
        {
            title: "TRIP 1",
            desc: "DESC TRIP 1",
            img: "https://picsum.photos/400/300?random=12",
            itinerary: ["Opportunity 1", "Opportunity 2", "Opportunity 3", "Opportunity 4", "Opportunity 5"],
            price: "Rp 9.999 / orang"
        },
        {
            title: "TRIP 2",
            desc: "DESC TRIP 2",
            img: "https://picsum.photos/400/300?random=13",
            itinerary: ["Opportunity 1", "Opportunity 2", "Opportunity 3", "Opportunity 4", "Opportunity 5"],
            price: "Rp 9.999 / orang"
        },
        {
            title: "TRIP 3",
            desc: "DESC TRIP 3",
            img: "https://picsum.photos/400/300?random=14",
            itinerary: ["Opportunity 1", "Opportunity 2", "Opportunity 3", "Opportunity 4", "Opportunity 5"],
            price: "Rp 9.999 / orang"
        },
        {
            title: "TRIP 4",
            desc: "DESC TRIP 4",
            img: "https://picsum.photos/400/300?random=15",
            itinerary: ["Opportunity 1", "Opportunity 2", "Opportunity 3", "Opportunity 4", "Opportunity 5"],
            price: "Rp 9.999 / orang"
        },
    ],

    CorporateMiceGroupTourDetail: [
        {
            title: "CORP TRIP 1",
            desc: "DESC CORP TRIP 1",
            img: "https://picsum.photos/400/300?random=16",
            itinerary: ["Opportunity A", "Opportunity B", "Opportunity C", "Opportunity D", "Opportunity E"],
            price: "Rp 9.999 / orang"
        },
    ]
};

const categoryArray = tourData[dest] || [];
let data = categoryArray[tourIndex];

if (!data) {
    data = {
        title: "Tour Not Found",
        desc: "The requested tour could not be found.",
        img: "https://picsum.photos/400/300?random=16",
        itinerary: [],
        price: "N/A"
    };
}

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