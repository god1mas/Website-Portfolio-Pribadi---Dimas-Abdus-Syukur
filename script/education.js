// Education Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initTimelineAnimation();
    initProgressBars();
    initExpandableSections();
    initCertificateHover();
});

// Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger animation
                const index = Array.from(timelineItems).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.2}s`;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Progress Bars Animation
function initProgressBars() {
    const progressItems = document.querySelectorAll('.progress-item');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                const width = progressFill.getAttribute('data-width');
                
                setTimeout(() => {
                    progressFill.style.width = `${width}%`;
                }, 200);
                
                progressObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    progressItems.forEach(item => {
        progressObserver.observe(item);
    });
}

// Expandable Sections
function initExpandableSections() {
    const viewMoreCertificates = document.getElementById('viewMoreCertificates');
    const viewMoreAchievements = document.getElementById('viewMoreAchievements');
    const moreCertificates = document.getElementById('moreCertificates');
    const moreAchievements = document.getElementById('moreAchievements');

    if (viewMoreCertificates && moreCertificates) {
        viewMoreCertificates.addEventListener('click', function() {
            moreCertificates.classList.toggle('show');
            this.textContent = moreCertificates.classList.contains('show') ? 
                'Tampilkan Lebih Sedikit' : 'Lihat Lebih Banyak';
        });
    }

    if (viewMoreAchievements && moreAchievements) {
        viewMoreAchievements.addEventListener('click', function() {
            moreAchievements.classList.toggle('show');
            this.textContent = moreAchievements.classList.contains('show') ? 
                'Tampilkan Lebih Sedikit' : 'Lihat Lebih Banyak';
        });
    }
}

// Certificate Hover Effects
function initCertificateHover() {
    const certificateCards = document.querySelectorAll('.certificate-card');
    const certificateModal = new bootstrap.Modal(document.getElementById('certificateModal'));
    
    // Certificate data
    const certificateData = {
        'beginner-web-developer': {
            title: 'Beginner Web Developer Training',
            issuer: 'Stehoc Academy',
            date: 'February 2025',
            description: ' Those who carried out the Web Development Training at Stechoq Training Center on 20/02/2025 showed high dedication and worked on case studies with full responsibility during the training.',
            skills: ['HTML', 'CSS'],
            image: './images/sertif-web.png'
        },
        'pelatihan-excel': {
            title: 'Pelatihan Excel (PIXCEL)',
            issuer: 'BEM FT',
            date: 'Agustus 2024',
            description: 'Dalam acara Pelatihan Excel (PIXCEL)dengan tema "BOOST YOUR PRODUCTIVITY" yang diselenggarakan oleh Badan Eksekutif Mahasiswa Fakultas Teknik Universitas Negeri Surabaya pada tanggal 24, 25, 31 Mei 2025',
            skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
            image: './images/sertif-excel.png'
        }
    };

    certificateCards.forEach(card => {
        // Hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Click to show modal
        card.addEventListener('click', function() {
            const certificateId = this.getAttribute('data-certificate');
            if (certificateData[certificateId]) {
                showCertificateModal(certificateData[certificateId]);
            }
        });
    });

    function showCertificateModal(data) {
        const modalContent = document.getElementById('certificateContent');
        modalContent.innerHTML = `
            <div class="certificate-preview">
                <h4>${data.title}</h4>
                <p><strong>Penerbit:</strong> ${data.issuer}</p>
                <p><strong>Tanggal:</strong> ${data.date}</p>
                <p>${data.description}</p>
                
                <div class="certificate-skills mt-3">
                    <strong>Skills:</strong>
                    <div class="skills-tags">
                        ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                
                ${data.image ? `
                <div class="certificate-image mt-3">
                    <img src="${data.image}" alt="${data.title}" class="img-fluid">
                </div>
                ` : ''}
            </div>
        `;
        
        certificateModal.show();
    }
}

// Add CSS for skill tags
const style = document.createElement('style');
style.textContent = `
    .skills-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .skill-tag {
        background: var(--primaryIconColor);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
    }
    
    .certificate-image img {
        max-height: 300px;
        object-fit: contain;
    }
`;
document.head.appendChild(style);