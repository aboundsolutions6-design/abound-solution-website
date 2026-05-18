// Mobile Menu Toggle Function
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    
    if (burger) {
        // Toggle menu on burger click
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu when a link is clicked
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Check if device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add touch-friendly enhancements for mobile
function enhanceMobileTouch() {
    if (isMobile()) {
        // Increase touch target sizes
        const buttons = document.querySelectorAll('button, a, .btn-learn-more, .cta-button');
        buttons.forEach(btn => {
            btn.style.padding = '12px 20px';
            btn.style.minHeight = '44px'; // Apple's recommended minimum touch target
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    enhanceMobileTouch();
});
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle menu
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when a link is clicked
        const links = document.querySelectorAll('.nav-links li a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside (optional)
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
});
// ========================================
// MOBILE NAVIGATION MENU
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burgerBtn');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    
    if (burger && navLinks) {
        // Toggle menu when hamburger is clicked
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside (optional)
        document.addEventListener('click', function(event) {
            const isClickInside = navbar.contains(event.target);
            if (!isClickInside && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
});