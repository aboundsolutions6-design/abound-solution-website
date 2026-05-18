// ========================================
// MOBILE MENU - COMPLETE FIX FOR ANDROID
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burgerBtn');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    
    if (!burger || !navLinks) return;
    
    // Function to open menu
    function openMenu() {
        navLinks.classList.add('active');
        burger.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
        body.style.position = 'fixed';
        body.style.width = '100%';
    }
    
    // Function to close menu
    function closeMenu() {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.position = '';
        body.style.width = '';
    }
    
    // Toggle menu when burger is clicked
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });
    
    // Prevent body scroll when touching menu area
    navLinks.addEventListener('touchmove', function(e) {
        e.stopPropagation();
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
});