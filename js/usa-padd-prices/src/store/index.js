import { configureStore } from "@reduxjs/toolkit";
import paddReducer from "./reducer/paddSlice";

export default configureStore({
  reducer: {
    paddState: paddReducer
  }
});
