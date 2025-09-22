// Enhanced Portfolio Website JavaScript

// Global variables
let isLoading = true;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize loading screen
    initializeLoadingScreen();

    // Initialize navigation
    initializeNavigation();

    // Initialize animations
    initializeAnimations();

    // Initialize typing effect
    initializeTypingEffect();

    // Initialize skills animation
    initializeSkillsAnimation();

    // Initialize form handling
    initializeContactForm();

    // Initialize smooth scrolling
    initializeSmoothScrolling();

    // Initialize custom cursor
    initializeCustomCursor();

    // Initialize floating elements
    initializeFloatingElements();
}

// Loading Screen
function initializeLoadingScreen() {
    const loading = document.getElementById('loading');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
                isLoading = false;
                document.body.style.overflow = 'visible';

                // Start entrance animations
                animateOnLoad();
            }, 500);
        }, 2000);
    });
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Typing effect for hero subtitle
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const phrases = [
        'AI & ML Enthusiast',
        'Full-Stack Developer',
        'Problem Solver',
        'Tech Innovator',
        'Open Source Contributor'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting new phrase
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect after loading
    setTimeout(typeEffect, 3000);
}

// Skills animation
function initializeSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-bar');

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible && !bar.classList.contains('animated')) {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
                bar.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Check on load
}

// Contact form handling
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            // Here you would typically send to a backend service
            // For now, we'll just simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            showNotification("Message sent successfully! I'll get back to you soon.", 'success');
            form.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            // Restore button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Smooth scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Custom cursor
function initializeCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    if (!cursor || !cursorFollower) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// Floating elements animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    const floatingIcons = document.querySelectorAll('.floating-icon');

    // Animate floating elements
    floatingElements.forEach((element, index) => {
        const speed = element.getAttribute('data-speed') || 1;
        animateFloatingElement(element, speed, index);
    });

    // Animate floating icons
    floatingIcons.forEach((icon, index) => {
        animateFloatingIcon(icon, index);
    });
}

function animateFloatingElement(element, speed, index) {
    const startDelay = index * 500;

    setTimeout(() => {
        element.style.animation = `float ${3 + speed}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    }, startDelay);
}

function animateFloatingIcon(icon, index) {
    const startDelay = index * 200;

    setTimeout(() => {
        icon.style.animation = `floatIcon ${4 + index}s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.3}s`;
    }, startDelay);
}

// Entrance animations
function animateOnLoad() {
    const animatedElements = document.querySelectorAll('.animate-text, .hero-buttons, .hero-visual');

    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('section, .project-card, .skill-item, .about-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Utility functions
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();

        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Performance optimization
window.addEventListener('scroll', throttle(() => {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    }
}, 10));

// Add CSS for animations and notifications
const additionalCSS = `
/* Loading animations */
.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    margin: 0 5px;
    animation: bounce 1.5s infinite ease-in-out;
}

.circle:nth-child(1) { animation-delay: -0.32s; }
.circle:nth-child(2) { animation-delay: -0.16s; }
.circle:nth-child(3) { animation-delay: 0s; }
.circle:nth-child(4) { animation-delay: 0.16s; }
.circle:nth-child(5) { animation-delay: 0.32s; }

@keyframes bounce {
    0%, 80%, 100% { 
        transform: scale(0);
        opacity: 0.5;
    } 
    40% { 
        transform: scale(1);
        opacity: 1;
    }
}

/* Notifications */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    z-index: 10000;
    transform: translateX(400px);
    transition: all 0.3s ease;
    min-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    background: linear-gradient(135deg, #10b981, #059669);
}

.notification-error {
    background: linear-gradient(135deg, #ef4444, #dc2626);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Floating animations */
@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes floatIcon {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
    50% { transform: translateY(-15px) rotate(10deg); opacity: 1; }
}

/* Scroll animations */
.animate-in {
    animation: slideInUp 0.6s ease forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Skill bar animation */
.skill-bar {
    width: 0;
    transition: width 1.5s ease-in-out;
}
`;

// Add the additional CSS to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

console.log('Portfolio website initialized successfully! 🚀');