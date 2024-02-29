import { createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import useLineGraphData from "../../helpers/useLineGraphData";
import useFilterByTimespan from "../../helpers/useFilterByTimeSpan";
const qs = require("qs");

// Recaptcha state
export const chartSlice = createSlice({
  name: "chartState",
  initialState: {
    gasoline: {
      // Used for Google chart data
      chartData: [],
      // The data from ajax
      orig: [],
      // Proper ordering
      order: [],
      // Default selected regions
      selected: [
        "U.S.",
        "East Coast",
        "New England",
        "Central Atlantic",
        "Lower Atlantic",
        "Midwest",
        "Gulf Coast",
        "Rocky Mountain",
        "West Coast",
        "California"
      ],
      // Default selected timespan
      timespan: {
        selected: "1 Year"
      }
    },
    diesel: {
      chartData: [],
      orig: [],
      order: [],
      selected: [
        "U.S.",
        "East Coast",
        "New England",
        "Central Atlantic",
        "Lower Atlantic",
        "Midwest",
        "Gulf Coast",
        "Rocky Mountain",
        "West Coast",
        "California"
      ],
      timespan: {
        selected: "1 Year"
      }
    },
    colors: {
      "U.S": "#4E64AE",
      "East Coast": "#469990",
      "New England": "#E51B4C",
      "Central Atlantic": "#F58230",
      "Lower Atlantic": "#8EC74C",
      Midwest: "#863D97",
      "Gulf Coast": "#AAAACC",
      "Rocky Mountain": "#B7962F",
      "West Coast": "#609FAF",
      California: "#FFCC62"
    }
  },
  reducers: {
    setTimespanGasoline: (state, action) => {
      state.gasoline.timespan = action.payload;
    },
    setTimespanDiesel: (state, action) => {
      state.diesel.timespan = action.payload;
    },
    setSelectedGasoline: (state, action) => {
      state.gasoline.selected = action.payload;
    },
    setSelectedDiesel: (state, action) => {
      state.diesel.selected = action.payload;
    },
    setGasolineChartData: (state, action) => {
      state.gasoline.chartData = action.payload;
    },
    setDieselChartData: (state, action) => {
      state.diesel.chartData = action.payload;
    },
    setGasolineOrigChartData: (state, action) => {
      state.gasoline.orig = action.payload;
    },
    setDieselOrigChartData: (state, action) => {
      state.diesel.orig = action.payload;
    },
    setGasolineChartOrder: (state, action) => {
      state.gasoline.order = action.payload;
    },
    setDieselChartOrder: (state, action) => {
      state.diesel.order = action.payload;
    }
  }
});

export const {
  setTimespanGasoline,
  setTimespanDiesel,
  setSelectedGasoline,
  setSelectedDiesel,
  setGasolineChartData,
  setDieselChartData,
  setGasolineOrigChartData,
  setDieselOrigChartData,
  setGasolineChartOrder,
  setDieselChartOrder
} = chartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const gasolineChartData = (state) => state.chartState.gasolineChartData;
// export const dieselChartData = (state) => state.chartState.gasolineChartData;

// Get recaptcha values
export const fetchGasolineYearData =
  ({ cb }) =>
  (dispatch) => {
    axios
      .post(
        ugp_gas_prices_chart.ajax_url,
        qs.stringify({
          action: "ugp_get_gasoline_year_data",
          nonce: ugp_gas_prices_chart.settings_nonce,
          data: []
        })
      )
      .then(({ data }) => {
        const { order, orig, timespan } = data;

        const formatData = useLineGraphData(data);
        const filterByTimeSpan = useFilterByTimespan(
          formatData,
          timespan["1 Year"]
        );

        dispatch(setGasolineChartData(filterByTimeSpan));
        dispatch(setGasolineOrigChartData(orig));
        dispatch(setGasolineChartOrder(order));
        dispatch(setTimespanGasoline(timespan));
        if (typeof cb === "function") cb(data);
      });
  };

// Get recaptcha values
export const fetchDieselYearData =
  ({ cb }) =>
  (dispatch) => {
    axios
      .post(
        ugp_gas_prices_chart.ajax_url,
        qs.stringify({
          action: "ugp_get_diesel_year_data",
          nonce: ugp_gas_prices_chart.settings_nonce,
          data: []
        })
      )
      .then(({ data }) => {
        const { order, orig, timespan } = data;

        const formatData = useLineGraphData(data);
        const filterByTimeSpan = useFilterByTimespan(
          formatData,
          timespan["1 Year"]
        );

        dispatch(setDieselChartData(filterByTimeSpan));
        dispatch(setDieselOrigChartData(orig));
        dispatch(setDieselChartOrder(order));
        dispatch(setTimespanDiesel(timespan));
        if (typeof cb === "function") cb(data);
      });
  };

export default chartSlice.reducer;
