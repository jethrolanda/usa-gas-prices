import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import useLineGraphData from "../helpers/useLineGraphData";
import useFilterByTimeSpan from "../helpers/useFilterByTimeSpan";
import {
  setGasolineChartData,
  setDieselChartData,
  setSelectedDiesel,
  setSelectedGasoline
} from "../store/reducer/chartSlice";
import { useSelector, useDispatch } from "react-redux";

const Checkboxes = ({ location, attributes }) => {
  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);
  const [checked, setChecked] = useState([]);

  const order = useSelector((state) =>
    attributes?.type == "gasoline"
      ? state.chartState.gasoline.order
      : state.chartState.diesel.order
  );
  const orig = useSelector((state) =>
    attributes?.type == "gasoline"
      ? state.chartState.gasoline.orig
      : state.chartState.diesel.orig
  );
  const selectedTimespan = useSelector((state) =>
    attributes?.type == "gasoline"
      ? state.chartState.gasoline.timespan.selected
      : state.chartState.diesel.timespan.selected
  );
  const timespan = useSelector((state) =>
    attributes?.type == "gasoline"
      ? state.chartState.gasoline.timespan?.[selectedTimespan]
      : state.chartState.diesel.timespan?.[selectedTimespan]
  );

  const onChange = (list) => {
    const updated = useLineGraphData({ order, orig, list });

    const filterByTimeSpan = useFilterByTimeSpan(updated, timespan);

    if (attributes?.type == "gasoline") {
      dispatch(setGasolineChartData(filterByTimeSpan));
      dispatch(setSelectedGasoline(list));
    } else {
      dispatch(setDieselChartData(filterByTimeSpan));
      dispatch(setSelectedDiesel(list));
    }

    setChecked(list);
  };

  useEffect(() => {
    let choices = [];
    let selected = [];

    Object.keys(location).map((loc) => {
      selected = [...selected, loc];
      choices = [...choices, { label: loc, value: loc }];
    });

    setOptions(choices);
    setChecked(selected);
  }, []);

  return (
    <Checkbox.Group options={options} value={checked} onChange={onChange} />
  );
};
export default Checkboxes;
