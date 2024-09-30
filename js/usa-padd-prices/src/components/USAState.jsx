import usePADDSHover from "../helpers/usePADDSHover";

const USAState = ({
  dimensions,
  fill,
  state,
  onClickState,
  stateName,
  PADDSPrices,
  disabled
}) => {
  const onClick = (e) => {
    e.persist();

    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    var tooltipSpan = document.getElementById("tooltip-wrapper");
    tooltipSpan.style.display = "block";

    const { padd } = usePADDSHover(state, stateName, PADDSPrices);

    var pulse = document.getElementById("hover-state-pulse");
    pulse.style.display = "block";

    var tooltipSpan = document.getElementById("tooltip-wrapper");
    var x = e.clientX,
      y = e.clientY;

    // Start with wrapper
    // Fix for wp block editor tooltip wrapper way off
    const element = document.getElementById("usa-padd-prices");
    const rect = element.getBoundingClientRect();

    // if (ugp_padd_prices.is_frontend == "1") {
    //   // v1
    //   if (padd === "PADD 1") {
    //     tooltipSpan.style.top = y + 30 + scrollTop + "px";
    //     tooltipSpan.style.left = x - 180 + "px";
    //   } else {
    //     tooltipSpan.style.top = y + 30 + scrollTop + "px";
    //     tooltipSpan.style.left = x - 20 + "px";
    //   }
    //   var pulse = document.getElementById("hover-state-pulse");
    //   pulse.style.top = y - 35 + scrollTop + "px";
    //   pulse.style.left = x - 50 + "px";
    // } else {
    //   // v2
    //   if (padd === "PADD 1") {
    //     tooltipSpan.style.top = y - rect.y + 30 + scrollTop + "px";
    //     tooltipSpan.style.left = x - rect.x - 180 + "px";
    //   } else {
    //     tooltipSpan.style.top = y - rect.y + 30 + scrollTop + "px";
    //     tooltipSpan.style.left = x - rect.x - 20 + "px";
    //   }
    //   var pulse = document.getElementById("hover-state-pulse");
    //   pulse.style.top = y - rect.y - 35 + scrollTop + "px";
    //   pulse.style.left = x - rect.x - 50 + "px";
    // }

    // v3
    if (padd === "PADD 1") {
      tooltipSpan.style.top = y - rect.y + 30 + "px";
      tooltipSpan.style.left = x - rect.x - 180 + "px";
    } else {
      tooltipSpan.style.top = y - rect.y + 30 + "px";
      tooltipSpan.style.left = x - rect.x - 20 + "px";
    }
    var pulse = document.getElementById("hover-state-pulse");
    pulse.style.top = y - rect.y - 35 + "px";
    pulse.style.left = x - rect.x - 50 + "px";
  };

  return (
    <path
      d={dimensions}
      fill={fill}
      data-name={state}
      className={`${state} state`}
      onClick={(e) => !disabled && onClick(e)}
    />
  );
};
export default USAState;
