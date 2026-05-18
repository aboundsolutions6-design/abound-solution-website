// Add this to handle navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// Service Details Data
const serviceDetails = {
    solar: {
        title: "Solar Powered Environment",
        description: "Complete solar solutions for residential, commercial, and industrial applications.",
        features: [
            "High-efficiency solar panels with 25-year warranty",
            "MPPT solar inverters for maximum energy harvest",
            "Lithium battery storage solutions",
            "Real-time monitoring system",
            "Professional installation and maintenance"
        ],
        price: "Starting from $5,000",
        image: "/images/solar-detail.jpg"
    },
    security: {
        title: "Security Systems",
        description: "Advanced solar-powered security solutions for 24/7 protection.",
        features: [
            "4K Ultra HD solar cameras",
            "Wireless WiFi connectivity",
            "Night vision with infrared",
            "Motion detection alerts",
            "Cloud storage options"
        ],
        price: "Starting from $800",
        image: "/images/security-detail.jpg"
    },
    electrical: {
        title: "Electrical Installation",
        description: "Professional electrical services for residential and commercial properties.",
        features: [
            "Complete wiring and rewiring",
            "Breaker panel upgrades",
            "Lighting installation",
            "Safety inspections",
            "Emergency repairs"
        ],
        price: "Starting from $300",
        image: "/images/electrical-detail.jpg"
    },
    gate: {
        title: "Gate Installation",
        description: "Modern automated gate systems for security and convenience.",
        features: [
            "Automatic sliding gates",
            "Solar-powered gate openers",
            "Remote control access",
            "Keypad entry systems",
            "Safety sensors included"
        ],
        price: "Starting from $2,500",
        image: "/images/gate-detail.jpg"
    }
};

// Show Modal Function
function showServiceDetails(service) {
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('modalContent');
    const details = serviceDetails[service];
    
    modalContent.innerHTML = `
        <div class="modal-body">
            <h2>${details.title}</h2>
            <img src="${details.image}" alt="${details.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 10px; margin: 1rem 0;">
            <p style="font-size: 1.1rem; line-height: 1.6; color: #555;">${details.description}</p>
            
            <h3>Key Features:</h3>
            <ul>
                ${details.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <div class="price-tag">${details.price}</div>
            
            <a href="#contact" class="contact-btn" onclick="closeModal()">Request a Quote →</a>
        </div>
    `;
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Close Modal Function
function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Event Listeners
document.querySelector('.close-modal').onclick = closeModal;

window.onclick = function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
// Function to update images dynamically
function updateImage(imgId, inputId) {
    const img = document.getElementById(imgId);
    const input = document.getElementById(inputId);
    const url = input.value.trim();
    
    if (url) {
        img.src = url;
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/400x250/ff6b6b/white?text=Invalid+URL';
            alert('Invalid image URL. Please check the link and try again.');
        };
        input.value = '';
        input.placeholder = 'Image updated!';
        setTimeout(() => {
            input.placeholder = 'Enter new image URL to change';
        }, 2000);
        
        // Show success message
        const btn = input.nextElementSibling;
        const originalText = btn.textContent;
        btn.textContent = '✓ Updated!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1500);
    } else {
        alert('Please enter a valid image URL');
    }
}

// Optional: Save to localStorage
function saveImageUrls() {
    const allImages = document.querySelectorAll('.service-image');
    const urls = {};
    allImages.forEach((img, index) => {
        urls[`img_${index}`] = img.src;
    });
    localStorage.setItem('serviceImages', JSON.stringify(urls));
}

// Optional: Load saved images
function loadSavedImages() {
    const saved = localStorage.getItem('serviceImages');
    if (saved) {
        const urls = JSON.parse(saved);
        const allImages = document.querySelectorAll('.service-image');
        Object.keys(urls).forEach((key, index) => {
            if (allImages[index] && urls[key] !== allImages[index].src) {
                allImages[index].src = urls[key];
            }
        });
    }
}
// Counter Animation for Stats
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
                if (target === 100) stat.textContent = '100%';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter when stats section comes into view
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Call loadSavedImages on page load
// window.addEventListener('DOMContentLoaded', loadSavedImages);
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