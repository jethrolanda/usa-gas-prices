import { createSlice } from '@reduxjs/toolkit'
import axios from '../../helpers/axios';
import useLineGraphData from '../../helpers/useLineGraphData';
const qs = require("qs");

// Recaptcha state
export const chartSlice = createSlice({
  name: 'chartState',
  initialState: {
    gasoline: {
      chartData: [],
      orig: [],
      order: []
    },
    diesel: {
      chartData: [],
      orig: [],
      order: []
    }
  },
  reducers: {
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
  },
})

export const { setGasolineChartData, setDieselChartData, setGasolineOrigChartData, setDieselOrigChartData, setGasolineChartOrder, setDieselChartOrder } = chartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const gasolineChartData = (state) => state.chartState.gasolineChartData;
// export const dieselChartData = (state) => state.chartState.gasolineChartData;

// Get recaptcha values
export const fetchGasolineYearData = ({cb}) => (dispatch) => {
  
  axios.post(ugp_settings.ajax_url, qs.stringify({
    action: "ugp_get_gasoline_year_data",
    nonce: ugp_settings.settings_nonce,
    data: []
  })).then(({data}) => {
    const {order, orig} = data;
    // console.log(data)
    dispatch(setGasolineChartData(useLineGraphData(data)));
    dispatch(setGasolineOrigChartData(orig));
    dispatch(setGasolineChartOrder(order));
    if (typeof cb === "function") cb(data);
  });
  
}

// Get recaptcha values
export const fetchDieselYearData = ({cb}) => (dispatch) => {
  
  axios.post(ugp_settings.ajax_url, qs.stringify({
    action: "ugp_get_diesel_year_data",
    nonce: ugp_settings.settings_nonce,
    data: []
  })).then(({data}) => {
    const {order, orig} = data;
    // console.log(data)
    dispatch(setDieselChartData(useLineGraphData(data)));
    dispatch(setDieselOrigChartData(orig));
    dispatch(setDieselChartOrder(order));
    if (typeof cb === "function") cb(data);
  });
  
}

export default chartSlice.reducer