/* ==========================================
   1. GLOBAL VARIABLES
   ========================================== */
const textsID = ["Engineer Automasi", "Teknisi Lapangan", "Full-Stack Developer"];
const textsEN = ["Automation Engineer", "Field Technician", "Full-Stack Developer"];
let textIndex = 0, charIndex = 0, isDeleting = false;
let currentTexts = textsID; 

/* ==========================================
   2. PRELOADER
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }
});

/* ==========================================
   3. DARK MODE TOGGLE
   ========================================== */
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}
if(themeToggle) themeToggle.addEventListener('click', toggleTheme);
if(themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

/* ==========================================
   4. MULTI-LANGUAGE (ID/EN)
   ========================================== */
const langBtns = [document.getElementById('lang-toggle'), document.getElementById('lang-toggle-mobile')];
let currentLang = localStorage.getItem('lang') || 'id';

function applyLanguage(lang) {
    document.querySelectorAll('.lang').forEach(el => {
        el.innerHTML = el.getAttribute(`data-${lang}`);
    });
    
    if(langBtns[0]) langBtns[0].innerText = lang === 'id' ? 'ID/EN' : 'EN/ID';
    if(langBtns[1]) langBtns[1].innerText = lang === 'id' ? 'ID' : 'EN';
    
    textIndex = 0; charIndex = 0; isDeleting = false;
    currentTexts = lang === 'id' ? textsID : textsEN;
}

langBtns.forEach(btn => {
    if(btn) {
        btn.addEventListener('click', () => {
            currentLang = currentLang === 'id' ? 'en' : 'id';
            localStorage.setItem('lang', currentLang);
            applyLanguage(currentLang);
        });
    }
});
applyLanguage(currentLang);

/* ==========================================
   5. NAVIGATION
   ========================================== */
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) link.classList.add('active');
    });
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('max-h-0', 'opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('max-h-[600px]', 'opacity-100', 'pointer-events-auto');
        menuIcon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        mobileMenu.classList.add('max-h-0', 'opacity-0', 'pointer-events-none');
        mobileMenu.classList.remove('max-h-[600px]', 'opacity-100', 'pointer-events-auto');
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
    }
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => { if(isMenuOpen) mobileMenuBtn.click(); });
});

/* ==========================================
   6. EMAIL COPY & DYNAMIC TYPING (Bug Fixed)
   ========================================== */
function copyEmail() {
    navigator.clipboard.writeText("rahmat.suharso@example.com").then(() => {
        const txt = document.getElementById('copy-text-bottom');
        if(txt) txt.innerText = currentLang === 'id' ? "Email Tersalin!" : "Email Copied!";
        setTimeout(() => { if(txt) txt.innerText = "rahmat.suharso@example.com"; }, 2000);
    });
}

const typingElement = document.querySelector('.typing-text');
function type() {
    if(!typingElement) return;
    const currentStr = currentTexts[textIndex];
    
    if(isDeleting) charIndex--;
    else charIndex++;
    
    typingElement.textContent = currentStr.substring(0, charIndex);
    
    let speed = isDeleting ? 40 : 100;
    
    // Logika Diperbaiki: Memastikan render string utuh sebelum dihapus
    if(!isDeleting && charIndex === currentStr.length) { 
        isDeleting = true; 
        speed = 2000; 
    } else if(isDeleting && charIndex === 0) { 
        isDeleting = false; 
        textIndex = (textIndex + 1) % currentTexts.length; 
        speed = 500; 
    }
    setTimeout(type, speed);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 1000));

/* ==========================================
   7. 3D TILT EFFECT & MAGNETIC BUTTON
   ========================================== */
const tiltCardContainer = document.querySelector('.perspective-1000');
const tiltCard = document.getElementById('tilt-card');
if (tiltCard && window.matchMedia("(pointer: fine)").matches) {
    tiltCardContainer.addEventListener('mousemove', (e) => {
        const rect = tiltCardContainer.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -15;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 15;
        tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    tiltCardContainer.addEventListener('mouseleave', () => tiltCard.style.transform = `rotateX(0deg) rotateY(0deg)`);
}

document.querySelectorAll('.magnetic-btn').forEach(btn => {
    if(window.matchMedia("(pointer: fine)").matches) {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.3}px, ${(e.clientY - rect.top - rect.height / 2) * 0.4}px)`;
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = `translate(0px, 0px)`);
    }
});

/* ==========================================
   8. SCROLL PROGRESS & REVEAL ANIMATION
   ========================================== */
window.addEventListener('scroll', () => {
    const sp = document.getElementById('scroll-progress');
    if(sp) sp.style.width = `${(document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100}%`;
});

const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); } });
}, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Mengeluarkan kursor custom hanya setelah gerakan mouse pertama (Mencegah Stuck)
let cursorInitialized = false;
const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('cursor-dot');

if(window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        if (!cursorInitialized) {
            cursor.style.top = e.clientY + 'px';
            cursor.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorInitialized = true;
        } else {
            cursorDot.style.left = e.clientX + 'px'; 
            cursorDot.style.top = e.clientY + 'px';
            cursor.style.left = e.clientX + 'px'; 
            cursor.style.top = e.clientY + 'px';
        }
    });
}