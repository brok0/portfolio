const initExperienceAnimations = () => {
    const h3Elements = document.querySelectorAll('.timeline__header h3');
    const timelineCompany = document.querySelectorAll('.timeline__company');

    const textToAnimate = [...h3Elements, ...timelineCompany];
    
    textToAnimate.forEach(text => {
        if (text.querySelector('.animated-text')) return;
        const textContent = text.textContent;
        text.innerHTML = '';
        [...textContent].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.className = 'animated-text';
            span.style.transitionDelay = `${index * 0.03 + 0.6}s`; 
            text.appendChild(span);
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const timelineSections = document.querySelectorAll('.timeline-section');
    timelineSections.forEach(section => {
        observer.observe(section);
    });
};

// Run on initial load
initExperienceAnimations();

// Run on Astro view transitions (if used)
document.addEventListener('astro:after-swap', initExperienceAnimations);
