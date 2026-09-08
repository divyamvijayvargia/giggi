// ========================================
// DOM Elements
// ========================================
const hamburger = document.getElementById('hamburger');
const navList = document.querySelector('#navbar ul');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const polaroids = document.querySelectorAll('.polaroid');
const header = document.getElementById('header');

// ========================================
// Mobile Navigation Toggle
// ========================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
});

// Close nav on link click
navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
    });
});

// ========================================
// Smooth Scroll with Offset
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Lightbox Gallery
// ========================================
let currentIndex = 0;
const galleryImages = [];

polaroids.forEach((polaroid, index) => {
    const img = polaroid.querySelector('img');
    const caption = polaroid.getAttribute('data-caption');
    galleryImages.push({ src: img.src, caption: caption });

    polaroid.addEventListener('click', () => {
        currentIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxCaption.textContent = galleryImages[currentIndex].caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
}

function updateLightbox() {
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.9)';
    setTimeout(() => {
        lightboxImg.src = galleryImages[currentIndex].src;
        lightboxCaption.textContent = galleryImages[currentIndex].caption;
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
    }, 200);
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
function addScrollAnimations() {
    // Add animation classes to elements
    const aboutImage = document.querySelector('.about-image-frame');
    const aboutText = document.querySelector('.about-text-box');
    const sectionTitles = document.querySelectorAll('.section-title');
    const blogCards = document.querySelectorAll('.blog-card');
    const contactForm = document.querySelector('.contact-form');

    if (aboutImage) aboutImage.classList.add('fade-in-left');
    if (aboutText) aboutText.classList.add('fade-in-right');

    sectionTitles.forEach(title => {
        title.classList.add('fade-in');
    });

    polaroids.forEach((polaroid, index) => {
        polaroid.classList.add('fade-in');
        polaroid.style.transitionDelay = `${index * 0.1}s`;
    });

    blogCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    if (contactForm) contactForm.classList.add('fade-in');

    // Observe elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// Active Nav Highlight on Scroll
// ========================================
function highlightNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar ul li a');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav-active');
            }
        });
    });
}

// ========================================
// Header Shadow on Scroll
// ========================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ========================================
// Contact Form Handler
// ========================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = '✅ Message Sent! Could I BE any more helpful?';
        btn.style.background = '#008B8B';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// ========================================
// Parallax Effect on Hero
// ========================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ========================================
// Floating animation for polaroids at rest
// ========================================
function addFloatingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();
    highlightNav();
    addFloatingAnimation();

    // Add nav-active style
    const navStyle = document.createElement('style');
    navStyle.textContent = `
        .nav-active {
            background: rgba(45, 10, 62, 0.15) !important;
        }
        .nav-active::after {
            width: 80% !important;
        }

        /* Lightbox image transition */
        #lightbox-img {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(navStyle);
});
