import { configureStore } from '@reduxjs/toolkit';
import {
  bookingReducer,
  carReducer,
  paymentReducer,
  reportReducer,
  reviewReducer,
  searchReducer,
  userReducer,
} from './features';

export const store = configureStore({
  reducer: {
    user: userReducer,
    car: carReducer,
    search: searchReducer,
    booking: bookingReducer,
    review: reviewReducer,
    payment: paymentReducer,
    report: reportReducer,
  },
});
