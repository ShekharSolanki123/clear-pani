document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.classList.add('menu-open');
            
            // Toggle hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        });
        
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Reset hamburger
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        }
    }
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    if (slides.length > 0 && dots.length > 0) {
        // Initialize slider
        showSlide(0);
        startSlideshow();
        
        // Add click events to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                startSlideshow();
            });
        });
    }
    
    // Video Player
    const videoOverlay = document.querySelector('.video-overlay');
    const video = document.getElementById('promo-video');
    
    if (videoOverlay && video) {
        videoOverlay.addEventListener('click', function() {
            video.play();
            videoOverlay.style.display = 'none';
        });
        
        video.addEventListener('pause', function() {
            videoOverlay.style.display = 'flex';
        });
        
        video.addEventListener('ended', function() {
            videoOverlay.style.display = 'flex';
        });
    }
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        const submitBtn = contactForm.querySelector('.submit-btn');
        const spinner = contactForm.querySelector('.spinner');
        const btnText = contactForm.querySelector('.btn-text');
        
        function validateInput(input) {
            const errorMessage = input.nextElementSibling;
            
            if (input.validity.valid) {
                errorMessage.textContent = '';
                input.classList.remove('error');
                return true;
            } else {
                if (input.validity.valueMissing) {
                    errorMessage.textContent = 'This field is required';
                } else if (input.validity.typeMismatch) {
                    if (input.type === 'email') {
                        errorMessage.textContent = 'Please enter a valid email address';
                    } else {
                        errorMessage.textContent = 'Please enter a valid format';
                    }
                } else if (input.validity.patternMismatch) {
                    errorMessage.textContent = 'Please enter a valid format';
                }
                
                input.classList.add('error');
                return false;
            }
        }
        
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show loading spinner
                spinner.style.display = 'block';
                btnText.style.visibility = 'hidden';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Hide spinner
                    spinner.style.display = 'none';
                    btnText.style.visibility = 'visible';
                    submitBtn.disabled = false;
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    showToast('Thank you for your message! We will get back to you soon.', 'success');
                }, 2000);
            }
        });
    }
    
    // Product hover effect
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
                card.style.borderColor = 'var(--primary-color)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                card.style.borderColor = 'var(--medium-gray)';
            }
        });
    });
    
    // Sticky header effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    const cartBadge = document.querySelector('.cart-badge');
    let cartCount = parseInt(cartBadge.textContent);
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            cartBadge.textContent = cartCount;
            
            // Animation effect
            cartBadge.classList.add('pulse');
            setTimeout(() => {
                cartBadge.classList.remove('pulse');
            }, 300);
            
            // Get product info
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Show confirmation
            showToast(`${productName} added to cart!`, 'success');
        });
    });
    
    // Scroll animations
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    function checkInView() {
        const windowHeight = window.innerHeight;
        const windowTop = window.pageYOffset;
        const windowBottom = windowTop + windowHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Check if element is in viewport
            if (elementBottom > windowTop && elementTop < windowBottom) {
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay);
            }
        });
    }
    
    // Initial check
    checkInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkInView);
    
    // Count up animation for stats
    const countElements = document.querySelectorAll('.count-up');
    
    function animateCount(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / duration * 10; // Update every 10ms
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            
            // Format with commas for thousands
            element.textContent = Math.floor(current).toLocaleString();
        }, 10);
    }
    
    // Intersection Observer for count up
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        countElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        countElements.forEach(element => {
            animateCount(element);
        });
    }
    
    // Toast notification system
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.classList.add('toast', `toast-${type}`);
        
        const icon = document.createElement('span');
        icon.classList.add('toast-icon');
        
        if (type === 'success') {
            icon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M20 6L9 17l-5-5"></path></svg>';
        } else if (type === 'error') {
            icon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M18 6L6 18M6 6l12 12"></path></svg>';
        } else {
            icon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4M12 16h.01"></path></svg>';
        }
        
        const content = document.createElement('div');
        content.classList.add('toast-content');
        content.textContent = message;
        
        toast.appendChild(icon);
        toast.appendChild(content);
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
});

// Add CSS for toast notifications
const style = document.createElement('style');
style.textContent = `
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        min-width: 300px;
    }
    
    .toast.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .toast-success {
        background-color: #4caf50;
    }
    
    .toast-error {
        background-color: #f44336;
    }
    
    .toast-icon {
        margin-right: 12px;
    }
    
    .toast-icon svg {
        stroke: white;
        stroke-width: 2;
        fill: none;
    }
    
    .toast-content {
        flex: 1;
    }
    
    .pulse {
        animation: pulse 0.3s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .mobile-menu-toggle span.active {
        margin: 0;
    }
    
    @media (max-width: 576px) {
        .toast {
            left: 20px;
            right: 20px;
            min-width: auto;
        }
    }
`;
document.head.appendChild(style);