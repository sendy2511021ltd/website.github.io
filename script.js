// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    }, 1200);
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollBar = document.querySelector('.scroll-bar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    if (scrollBar) scrollBar.style.width = progress + '%';
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const scrollReveal = () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
            
            // Trigger counter if applicable
            if (el.classList.contains('stat-num')) {
                animateCounter(el);
            }
        }
    });
};

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);

function animateCounter(el) {
    if (el.classList.contains('counted')) return;
    el.classList.add('counted');
    
    const target = parseInt(el.getAttribute('data-target'));
    let count = 0;
    const speed = 2000 / target;
    const updateCount = () => {
        if (count < target) {
            count += Math.ceil(target / 100);
            if (count > target) count = target;
            el.innerText = count + (el.getAttribute('data-suffix') || '');
            setTimeout(updateCount, 20);
        }
    };
    updateCount();
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active Link Highlighting
const currentPath = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath || (currentPath === '' && link.getAttribute('href') === 'index.html')) {
        link.style.color = 'var(--primary)';
        link.style.borderBottom = '3px solid var(--primary)';
    }
});
