import gsap from "gsap";

export function applyButtonTilt(selector) {
	if (typeof document === "undefined") return;

	const buttons = document.querySelectorAll(selector);

	buttons.forEach((button) => {
		if (button.dataset.tiltReady === "true") return;
		button.dataset.tiltReady = "true";

		button.addEventListener("mouseenter", () => {
			gsap.fromTo(
				button,
				{ rotationZ: -6 },
				{
					rotationZ: 6,
					duration: 0.2,
					repeat: 1,
					yoyo: true,
					ease: "power1.inOut",
					overwrite: "auto",
				},
			);
		});

		button.addEventListener("mouseleave", () => {
			gsap.to(button, {
				rotationZ: 0,
				duration: 0.12,
				ease: "power1.inOut",
				overwrite: "auto",
			});
		});
	});
}
