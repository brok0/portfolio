import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { applyButtonTilt } from "../../utils/buttonTilt";

let isVisible = false;

function toggle(cardContainer, button, cards, showMoreText, showLessText) {
  if (!cardContainer || !button || !cards.length) return;

  gsap.killTweensOf([cardContainer, cards]);

  if (isVisible) {
    gsap.set(cardContainer, { height: cardContainer.offsetHeight });
    gsap.to(cards, {
      duration: 0.25,
      opacity: 0,
      y: -12,
      stagger: 0.05,
      ease: "power2.in",
    });
    gsap.to(cardContainer, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    button.textContent = showMoreText;
    button.classList.remove("expanded");
  } else {
    gsap.fromTo(
      cardContainer,
      { height: 0, opacity: 0 },
      {
        height: cardContainer.scrollHeight,
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => gsap.set(cardContainer, { height: "auto" }),
      }
    );
    gsap.fromTo(
      cards,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.12,
        ease: "power2.out",
      }
    );
    button.textContent = showLessText;
    button.classList.add("expanded");
  }
  isVisible = !isVisible;
}

const initCertificationAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  const cardContainer = document.getElementById("certification-more-content");
  const button = document.getElementById("show-more");
  const cards = cardContainer ? Array.from(cardContainer.children) : [];
  const showMoreText = button?.dataset.more || "Show More";
  const showLessText = button?.dataset.less || "Show Less";

  if (cardContainer) {
    gsap.set(cardContainer, {
      height: 0,
      opacity: 0,
      overflow: "hidden",
    });
  }

  // Ensure listeners are not duplicated
  if (button && !button.dataset.initialized) {
    button.dataset.initialized = "true";
    button.addEventListener("click", () =>
      toggle(cardContainer, button, cards, showMoreText, showLessText)
    );
  }

  applyButtonTilt(".card__links .button");

  // Scroll animation for initial certificates and button
  const section = document.getElementById("certifications");
  if (section) {
    const elementsToAnimate = [
      ...section.querySelectorAll(":scope > .card__wrap"),
      button
    ].filter(Boolean);

    if (elementsToAnimate.length > 0) {
      // Set initial state before animation
      gsap.set(elementsToAnimate, { x: -50, opacity: 0 });

      ScrollTrigger.batch(elementsToAnimate, {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.5
          });
        },
      });
    }
  }
};

if (typeof document !== "undefined") {
  document.addEventListener('astro:page-load', initCertificationAnimations);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCertificationAnimations);
  } else {
    initCertificationAnimations();
  }
}
