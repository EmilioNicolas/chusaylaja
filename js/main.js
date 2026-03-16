// Wedding countdown — 3 Oct 2026, 18:00 CEST
const WEDDING_DATE = new Date('2026-10-03T13:00:00+02:00');

function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<p class="countdown-ended">¡Hoy es el gran día!</p>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(3, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Sticky nav
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
});

// Mobile menu
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const closeMobileMenu = () => {
    if (navLinks) navLinks.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
};

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        closeMobileMenu();

        requestAnimationFrame(() => {
            const headerOffset = nav ? nav.offsetHeight + 8 : 8;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({
                top: Math.max(0, targetTop),
                behavior: 'smooth'
            });
        });
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Modal: ¿Por qué aquí?
const modalOverlay = document.getElementById('modal-por-que');
const btnOpen = document.getElementById('btn-por-que-aqui');
const btnClose = document.getElementById('modal-close');

if (btnOpen && modalOverlay) {
    btnOpen.addEventListener('click', () => {
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    btnClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });
}

// Copy IBAN
const copyBtn = document.getElementById('copy-iban');
const ibanToast = document.getElementById('iban-toast');
if (copyBtn) {
    let hideToastTimer;
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('ES3021037074080030096678').then(() => {
            copyBtn.classList.add('copied');
            copyBtn.setAttribute('title', 'Copiado');
            copyBtn.setAttribute('aria-label', 'Copiado');
            if (ibanToast) {
                ibanToast.classList.add('visible');
                clearTimeout(hideToastTimer);
            }
            hideToastTimer = setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.setAttribute('title', 'Copiar IBAN');
                copyBtn.setAttribute('aria-label', 'Copiar IBAN');
                if (ibanToast) ibanToast.classList.remove('visible');
            }, 900);
        });
    });
}

// Scroll reveal
document.body.classList.add('has-reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.section-inner').forEach(el => observer.observe(el));
