// Particle Animation Background
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let particleCount = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
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
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
    });
    
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 123, 255, ${0.1 * (1 - distance / 100)})`;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(drawParticles);
}

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                if (target === 98) counter.textContent = '98%';
            }
        };
        
        updateCounter();
    });
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.stat-progress');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = '100%';
        }, index * 200);
    });
}

// Trigger animations when stats come into view
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            animateProgressBars();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-showcase');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form Submission Handler
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[placeholder="Your Full Name"]').value;
        const rating = this.querySelector('select').value;
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you ${name} for your feedback! We truly appreciate your ${rating}-star rating.</p>
        `;
        successMessage.style.cssText = `
            background: rgba(40, 167, 69, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
            text-align: center;
            animation: fadeInUp 0.5s ease;
        `;
        
        this.appendChild(successMessage);
        this.reset();
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Video placeholder click handler
document.querySelectorAll('.video-placeholder').forEach(video => {
    video.addEventListener('click', function() {
        alert('Video testimonial coming soon! Stay tuned for customer success stories.');
    });
});

// Resize handler
window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

// Initialize
resizeCanvas();
createParticles();
drawParticles();

// Add custom styles for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .success-message {
        animation: fadeInUp 0.5s ease;
    }
`;
document.head.appendChild(style);