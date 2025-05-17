document.addEventListener('DOMContentLoaded', function() {
    // Sample course data
    const courses = [
        {
            id: 1,
            title: "Piano Fundamentals for Beginners",
            category: "classical",
            level: "beginner",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1552422535-c45813c61732?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.8,
            students: 1253,
            description: "Start your piano journey with this comprehensive course for absolute beginners."
        },
        {
            id: 2,
            title: "Jazz Piano Improvisation",
            category: "jazz",
            level: "intermediate",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.7,
            students: 842,
            description: "Learn to improvise and play jazz standards with confidence."
        },
        {
            id: 3,
            title: "Advanced Classical Techniques",
            category: "classical",
            level: "advanced",
            price: 99.99,
            image: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.9,
            students: 631,
            description: "Master advanced techniques used in classical piano compositions."
        },
        {
            id: 4,
            title: "Pop Piano Masterclass",
            category: "pop",
            level: "intermediate",
            price: 69.99,
            image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.6,
            students: 1087,
            description: "Learn to play your favorite pop songs and develop your own arrangements."
        },
        {
            id: 5,
            title: "Music Theory Essentials",
            category: "theory",
            level: "beginner",
            price: 39.99,
            image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.5,
            students: 1562,
            description: "Build a solid foundation in music theory to enhance your piano playing."
        },
        {
            id: 6,
            title: "Blues Piano Techniques",
            category: "jazz",
            level: "intermediate",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1542577722-a0274557f3cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.7,
            students: 723,
            description: "Dive into blues piano styles and techniques to add soul to your playing."
        },
        {
            id: 7,
            title: "Contemporary Piano Composition",
            category: "pop",
            level: "advanced",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1520446266423-6daca23fe8c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.8,
            students: 503,
            description: "Learn to compose your own contemporary piano pieces."
        },
        {
            id: 8,
            title: "Piano for Kids",
            category: "classical",
            level: "beginner",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1503712501487-c33886f0ede5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.9,
            students: 2134,
            description: "A fun and engaging introduction to piano for young learners."
        },
        {
            id: 9,
            title: "Film Score Piano Techniques",
            category: "pop",
            level: "advanced",
            price: 119.99,
            image: "https://images.unsplash.com/photo-1554446422-d05db23719d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.8,
            students: 412,
            description: "Learn to play and compose emotional piano pieces for film and media."
        },
        {
            id: 10,
            title: "Keyboard Harmony & Voicing",
            category: "theory",
            level: "intermediate",
            price: 69.99,
            image: "https://images.unsplash.com/photo-1521804106799-c7e3c6c6bcf0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.6,
            students: 683,
            description: "Master keyboard harmony concepts to enrich your piano arrangements."
        },
        {
            id: 11,
            title: "Sight Reading Mastery",
            category: "theory",
            level: "intermediate",
            price: 54.99,
            image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.7,
            students: 894,
            description: "Improve your sight reading skills and play new pieces with confidence."
        },
        {
            id: 12,
            title: "Piano Technique Bootcamp",
            category: "classical",
            level: "beginner",
            price: 44.99,
            image: "https://images.unsplash.com/photo-1488376739361-ed24c9beb6d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.8,
            students: 1435,
            description: "Build proper technique and avoid injuries with this essential course."
        }
    ];

    // Get cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const checkoutButton = document.querySelector('.checkout-button');
    
    // Toggle cart sidebar
    const cartIcon = document.querySelector('.cart-icon');
    const closeCart = document.querySelector('.close-cart');
    
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    function closeCartSidebar() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    
    // Filter variables
    let activeFilters = {
        categories: [],
        levels: [],
        maxPrice: 200
    };
    
    // Display courses in the grid
    function displayCourses(filteredCourses = null) {
        const courseGrid = document.getElementById('course-grid');
        if (!courseGrid) return;
        
        courseGrid.innerHTML = '';
        
        // Use filtered courses if provided, otherwise use all courses
        const coursesToDisplay = filteredCourses || courses;
        
        // Update course count
        const courseCount = document.getElementById('course-count');
        if (courseCount) {
            courseCount.textContent = coursesToDisplay.length;
        }
        
        if (coursesToDisplay.length === 0) {
            courseGrid.innerHTML = `
                <div class="no-results">
                    <p>No courses match your filters. Please try different filter options.</p>
                    <button id="clear-filters" class="filter-button">Clear All Filters</button>
                </div>
            `;
            
            document.getElementById('clear-filters').addEventListener('click', function() {
                resetFilters();
                filterCourses();
            });
            
            return;
        }
        
        coursesToDisplay.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            courseCard.setAttribute('data-id', course.id);
            courseCard.setAttribute('data-category', course.category);
            courseCard.setAttribute('data-level', course.level);
            courseCard.setAttribute('data-price', course.price);
            
            // Check if course is in cart
            const isInCart = cart.some(item => item.id === course.id);
            
            courseCard.innerHTML = `
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}" loading="lazy">
                    <div class="course-level ${course.level}">${course.level.charAt(0).toUpperCase() + course.level.slice(1)}</div>
                </div>
                <div class="course-details">
                    <h3>${course.title}</h3>
                    <div class="course-meta">
                        <div class="course-rating">
                            <i class="fas fa-star"></i>
                            <span>${course.rating}</span>
                            <span class="student-count">(${course.students} students)</span>
                        </div>
                        <div class="course-price">$${course.price.toFixed(2)}</div>
                    </div>
                    <p class="course-description">${course.description}</p>
                    <button class="add-to-cart-btn ${isInCart ? 'in-cart' : ''}" data-id="${course.id}">
                        ${isInCart ? '<i class="fas fa-check"></i> In Cart' : 'Add to Cart'}
                    </button>
                </div>
            `;
            
            courseGrid.appendChild(courseCard);
        });
        
        // Add event listeners to Add to Cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
    
    // Filter courses based on active filters
    function filterCourses() {
        let filteredCourses = [...courses];
        
        // Filter by categories
        if (activeFilters.categories.length > 0) {
            filteredCourses = filteredCourses.filter(course => 
                activeFilters.categories.includes(course.category)
            );
        }
        
        // Filter by levels
        if (activeFilters.levels.length > 0) {
            filteredCourses = filteredCourses.filter(course => 
                activeFilters.levels.includes(course.level)
            );
        }
        
        // Filter by price
        filteredCourses = filteredCourses.filter(course => 
            course.price <= activeFilters.maxPrice
        );
        
        // Apply sorting if needed
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            const sortValue = sortSelect.value;
            sortCourses(filteredCourses, sortValue);
        }
        
        displayCourses(filteredCourses);
    }
    
    // Sort courses
    function sortCourses(coursesToSort, sortBy) {
        switch(sortBy) {
            case 'popular':
                coursesToSort.sort((a, b) => b.students - a.students);
                break;
            case 'newest':
                // For demo purposes, we'll just shuffle
                coursesToSort.sort(() => Math.random() - 0.5);
                break;
            case 'price-low':
                coursesToSort.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                coursesToSort.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
    }
    
    // Setup event listeners for filters
    function setupFilters() {
        // Category filters
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateCategoryFilters();
                filterCourses();
            });
        });
        
        // Level filters
        const levelCheckboxes = document.querySelectorAll('input[name="level"]');
        levelCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateLevelFilters();
                filterCourses();
            });
        });
        
        // Price range filter
        const priceRange = document.getElementById('price-range');
        const priceValue = document.getElementById('price-value');
        
        if (priceRange && priceValue) {
            priceRange.addEventListener('input', function() {
                const value = this.value;
                priceValue.textContent = value == 200 ? '$200+' : `$${value}`;
                activeFilters.maxPrice = parseInt(value);
            });
            
            priceRange.addEventListener('change', function() {
                filterCourses();
            });
        }
        
        // Sort select
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                filterCourses();
            });
        }
        
        // Apply filters button
        const applyFiltersBtn = document.getElementById('apply-filters');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', filterCourses);
        }
        
        // Reset filters button
        const resetFiltersBtn = document.getElementById('reset-filters');
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', function() {
                resetFilters();
                filterCourses();
            });
        }
    }
    
    // Update category filters based on checkboxes
    function updateCategoryFilters() {
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
        const allCategoriesCheckbox = document.querySelector('input[name="category"][value="all"]');
        
        // Handle "All" checkbox
        if (allCategoriesCheckbox && allCategoriesCheckbox.checked) {
            activeFilters.categories = [];
            
            // Uncheck other category checkboxes
            document.querySelectorAll('input[name="category"]:not([value="all"])').forEach(cb => {
                cb.checked = false;
            });
        } else {
            // Get selected categories
            activeFilters.categories = Array.from(categoryCheckboxes)
                .filter(cb => cb.value !== 'all')
                .map(cb => cb.value);
            
            // Update "All" checkbox state
            if (allCategoriesCheckbox) {
                allCategoriesCheckbox.checked = activeFilters.categories.length === 0;
            }
        }
    }
    
    // Update level filters based on checkboxes
    function updateLevelFilters() {
        const levelCheckboxes = document.querySelectorAll('input[name="level"]:checked');
        const allLevelsCheckbox = document.querySelector('input[name="level"][value="all"]');
        
        // Handle "All" checkbox
        if (allLevelsCheckbox && allLevelsCheckbox.checked) {
            activeFilters.levels = [];
            
            // Uncheck other level checkboxes
            document.querySelectorAll('input[name="level"]:not([value="all"])').forEach(cb => {
                cb.checked = false;
            });
        } else {
            // Get selected levels
            activeFilters.levels = Array.from(levelCheckboxes)
                .filter(cb => cb.value !== 'all')
                .map(cb => cb.value);
            
            // Update "All" checkbox state
            if (allLevelsCheckbox) {
                allLevelsCheckbox.checked = activeFilters.levels.length === 0;
            }
        }
    }
    
    // Reset all filters to default
    function resetFilters() {
        activeFilters = {
            categories: [],
            levels: [],
            maxPrice: 200
        };
        
        // Reset category checkboxes
        document.querySelectorAll('input[name="category"]').forEach(cb => {
            cb.checked = cb.value === 'all';
        });
        
        // Reset level checkboxes
        document.querySelectorAll('input[name="level"]').forEach(cb => {
            cb.checked = cb.value === 'all';
        });
        
        // Reset price range
        const priceRange = document.getElementById('price-range');
        const priceValue = document.getElementById('price-value');
        
        if (priceRange && priceValue) {
            priceRange.value = 200;
            priceValue.textContent = '$200+';
        }
        
        // Reset sort select
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.value = 'popular';
        }
    }
    
    // Add to cart functionality
    function addToCart(e) {
        const courseId = parseInt(e.target.getAttribute('data-id'));
        const course = courses.find(c => c.id === courseId);
        
        // Check if course is already in cart
        const existingItemIndex = cart.findIndex(item => item.id === courseId);
        
        if (existingItemIndex !== -1) {
            // Show notification that item is already in cart
            showNotification('This course is already in your cart', 'info');
        } else {
            // Add course to cart
            cart.push({...course, quantity: 1});
            
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart display
            updateCart();
            
            // Update button appearance
            e.target.classList.add('in-cart');
            e.target.innerHTML = '<i class="fas fa-check"></i> In Cart';
            
            // Show notification
            showNotification(`${course.title} added to cart!`, 'success');
            
            // Add animation to cart icon
            cartIcon.classList.add('cart-bounce');
            setTimeout(() => {
                cartIcon.classList.remove('cart-bounce');
            }, 1000);
        }
    }
    
    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide and remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Update cart
    function updateCart() {
        // Update cart count
        cartCount.textContent = cart.length;
        
        // Update cart items in sidebar
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
            cartTotalAmount.textContent = '$0.00';
            
            // Disable checkout button
            checkoutButton.disabled = true;
            checkoutButton.classList.add('disabled');
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
            checkoutButton.disabled = false;
            checkoutButton.classList.remove('disabled');
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
                button.addEventListener('click', removeFromCart);
            });
        }
    }
    
    // Remove from cart
    function removeFromCart(e) {
        const courseId = parseInt(e.target.closest('.remove-from-cart-btn').getAttribute('data-id'));
        const courseIndex = cart.findIndex(item => item.id === courseId);
        
        if (courseIndex !== -1) {
            const removedItem = cart[courseIndex];
            cart.splice(courseIndex, 1);
            
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart display
            updateCart();
            
            // Update button in course grid if visible
            const addToCartBtn = document.querySelector(`.add-to-cart-btn[data-id="${courseId}"]`);
            if (addToCartBtn) {
                addToCartBtn.classList.remove('in-cart');
                addToCartBtn.textContent = 'Add to Cart';
            }
            
            // Show notification
            showNotification(`${removedItem.title} removed from cart`, 'info');
        }
    }
    
    // Checkout process
    checkoutButton.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty', 'info');
        } else {
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        }
    });
    
    // Initialize the page
    function init() {
        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // Display courses
        displayCourses();
        
        // Setup filters
        setupFilters();
        
        // Update cart
        updateCart();
        
        // Setup search bar
        const searchInput = document.getElementById('course-search');
        const searchButton = document.getElementById('search-button');
        
        if (searchInput && searchButton) {
            searchButton.addEventListener('click', function() {
                searchCourses(searchInput.value);
            });
            
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    searchCourses(searchInput.value);
                }
            });
        }
        
        // Setup pagination
        setupPagination();
    }
    
    // Search courses
    function searchCourses(query) {
        if (!query.trim()) {
            filterCourses();
            return;
        }
        
        query = query.toLowerCase();
        
        const searchResults = courses.filter(course => 
            course.title.toLowerCase().includes(query) || 
            course.description.toLowerCase().includes(query) ||
            course.category.toLowerCase().includes(query)
        );
        
        displayCourses(searchResults);
    }
    
    // Setup pagination
    function setupPagination() {
        const paginationButtons = document.querySelectorAll('.pagination-button');
        
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('active') || this.classList.contains('next')) {
                    return;
                }
                
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // For demo, just reload the course display
                filterCourses();
                
                // Scroll to top of course grid
                const shopSection = document.querySelector('.shop-section');
                if (shopSection) {
                    shopSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Initialize the page
    init();
});
