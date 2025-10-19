// Portfolio Data
const portfolioData = [
    {
        id: 1,
        title: "Website Personal",
        category: "web",
        description: "Web personal ini menampilkan profil, portofolio, dan karya saya dengan desain sederhana, informatif, serta mudah diakses. Dibangun dengan teknologi modern untuk performa optimal.",
        image: "./images/portfolios/port1 (1).png",
        images: [
            "./images/portfolios/port1 (2).png",
            "./images/portfolios/port1 (3).png",
            "./images/portfolios/port1 (4).png"
        ],
        tags: ["HTML", "CSS", "JavaScript", "Responsive"],
        liveLink: "https://god1mas.github.io/Website-Portfololio/",
        githubLink: "https://github.com/god1mas/Website-Portfololio",
        featured: true
    },
    {
        id: 2,
        title: "CV ATS",
        category: "web",
        description: "Web CV ATS sederhana berbasis HTML dan CSS, menampilkan profil profesional responsif, terstruktur, serta personal branding yang optimal untuk aplikasi kerja.",
        image: "./images/portfolios/portfolio-3.png",
        images: [
            "./images/portfolios/portfolio-3.png",
        ],
        tags: ["HTML", "CSS", "Responsive"],
        liveLink: "https://god1mas.github.io/cv-ats/",
        githubLink: "https://github.com/god1mas/cv-ats",
        featured: true
    },
    {
        id: 3,
        title: "CV Creative",
        category: "web",
        description: "Web CV Kreatif berbasis HTML dan CSS, menampilkan profil profesional responsif, terstruktur, serta personal branding yang optimal untuk aplikasi kerja.",
        image: "./images/portfolios/port3.png",
        images: [
            "./images/portfolios/port3.png",
        ],
        tags: ["HTML", "CSS", "Responsive"],
        liveLink: "https://god1mas.github.io/CV-Creative/",
        githubLink: "https://github.com/god1mas/CV-Creative",
        featured: true
    },
    {
        id: 4,
        title: "Visit Bawean",
        category: "uiux",
        description: "Desain Web Visit Bawean. Dibuat menggunakan figma dalam rangka meramaikan lomba Inovasi Kabupaten Gresik 2025.",
        image: "./images/portfolios/port4 (1).png",
        images: [
            "./images/portfolios/port4 (1).png",
            "./images/portfolios/port4 (2).png",
            "./images/portfolios/port4 (3).png"
        ],
        tags: ["Figma", "UI Design", "UX Research"],
        liveLink: "https://www.figma.com/proto/FBMUghwLM7J9dOKcaxunDs/Visit-Bawean?node-id=350-460&t=Q3KgdaFxMkpRL7ZE-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4%3A2",
        githubLink: "#",
        featured: false
    },
    {
        id: 5,
        title: "Your Fit",
        category: "uiux",
        description: "Desain interface aplikasi mobile dengan approach modern dan user-centered design. Mempertimbangkan usability dan aesthetic appeal.",
        image: "./images/portfolios/port5 (1).png",
        images: [
            "./images/portfolios/port5 (1).png",
            "./images/portfolios/port5 (2).png",
            "./images/portfolios/port5 (3).png"
        ],
        tags: ["Figma", "Mobile Design", "Prototyping", "User Testing"],
        liveLink: "https://www.figma.com/proto/spniWLFI6ddhti10i0QAmE/Da2DeCha-YourFit-Hi-fi?node-id=2134-482&p=f&t=jjbE0ZtqUNOuLDRO-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2147%3A546",
        githubLink: "#",
        featured: false
    }
];

// DOM Elements
const portfolioGrid = document.getElementById('portfolioGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const noResults = document.getElementById('noResults');
const portfolioModal = new bootstrap.Modal(document.getElementById('portfolioModal'));

// Initialize Portfolio
function initPortfolio() {
    displayPortfolios(portfolioData);
    setupEventListeners();
}

// Display Portfolios
function displayPortfolios(portfolios) {
    if (portfolios.length === 0) {
        portfolioGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    
    portfolioGrid.innerHTML = portfolios.map(portfolio => `
        <div class="portfolio" data-category="${portfolio.category}" data-title="${portfolio.title.toLowerCase()}">
            <div class="portfolio-cover">
                <img src="${portfolio.image}" alt="${portfolio.title}" />
            </div>
            <div class="portfolio-info">
                <div class="portfolio-title">
                    <h4>${portfolio.title}</h4>
                    <a href="${portfolio.liveLink}" class="portfolio-link" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z"/>
                        </svg>
                    </a>
                </div>
                <div class="portfolio-tags">
                    ${portfolio.tags.map(tag => `<div>${tag}</div>`).join('')}
                </div>
                <p>${portfolio.description}</p>
            </div>
        </div>
    `).join('');

    // Add click event to portfolio items
    document.querySelectorAll('.portfolio').forEach((item, index) => {
        item.addEventListener('click', () => openModal(portfolios[index]));
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', filterPortfolios);
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterPortfolios();
        });
    });
}

// Filter Portfolios
function filterPortfolios() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    
    const filtered = portfolioData.filter(portfolio => {
        const matchesSearch = portfolio.title.toLowerCase().includes(searchTerm) ||
                            portfolio.description.toLowerCase().includes(searchTerm) ||
                            portfolio.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        const matchesFilter = activeFilter === 'all' || portfolio.category === activeFilter;
        
        return matchesSearch && matchesFilter;
    });
    
    displayPortfolios(filtered);
}

// Open Modal
function openModal(portfolio) {
    // Set modal content
    document.getElementById('modalProjectTitle').textContent = portfolio.title;
    document.getElementById('modalDescription').textContent = portfolio.description;
    
    // Set tags
    const modalTags = document.getElementById('modalTags');
    modalTags.innerHTML = portfolio.tags.map(tag => 
        `<span>${tag}</span>`
    ).join('');
    
    // Set links
    document.getElementById('modalLiveLink').href = portfolio.liveLink;
    document.getElementById('modalGithubLink').href = portfolio.githubLink;
    
    // Set carousel
    const carouselInner = document.getElementById('carouselInner');
    carouselInner.innerHTML = portfolio.images.map((image, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${image}" class="d-block w-100" alt="${portfolio.title} - Image ${index + 1}">
        </div>
    `).join('');
    
    // Show modal
    portfolioModal.show();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolio);