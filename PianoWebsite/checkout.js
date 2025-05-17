document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const cartCount = document.querySelector('.cart-count');
    const checkoutItems = document.getElementById('checkout-items');
    const subtotalAmount = document.getElementById('subtotal-amount');
    const taxAmount = document.getElementById('tax-amount');
    const totalAmount = document.getElementById('total-amount');
    const paymentForm = document.getElementById('payment-form');
    const creditCardForm = document.getElementById('credit-card-form');
    const paypalForm = document.getElementById('paypal-form');
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const promoForm = document.querySelector('.promo-form');
    const loadingElement = document.querySelector('.loading');

    // Cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
    }

    // Update Cart UI
    function updateCartUI() {
        if (cartCount) {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
        
        if (cartItems) {
            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
                if (cartTotalAmount) {
                    cartTotalAmount.textContent = '$0.00';
                }
            } else {
                cartItems.innerHTML = '';
                let total = 0;
                
                cart.forEach(item => {
                    total += item.price * item.quantity;
                    
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                        </div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                        <button class="remove-from-cart-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    `;
                    
                    cartItems.appendChild(cartItem);
                });
                
                if (cartTotalAmount) {
                    cartTotalAmount.textContent = `$${total.toFixed(2)}`;
                }
                
                // Add event listeners to remove buttons
                document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const id = parseInt(e.currentTarget.getAttribute('data-id'));
                        removeFromCart(id);
                    });
                });
            }
        }
        
        // Update checkout UI if on checkout page
        updateCheckoutUI();
    }

    // Remove from Cart
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        showNotification('Item removed from cart');
    }

    // Cart Sidebar Toggle
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Update Checkout UI
    function updateCheckoutUI() {
        if (checkoutItems && loadingElement) {
            if (cart.length === 0) {
                checkoutItems.innerHTML = `
                    <div class="empty-checkout-message">
                        <p>Your cart is empty. Please add some courses before proceeding to checkout.</p>
                        <a href="shop.html" class="cta-button">Go to Shop</a>
                    </div>
                `;
                
                // Hide the form if cart is empty
                if (paymentForm) {
                    paymentForm.style.display = 'none';
                }
                
                // Hide loading message
                loadingElement.style.display = 'none';
            } else {
                loadingElement.style.display = 'none';
                checkoutItems.innerHTML = '';
                
                let subtotal = 0;
                
                cart.forEach(item => {
                    subtotal += item.price * item.quantity;
                    
                    const checkoutItem = document.createElement('div');
                    checkoutItem.className = 'checkout-item';
                    checkoutItem.innerHTML = `
                        <div class="checkout-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="checkout-item-details">
                            <h4>${item.name}</h4>
                            <p>${item.level} Course</p>
                            <p>Instructor: ${item.instructor}</p>
                        </div>
                        <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    `;
                    
                    checkoutItems.appendChild(checkoutItem);
                });
                
                // Calculate tax and total
                const tax = subtotal * 0.07;
                const total = subtotal + tax;
                
                // Update totals
                if (subtotalAmount) subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
                if (taxAmount) taxAmount.textContent = `$${tax.toFixed(2)}`;
                if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;
                
                // Show the form
                if (paymentForm) {
                    paymentForm.style.display = 'block';
                }
            }
        }
    }

    // Toggle Payment Method
    if (paymentMethods) {
        paymentMethods.forEach(method => {
            method.addEventListener('change', (e) => {
                if (e.target.value === 'credit-card') {
                    creditCardForm.style.display = 'block';
                    paypalForm.style.display = 'none';
                } else if (e.target.value === 'paypal') {
                    creditCardForm.style.display = 'none';
                    paypalForm.style.display = 'block';
                }
            });
        });
    }

    // Promo Code Form
    if (promoForm) {
        promoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const promoInput = promoForm.querySelector('input');
            const promoCode = promoInput.value.trim();
            
            if (promoCode === '') {
                showNotification('Please enter a promo code', 'error');
                promoInput.classList.add('error-input');
                return;
            }
            
            // Reset error state
            promoInput.classList.remove('error-input');
            
            // Mock promo code validation
            const validPromoCodes = {
                'PIANO10': 10,
                'WELCOME20': 20,
                'SUMMER15': 15
            };
            
            if (validPromoCodes[promoCode.toUpperCase()]) {
                // Apply discount 
                if (subtotalAmount && taxAmount && totalAmount) {
                    const discountPercent = validPromoCodes[promoCode.toUpperCase()];
                    const currentSubtotal = parseFloat(subtotalAmount.textContent.substring(1));
                    const discount = currentSubtotal * (discountPercent / 100);
                    const newSubtotal = currentSubtotal - discount;
                    const tax = newSubtotal * 0.07;
                    const total = newSubtotal + tax;
                    
                    // Update totals
                    subtotalAmount.textContent = `$${newSubtotal.toFixed(2)}`;
                    taxAmount.textContent = `$${tax.toFixed(2)}`;
                    totalAmount.textContent = `$${total.toFixed(2)}`;
                    
                    // Add discount row
                    const orderTotals = document.querySelector('.order-totals');
                    const discountElem = document.querySelector('.order-discount');
                    
                    if (!discountElem && orderTotals) {
                        const discountRow = document.createElement('div');
                        discountRow.className = 'order-discount';
                        discountRow.innerHTML = `
                            <span>Discount (${discountPercent}%):</span>
                            <span>-$${discount.toFixed(2)}</span>
                        `;
                        orderTotals.insertBefore(discountRow, document.querySelector('.order-tax'));
                    }
                    
                    showNotification(`Promo code applied successfully! ${discountPercent}% discount`);
                    promoInput.disabled = true;
                    promoForm.querySelector('button').disabled = true;
                }
            } else {
                showNotification('Invalid promo code', 'error');
                promoInput.classList.add('error-input');
            }
        });
    }

    // Payment Form Validation and Submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form fields
            const email = document.getElementById('email').value.trim();
            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const address = document.getElementById('address').value.trim();
            const city = document.getElementById('city').value.trim();
            const postalCode = document.getElementById('postal-code').value.trim();
            const country = document.getElementById('country').value;
            
            // Credit card fields (only validate if credit card is selected)
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
            
            let isValid = true;
            let errorMessage = '';
            
            // Reset any previous error styles
            document.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate email
            if (!validateEmail(email)) {
                showInputError('email', 'Please enter a valid email address');
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            
            // Validate required fields
            const requiredFields = [
                { id: 'first-name', name: 'First Name' },
                { id: 'last-name', name: 'Last Name' },
                { id: 'address', name: 'Address' },
                { id: 'city', name: 'City' },
                { id: 'postal-code', name: 'Postal Code' }
            ];
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field.id);
                if (!input.value.trim()) {
                    showInputError(field.id, `${field.name} is required`);
                    isValid = false;
                    errorMessage = 'Please fill in all required fields';
                }
            });
            
            // Validate country selection
            if (!country) {
                showInputError('country', 'Please select a country');
                isValid = false;
                errorMessage = 'Please select a country';
            }
            
            // Validate credit card fields if credit card payment is selected
            if (paymentMethod === 'credit-card') {
                const cardNumber = document.getElementById('card-number').value.trim();
                const expiryDate = document.getElementById('expiry-date').value.trim();
                const cvv = document.getElementById('cvv').value.trim();
                const cardName = document.getElementById('card-name').value.trim();
                
                // Credit card validation
                if (!validateCreditCard(cardNumber)) {
                    showInputError('card-number', 'Please enter a valid credit card number');
                    isValid = false;
                    errorMessage = 'Please enter a valid credit card number';
                }
                
                // Expiry date validation (MM/YY format)
                if (!validateExpiryDate(expiryDate)) {
                    showInputError('expiry-date', 'Please enter a valid expiry date (MM/YY)');
                    isValid = false;
                    errorMessage = 'Please enter a valid expiry date';
                }
                
                // CVV validation (3-4 digits)
                if (!validateCVV(cvv)) {
                    showInputError('cvv', 'Please enter a valid CVV (3-4 digits)');
                    isValid = false;
                    errorMessage = 'Please enter a valid CVV';
                }
                
                // Card name validation
                if (!cardName) {
                    showInputError('card-name', 'Name on card is required');
                    isValid = false;
                    errorMessage = 'Name on card is required';
                }
            }
            
            if (!isValid) {
                showNotification(errorMessage, 'error');
                return;
            }
            
            // If everything is valid, show order confirmation modal
            showOrderConfirmation();
        });
    }
    
    // Helper function to show input errors
    function showInputError(inputId, message) {
        const input = document.getElementById(inputId);
        const formGroup = input.closest('.form-group');
        
        input.classList.add('error-input');
        
        // Only add error message if it doesn't already exist
        if (!formGroup.querySelector('.error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            formGroup.appendChild(errorMessage);
        }
    }
    
    // Validation functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    function validateCreditCard(cardNumber) {
        // Remove spaces and dashes
        cardNumber = cardNumber.replace(/[\s-]/g, '');
        // Check if it contains only digits and has appropriate length (13-19 digits)
        return /^\d{13,19}$/.test(cardNumber);
    }
    
    function validateExpiryDate(expiryDate) {
        // Check MM/YY format
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            return false;
        }
        
        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of year
        const currentMonth = currentDate.getMonth() + 1; // getMonth() is 0-indexed
        
        // Convert to numbers
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        
        // Check if month is valid (1-12)
        if (monthNum < 1 || monthNum > 12) {
            return false;
        }
        
        // Check if the card is expired
        if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
            return false;
        }
        
        return true;
    }
    
    function validateCVV(cvv) {
        // CVV should be 3-4 digits
        return /^\d{3,4}$/.test(cvv);
    }

    // Show Order Confirmation Modal
    function showOrderConfirmation() {
        // Mock order processing (in a real app, this would be an API call)
        const orderModal = document.createElement('div');
        orderModal.className = 'modal';
        orderModal.id = 'order-confirmation-modal';
        
        // Calculate order totals
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.07;
        const total = subtotal + tax;
        
        // Create order number
        const orderNumber = Math.floor(100000000 + Math.random() * 900000000);
        
        orderModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="confirmation-message">
                    <i class="fas fa-check-circle"></i>
                    <h2>Order Confirmed!</h2>
                    <p>Your order has been successfully processed.</p>
                </div>
                <div class="order-details">
                    <p><strong>Order Number:</strong> #${orderNumber}</p>
                    <p><strong>Total Amount:</strong> $${total.toFixed(2)}</p>
                    <p><strong>Courses:</strong> ${cart.length}</p>
                    <p>A confirmation email has been sent to your email address.</p>
                </div>
                <div class="confirmation-actions">
                    <a href="index.html" class="confirmation-button">Back to Home</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(orderModal);
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        const closeModal = orderModal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            document.body.removeChild(orderModal);
            document.body.style.overflow = 'auto';
            
            // Clear cart after successful order
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
        
        // Close modal when clicking outside content
        orderModal.addEventListener('click', (e) => {
            if (e.target === orderModal) {
                document.body.removeChild(orderModal);
                document.body.style.overflow = 'auto';
                
                // Clear cart after successful order
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Redirect to home page
                window.location.href = 'index.html';
            }
        });
        
        // Back to Home button
        const backToHomeBtn = orderModal.querySelector('.confirmation-button');
        backToHomeBtn.addEventListener('click', () => {
            // Clear cart after successful order
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    }

    // Show notification
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            document.body.removeChild(existingNotification);
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type === 'success' ? 'notification-success' : type === 'error' ? 'notification-error' : 'notification-info'}`;
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            
            // Remove from DOM after fade out
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Initialize the cart UI
    updateCartUI();
    
    // Format inputs for better user experience
    if (document.getElementById('card-number')) {
        document.getElementById('card-number').addEventListener('input', formatCardNumber);
    }
    
    if (document.getElementById('expiry-date')) {
        document.getElementById('expiry-date').addEventListener('input', formatExpiryDate);
    }
    
    // Format card number with spaces (4 digits groups)
    function formatCardNumber(e) {
        const input = e.target;
        let value = input.value.replace(/\D/g, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        input.value = formattedValue;
    }
    
    // Format expiry date as MM/YY
    function formatExpiryDate(e) {
        const input = e.target;
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            input.value = value.substring(0, 2) + '/' + value.substring(2, 4);
        } else {
            input.value = value;
        }
    }
}); 