import data from "../data/usa-map-dimensions";
import USAState from "./USAState";
import HoverState from "../images/hover_state_prompt.gif";

const USAMap = ({
  width,
  height,
  defaultFill,
  title,
  customize,
  onClick,
  PADDSPrices,
  disabled
}) => {
  const clickHandler = (stateAbbreviation) => {
    onClick(stateAbbreviation);
  };

  const fillStateColor = (state) => {
    if (customize && customize[state] && customize[state].fill) {
      return customize[state].fill;
    }

    return defaultFill;
  };

  const stateClickHandler = (state) => {
    if (customize && customize[state] && customize[state].const) {
      return customize[state].const;
    }
    return clickHandler;
  };

  const buildPaths = () => {
    let paths = [];
    let dataStates = data();
    for (let stateKey in dataStates) {
      const path = (
        <USAState
          key={stateKey}
          stateName={dataStates[stateKey].name}
          dimensions={dataStates[stateKey]["dimensions"]}
          state={stateKey}
          fill={fillStateColor(stateKey)}
          onClickState={stateClickHandler(stateKey)}
          PADDSPrices={PADDSPrices}
          disabled={disabled}
        />
      );
      paths.push(path);
    }
    return paths;
  };

  return (
    <>
      {defaultFill !== "#c7c7c7" && (
        <>
          <img
            src={HoverState}
            id="hover-state-pulse"
            style={{
              display: "none",
              position: "absolute",
              zIndex: "9",
              width: "100px"
            }}
          />
          <div id="tooltip-wrapper">
            <div className="padd-visual">
              <p className="region"></p>
              <p className="state"></p>
              <p className="price"></p>
              <p className="date"></p>
              <p className="padd1a"></p>
              <p className="padd1b"></p>
              <p className="padd1c"></p>
            </div>
          </div>
        </>
      )}

      <svg
        className="us-state-map"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 959 593"
      >
        <title>{title}</title>
        <g className="outlines">
          {buildPaths()}
          {/* <g className="DC state">
            <path
              className="DC1"
              fill={fillStateColor("DC1")}
              d="M801.8,253.8 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z"
            />
            <circle
              className="DC2"
              onClick={clickHandler}
              data-name={"DC"}
              fill={fillStateColor("DC2")}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              cx="801.3"
              cy="251.8"
              r="5"
              opacity="1"
            />
          </g> */}
        </g>
      </svg>
    </>
  );
};

export default USAMap;
