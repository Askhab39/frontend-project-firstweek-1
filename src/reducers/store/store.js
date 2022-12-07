import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from '../Slice/bookingSlice'

export const store = configureStore({
  reducer: {
    bookingReducer
  },
});
