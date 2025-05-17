document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true
    });
    
    // Sample blog post data
    const blogPosts = [
        {
            id: 1,
            title: "5 Effective Practice Techniques to Accelerate Your Piano Progress",
            category: "Practice Tips",
            date: "June 15, 2024",
            image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            content: `
                <h2>5 Effective Practice Techniques to Accelerate Your Piano Progress</h2>
                
                <p>Whether you're a beginner just starting your piano journey or an intermediate player looking to break through a plateau, effective practice techniques can make all the difference in your progress. In this article, we explore five scientifically-backed practice methods that professional pianists use to maximize their improvement and overcome technical challenges.</p>
                
                <h3>1. Spaced Repetition</h3>
                
                <p>Instead of practicing a difficult passage for 30 minutes straight, research shows that breaking your practice into shorter segments with breaks in between leads to better retention and skill development. This technique, known as spaced repetition, leverages how our brains form long-term memories.</p>
                
                <p>Try this: Practice a challenging section for 5 minutes, then move to something else. Return to the challenging section after 10-15 minutes and repeat this cycle 3-4 times during your practice session.</p>
                
                <h3>2. Deliberate Slow Practice</h3>
                
                <p>Playing slowly with deliberate attention to every detail is one of the most powerful practice techniques. This approach allows you to focus on perfect technique, correct notes, and musical expression without the pressure of tempo.</p>
                
                <p>Start at a tempo where you can play with absolutely zero mistakes, even if it feels painfully slow. Gradually increase the speed only when you can consistently play correctly. This builds a solid foundation of muscle memory without reinforcing errors.</p>
                
                <h3>3. Chunking</h3>
                
                <p>Rather than attempting to learn an entire piece at once, break it down into small, manageable chunks. This technique, known as chunking, allows your brain to digest information more effectively.</p>
                
                <p>Start with sections as small as 2-4 measures. Master each chunk separately before connecting them. This approach prevents overwhelm and builds confidence as you complete each small section.</p>
                
                <h3>4. Mental Practice</h3>
                
                <p>Neuroscience research has shown that mental practice—visualizing yourself playing perfectly without physically touching the piano—activates many of the same neural pathways as physical practice.</p>
                
                <p>Spend 10-15 minutes daily on mental practice: visualize your fingers moving across the keys, hear the sound in your mind, and imagine the physical sensations. This technique is particularly valuable when a piano isn't available.</p>
                
                <h3>5. Interleaved Practice</h3>
                
                <p>Instead of practicing one skill repeatedly before moving to the next (blocked practice), try interleaving different skills or pieces during a practice session. Research shows this makes practice more challenging but leads to better long-term retention and skill transfer.</p>
                
                <p>For example, practice scales for 10 minutes, then a piece for 15 minutes, then sight-reading for 10 minutes, and then return to the scales. This varied approach keeps your brain engaged and improves your ability to switch between different techniques.</p>
                
                <h3>Conclusion</h3>
                
                <p>Implementing these five practice techniques can dramatically improve your piano progress. Remember that consistency is key—even 30 minutes of focused, strategic practice daily will yield better results than longer, unfocused sessions.</p>
                
                <p>For best results, create a practice plan that incorporates all five techniques, and track your progress to stay motivated. Happy practicing!</p>
            `,
            author: {
                name: "Sarah Johnson",
                bio: "Piano instructor with 15+ years of experience in classical piano teaching. Specializes in practice techniques and pedagogy.",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
            },
            tags: ["Practice", "Technique", "Learning", "Piano Skills", "Music Education"]
        },
        {
            id: 2,
            title: "Understanding Music Theory: Why It's Essential for Pianists",
            category: "Music Theory",
            date: "June 8, 2024",
            image: "https://images.unsplash.com/photo-1551970634-747846a548cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            content: `
                <h2>Understanding Music Theory: Why It's Essential for Pianists</h2>
                
                <p>Many piano students focus exclusively on playing techniques while neglecting music theory. This approach limits your growth as a musician and prevents you from fully understanding the pieces you play. In this article, we explore why music theory is essential for pianists and how it can transform your playing.</p>
                
                <h3>The Foundation of Musical Understanding</h3>
                
                <p>Music theory provides the vocabulary and concepts to understand how music works. When you understand chord progressions, key signatures, and harmonic relationships, you can see patterns in music rather than just individual notes.</p>
                
                <p>This deeper understanding allows you to learn pieces more quickly, memorize more effectively, and make more informed interpretive choices.</p>
                
                <h3>Improved Sight-Reading</h3>
                
                <p>When you understand music theory, you can predict what's coming next in a piece based on harmonic progressions and musical patterns. Instead of reading note by note, you'll recognize chord shapes and melodic structures, allowing you to sight-read with greater fluency.</p>
                
                <h3>Enhanced Memory and Performance</h3>
                
                <p>Understanding the structure of a piece—its key changes, harmonic progressions, and form—creates multiple layers of memory. If you forget a specific note during a performance, your theoretical understanding provides a safety net, allowing you to reconstruct what should come next.</p>
                
                <h3>Creative Freedom</h3>
                
                <p>Music theory is essential for improvisation, composition, and arrangement. It gives you the tools to create your own music and adapt existing pieces to your taste. Without theory, you're limited to playing exactly what's written on the page.</p>
                
                <h3>How to Integrate Theory Into Your Practice</h3>
                
                <p>1. Analyze pieces before playing them, identifying key signatures, chord progressions, and form</p>
                <p>2. Practice harmonic analysis by identifying chords and their functions in the pieces you play</p>
                <p>3. Spend time on ear training to connect theoretical concepts with their sound</p>
                <p>4. Experiment with improvisation based on chord progressions you understand</p>
                <p>5. Join a music theory study group or take online courses to deepen your knowledge</p>
                
                <h3>Conclusion</h3>
                
                <p>Music theory isn't a dry, academic subject separate from playing the piano—it's an integral part of becoming a complete musician. By investing time in understanding theory, you'll enhance every aspect of your piano playing and musical development.</p>
                
                <p>Start with the basics if you're new to theory, and gradually build your knowledge alongside your playing skills. The synergy between theoretical understanding and practical playing will take your musicianship to new heights.</p>
            `,
            author: {
                name: "David Chen",
                bio: "Music theorist and pianist with expertise in jazz and classical theory. Faculty member at the PianoMaster Academy.",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
            },
            tags: ["Music Theory", "Piano Skills", "Harmony", "Musical Analysis", "Education"]
        },
        {
            id: 3,
            title: "Choosing the Right Piano: Digital vs. Acoustic for Beginners",
            category: "Equipment",
            date: "May 27, 2024",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            content: `
                <h2>Choosing the Right Piano: Digital vs. Acoustic for Beginners</h2>
                
                <p>One of the most important decisions a beginning pianist faces is choosing the right instrument. With options ranging from budget digital keyboards to grand pianos, the choice can be overwhelming. This guide will help you navigate the digital vs. acoustic piano decision with confidence.</p>
                
                <h3>Acoustic Pianos: The Traditional Choice</h3>
                
                <h4>Advantages of Acoustic Pianos:</h4>
                
                <p><strong>Authentic Touch and Sound:</strong> Nothing quite matches the feel of a well-maintained acoustic piano. The weighted wooden keys and mechanical action provide tactile feedback that helps develop proper technique.</p>
                
                <p><strong>Dynamic Range:</strong> Acoustic pianos offer unparalleled expressiveness. The harder you press a key, the louder and brighter the sound becomes, with infinite gradations of volume and tone color.</p>
                
                <p><strong>No Electronics Required:</strong> An acoustic piano never needs to be plugged in or have batteries replaced.</p>
                
                <p><strong>Longevity:</strong> A quality acoustic piano can last for generations with proper maintenance.</p>
                
                <h4>Disadvantages of Acoustic Pianos:</h4>
                
                <p><strong>Cost:</strong> Quality new upright pianos start around $4,000, with grand pianos costing much more.</p>
                
                <p><strong>Maintenance:</strong> Acoustic pianos require regular tuning (typically twice per year) and occasional regulation and voicing.</p>
                
                <p><strong>Space Requirements:</strong> Even upright pianos require significant floor space and appropriate humidity control.</p>
                
                <p><strong>Volume Control:</strong> Acoustic pianos cannot be silenced for late-night practice without additional technology.</p>
                
                <h3>Digital Pianos: The Modern Alternative</h3>
                
                <h4>Advantages of Digital Pianos:</h4>
                
                <p><strong>Cost-Effective:</strong> Quality digital pianos start around $700-$1000, offering good value for beginners.</p>
                
                <p><strong>Low Maintenance:</strong> Digital pianos never need tuning and require minimal upkeep.</p>
                
                <p><strong>Volume Control:</strong> Practice with headphones at any time without disturbing others.</p>
                
                <p><strong>Additional Features:</strong> Many digital pianos include recording capabilities, different instrument sounds, metronomes, and learning tools.</p>
                
                <p><strong>Portability:</strong> Digital pianos are lighter and easier to move than their acoustic counterparts.</p>
                
                <h4>Disadvantages of Digital Pianos:</h4>
                
                <p><strong>Touch and Feel:</strong> Even the best digital actions don't perfectly replicate the nuanced feel of an acoustic piano.</p>
                
                <p><strong>Sound Limitations:</strong> While high-end digital pianos sound impressive, they still can't match the full resonance and overtones of an acoustic instrument.</p>
                
                <p><strong>Technology Obsolescence:</strong> Digital pianos eventually become outdated as technology advances.</p>
                
                <h3>Making Your Decision</h3>
                
                <p>Consider these factors when making your choice:</p>
                
                <p><strong>Budget:</strong> Be realistic about what you can afford, including maintenance costs for acoustics.</p>
                
                <p><strong>Space:</strong> Measure your available space before shopping.</p>
                
                <p><strong>Living Situation:</strong> Consider neighbors and family members who might be disturbed by practice.</p>
                
                <p><strong>Commitment Level:</strong> If you're unsure about long-term commitment, a digital piano offers a lower-risk entry point.</p>
                
                <p><strong>Teacher's Input:</strong> Consult with your piano teacher about their recommendations for your specific needs.</p>
                
                <h3>Conclusion</h3>
                
                <p>Both digital and acoustic pianos have their place in today's music learning environment. The "right" choice depends on your individual circumstances, preferences, and goals. Many serious students eventually own both types of instruments for different purposes.</p>
                
                <p>Regardless of your choice, the most important factor is that you enjoy playing your instrument and practice regularly. The perfect piano is the one that inspires you to sit down and play every day.</p>
            `,
            author: {
                name: "Emily Williams",
                bio: "Piano technician and consultant with expertise in both acoustic and digital instruments. Helps students find their perfect piano match.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
            },
            tags: ["Piano", "Equipment", "Digital Piano", "Acoustic Piano", "Beginner Tips"]
        }
    ];
    
    // Load blog post content when page loads
    loadBlogPost();
    
    // Function to load blog post content
    function loadBlogPost() {
        // Get the post title from localStorage
        const postTitle = localStorage.getItem('blogPostTitle');
        
        if (!postTitle) {
            // No post title found, redirect to blog page
            window.location.href = 'blog.html';
            return;
        }
        
        // Find the matching blog post
        const post = blogPosts.find(p => p.title === postTitle);
        
        if (!post) {
            console.error('Blog post not found:', postTitle);
            // Fall back to the first post if no match is found
            loadPostContent(blogPosts[0]);
            return;
        }
        
        // Load the post content
        loadPostContent(post);
    }
    
    // Function to populate the page with post content
    function loadPostContent(post) {
        // Update page title
        document.title = `${post.title} - PianoMaster`;
        
        // Update page header
        const titleElement = document.getElementById('blog-title');
        const categoryElement = document.getElementById('blog-category');
        const dateElement = document.getElementById('blog-date');
        
        if (titleElement) titleElement.textContent = post.title;
        if (categoryElement) categoryElement.textContent = post.category;
        if (dateElement) dateElement.textContent = post.date;
        
        // Update featured image
        const imageElement = document.getElementById('blog-image');
        if (imageElement) {
            imageElement.src = post.image;
            imageElement.alt = post.title;
        }
        
        // Update content
        const contentElement = document.getElementById('blog-content');
        if (contentElement) {
            contentElement.innerHTML = post.content;
        }
        
        // Update tags
        const tagsElement = document.getElementById('blog-tags');
        if (tagsElement && post.tags) {
            tagsElement.innerHTML = '';
            post.tags.forEach(tag => {
                const tagLink = document.createElement('a');
                tagLink.href = '#';
                tagLink.textContent = tag;
                tagsElement.appendChild(tagLink);
            });
        }
        
        // Update author information
        const authorNameElement = document.getElementById('author-name');
        const authorBioElement = document.getElementById('author-bio');
        const authorImageElement = document.getElementById('author-image');
        
        if (post.author) {
            if (authorNameElement) authorNameElement.textContent = post.author.name;
            if (authorBioElement) authorBioElement.textContent = post.author.bio;
            if (authorImageElement) {
                authorImageElement.src = post.author.image;
                authorImageElement.alt = post.author.name;
            }
        }
    }
    
    // Handle comment form submission
    const commentForm = document.querySelector('.comment-form form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('comment-name').value;
            const email = document.getElementById('comment-email').value;
            const comment = document.getElementById('comment-text').value;
            
            // Show success message
            showMessage('Your comment has been submitted and is awaiting approval.');
            
            // Reset form
            commentForm.reset();
        });
    }
    
    // Handle reply links
    const replyLinks = document.querySelectorAll('.reply-link');
    if (replyLinks) {
        replyLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Scroll to comment form
                const commentForm = document.querySelector('.comment-form');
                if (commentForm) {
                    commentForm.scrollIntoView({ behavior: 'smooth' });
                    
                    // Focus the comment textarea
                    setTimeout(() => {
                        document.getElementById('comment-text').focus();
                    }, 800);
                }
            });
        });
    }
    
    // Handle social share buttons
    const shareButtons = document.querySelectorAll('.social-share a');
    if (shareButtons) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get current URL
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                let shareUrl = '';
                
                // Determine which social platform to share to
                if (this.classList.contains('facebook')) {
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                } else if (this.classList.contains('twitter')) {
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                } else if (this.classList.contains('linkedin')) {
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                } else if (this.classList.contains('pinterest')) {
                    const image = encodeURIComponent(document.getElementById('blog-image').src);
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`;
                }
                
                // Open share dialog
                if (shareUrl) {
                    window.open(shareUrl, 'share-dialog', 'width=626,height=436');
                }
            });
        });
    }
    
    // Show notification message
    function showMessage(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
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
}); 