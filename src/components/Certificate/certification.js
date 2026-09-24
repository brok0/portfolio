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

  applyButtonTilt(".card__wrap--featured .card__links .button");

  const section = document.getElementById("certifications");
  if (!section) return;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Featured Claude Certification GSAP Animation
  const featuredWrap = section.querySelector(".card__wrap--featured");
  if (featuredWrap && !featuredWrap.dataset.animated) {
    featuredWrap.dataset.animated = "true";

    const cardInner = featuredWrap.querySelector(".card--featured");
    const emblem = featuredWrap.querySelector("[data-claude-emblem]");
    const watermark = featuredWrap.querySelector("[data-claude-watermark]");
    const badges = featuredWrap.querySelectorAll(".card__badge");
    const auraGlow = featuredWrap.querySelector("[data-aura-glow]");

    if (prefersReducedMotion) {
      gsap.set(featuredWrap, { opacity: 1, y: 0, scale: 1 });
      if (auraGlow) gsap.set(auraGlow, { opacity: 0.6 });
    } else {
      // Initial state before ScrollTrigger entry
      gsap.set(featuredWrap, { y: 35, opacity: 0, scale: 0.97 });
      if (emblem) gsap.set(emblem, { scale: 0, rotation: -45, transformOrigin: "center center" });
      if (badges.length) gsap.set(badges, { y: 10, opacity: 0 });
      if (auraGlow) gsap.set(auraGlow, { opacity: 0, scale: 0.92 });

      ScrollTrigger.create({
        trigger: featuredWrap,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
          tl.to(featuredWrap, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
          })
            .to(
              auraGlow,
              {
                opacity: 0.65,
                scale: 1,
                duration: 0.9,
              },
              "-=0.6"
            )
            .to(
              emblem,
              {
                scale: 1,
                rotation: 0,
                duration: 0.75,
                ease: "back.out(2)",
              },
              "-=0.6"
            )
            .to(
              badges,
              {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.45,
              },
              "-=0.4"
            );
        },
      });

      // Ambient rotating Claude watermark
      if (watermark) {
        gsap.to(watermark, {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: "none",
        });
      }

      // Ambient aura breathing
      if (auraGlow) {
        gsap.to(auraGlow, {
          opacity: 0.78,
          scale: 1.025,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Interactive 3D tilt & spotlight tracking
      featuredWrap.addEventListener("mousemove", (e) => {
        const rect = featuredWrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        if (cardInner) {
          gsap.to(cardInner, {
            rotateY: x * 7,
            rotateX: -y * 7,
            transformPerspective: 900,
            duration: 0.25,
            ease: "power1.out",
          });
        }

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        featuredWrap.style.setProperty("--mouse-x", `${mouseX}px`);
        featuredWrap.style.setProperty("--mouse-y", `${mouseY}px`);
      });

      featuredWrap.addEventListener("mouseenter", () => {
        if (emblem) {
          gsap.to(emblem, {
            rotate: "+=180",
            scale: 1.12,
            duration: 0.6,
            ease: "back.out(1.6)",
          });
        }
        if (auraGlow) {
          gsap.to(auraGlow, { opacity: 0.9, scale: 1.04, duration: 0.35 });
        }
      });

      featuredWrap.addEventListener("mouseleave", () => {
        if (cardInner) {
          gsap.to(cardInner, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        }
        if (emblem) {
          gsap.to(emblem, { scale: 1, duration: 0.4, ease: "power2.out" });
        }
        if (auraGlow) {
          gsap.to(auraGlow, { opacity: 0.65, scale: 1, duration: 0.7, ease: "power3.out" });
        }
      });

      emblem?.addEventListener("click", () => {
        gsap.to(emblem, {
          rotate: "+=360",
          scale: 1.25,
          duration: 0.6,
          ease: "back.out(2)",
          onComplete: () => gsap.to(emblem, { scale: 1, duration: 0.3 }),
        });
      });
    }
  }

  // 2. Scroll animation for remaining certificates and show more button
  const otherElementsToAnimate = [
    ...Array.from(section.querySelectorAll(":scope > .card__wrap:not(.card__wrap--featured)")),
    button,
  ].filter(Boolean);

  if (otherElementsToAnimate.length > 0) {
    gsap.set(otherElementsToAnimate, { x: -50, opacity: 0 });

    ScrollTrigger.batch(otherElementsToAnimate, {
      start: "top 85%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.3,
        });
      },
    });
  }
};

if (typeof document !== "undefined") {
  document.addEventListener("astro:page-load", initCertificationAnimations);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCertificationAnimations);
  } else {
    initCertificationAnimations();
  }
}
