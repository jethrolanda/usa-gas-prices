export default function useOnClickOutsideMap() {
  document.addEventListener("click", (e) => {
    const classList = e.target.classList.value.split(" ");
    const stateClicked = classList.includes("state");

    if (!stateClicked) {
      var tooltipSpan = document.getElementById("tooltip-wrapper");
      tooltipSpan.style.display = "none";

      var pulse = document.getElementById("hover-state-pulse");
      pulse.style.display = "none";
    }
  });
}
