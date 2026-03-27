document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const text = "BCA Student | Future Software Developer";
    let index = 0;
    let isDeleting = false;
    let speed = 100;

    function type() {
        if (!isDeleting && index <= text.length) {
            typewriterElement.textContent = text.substring(0, index);
            index++;
            speed = 100;
        } else if (isDeleting && index >= 0) {
            typewriterElement.textContent = text.substring(0, index);
            index--;
            speed = 50;
        }

        if (index === text.length + 1) {
            isDeleting = true;
            speed = 2000; // Pause at the end
        } else if (index === -1) {
            isDeleting = false;
            speed = 500;
        }

        setTimeout(type, speed);
    }
    type();

    // 2. Active Sidebar Highlight & Smooth Scrolling
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Circular Progress Animation
    const circularProgressBars = document.querySelectorAll('.circular-progress');
    const observerOptions = {
        threshold: 0.5
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const percent = target.getAttribute('data-percent');
                let startValue = 0;
                let endValue = parseInt(percent);
                let duration = 2000;
                let step = duration / endValue;

                let counter = setInterval(() => {
                    startValue++;
                    target.style.background = `conic-gradient(var(--accent-color) ${startValue * 3.6}deg, var(--border-color) 0deg)`;
                    if (startValue === endValue) {
                        clearInterval(counter);
                    }
                }, step);
                skillObserver.unobserve(target);
            }
        });
    }, observerOptions);

    circularProgressBars.forEach(bar => skillObserver.observe(bar));

    // 4. Sidebar Toggle for Mobile
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        const icon = sidebarToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            sidebarToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });

    // 5. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';

        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message cannot be empty';
            isValid = false;
        }

        if (isValid) {
            alert('Thank you, Yuvraj! Your message has been sent successfully. (This is a demo)');
            contactForm.reset();
        }
    });
});
