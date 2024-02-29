import { useState } from "react";
import { Radio } from "antd";
import { useSelector, useDispatch } from "react-redux";
import useLineGraphData from "../helpers/useLineGraphData";
import useFilterByTimeSpan from "../helpers/useFilterByTimeSpan";
import {
  setTimespanGasoline,
  setTimespanDiesel,
  setGasolineChartData,
  setDieselChartData
} from "../store/reducer/chartSlice";

const RadioButtons = ({ attributes }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("1 Year");
  const plainOptions = ["1 Month", "3 Months", "1 Year", "2 Years"];
  const timespan = useSelector((state) =>
    attributes?.type == "gasoline"
      ? state.chartState.gasoline.timespan
      : state.chartState.diesel.timespan
  );
  const data = useSelector((state) =>
    attributes?.type == "gasoline"
      ? state.chartState.gasoline
      : state.chartState.diesel
  );

  const onChange = ({ target: { value } }) => {
    const { order, orig, selected } = data;
    const formatData = useLineGraphData({ order, orig, list: selected });
    const filterByTimeSpan = useFilterByTimeSpan(formatData, timespan?.[value]);

    setValue(value);

    if (attributes?.type == "gasoline") {
      dispatch(
        setTimespanGasoline({
          ...timespan,
          selected: value
        })
      );
      dispatch(setGasolineChartData(filterByTimeSpan));
    } else {
      dispatch(
        setTimespanDiesel({
          ...timespan,
          selected: value
        })
      );
      dispatch(setDieselChartData(filterByTimeSpan));
    }
  };

  return (
    <>
      <Radio.Group options={plainOptions} value={value} onChange={onChange} />
    </>
  );
};

export default RadioButtons;
