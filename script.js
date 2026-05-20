document.addEventListener('DOMContentLoaded', () => {
    
    // ---- Page Entry Reveal ----
    setTimeout(() => {
        document.body.classList.add('loaded');
        document.body.classList.remove('loading');
    }, 100);

    // ---- Mobile Menu ----
    const hamburger = document.getElementById('hamburger');
    const navWrapper = document.querySelector('.main-nav-wrapper');
    if (hamburger && navWrapper) {
        hamburger.addEventListener('click', () => {
            navWrapper.classList.toggle('open');
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        // Close on nav link click
        navWrapper.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navWrapper.classList.remove('open');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // ---- FAQ Accordion ----
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-q').addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    // ---- Scroll Reveal ----
    const revealEls = document.querySelectorAll('[data-reveal], .prog-card, .why-card, .blog-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Sticky Header Shadow ----
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.1)' : 'none';
    });
});

// ---- Blog Modal Logic ----
const blogData = {
    'blog1': {
        title: "A Parent's Guide to Nursery Education",
        date: "2025-01-08",
        image: "live image 1.jpeg",
        content: `
            <p>Nursery education is a crucial stepping stone in a child's life. It marks their first significant transition from the comfort of home into a structured learning environment.</p>
            <p>During these formative years, children learn through play, interaction, and guided activities. They develop essential social skills, such as sharing and collaborating with peers, which form the foundation of their emotional intelligence.</p>
            <p>At Teddi Kidz, we ensure that this transition is smooth, joyful, and deeply enriching. We believe that every child is unique, and our tailored approach allows them to blossom at their own pace.</p>
        `
    },
    'blog2': {
        title: "Choosing the Ideal Age for Daycare",
        date: "2025-01-08",
        image: "live image 2.jpeg",
        content: `
            <p>One of the most common questions parents ask is: "When is the right time for daycare?"</p>
            <p>While there is no single right answer, many experts suggest that children between the ages of 2 and 3 benefit immensely from the social and cognitive stimulation provided in a daycare setting.</p>
            <p>Daycare offers a consistent routine, which helps children feel secure. It also provides opportunities for them to engage in sensory play, language development activities, and physical exercises that are crucial for their overall growth.</p>
        `
    },
    'blog3': {
        title: "How Teddi Kidz's Pentemind Revolutionizes",
        date: "2025-01-08",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        content: `
            <p>Our proprietary Pentemind pedagogy is designed to nurture five distinct learning minds in every child.</p>
            <p>Instead of focusing solely on academic milestones, we emphasize holistic development. This includes fostering creativity, critical thinking, emotional resilience, physical coordination, and social adaptability.</p>
            <p>By engaging multiple facets of a child's brain, Pentemind ensures that learning is not just about memorization, but about deep, meaningful understanding and lifelong curiosity.</p>
        `
    }
};

function openBlogModal(blogId) {
    const data = blogData[blogId];
    if (data) {
        document.getElementById('blogModalImg').src = data.image;
        document.getElementById('blogModalTitle').textContent = data.title;
        document.getElementById('blogModalDate').textContent = data.date;
        document.getElementById('blogModalText').innerHTML = data.content;
        
        const modal = document.getElementById('blogModal');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling on body
    }
}

function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('blogModal');
    if (event.target === modal) {
        closeBlogModal();
    }
});
