// Sample course data
const courses = [
    {
        id: 1,
        name: "Piano Basics for Beginners",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1552422535-c45813c61732?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        level: "Beginner",
        instructor: "Sarah Johnson"
    },
    {
        id: 2,
        name: "Intermediate Piano Techniques",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        level: "Intermediate",
        instructor: "David Chen"
    },
    {
        id: 3,
        name: "Jazz Piano Improvisation",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        level: "Advanced",
        instructor: "Emily Williams"
    },
    {
        id: 4,
        name: "Classical Piano Masterclass",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        level: "Advanced",
        instructor: "Robert Martinez"
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true
    });
    
    // DOM elements
    const courseGrid = document.querySelector('.course-grid');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    const newsletterForm = document.querySelector('.newsletter-form');
    const footerNewsletterForm = document.querySelector('.footer-newsletter-form');
    
    // Mobile Menu Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
        
        // Close mobile menu when window is resized above mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = '#fff';
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });

    // Create Course Cards
    function createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.name}">
                <span class="course-badge">${course.level}</span>
            </div>
            <div class="course-info">
                <h3>${course.name}</h3>
                <p class="instructor">Instructor: ${course.instructor}</p>
                <p class="price">$${course.price.toFixed(2)}</p>
                <a href="#" class="course-link">Learn More</a>
            </div>
        `;
        
        // Add event listener to the Learn More button
        const learnMoreBtn = card.querySelector('.course-link');
        learnMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showCourseModal(course);
        });
        
        return card;
    }

    // Display Courses
    function displayCourses() {
        if (courseGrid) {
            courseGrid.innerHTML = '';
            courses.forEach(course => {
                const card = createCourseCard(course);
                courseGrid.appendChild(card);
            });
        }
    }

    // Show Course Modal
    function showCourseModal(course) {
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'course-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-image">
                    <img src="${course.image}" alt="${course.name}">
                    <span class="course-badge">${course.level}</span>
                </div>
                <div class="modal-info">
                    <h2>${course.name}</h2>
                    <p class="instructor">Instructor: ${course.instructor}</p>
                    <p class="price">$${course.price.toFixed(2)}</p>
                    <div class="modal-description">
                        <h3>Course Description</h3>
                        <p>This comprehensive piano course is designed to help you master piano skills through innovative teaching methods. You'll learn through video lessons, interactive exercises, and personalized feedback.</p>
                        <h3>What You'll Learn</h3>
                        <ul>
                            <li>Proper hand positioning and technique</li>
                            <li>Reading sheet music and music theory</li>
                            <li>Practice methods for rapid improvement</li>
                            <li>Performance techniques and expression</li>
                        </ul>
                    </div>
                    <a href="shop.html" class="enroll-button">Enroll Now</a>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.appendChild(modal);
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
        
        // Add close functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Testimonial carousel
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        
        if (index < 0) {
            currentTestimonial = testimonialCards.length - 1;
        } else if (index >= testimonialCards.length) {
            currentTestimonial = 0;
        } else {
            currentTestimonial = index;
        }
        
        testimonialCards[currentTestimonial].classList.add('active');
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
        });
        
        nextButton.addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    }

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

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize
    displayCourses();
    if (testimonialCards.length > 0) {
        showTestimonial(0);
    }

    // Make filter groups collapsible on mobile
    const filterGroups = document.querySelectorAll('.filter-group h3');
    if (filterGroups.length > 0) {
        filterGroups.forEach(heading => {
            heading.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    heading.classList.toggle('active');
                    const filterOptions = heading.nextElementSibling;
                    if (filterOptions) {
                        filterOptions.classList.toggle('show');
                    }
                }
            });
        });
    }

    // Add touch support for testimonial slider
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        testimonialContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX) {
                // Swipe left
                showTestimonial(currentTestimonial + 1);
            }
            if (touchEndX > touchStartX) {
                // Swipe right
                showTestimonial(currentTestimonial - 1);
            }
        }
    }
});

// Add CSS for modal and notifications
const style = document.createElement('style');
style.textContent = `
    /* Course Modal */
    .course-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1010;
        padding: 2rem;
    }
    
    .modal-content {
        background: #fff;
        border-radius: 10px;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
        z-index: 1;
        background: #fff;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    .modal-image {
        position: relative;
        height: 250px;
    }
    
    .modal-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
    }
    
    .modal-info {
        padding: 2rem;
    }
    
    .modal-info h2 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }
    
    .modal-description {
        margin: 1.5rem 0;
    }
    
    .modal-description h3 {
        color: #2c3e50;
        margin-bottom: 0.8rem;
        font-size: 1.2rem;
    }
    
    .modal-description ul {
        padding-left: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .modal-description li {
        margin-bottom: 0.5rem;
        color: #666;
    }
    
    .enroll-button {
        display: inline-block;
        padding: 0.8rem 2rem;
        background-color: #3498db;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: 500;
        transition: background-color 0.3s ease;
    }
    
    .enroll-button:hover {
        background-color: #2980b9;
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
    
    @media (min-width: 768px) {
        .modal-content {
            flex-direction: row;
        }
        
        .modal-image {
            width: 40%;
            height: auto;
            border-radius: 10px 0 0 10px;
        }
        
        .modal-image img {
            border-radius: 10px 0 0 10px;
            height: 100%;
        }
        
        .modal-info {
            width: 60%;
        }
    }
    
    @media (max-width: 768px) {
        .course-modal {
            padding: 1rem;
        }
    }
`;
document.head.appendChild(style); 