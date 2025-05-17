document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    const slideCount = testimonialSlides.length;

    // Initialize testimonial slider
    function initTestimonialSlider() {
        updateSlider();

        // Add event listeners to dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                currentSlide = parseInt(this.getAttribute('data-index'));
                updateSlider();
            });
        });

        // Add event listeners to prev/next buttons
        prevButton.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlider();
        });

        nextButton.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        });

        // Auto rotate testimonials
        setInterval(function() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }, 5000);
    }

    // Update slider
    function updateSlider() {
        // Update slides
        testimonialSlides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Initialize testimonial slider if it exists on the page
    if (testimonialSlides.length > 0) {
        initTestimonialSlider();
    }

    // Team member hover effect
    const teamMembers = document.querySelectorAll('.team-member-expanded');
    
    teamMembers.forEach(member => {
        const overlay = member.querySelector('.member-overlay');
        
        member.addEventListener('mouseenter', function() {
            overlay.style.opacity = '1';
        });
        
        member.addEventListener('mouseleave', function() {
            overlay.style.opacity = '0';
        });
    });

    // Cart functionality - get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const checkoutButton = document.querySelector('.checkout-button');

    // Update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Update cart items
    function updateCartItems() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
            cartTotalAmount.textContent = '$0.00';
            
            // Disable checkout button
            if (checkoutButton) {
                checkoutButton.disabled = true;
                checkoutButton.classList.add('disabled');
            }
        } else {
            cartItems.innerHTML = '';
            let total = 0;
            
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-from-cart-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                cartItems.appendChild(cartItem);
                total += item.price;
            });
            
            // Update total
            cartTotalAmount.textContent = `$${total.toFixed(2)}`;
            
            // Enable checkout button
            if (checkoutButton) {
                checkoutButton.disabled = false;
                checkoutButton.classList.remove('disabled');
            }
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
                button.addEventListener('click', removeFromCart);
            });
        }
    }

    // Toggle cart sidebar
    const cartIcon = document.querySelector('.cart-icon');
    const closeCart = document.querySelector('.close-cart');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    function closeCartSidebar() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', closeCartSidebar);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartSidebar);
    }

    // Remove from cart
    function removeFromCart(e) {
        const courseId = parseInt(e.target.closest('.remove-from-cart-btn').getAttribute('data-id'));
        const courseIndex = cart.findIndex(item => item.id === courseId);
        
        if (courseIndex !== -1) {
            cart.splice(courseIndex, 1);
            
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart display
            updateCartCount();
            updateCartItems();
        }
    }

    // Checkout process
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty');
            } else {
                // Redirect to checkout page
                window.location.href = 'checkout.html';
            }
        });
    }

    // Initialize cart
    updateCartCount();
    updateCartItems();
}); 