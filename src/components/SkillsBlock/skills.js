import gsap from "gsap";

const skillPills = document.querySelectorAll(".skill");

skillPills.forEach((pill, index) => {
  gsap.to(pill, {
    scale: 1.1, // Scale up
    duration: 0.5,
    delay: index * 0.6, // Stagger the animations
  });

  pill.addEventListener("mouseenter", () => {
    gsap.to(pill, {
      rotationZ: 10, // Tilt to the right
      duration: 0.2,
      ease: "power1.inOut",
    });
  });

  pill.addEventListener("mouseleave", () => {
    gsap.to(pill, {
      rotationZ: -10, // Tilt to the left
      duration: 0.2,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(pill, {
          rotationZ: 0, // Return to original position
          duration: 0.2,
          ease: "power1.inOut",
        });
      },
    });
  });
});
