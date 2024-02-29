import { useEffect, useMemo, useState } from "react";
import {
  fetchGasolineWeekData,
  fetchPaddColorsData
} from "./store/reducer/paddSlice";
import { useSelector, useDispatch } from "react-redux";
import usePADDS from "./helpers/usePADDS";
import USAMap from "./components/USAMap";
import GasTypeFilter from "./components/GasTypeFilter";
import useOnClickOutsideMap from "../src/helpers/useOnClickOutsideMap";
const App = ({ attributes }) => {
  const dispatch = useDispatch();

  const [fetchingPaddData, setFetchingPaddData] = useState(false);
  const [fetchingColors, setFetchingColors] = useState(false);
  const [type, setType] = useState("diesel");

  const origData = useSelector((state) =>
    type == "diesel" ? state.paddState.diesel : state.paddState.gasoline
  );
  const colors = useSelector((state) => state.paddState.colors);

  const PADDSPrices = useMemo(() => usePADDS(origData), [origData]);

  const mapHandler = (event) => {
    // alert(event.target.dataset.name);
  };

  const statesCustomConfig = {
    // PADD 5
    WA: { fill: colors?.padd_5 ?? "#265997" },
    OR: { fill: colors?.padd_5 ?? "#265997" },
    CA: { fill: colors?.padd_5 ?? "#265997" },
    AK: { fill: colors?.padd_5 ?? "#265997" },
    HI: { fill: colors?.padd_5 ?? "#265997" },
    NV: { fill: colors?.padd_5 ?? "#265997" },
    AZ: { fill: colors?.padd_5 ?? "#265997" },
    NM: { fill: colors?.padd_5 ?? "#265997" },
    // PADD 4
    MT: { fill: colors?.padd_4 ?? "#8bc4d2" },
    ID: { fill: colors?.padd_4 ?? "#8bc4d2" },
    WY: { fill: colors?.padd_4 ?? "#8bc4d2" },
    UT: { fill: colors?.padd_4 ?? "#8bc4d2" },
    CO: { fill: colors?.padd_4 ?? "#8bc4d2" },
    // PADD 3
    TX: { fill: colors?.padd_3 ?? "#162f3f" },
    LA: { fill: colors?.padd_3 ?? "#162f3f" },
    MS: { fill: colors?.padd_3 ?? "#162f3f" },
    AR: { fill: colors?.padd_3 ?? "#162f3f" },
    AL: { fill: colors?.padd_3 ?? "#162f3f" },
    // PADD 1C
    FL: { fill: colors?.padd_1c ?? "#7ccb29" },
    GA: { fill: colors?.padd_1c ?? "#7ccb29" },
    SC: { fill: colors?.padd_1c ?? "#7ccb29" },
    NC: { fill: colors?.padd_1c ?? "#7ccb29" },
    VA: { fill: colors?.padd_1c ?? "#7ccb29" },
    WV: { fill: colors?.padd_1c ?? "#7ccb29" },
    // PADD 1B
    MD: { fill: colors?.padd_1b ?? "#45b255" },
    DE: { fill: colors?.padd_1b ?? "#45b255" },
    PA: { fill: colors?.padd_1b ?? "#45b255" },
    NY: { fill: colors?.padd_1b ?? "#45b255" },
    NJ: { fill: colors?.padd_1b ?? "#45b255" },
    // PADD 1A
    CT: { fill: colors?.padd_1a ?? "#328e42" },
    ME: { fill: colors?.padd_1a ?? "#328e42" },
    NH: { fill: colors?.padd_1a ?? "#328e42" },
    VT: { fill: colors?.padd_1a ?? "#328e42" },
    MA: { fill: colors?.padd_1a ?? "#328e42" },
    RI: { fill: colors?.padd_1a ?? "#328e42" },
    CT: { fill: colors?.padd_1a ?? "#328e42" },
    // PADD 2
    ND: { fill: colors?.padd_2 ?? "#5ca5bf" },
    SD: { fill: colors?.padd_2 ?? "#5ca5bf" },
    NE: { fill: colors?.padd_2 ?? "#5ca5bf" },
    KS: { fill: colors?.padd_2 ?? "#5ca5bf" },
    OK: { fill: colors?.padd_2 ?? "#5ca5bf" },
    MN: { fill: colors?.padd_2 ?? "#5ca5bf" },
    IA: { fill: colors?.padd_2 ?? "#5ca5bf" },
    MO: { fill: colors?.padd_2 ?? "#5ca5bf" },
    TN: { fill: colors?.padd_2 ?? "#5ca5bf" },
    KY: { fill: colors?.padd_2 ?? "#5ca5bf" },
    IL: { fill: colors?.padd_2 ?? "#5ca5bf" },
    IN: { fill: colors?.padd_2 ?? "#5ca5bf" },
    OH: { fill: colors?.padd_2 ?? "#5ca5bf" },
    WI: { fill: colors?.padd_2 ?? "#5ca5bf" },
    MI: { fill: colors?.padd_2 ?? "#5ca5bf" }
  };

  useEffect(() => {
    setFetchingPaddData(true);
    setFetchingColors(true);
    dispatch(
      fetchGasolineWeekData({
        cb: () => {
          setFetchingPaddData(false);
        }
      })
    );
    dispatch(
      fetchPaddColorsData({
        cb: () => {
          setFetchingColors(false);
        }
      })
    );
    useOnClickOutsideMap();
  }, []);

  return (
    <>
      <GasTypeFilter type={type} setType={setType} />
      <USAMap
        customize={statesCustomConfig}
        onClick={mapHandler}
        PADDSPrices={PADDSPrices}
        height={attributes?.height}
        width={attributes?.width}
      />
    </>
  );
};
export default App;
