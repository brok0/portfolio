import { applyButtonTilt } from "../utils/buttonTilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const initIndexAnimations = () => {
	gsap.registerPlugin(ScrollTrigger);

	const sectionHeadings = document.querySelectorAll('.section__heading');
	
	sectionHeadings.forEach(heading => {
		if (heading.querySelector('.heading-content')) return;

		// Wrap contents to animate text opacity independently from the border
		const wrapper = document.createElement('span');
		wrapper.className = 'heading-content';
		wrapper.style.opacity = '0';
		wrapper.style.display = 'inline-block';
		
		while (heading.firstChild) {
			wrapper.appendChild(heading.firstChild);
		}
		heading.appendChild(wrapper);
		
		ScrollTrigger.create({
			trigger: heading,
			start: "top 95%", // Trigger slightly earlier to ensure it catches when scrolling fast
			end: "bottom -10000px", // Ensure it doesn't instantly enter 'after' state if loaded far down
			once: true,
			onEnter: () => {
				// Animate border first
				gsap.to(heading, {
					"--border-scale": 1,
					duration: 0.6,
					ease: "power2.out"
				});
				// Animate text shortly after
				gsap.to(wrapper, {
					opacity: 1,
					duration: 0.4,
					ease: "power1.out",
					delay: 0.4
				});
			}
		});
	});

	applyButtonTilt(".contact__buttons .button");

};

if (typeof document !== "undefined" && typeof window !== "undefined") {
	// Run on Astro page load
	document.addEventListener('astro:page-load', initIndexAnimations);

	// Run on initial DOM load (if Astro page-load hasn't fired yet)
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initIndexAnimations);
	} else {
		initIndexAnimations();
	}

	// Ensure ScrollTrigger positions are recalculated after all resources (images, etc.) finish loading
	window.addEventListener('load', () => {
		if (typeof ScrollTrigger !== 'undefined') {
			ScrollTrigger.refresh();
		}
	});
}
