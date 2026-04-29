import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const initExperienceAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    const h3Elements = document.querySelectorAll('.timeline__header h3');
    const timelineCompany = document.querySelectorAll('.timeline__company');

    const textToAnimate = [...h3Elements, ...timelineCompany];
    
    textToAnimate.forEach(text => {
        if (text.querySelector('.animated-text')) return;
        
        const wrapper = document.createElement('span');
        wrapper.className = 'animated-text';
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'translateY(10px)';
        wrapper.style.display = 'inline-block';
        wrapper.style.transition = 'none'; // Override CSS transitions for GSAP
        
        while (text.firstChild) {
            wrapper.appendChild(text.firstChild);
        }
        text.appendChild(wrapper);
    });

    const timelineSections = document.querySelectorAll('.timeline-section');
    timelineSections.forEach(section => {
        if (section.dataset.stInitialized) return;
        section.dataset.stInitialized = 'true';

        ScrollTrigger.create({
            trigger: section,
            start: "top 90%",
            end: "bottom -10000px",
            once: true,
            onEnter: () => {
                // Add visible class to trigger CSS animations for dots, lines, and dates
                section.classList.add('visible');
                
                // Animate text with GSAP
                const animatedTexts = section.querySelectorAll('.animated-text');
                gsap.to(animatedTexts, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.03,
                    duration: 0.3,
                    delay: 0.6,
                    ease: "power1.out"
                });
            }
        });
    });
};

if (typeof document !== "undefined" && typeof window !== "undefined") {
    // Run on Astro page load (handles initial and subsequent view transitions)
    document.addEventListener('astro:page-load', initExperienceAnimations);

    // Run on initial DOM load if astro:page-load hasn't fired
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExperienceAnimations);
    } else {
        initExperienceAnimations();
    }

    // Ensure ScrollTrigger positions are accurate after images/styles load
    window.addEventListener('load', () => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });
}
