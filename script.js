// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
function handleSubmit(e) {
    e.preventDefault();
    alert('Thanks for reaching out! We\'ll get back to you within 24 hours.');
    e.target.reset();
}

// Parallax effect on hero cards
let ticking = false;
document.addEventListener('mousemove', (e) => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const cards = document.querySelectorAll('.hero-card');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            cards.forEach((card, index) => {
                const speed = (index + 1) * 5;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                card.style.transform = `translate(${x}px, ${y}px) rotate(${card.style.transform.match(/rotate\([^)]+\)/)?.[0] || 'rotate(0deg)'})`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// Intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to sections
document.querySelectorAll('.service-item, .feature-box, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    fadeObserver.observe(el);
});

// Add stagger delay to service items
document.querySelectorAll('.service-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
});

// Hero card click interaction
const cardStack = document.querySelector('.hero-cards-stack');
const cards = document.querySelectorAll('.hero-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        // If the clicked card is already active, deactivate all
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            cardStack.classList.remove('is-active');
        } else {
            // Deactivate any other active card
            cards.forEach(c => c.classList.remove('active'));
            // Activate the clicked card
            card.classList.add('active');
            cardStack.classList.remove('is-active');
        }
    });
});

// Mobile Navigation (Hamburger Menu)
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
});

// Close menu when a link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});