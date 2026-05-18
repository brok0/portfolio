import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const mm = gsap.matchMedia();

  mm.add("(max-width: 991px)", () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    
    tl.fromTo(".hero__visual", 
      { scale: 0.8, opacity: 0, rotation: -5 }, 
      { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    )
    .fromTo(".hero__badge", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.8"
    )
    .fromTo(".hero__name", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1 },
      "-=0.4"
    )
    .fromTo(".hero__subhead", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1 },
      "-=0.6"
    )
    .fromTo(".hero__skills-container", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1 },
      "-=0.6"
    )
    .fromTo(".hero__actions .hero__btn", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.1 },
      "-=0.6"
    );
  });

  mm.add("(min-width: 992px)", () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.fromTo(".hero__badge", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6 }
    )
    .fromTo(".hero__name", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1 },
      "-=0.4"
    )
    .fromTo(".hero__subhead", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1 },
      "-=0.6"
    )
    .fromTo(".hero__skills-container", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1 },
      "-=0.6"
    )
    .fromTo(".hero__actions .hero__btn", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.1 },
      "-=0.6"
    )
    .fromTo(".hero__visual", 
      { scale: 0.8, opacity: 0, rotation: -5 }, 
      { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" },
      "-=1"
    );
  });
});
