import { createSlice } from '@reduxjs/toolkit'
import axios from '../../helpers/axios';
const qs = require("qs");

// Recaptcha state
export const chartSlice = createSlice({
  name: 'homeState',
  initialState: {
    loaded: false,
  },
  reducers: {
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
  },
})

export const { setLoaded} = chartSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const loaded = (state) => state.homeState.loaded 


export default chartSlice.reducer