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

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            document.getElementById('nav-links').classList.remove('active');
            document.getElementById('nav-toggle').classList.remove('active');
        }
    });
});

// Sticky nav
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
});

// Mobile menu
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Copy IBAN
const copyBtn = document.getElementById('copy-iban');
const ibanToast = document.getElementById('iban-toast');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('ES3021037074080030096678').then(() => {
            copyBtn.classList.add('copied');
            copyBtn.setAttribute('title', 'Copiado');
            copyBtn.setAttribute('aria-label', 'Copiado');
            if (ibanToast) ibanToast.classList.add('visible');
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.setAttribute('title', 'Copiar IBAN');
                copyBtn.setAttribute('aria-label', 'Copiar IBAN');
                if (ibanToast) ibanToast.classList.remove('visible');
            }, 2000);
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
