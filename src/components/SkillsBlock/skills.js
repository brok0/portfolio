import gsap from "gsap";

if (typeof document !== "undefined") {
	const skillPills = document.querySelectorAll(".skill");

	skillPills.forEach((pill, index) => {
		gsap.to(pill, {
			scale: 1.1,
			duration: 0.5,
			delay: index * 0.6,
		});

		pill.addEventListener("mouseenter", () => {
			gsap.to(pill, {
				rotationZ: 10,
				duration: 0.2,
				ease: "power1.inOut",
			});
		});

		pill.addEventListener("mouseleave", () => {
			gsap.to(pill, {
				rotationZ: -10,
				duration: 0.2,
				ease: "power1.inOut",
				onComplete: () => {
					gsap.to(pill, {
						rotationZ: 0,
						duration: 0.2,
						ease: "power1.inOut",
					});
				},
			});
		});
	});
}
