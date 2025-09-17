// Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            
            // Save theme preference to localStorage
            const isDarkTheme = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDarkTheme);
        });
        
        // Check for saved theme preference
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Animate stats counting
        function animateValue(id, start, end, duration) {
            const obj = document.getElementById(id);
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue('calories-burned', 0, 1250, 2000);
                    animateValue('steps-taken', 0, 8542, 2000);
                    // For demonstration, we're not animating sleep or weight
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.dashboard'));
        
        // Testimonials Carousel
        const track = document.getElementById('testimonialsTrack');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        let currentIndex = 0;
        
        function moveCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % track.children.length;
            moveCarousel();
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + track.children.length) % track.children.length;
            moveCarousel();
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % track.children.length;
            moveCarousel();
        }, 5000);