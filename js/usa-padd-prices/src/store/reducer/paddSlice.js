import { createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
const qs = require("qs");

// Recaptcha state
export const paddSlice = createSlice({
  name: "paddState",
  initialState: {
    gasoline: {},
    diesel: {},
    colors: {}
  },
  reducers: {
    setGasolineData: (state, action) => {
      state.gasoline = action.payload;
    },
    setDieselData: (state, action) => {
      state.diesel = action.payload;
    },
    setColorsData: (state, action) => {
      state.colors = action.payload;
    }
  }
});

export const { setGasolineData, setDieselData, setColorsData } =
  paddSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// Get gasoline and diesel week data
export const fetchGasolineWeekData =
  ({ cb }) =>
  (dispatch) => {
    axios
      .post(
        ugp_padd_prices.ajax_url,
        qs.stringify({
          action: "ugp_get_gasoline_and_diesel_week_data",
          nonce: ugp_padd_prices.gas_and_diesel_week_data_nonce,
          data: []
        })
      )
      .then(({ data }) => {
        const { gasoline, diesel } = data;
        dispatch(setGasolineData(gasoline));
        dispatch(setDieselData(diesel));
        if (typeof cb === "function") cb(data);
      });
  };

// Get colors data
export const fetchPaddColorsData =
  ({ cb }) =>
  (dispatch) => {
    axios
      .post(
        ugp_padd_prices.ajax_url,
        qs.stringify({
          action: "ugp_settings_fetch_padd_colors",
          nonce: ugp_padd_prices.colors_nonce
        })
      )
      .then(({ data }) => {
        const { colors } = data;
        dispatch(setColorsData(colors));
        if (typeof cb === "function") cb(data);
      });
  };

export default paddSlice.reducer;
