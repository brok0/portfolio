import { gsap } from "gsap";
import { applyButtonTilt } from "../../utils/buttonTilt";
let isVisible = false;

function toggle(cardContainer, button, cards) {
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
    button.textContent = "Show More";
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
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.12,
        ease: "power2.out",
      }
    );
    button.textContent = "Show Less";
    button.classList.add("expanded");
  }
  isVisible = !isVisible;
}

if (typeof document !== "undefined") {
  const cardContainer = document.getElementById("certification-more-content");
  const button = document.getElementById("show-more");
  const cards = cardContainer ? Array.from(cardContainer.children) : [];

  if (cardContainer) {
    gsap.set(cardContainer, {
      height: 0,
      opacity: 0,
      overflow: "hidden",
    });
  }

  if (button) {
    button.addEventListener("click", () => toggle(cardContainer, button, cards));
  }

  applyButtonTilt(".card__links .button");
}
