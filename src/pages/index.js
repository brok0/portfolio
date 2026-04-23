import { applyButtonTilt } from "../utils/buttonTilt";

if (typeof document !== "undefined") {
	applyButtonTilt(".contact__buttons .button");

	const copyEmailButton = document.querySelector(".copy-btn");
	const copyFeedback = document.querySelector(".copy-feedback");
	let feedbackTimeoutId;

	const showCopyFeedback = (message) => {
		if (!copyFeedback) return;

		copyFeedback.textContent = message;
		copyFeedback.classList.add("is-visible");

		window.clearTimeout(feedbackTimeoutId);
		feedbackTimeoutId = window.setTimeout(() => {
			copyFeedback.classList.remove("is-visible");
			copyFeedback.textContent = "";
		}, 1800);
	};

	copyEmailButton?.addEventListener("click", async () => {
		const email = copyEmailButton.getAttribute("data-copy-email");
		if (!email) return;

		try {
			await navigator.clipboard.writeText(email);
			showCopyFeedback("Copied!");
		} catch {
			// Fallback for environments where Clipboard API is unavailable.
			const textarea = document.createElement("textarea");
			textarea.value = email;
			textarea.setAttribute("readonly", "");
			textarea.style.position = "absolute";
			textarea.style.left = "-9999px";
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
			showCopyFeedback("Copied!");
		}
	});
}
