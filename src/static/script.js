// 2025 Modern JavaScript for Scruba Cleaning Services
// Enhanced with micro-interactions and conversion optimization

document.addEventListener("DOMContentLoaded", function() {
    // Initialize all components
    initializeHeader();
    initializeScrollAnimations();
    initializeForms();
    initializePriceCalculator();
    initializeSmoothScrolling();
    initializeMobileMenu();
    initializeMicroInteractions();
    initializePerformanceOptimizations();
});

// Enhanced Header with Modern Effects
function initializeHeader() {
    const header = document.getElementById("header");
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = "translateY(-100%)";
        } else {
            header.style.transform = "translateY(0)";
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Advanced Scroll Animations with Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for better visual effect
                setTimeout(() => {
                    entry.target.classList.add("revealed");
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll(".animate-fade-in-up").forEach(el => {
        observer.observe(el);
    });
    
    // Add scroll progress indicator
    createScrollProgress();
}

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #0066FF, #00D4AA);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Enhanced Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add visual feedback
                target.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    target.style.animation = '';
                }, 600);
            }
        });
    });
}

// Mobile Menu with Modern Animations
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('active');
            
            if (isOpen) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            } else {
                navMenu.classList.add('active');
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close menu when clicking on links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
    }
}

// Enhanced Form Handling with Real-time Validation
function initializeForms() {
    const bookingForm = document.getElementById('bookingForm');
    const formMessage = document.getElementById('formMessage');
    
    if (bookingForm) {
        // Real-time validation
        const inputs = bookingForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Form submission
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                await submitForm();
            }
        });
    }
}

// Real-time Field Validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validation rules
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        showFieldSuccess(field);
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error', 'success');
    removeFieldMessage(field);
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#FF4444';
    showFieldMessage(field, message, 'error');
}

function showFieldSuccess(field) {
    field.classList.add('success');
    field.style.borderColor = '#00C851';
    removeFieldMessage(field);
}

function showFieldMessage(field, message, type) {
    removeFieldMessage(field);
    
    const messageEl = document.createElement('div');
    messageEl.className = `field-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        font-size: 0.8rem;
        margin-top: 4px;
        color: ${type === 'error' ? '#FF4444' : '#00C851'};
        animation: fadeInUp 0.3s ease-out;
    `;
    
    field.parentNode.appendChild(messageEl);
}

