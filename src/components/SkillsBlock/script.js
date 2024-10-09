import gsap from "gsap";

const animateSkills = () => {
  const skillPills = document.querySelectorAll(".skill");

  skillPills.forEach((pill, index) => {
    gsap.to(pill, {
      scale: 1.2, // Scale up
      //background: "linear-gradient(90deg,#9501ff 0%,#2450c1 100%)",
      //color: "white",
      borderColor: "#9501ff",
      duration: 2,
      delay: index * 3, // Stagger the animations
      onComplete: () => {
        // Change back to original state after the animation
        gsap.to(pill, {
          scale: 1,
          color: "black",
          borderColor: "#2450c1",
          duration: 2,
          onComplete: () => {
            // After returning to original state, start the next animation
            if (index === skillPills.length - 1) {
              // After the last pill, restart the entire animation
              animateSkills();
            }
          },
        });
      },
    });
  });
};

export default animateSkills;
