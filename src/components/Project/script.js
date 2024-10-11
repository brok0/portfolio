import gsap from "gsap";

const animateCards = () => {
  const cards = document.querySelectorAll(".project");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardIndex = [...cards].indexOf(entry.target);

          gsap.fromTo(
            entry.target, // Apply animation to the current card
            { x: "-100vw", opacity: 0 },
            {
              x: "0",
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              delay: cardIndex * 0.2, // Delay based on card index (0.2 seconds between each card)
              onComplete: () => {
                // Animate the .stack-item inside the card after card animation completes
                const stackItems = entry.target.querySelectorAll(".stack-item");

                stackItems.forEach((stackItem, index) => {
                  gsap.fromTo(
                    stackItem,
                    { opacity: 0 },
                    {
                      opacity: 1,
                      duration: 0.5,
                      ease: "power1.inOut",
                      delay: (index + 1) * 0.1,
                    }
                  );
                });
              },
            }
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  cards.forEach((card) => observer.observe(card));
};

export default animateCards;
