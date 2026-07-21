// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up').forEach(el => {
    observer.observe(el);
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(74, 44, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    } else {
        navbar.style.background = '#4a2c2a';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    }
});

// Form Validation & Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const newsletter = document.getElementById('newsletter').checked;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
        
        // Show success modal
        showModal();
        
        // Log form data (in real app, send to server)
        console.log('Form submitted:', {
            firstName,
            lastName,
            email,
            phone,
            subject,
            message,
            newsletter
        });
    }, 1500);
});

// Form Input Animation
document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Modal Functions
function showModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('successModal').addEventListener('click', (e) => {
    if (e.target.id === 'successModal') {
        closeModal();
    }
});

// Initialize Map with Leaflet
// let map;
// let markers = [];

// Location data
const locations = [
    {
        id: 1,
        name: 'Main Store - Bakery Street',
        lat: 40.7128,
        lng: -74.0060,
        address: '123 Bakery Street, Sweet Town, ST 12345',
        phone: '(555) 123-4567'
    },
    {
        id: 2,
        name: 'Downtown Branch',
        lat: 40.7580,
        lng: -73.9855,
        address: '456 Sweet Avenue, Downtown, ST 12346',
        phone: '(555) 987-6543'
    }
];

// Initialize map
function initMap() {
    // Create map centered between both locations
    // map = L.map('map').setView([40.7354, -73.9960], 12);
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Custom icon for markers
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #4a2c2a; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);"><i class="fas fa-store"></i></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });
    
    // Add markers for each location
    locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align: center; padding: 10px;">
                    <h3 style="color: #4a2c2a; margin-bottom: 10px;">${location.name}</h3>
                    <p style="color: #666; margin: 5px 0;">${location.address}</p>
                    <p style="color: #b89968; font-weight: bold;">${location.phone}</p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}" 
                       target="_blank" 
                       style="display: inline-block; margin-top: 10px; padding: 8px 15px; background: #4a2c2a; color: white; text-decoration: none; border-radius: 20px; font-size: 14px;">
                        Get Directions
                    </a>
                </div>
            `);
        
        markers.push({ id: location.id, marker: marker });
    });
}

// Show specific location on map
function showLocation(locationId) {
    const location = locations.find(loc => loc.id === locationId);
    const markerObj = markers.find(m => m.id === locationId);
    
    if (location && markerObj) {
        // Zoom to location
        map.setView([location.lat, location.lng], 15);
        
        // Open popup
        markerObj.marker.openPopup();
        
        // Scroll to map
        document.querySelector('.map-container').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Initialize map when page loads
window.addEventListener('load', () => {
    initMap();
});

// Logo Animation
document.querySelector('.logo').addEventListener('click', () => {
    const logo = document.querySelector('.logo');
    logo.style.animation = 'none';
    setTimeout(() => {
        logo.style.animation = 'logoSpin 0.5s ease';
    }, 10);
});

// Add CSS for logo spin
const style = document.createElement('style');
style.textContent = `
    @keyframes logoSpin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(style);

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 70px;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #b89968, #f5e6d3);
    width: 0%;
    z-index: 999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Contact Card Hover Effects
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.card-icon');
        icon.style.transform = 'scale(1.1) rotate(360deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.card-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Location Card Animations
document.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            pointer-events: none;
            animation: rippleEffect 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Social Button Hover Effects
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// FAQ Card Hover Effects
document.querySelectorAll('.faq-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        icon.style.transform = 'scale(1.2) rotateY(360deg)';
        icon.style.transition = 'transform 0.6s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        icon.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// Add scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #4a2c2a;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 999;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(20px)';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.background = '#b89968';
    scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.background = '#4a2c2a';
    scrollTopBtn.style.transform = 'translateY(0) scale(1)';
});

// Form field character counter for message
const messageField = document.getElementById('message');
const charCounter = document.createElement('div');
charCounter.style.cssText = `
    text-align: right;
    color: #999;
    font-size: 0.85rem;
    margin-top: 0.5rem;
`;
messageField.parentElement.appendChild(charCounter);

messageField.addEventListener('input', () => {
    const length = messageField.value.length;
    const maxLength = 500;
    charCounter.textContent = `${length}/${maxLength} characters`;
    
    if (length > maxLength) {
        charCounter.style.color = '#ff6b6b';
        messageField.value = messageField.value.substring(0, maxLength);
    } else if (length > maxLength * 0.9) {
        charCounter.style.color = '#ffa726';
    } else {
        charCounter.style.color = '#999';
    }
});

// Add max length to message field
messageField.setAttribute('maxlength', '500');

// Phone number formatting
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.substring(0, 10);
    
    if (value.length >= 6) {
        e.target.value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
    } else if (value.length >= 3) {
        e.target.value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
    } else {
        e.target.value = value;
    }
});

console.log('🥐 Contact page loaded successfully!');
console.log('📍 Interactive map initialized with', locations.length, 'locations');