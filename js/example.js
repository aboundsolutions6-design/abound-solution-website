// ========================================
// COMPLETE COMBINED JAVASCRIPT
// No conflicts - All features work together
// ========================================

// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. AOS ANIMATIONS
    // ========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
        console.log('AOS initialized');
    }
    
    // ========================================
    // 2. MOBILE MENU - WORKING VERSION
    // ========================================
    
    // Try to get elements by ID (preferred method)
    let menuToggle = document.getElementById('menuToggle');
    let mobileMenu = document.getElementById('mobileMenu');
    let menuOverlay = document.getElementById('menuOverlay');
    let body = document.body;
    
    // If not found by ID, try class selectors
    if (!menuToggle) {
        menuToggle = document.querySelector('.burger, .menu-toggle');
    }
    if (!mobileMenu) {
        mobileMenu = document.querySelector('.nav-links, .mobile-menu');
    }
    if (!menuOverlay) {
        menuOverlay = document.querySelector('.overlay, .menu-overlay');
    }
    
    // Only initialize mobile menu if elements exist
    if (menuToggle && mobileMenu) {
        console.log('Mobile menu initialized');
        
        function openMenu() {
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
            if (menuOverlay) menuOverlay.classList.add('active');
            body.classList.add('menu-open');
            body.style.overflow = 'hidden';
        }
        
        function closeMenu() {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.overflow = '';
        }
        
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }
        
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                const href = this.getAttribute('href');
                closeMenu();
                if (href && href.startsWith('#')) {
                    // Handle smooth scroll for hash links
                }
            });
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // ========================================
    // 3. BACK TO TOP BUTTON
    // ========================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        console.log('Back to top button initialized');
    }
    
    // ========================================
    // 4. NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ========================================
    // 5. MODAL FUNCTIONALITY (for services page)
    // ========================================
    const modal = document.getElementById('serviceModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Make showServiceDetails available globally
    window.showServiceDetails = function(serviceName) {
        const modalBody = document.getElementById('modalBody');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="modal-body">
                    <i class="fas fa-solar-panel modal-icon"></i>
                    <h2>${serviceName}</h2>
                    <p>Thank you for your interest in our ${serviceName} service!</p>
                    <p>Our team of experts will provide you with the best solution tailored to your needs.</p>
                    <div class="modal-features">
                        <h3>What's Included:</h3>
                        <ul>
                            <li>Free site assessment</li>
                            <li>Professional installation</li>
                            <li>5-year service warranty</li>
                            <li>24/7 customer support</li>
                        </ul>
                    </div>
                    <div class="modal-contact">
                        <p>📞 Call us: +254 701 318 829</p>
                        <p>📧 Email: aboundsolutionltd@gmail.com</p>
                    </div>
                    <a href="contacts.html" class="modal-btn">Request Quote →</a>
                </div>
            `;
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
    };
    
    if (modal && closeModal) {
        closeModal.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
        
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };
        console.log('Modal initialized');
    }
    
    // ========================================
    // 6. IMAGE ERROR HANDLING
    // ========================================
    const serviceImages = document.querySelectorAll('.service-image, .project-image');
    serviceImages.forEach(function(img) {
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/400x300/007bff/white?text=Image+Coming+Soon';
        };
    });
    
    // ========================================
    // 7. HIDE LOADER SCREEN
    // ========================================
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    console.log('All features initialized successfully!');
});

// ========================================
// 8. PARTICLE ANIMATION (runs independently)
// ========================================
(function() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 123, 255, ${particle.opacity})`;
            ctx.fill();
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        });
        requestAnimationFrame(drawParticles);
    }
    
    resizeCanvas();
    createParticles();
    drawParticles();
    window.addEventListener('resize', function() {
        resizeCanvas();
        createParticles();
    });
})();