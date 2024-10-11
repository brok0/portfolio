import gsap from "gsap";
const showMore = () => {
  let isVisible = false;

  const cardContainer = document.getElementById("certification-more-content");
  const button = document.getElementById("show-more");
  console.log(cardContainer, button);

  function toggle() {
    if (isVisible) {
      gsap.to(cardContainer.children, {
        duration: 0.5,
        opacity: 0,
        y: -50,
        stagger: 0.5,
        display: "none",
      });
      button.textContent = "Show More";
      button.classList.remove("expanded");
    } else {
      gsap.fromTo(
        cardContainer.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.5, display: "block" }
      );
      button.textContent = "Show Less";
      button.classList.add("expanded");
    }
    isVisible = !isVisible;
  }

  button.addEventListener("click", toggle);
};

export default showMore;
