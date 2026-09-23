// Main JavaScript for Layout & Interactions

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            disable: 'mobile' // Optional: Disable animations on mobile for performance
        });
    }

    // --- Mobile Menu Management ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Active Link Highlighting ---
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

    // Desktop Nav
    const desktopNav = document.querySelector('header nav');
    if (desktopNav) {
        const links = desktopNav.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === pageName || (href === 'index.html' && pageName === '')) {
                link.classList.add('text-primary');
            } else {
                link.classList.remove('text-primary');
            }
        });
    }

    // Mobile Nav
    if (mobileMenu) {
        const links = mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === pageName || (href === 'index.html' && pageName === '')) {
                link.classList.add('text-primary');
                link.classList.remove('hover:text-primary');
            } else {
                link.classList.remove('text-primary');
                link.classList.add('hover:text-primary');
            }
        });
    }

    // --- Sticky Header ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-md');
                // Could also add/remove glass classes if desired
            } else {
                header.classList.remove('shadow-md');
            }
        });
    }

    // --- Form validation placeholder ---
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});
