document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true
    });
    
    // DOM elements
    const contactForm = document.getElementById('contact-form');
    const faqItems = document.querySelectorAll('.faq-item');
    const newsletterForm = document.querySelector('.newsletter-form');
    const footerNewsletterForm = document.querySelector('.footer-newsletter-form');
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate input fields
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real implementation, this would send data to a server
            // For demo purposes, we'll just show a success message
            showMessage('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // FAQ toggle functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle i');
        
        // Initially hide all answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            // Toggle answer visibility
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
                icon.className = 'fas fa-minus';
                item.classList.add('active');
            } else {
                answer.style.display = 'none';
                icon.className = 'fas fa-plus';
                item.classList.remove('active');
            }
        });
    });
    
    // Newsletter Form Submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showMessage('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                showMessage('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Footer Newsletter Form
    if (footerNewsletterForm) {
        footerNewsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = footerNewsletterForm.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showMessage('Thank you for subscribing to our newsletter!');
                footerNewsletterForm.reset();
            } else {
                showMessage('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Message notification
    function showMessage(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add CSS for contact page elements
    const contactStyle = document.createElement('style');
    contactStyle.textContent = `
        /* Contact Page Styles */
        .page-header {
            background: linear-gradient(rgba(44, 62, 80, 0.8), rgba(44, 62, 80, 0.8)),
                        url('https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
            background-size: cover;
            background-position: center;
            color: #fff;
            text-align: center;
            padding: 120px 5% 70px;
        }
        
        .page-header-content h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .contact-section {
            padding: 5rem 0;
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
        }
        
        /* Contact Info */
        .contact-info {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .contact-info h2 {
            color: #2c3e50;
            margin-bottom: 1.5rem;
            font-size: 1.8rem;
        }
        
        .contact-intro {
            color: #666;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .contact-method {
            display: flex;
            margin-bottom: 1.5rem;
        }
        
        .contact-icon {
            width: 50px;
            height: 50px;
            background: #3498db;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 1.2rem;
            margin-right: 15px;
        }
        
        .contact-details h3 {
            margin-bottom: 0.5rem;
            color: #2c3e50;
            font-size: 1.2rem;
        }
        
        .contact-details p {
            color: #666;
            line-height: 1.5;
        }
        
        .social-contact {
            margin-top: 2rem;
        }
        
        .social-contact h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .social-icons {
            display: flex;
            gap: 15px;
        }
        
        .social-icon {
            width: 40px;
            height: 40px;
            background: #f1f1f1;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2c3e50;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .social-icon:hover {
            background: #3498db;
            color: #fff;
        }
        
        /* Contact Form */
        .contact-form-container {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .contact-form-container h2 {
            color: #2c3e50;
            margin-bottom: 1.5rem;
            font-size: 1.8rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #2c3e50;
            font-weight: 500;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            font-family: inherit;
            outline: none;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            border-color: #3498db;
        }
        
        .submit-button {
            width: 100%;
            padding: 12px;
            background: #3498db;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .submit-button:hover {
            background: #2980b9;
        }
        
        /* Map Section */
        .map-section {
            padding: 4rem 0;
            background: #f9f9f9;
        }
        
        .map-section h2 {
            color: #2c3e50;
            margin-bottom: 2rem;
            text-align: center;
            font-size: 2rem;
        }
        
        .map-container {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            height: 450px;
        }
        
        .map-container iframe {
            width: 100%;
            height: 100%;
            border: 0;
        }
        
        /* FAQ Section */
        .faq-section {
            padding: 5rem 0;
        }
        
        .faq-section h2 {
            color: #2c3e50;
            margin-bottom: 3rem;
            text-align: center;
            font-size: 2rem;
        }
        
        .faq-container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .faq-item {
            background: #fff;
            margin-bottom: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .faq-question {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .faq-item.active .faq-question {
            background: #3498db;
            color: #fff;
        }
        
        .faq-question h3 {
            margin: 0;
            font-size: 1.1rem;
        }
        
        .faq-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
        }
        
        .faq-answer {
            padding: 0 20px 20px;
            color: #666;
            line-height: 1.6;
        }
        
        /* Notification */
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: #3498db;
            color: #fff;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1020;
        }
        
        .notification.error {
            background: #e74c3c;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
            .contact-grid {
                grid-template-columns: 1fr;
            }
            
            .page-header-content h1 {
                font-size: 2rem;
            }
            
            .map-container {
                height: 350px;
            }
        }
    `;
    
    document.head.appendChild(contactStyle);
}); 