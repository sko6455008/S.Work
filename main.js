document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- Loader ---
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            content.classList.remove('opacity-0');
            content.classList.add('opacity-100');
            // Trigger initial animations
            document.dispatchEvent(new CustomEvent('loaderFinished'));
        }, 500);
    }, 2000);

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.remove('bg-transparent', 'py-6');
            header.classList.add('bg-black/80', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-4');
        } else {
            header.classList.remove('bg-black/80', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-4');
            header.classList.add('bg-transparent', 'py-6');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenuToggle.innerHTML = '<i data-lucide="x"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenuToggle.innerHTML = '<i data-lucide="menu"></i>';
        }
        lucide.createIcons();
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // --- FAQ Accordion ---
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const item = toggle.parentElement;
            const content = item.querySelector('.faq-content');
            const isOpen = item.classList.contains('open');

            // Close all other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-content').style.height = '0';
                    otherItem.querySelector('.faq-content').classList.remove('open');
                }
            });

            // Toggle current item
            if (isOpen) {
                item.classList.remove('open');
                content.style.height = '0';
                content.classList.remove('open');
            } else {
                item.classList.add('open');
                content.style.height = content.scrollHeight + 'px';
                content.classList.add('open');
            }
        });
    });

    // --- Reveal on Scroll ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-left, .reveal-fade, .reveal-left-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Handle initial reveal for elements in view after loader
    document.addEventListener('loaderFinished', () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    });
});