function removeFieldMessage(field) {
    const existingMessage = field.parentNode.querySelector('.field-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Form Validation
function validateForm() {
    const form = document.getElementById('bookingForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Enhanced Form Submission
async function submitForm() {
    const form = document.getElementById('bookingForm');
    const submitBtn = form.querySelector('.form-submit-btn');
    const formMessage = document.getElementById('formMessage');
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Add estimated price to submission
        data.estimated_price = document.getElementById('estimatedPrice').textContent.replace('₦', '').replace(',', '');
        
        const response = await fetch('/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.fullName,
                email: data.email,
                phone: data.phone,
                service_type: data.serviceType,
                property_size: data.propertySize,
                frequency: data.serviceFrequency,
                preferred_date: data.preferredDate,
                preferred_time: data.preferredTime,
                special_requirements: data.specialRequirements,
                estimated_price: data.estimated_price
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showSuccessMessage(result.message);
            form.reset();
            updatePriceEstimate(); // Reset price
            
            // Track conversion (for analytics)
            trackConversion('booking_submitted', data.serviceType);
        } else {
            showErrorMessage(result.message);
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage('There was an error submitting your request. Please try again or call us directly.');
    } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showSuccessMessage(message) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = 'success-message';
    formMessage.style.display = 'block';
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showErrorMessage(message) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = 'error-message';
    formMessage.style.cssText = `
        display: block;
        background: #FF4444;
        color: white;
        padding: 16px;
        border-radius: 8px;
        margin-top: 16px;
        text-align: center;
        font-weight: 500;
    `;
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Enhanced Price Calculator
function initializePriceCalculator() {
    const serviceType = document.getElementById('serviceType');
    const propertySize = document.getElementById('propertySize');
    const frequency = document.getElementById('serviceFrequency');
    
    if (serviceType && propertySize && frequency) {
        [serviceType, propertySize, frequency].forEach(element => {
            element.addEventListener('change', updatePriceEstimate);
        });
        
        // Initial calculation
        updatePriceEstimate();
    }
}

function updatePriceEstimate() {
    const serviceType = document.getElementById('serviceType').value;
    const propertySize = document.getElementById('propertySize').value.toLowerCase();
    const frequency = document.getElementById('serviceFrequency').value;
    const estimatedPriceEl = document.getElementById('estimatedPrice');
    
    let basePrice = 0;
    
    // Base pricing
    switch (serviceType) {
        case 'Residential Cleaning':
            basePrice = 20000;
            break;
        case 'Commercial Cleaning':
            basePrice = 55000;
            break;
        case 'Vehicle Detailing':
            basePrice = 8000;
            break;
        case 'Industrial Cleaning':
        case 'Post-Construction Cleaning':
            estimatedPriceEl.textContent = 'Custom Quote';
            return;
        default:
            estimatedPriceEl.textContent = '₦0';
            return;
    }
    
    // Size multipliers
    let sizeMultiplier = 1;
    if (propertySize.includes('large') || propertySize.includes('big')) {
        sizeMultiplier = 1.5;
    } else if (propertySize.includes('small') || propertySize.includes('studio')) {
        sizeMultiplier = 0.8;
    } else if (propertySize.includes('3') || propertySize.includes('4') || propertySize.includes('5')) {
        sizeMultiplier = 1.3;
    }
    
    // Frequency discounts
    let frequencyMultiplier = 1;
    switch (frequency) {
        case 'Weekly':
            frequencyMultiplier = 0.85; // 15% discount
            break;
        case 'Bi-Weekly':
            frequencyMultiplier = 0.9; // 10% discount
            break;
        case 'Monthly':
            frequencyMultiplier = 0.95; // 5% discount
            break;
    }
    
    const finalPrice = Math.round(basePrice * sizeMultiplier * frequencyMultiplier);
    estimatedPriceEl.textContent = `₦${finalPrice.toLocaleString()}`;
    
    // Add visual feedback
    estimatedPriceEl.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
        estimatedPriceEl.style.animation = '';
    }, 500);
}

// Micro-interactions for Enhanced UX
function initializeMicroInteractions() {
    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Card hover effects
    document.querySelectorAll('.service-card, .pricing-card, .contact-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Trust indicators animation
    animateTrustIndicators();
    
    // Add click ripple effect
    addRippleEffect();
}

// Animate trust indicators with counting effect
function animateTrustIndicators() {
    const trustNumbers = document.querySelectorAll('.trust-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                if (text.includes('+')) {
                    const number = parseInt(text.replace('+', ''));
                    animateNumber(target, 0, number, '+');
                } else if (text.includes('★')) {
                    const number = parseFloat(text.replace('★', ''));
                    animateNumber(target, 0, number, '★');
                } else if (text.includes('/')) {
                    // Handle 24/7 case
                    target.style.animation = 'fadeInUp 1s ease-out';
                }
                
                observer.unobserve(target);
            }
        });
    });
    
    trustNumbers.forEach(num => observer.observe(num));
}

function animateNumber(element, start, end, suffix) {
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutCubic(progress));
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Add ripple effect to buttons
function addRippleEffect() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
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
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    preloadCriticalResources();
}

function preloadCriticalResources() {
    const criticalResources = [
        '/images/residential.jpg',
        '/images/commercial.jpg',
        '/images/vehicle.jpg'
    ];
    
    criticalResources.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Analytics and Conversion Tracking
function trackConversion(event, value) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', event, {
            'event_category': 'conversion',
            'event_label': value,
            'value': 1
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: value
        });
    }
    
    console.log('Conversion tracked:', event, value);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .nav-menu.active {
        display: flex !important;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        z-index: 999;
        animation: fadeIn 0.3s ease-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .field-message {
        animation: fadeInUp 0.3s ease-out;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

