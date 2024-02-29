import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./reducer/settingsSlice";

export default configureStore({
  reducer: {
    settingsState: settingsReducer
  }
});
