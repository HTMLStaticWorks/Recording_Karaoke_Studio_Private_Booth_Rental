// Theme and RTL Management

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme (Dark/Light Mode) ---
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
        updateThemeIcons('dark');
    } else {
        htmlElement.classList.remove('dark');
        updateThemeIcons('light');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                updateThemeIcons('light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcons('dark');
            }
        });
    });

    function updateThemeIcons(theme) {
        themeToggleBtns.forEach(btn => {
            const moonIcon = btn.querySelector('.fa-moon');
            const sunIcon = btn.querySelector('.fa-sun');
            
            if (moonIcon && sunIcon) {
                if (theme === 'dark') {
                    moonIcon.classList.add('hidden');
                    sunIcon.classList.remove('hidden');
                } else {
                    moonIcon.classList.remove('hidden');
                    sunIcon.classList.add('hidden');
                }
            }
        });
    }

    // --- RTL (Right-to-Left) Management ---
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
    const savedDir = localStorage.getItem('dir');
    
    if (savedDir === 'rtl') {
        htmlElement.setAttribute('dir', 'rtl');
    } else {
        htmlElement.setAttribute('dir', 'ltr');
    }

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (htmlElement.getAttribute('dir') === 'rtl') {
                htmlElement.setAttribute('dir', 'ltr');
                localStorage.setItem('dir', 'ltr');
            } else {
                htmlElement.setAttribute('dir', 'rtl');
                localStorage.setItem('dir', 'rtl');
            }
            // Optional: Reload or re-init sliders if necessary when layout changes
        });
    });
});
