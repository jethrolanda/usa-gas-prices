import { configureStore } from '@reduxjs/toolkit'
import chartReducer from './reducer/chartSlice'

export default configureStore({
  reducer: {
    chart: chartReducer,
  },
})