import { createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";

const qs = require("qs");

// Recaptcha state
export const settingsSlice = createSlice({
  name: "settingsState",
  initialState: {
    colors: {}
  },
  reducers: {
    setColors: (state, action) => {
      state.colors = action.payload;
    }
  }
});

export const { setColors } = settingsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// Get PADD color values
export const fetchPADDColors = (cb) => (dispatch) => {
  axios
    .post(
      ugp_settings.ajax_url,
      qs.stringify({
        action: "ugp_settings_fetch_padd_colors",
        nonce: ugp_settings.colors_nonce,
        data: []
      })
    )
    .then(({ data }) => {
      const { status, colors } = data;

      if (status === "success") {
        dispatch(setColors(colors));
        if (typeof cb === "function") cb(colors);
      }
    });
};

// Save PADD Colors
export const savePADDColors = (data, cb) => (dispatch) => {
  axios
    .post(
      ugp_settings.ajax_url,
      qs.stringify({
        action: "ugp_settings_save_padd_colors",
        nonce: ugp_settings.colors_nonce,
        data
      })
    )
    .then(({ data }) => {
      const { status, colors } = data;

      if (status === "success") {
        dispatch(setColors(colors));
        if (typeof cb === "function") cb(colors);
      }
    });
};

// Delete Cache
export const cacheCleanup = (cb) => (dispatch) => {
  axios
    .post(
      ugp_settings.ajax_url,
      qs.stringify({
        action: "ugp_settings_delete_cache",
        nonce: ugp_settings.delete_cache_nonce
      })
    )
    .then(({ data }) => {
      const { status } = data;

      if (typeof cb === "function") cb(status);
    });
};

export default settingsSlice.reducer;
