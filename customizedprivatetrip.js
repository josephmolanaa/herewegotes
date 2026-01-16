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


const CostumizedPrivateTour = [
    {
        title: "[Customized]TRIP 1",
        img: "https://picsum.photos/400/300?random=10", // ganti nanti
        price: "Rp 9.999",
        from: true,
        badge: "",
        link: "detail.html?dest=CustomizedPrivateTripDetail&tour=0"
    },
    {
        title: "[Customized] TRIP 2",
        img: "https://picsum.photos/400/300?random=11",
        price: "Rp 9.999",
        from: false,
        badge: "",
        link: "detail.html?dest=CustomizedPrivateTripDetail&tour=1"
    },
    {
        title: "[Customized] TRIP 3",
        img: "https://picsum.photos/400/300?random=12",
        price: "Rp 9.999",
        from: true,
        badge: "NEW TRIP!",
        link: "detail.html?dest=CustomizedPrivateTripDetail&tour=2"
    },
    {
        title: "[Customized] TRIP 4",
        img: "https://picsum.photos/400/300?random=12",
        price: "Rp 9.999",
        from: true,
        badge: "CHEAP TRIP!",
        link: "detail.html?dest=CustomizedPrivateTripDetail&tour=3"
    },
];

const CorporateMiceGroupTour = [
    {
        title: "[Corporate MICE Group] TRIP 1",
        img: "https://picsum.photos/400/300?random=20",    
        price: "Rp 9.999",
        from: true,
        badge: "",
        link: "detail.html?dest=CorporateMiceGroupTourDetail&tour=0"
    },
];

const grid = document.querySelector('.tour-grid');

if (!grid) {
    console.error("Elemen .tour-grid tidak ditemukan!");
} else {
    CostumizedPrivateTour.forEach(tour => {
        const card = document.createElement('a');
        card.href = tour.link;
        card.classList.add('tour-card');

        const badgeHtml = tour.badge ? `<span class="badge">${tour.badge}</span>` : '';

        card.innerHTML = `
            ${badgeHtml}
            <img src="${tour.img}" alt="${tour.title}" loading="lazy">
            <div class="tour-info">
                <h3>${tour.title}</h3>
                <p class="price">${tour.from ? 'From ' : ''}${tour.price}</p>
            </div>
        `;

        grid.appendChild(card);
    });
}

renderTours(CostumizedPrivateTour);
rendewrTours(CorporateMiceGroupTour);