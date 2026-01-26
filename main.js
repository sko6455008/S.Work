document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- Custom Cursor ---
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const activeElements = document.querySelectorAll('a, button, .faq-toggle');
    activeElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // --- Text Splitting for Hero Title ---
    const heroTitle = document.querySelector('h1.reveal-scale');
    if (heroTitle) {
        const text = heroTitle.textContent.trim();
        heroTitle.textContent = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'char';
            span.style.transitionDelay = `${i * 100}ms`;
            heroTitle.appendChild(span);
        });
    }

    // --- Magnetic Effect ---
    const magneticElements = document.querySelectorAll('.px-10.py-4, #mobile-menu-toggle');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- Mouse Parallax for Hero ---
    const heroSection = document.querySelector('section');
    const heroBg = document.querySelector('section img');
    if (heroSection && heroBg) {
        heroSection.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroBg.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
        });
    }

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

    // --- Portfolio Modal ---
    const portfolioModal = document.getElementById('portfolio-modal');
    const portfolioModalImage = document.getElementById('portfolio-modal-image');
    const portfolioModalClose = document.getElementById('portfolio-modal-close');
    const portfolioModalBtns = document.querySelectorAll('.portfolio-modal-btn');

    const openPortfolioModal = (imageSrc) => {
        portfolioModalImage.src = imageSrc;
        portfolioModal.classList.remove('hidden');
        portfolioModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        lucide.createIcons();
    };

    const closePortfolioModal = () => {
        portfolioModal.classList.add('hidden');
        portfolioModal.classList.remove('flex');
        document.body.style.overflow = '';
    };

    portfolioModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const imageSrc = btn.getAttribute('data-portfolio-modal');
            openPortfolioModal(imageSrc);
        });
    });

    portfolioModalClose.addEventListener('click', closePortfolioModal);

    portfolioModal.addEventListener('click', (e) => {
        if (e.target === portfolioModal) {
            closePortfolioModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !portfolioModal.classList.contains('hidden')) {
            closePortfolioModal();
        }
    });
});
