

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initAboutAnimations() {
  const section = document.querySelector('.about');
  if (!section) return;

  const triggerDefaults = {
    trigger: section,
    start: 'top 80%',
  };

  gsap.from(['.about__label', '.about__heading'], {
    scrollTrigger: triggerDefaults,
    y: 24,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.15,
  });

  gsap.from('.about__bio-card', {
    scrollTrigger: triggerDefaults,
    y: 32,
    opacity: 0,
    duration: 0.75,
    ease: 'power3.out',
    delay: 0.2,
  });

  gsap.from('.stat-card', {
    scrollTrigger: triggerDefaults,
    y: 24,
    opacity: 0,
    duration: 0.55,
    ease: 'power3.out',
    stagger: 0.1,
    delay: 0.3,
  });

  gsap.from('.about__focuses', {
    scrollTrigger: triggerDefaults,
    y: 24,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    delay: 0.4,
  });

  gsap.from('.focus-item', {
    scrollTrigger: triggerDefaults,
    x: -16,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.08,
    delay: 0.5,
  });

  gsap.from('.about__availability', {
    scrollTrigger: triggerDefaults,
    y: 16,
    opacity: 0,
    duration: 0.55,
    ease: 'power3.out',
    delay: 0.55,
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAboutAnimations);
  } else {
    initAboutAnimations();
  }
}