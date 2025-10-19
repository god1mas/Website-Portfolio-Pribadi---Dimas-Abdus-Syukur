// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS (ganti dengan Public Key Anda)
    emailjs.init("YOUR_PUBLIC_KEY"); // Dapatkan dari https://www.emailjs.com/
    
    // Initialize contact form
    initContactForm();
    initCopyButtons();
    initSocialLinks();
});

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successToast = document.getElementById('successToast');
    const errorToast = document.getElementById('errorToast');

    if (!contactForm) return;

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearError(this);
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    function validateField(field) {
        const value = field.value.trim();
        const errorElement = field.parentElement.querySelector('.error-message');

        // Clear previous error
        clearError(field);

        // Validation rules
        if (field.required && !value) {
            showError(field, 'This field is required');
            return false;
        }

        switch (field.type) {
            case 'email':
                if (!isValidEmail(value)) {
                    showError(field, 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'text':
                if (field.id === 'name' && value.length < 2) {
                    showError(field, 'Name must be at least 2 characters long');
                    return false;
                }
                if (field.id === 'subject' && value.length < 5) {
                    showError(field, 'Subject must be at least 5 characters long');
                    return false;
                }
                break;
            case 'textarea':
                if (value.length < 10) {
                    showError(field, 'Message must be at least 10 characters long');
                    return false;
                }
                break;
        }

        return true;
    }

    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function showError(field, message) {
        field.classList.add('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        errorElement.classList.remove('show');
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function submitForm() {
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Show loading state
        submitBtn.classList.add('loading');

        try {
            // Using Formspree (existing)
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showToast(successToast);
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast(errorToast);
        } finally {
            // Hide loading state
            submitBtn.classList.remove('loading');
        }
    }

    function showToast(toastElement) {
        toastElement.classList.add('show');
        
        setTimeout(() => {
            toastElement.classList.remove('show');
        }, 5000);
    }
}

// Copy to Clipboard Functionality
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show copied state
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.classList.add('copied');
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
}

// Social Links Enhancement
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Form Animation on Scroll
function initFormAnimations() {
    const contactLeft = document.querySelector('.contact-left');
    const contactRight = document.querySelector('.contact-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    if (contactLeft) {
        contactLeft.style.opacity = '0';
        contactLeft.style.transform = 'translateY(30px)';
        contactLeft.style.transition = 'all 0.6s ease';
        observer.observe(contactLeft);
    }

    if (contactRight) {
        contactRight.style.opacity = '0';
        contactRight.style.transform = 'translateY(30px)';
        contactRight.style.transition = 'all 0.6s ease 0.2s';
        observer.observe(contactRight);
    }
}

// Initialize animations when page loads
window.addEventListener('load', initFormAnimations);