// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);


// Force all elements to be visible immediately
document.addEventListener('DOMContentLoaded', () => {
    // Remove all AOS inline styles that might hide content
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
        el.classList.add('aos-animate');
    });
});

// Force all AOS elements to be visible immediately
// This ensures content is visible even if AOS hasn't animated it yet
document.addEventListener('DOMContentLoaded', () => {
    // Wait for AOS to initialize, then make all elements visible
    setTimeout(() => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            // Remove any inline styles that might hide the element
            if (el.style.opacity === '0') {
                el.style.opacity = '1';
            }
            if (el.style.transform && el.style.transform.includes('translate')) {
                // Keep transform but ensure visibility
                el.style.opacity = '1';
            }
            // Add aos-animate class to trigger visibility
            if (!el.classList.contains('aos-animate')) {
                el.classList.add('aos-animate');
            }
        });
    }, 200);
    
    // Also force visibility on scroll
    window.addEventListener('scroll', () => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            if (el.style.opacity === '0') {
                el.style.opacity = '1';
                el.classList.add('aos-animate');
            }
        });
    }, { once: false });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate menu toggle with GSAP
    if (navMenu.classList.contains('active')) {
        gsap.fromTo(navMenu, 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Get navbar height dynamically
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = target.offsetTop - navbarHeight - 20; // Extra 20px for spacing
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                // Easing function (ease-in-out)
                const ease = percentage < 0.5 
                    ? 2 * percentage * percentage 
                    : 1 - Math.pow(-2 * percentage + 2, 2) / 2;
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            
            window.requestAnimationFrame(step);
        }
    });
});

// Navbar background animation on scroll with GSAP
ScrollTrigger.create({
    start: 'top -50',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: '.navbar' },
    onEnter: () => {
        gsap.to('.navbar', {
            backgroundColor: 'rgba(10, 10, 10, 0.98)',
            duration: 0.3
        });
    },
    onLeaveBack: () => {
        gsap.to('.navbar', {
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            duration: 0.3
        });
    }
});

// Hero Section Animations with GSAP
const heroTimeline = gsap.timeline();

heroTimeline
    .from('.greeting', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-buttons .btn', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.4');

// Typed.js for name animation
const typedName = new Typed('#typed-name', {
    strings: ['Atul Gade'],
    typeSpeed: 100,
    showCursor: false,
    cursorChar: ''
});

// Typed.js for subtitle animation
const typedSubtitle = new Typed('#typed-subtitle', {
    strings: [
        'Distinguished Software Engineer',
        'Solutions Architect',
        'Cloud Architecture Specialist',
        'AI/ML Enthusiast'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: false,
    
});


// Animate skill tags on hover with GSAP
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    tag.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});


// Animate achievement cards on scroll
gsap.utils.toArray('.achievement-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'back.out(1.7)'
    });
});

// Animate contact items
gsap.utils.toArray('.contact-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.15,
        ease: 'power2.out'
    });
});

// Add active state to current section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth scroll indicator animation
gsap.to('.scroll-indicator', {
    y: 10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});


// Add hover effects to buttons with GSAP
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// Page load animation
window.addEventListener('load', () => {
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
});

// Refresh AOS on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        AOS.refresh();
        ScrollTrigger.refresh();
    }, 250);
});
