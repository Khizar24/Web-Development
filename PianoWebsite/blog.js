document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true
    });
    
    // Sample additional blog posts for "load more" functionality
    const additionalPosts = [
        {
            image: "https://images.unsplash.com/photo-1552422535-c45813c61732?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "Practice Tips",
            date: "April 15, 2024",
            title: "Creating an Effective Practice Schedule for Busy Adults",
            excerpt: "Learn how to integrate consistent piano practice into your busy lifestyle with these time-management strategies."
        },
        {
            image: "https://images.unsplash.com/photo-1466428996289-fb355538da1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "Technique",
            date: "April 5, 2024",
            title: "Hand Independence Exercises Every Pianist Should Master",
            excerpt: "Develop better coordination between your hands with these progressive exercises designed for all skill levels."
        },
        {
            image: "https://images.unsplash.com/photo-1512733596533-7b00ccf8ebaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "Equipment",
            date: "March 22, 2024",
            title: "Essential Piano Accessories to Enhance Your Learning Experience",
            excerpt: "Discover the tools and accessories that can take your piano practice and performance to the next level."
        }
    ];
    
    // DOM elements
    const loadMoreBtn = document.getElementById('load-more');
    const blogGrid = document.querySelector('.blog-grid');
    const searchInput = document.querySelector('.blog-search input');
    const searchButton = document.querySelector('.blog-search button');
    const sidebarNewsletterForm = document.querySelector('.sidebar-newsletter-form');
    
    // Load more functionality
    let postsLoaded = false;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (!postsLoaded) {
                // Create and add additional blog posts
                additionalPosts.forEach(post => {
                    const postElement = createBlogPostElement(post);
                    blogGrid.appendChild(postElement);
                    
                    // Add fade-in animation
                    setTimeout(() => {
                        postElement.classList.add('visible');
                    }, 100);
                });
                
                // Update button text and disable further loads
                loadMoreBtn.textContent = 'No More Posts';
                loadMoreBtn.disabled = true;
                loadMoreBtn.classList.add('disabled');
                postsLoaded = true;
            }
        });
    }
    
    // Create blog post element
    function createBlogPostElement(post) {
        const article = document.createElement('article');
        article.className = 'blog-card new-post';
        article.innerHTML = `
            <div class="blog-card-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-card-content">
                <div class="blog-meta">
                    <span class="blog-category">${post.category}</span>
                    <span class="blog-date">${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        `;
        return article;
    }
    
    // Blog search functionality
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            performSearch();
        });
        
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            showMessage('Please enter a search term', 'error');
            return;
        }
        
        // In a real implementation, this would query the server
        // For demo purposes, we'll just show a message
        showMessage(`Search results for: "${searchTerm}"`);
        searchInput.value = '';
    }
    
    // Sidebar newsletter form submission
    if (sidebarNewsletterForm) {
        sidebarNewsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = sidebarNewsletterForm.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showMessage('Thank you for subscribing to our newsletter!');
                sidebarNewsletterForm.reset();
            } else {
                showMessage('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Category and tag click handling
    document.querySelectorAll('.category-list a, .tag-cloud a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.textContent.split(' ')[0]; // Get the category/tag name
            showMessage(`Filtering by: ${filter}`);
        });
    });
    
    // Recent post click handling
    document.querySelectorAll('.recent-post-info a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showMessage(`Opening article: ${e.target.textContent}`);
        });
    });
    
    // Read more click handling
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const article = e.target.closest('article');
            let title = '';
            
            if (article) {
                const titleElement = article.querySelector('h3, h2');
                if (titleElement) {
                    title = titleElement.textContent;
                }
            }
            
            // Store the article title in localStorage to retrieve on blog post page
            localStorage.setItem('blogPostTitle', title);
            
            // Navigate to the blog post page
            window.location.href = 'blog-post.html';
        });
    });
    
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
    
    // Add CSS for blog page elements
    const blogStyle = document.createElement('style');
    blogStyle.textContent = `
        /* Blog Page Styles */
        .blog-section {
            padding: 4rem 0;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .blog-layout {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
        }
        
        /* Featured Article */
        .blog-featured {
            margin-bottom: 50px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            background: #fff;
        }
        
        .featured-image {
            height: 400px;
        }
        
        .featured-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .featured-content {
            padding: 30px;
        }
        
        .blog-meta {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .blog-category {
            color: #3498db;
            font-weight: 500;
        }
        
        .blog-date {
            color: #777;
        }
        
        .featured-content h2 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: #2c3e50;
        }
        
        .blog-excerpt {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .read-more {
            display: inline-block;
            color: #3498db;
            font-weight: 500;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .read-more:hover {
            color: #2980b9;
        }
        
        /* Blog Grid */
        .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
        }
        
        .blog-card {
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        
        .blog-card:hover {
            transform: translateY(-10px);
        }
        
        .blog-card-image {
            height: 180px;
        }
        
        .blog-card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .blog-card-content {
            padding: 20px;
        }
        
        .blog-card-content h3 {
            margin-bottom: 10px;
            font-size: 1.2rem;
            color: #2c3e50;
        }
        
        .blog-card-content p {
            color: #666;
            margin-bottom: 15px;
            font-size: 0.95rem;
            line-height: 1.5;
        }
        
        /* Load More Button */
        .load-more-container {
            text-align: center;
            margin-top: 50px;
        }
        
        .load-more-button {
            padding: 12px 30px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .load-more-button:hover {
            background: #2980b9;
        }
        
        .load-more-button.disabled {
            background: #95a5a6;
            cursor: not-allowed;
        }
        
        /* Blog Sidebar */
        .blog-sidebar {
            position: sticky;
            top: 100px;
        }
        
        .sidebar-widget {
            background: #fff;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .sidebar-widget h3 {
            margin-bottom: 20px;
            color: #2c3e50;
            font-size: 1.3rem;
            position: relative;
            padding-bottom: 10px;
        }
        
        .sidebar-widget h3:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background: #3498db;
        }
        
        /* Sidebar Search */
        .blog-search {
            display: flex;
        }
        
        .blog-search input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px 0 0 5px;
            outline: none;
        }
        
        .blog-search button {
            background: #3498db;
            color: white;
            border: none;
            padding: 0 15px;
            border-radius: 0 5px 5px 0;
            cursor: pointer;
        }
        
        /* Category List */
        .category-list {
            list-style: none;
        }
        
        .category-list li {
            margin-bottom: 12px;
            border-bottom: 1px solid #f1f1f1;
            padding-bottom: 12px;
        }
        
        .category-list li:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .category-list a {
            color: #666;
            text-decoration: none;
            display: flex;
            justify-content: space-between;
            transition: color 0.3s ease;
        }
        
        .category-list a:hover {
            color: #3498db;
        }
        
        .category-list span {
            color: #999;
            font-size: 0.9rem;
        }
        
        /* Recent Posts */
        .recent-post {
            display: flex;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f1f1f1;
        }
        
        .recent-post:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .recent-post img {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 5px;
        }
        
        .recent-post-info {
            flex: 1;
            padding-left: 15px;
        }
        
        .recent-post-info h4 {
            margin-bottom: 5px;
            font-size: 1rem;
        }
        
        .recent-post-info a {
            color: #2c3e50;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .recent-post-info a:hover {
            color: #3498db;
        }
        
        .recent-post-info span {
            color: #999;
            font-size: 0.8rem;
        }
        
        /* Sidebar Newsletter */
        .sidebar-newsletter p {
            color: #666;
            margin-bottom: 15px;
            font-size: 0.95rem;
        }
        
        .sidebar-newsletter-form {
            display: flex;
            flex-direction: column;
        }
        
        .sidebar-newsletter-form input {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 10px;
            outline: none;
        }
        
        .sidebar-newsletter-form button {
            padding: 10px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .sidebar-newsletter-form button:hover {
            background: #2980b9;
        }
        
        /* Tag Cloud */
        .tag-cloud {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .tag-cloud a {
            display: inline-block;
            padding: 5px 12px;
            background: #f1f1f1;
            color: #666;
            text-decoration: none;
            border-radius: 3px;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .tag-cloud a:hover {
            background: #3498db;
            color: white;
        }
        
        /* New posts animation */
        .new-post {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .new-post.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Responsive Styles */
        @media (max-width: 992px) {
            .blog-layout {
                grid-template-columns: 1fr;
            }
            
            .blog-sidebar {
                position: static;
            }
            
            .featured-image {
                height: 300px;
            }
        }
        
        @media (max-width: 768px) {
            .blog-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(blogStyle);
});
