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

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
            
            // Scroll to item if needed (mobile)
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        } else {
            item.classList.remove('active');
        }
    });
});

// Search Functionality
const searchInput = document.getElementById('faqSearch');
const faqGroups = document.querySelectorAll('.faq-group');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    faqGroups.forEach(group => {
        const items = group.querySelectorAll('.faq-item');
        let groupHasVisibleItems = false;
        
        items.forEach(item => {
            const question = item.querySelector('.faq-question h4').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.classList.remove('hidden');
                groupHasVisibleItems = true;
                
                // Highlight search term
                if (searchTerm.length > 0) {
                    item.style.background = '#fffbf5';
                    item.style.borderLeft = '4px solid #b89968';
                } else {
                    item.style.background = 'white';
                    item.style.borderLeft = 'none';
                }
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Show/hide group based on visible items
        if (groupHasVisibleItems || searchTerm === '') {
            group.classList.remove('hidden');
        } else {
            group.classList.add('hidden');
        }
    });
    
    // Show message if no results
    const visibleItems = document.querySelectorAll('.faq-item:not(.hidden)');
    let noResultsMsg = document.getElementById('noResults');
    
    if (visibleItems.length === 0 && searchTerm !== '') {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResults';
            noResultsMsg.style.cssText = `
                text-align: center;
                padding: 3rem;
                color: #666;
                font-size: 1.2rem;
            `;
            noResultsMsg.innerHTML = `
                <i class="fas fa-search" style="font-size: 3rem; color: #b89968; margin-bottom: 1rem; display: block;"></i>
                <p>No results found for "${searchTerm}"</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try different keywords or browse our categories</p>
            `;
            document.querySelector('.accordion-container').appendChild(noResultsMsg);
        }
    } else {
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
});

// Category Filter
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        
        // Remove active class from all cards
        categoryCards.forEach(c => c.style.background = 'white');
        
        // Add active styling to clicked card
        card.style.background = '#4a2c2a';
        card.style.color = 'white';
        
        // Filter FAQ items
        faqGroups.forEach(group => {
            const items = group.querySelectorAll('.faq-item');
            let groupHasVisibleItems = false;
            
            items.forEach(item => {
                if (item.dataset.category === category || category === 'all') {
                    item.classList.remove('hidden');
                    groupHasVisibleItems = true;
                } else {
                    item.classList.add('hidden');
                }
            });
            
            if (groupHasVisibleItems || category === 'all') {
                group.classList.remove('hidden');
            } else {
                group.classList.add('hidden');
            }
        });
        
        // Scroll to accordion
        document.querySelector('.faq-accordion').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Reset after 3 seconds
        setTimeout(() => {
            card.style.background = 'white';
            card.style.color = '';
        }, 3000);
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
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in-up').forEach(el => {
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

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Logo Animation
document.querySelector('.logo').addEventListener('click', () => {
    const logo = document.querySelector('.logo');
    logo.style.animation = 'none';
    setTimeout(() => {
        logo.style.animation = 'logoSpin 0.5s ease';
    }, 10);
});

// Add CSS for logo spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes logoSpin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(style);

// Button Hover Effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Category Card Hover Sound Effect (visual feedback)
categoryCards.forEach(card => {
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

// FAQ Item Entrance Animation on First Load
window.addEventListener('load', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        }, index * 50);
    });
});

// Keyboard Navigation for Accordion
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close all open FAQ items
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Search Input Clear Button
searchInput.addEventListener('focus', () => {
    searchInput.style.borderColor = '#b89968';
    searchInput.style.boxShadow = '0 0 20px rgba(184, 153, 104, 0.3)';
});

searchInput.addEventListener('blur', () => {
    if (searchInput.value === '') {
        searchInput.style.borderColor = '#e0d4c0';
        searchInput.style.boxShadow = 'none';
    }
});

// Click outside to close FAQ
document.addEventListener('click', (e) => {
    if (!e.target.closest('.faq-item') && !e.target.closest('.faq-question')) {
        faqItems.forEach(item => {
            if (window.innerWidth < 768) {
                // On mobile, allow clicking outside to close
                item.classList.remove('active');
            }
        });
    }
});

// Animate numbers in category cards
const animateNumber = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = `${target} Questions`;
            clearInterval(timer);
        } else {
            element.textContent = `${Math.ceil(current)} Questions`;
        }
    }, 20);
};

// Trigger number animation when category cards are visible
const categoryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const p = entry.target.querySelector('p');
            const number = parseInt(p.textContent);
            if (!isNaN(number)) {
                animateNumber(p, number);
            }
            categoryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

categoryCards.forEach(card => {
    categoryObserver.observe(card);
});

console.log('🥐 FAQ page loaded successfully!');