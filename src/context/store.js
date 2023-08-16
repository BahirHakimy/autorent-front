import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import carReducer from './features/carSlice';
import searchReducer from './features/searchSlice';
import bookingReducer from './features/bookingSlice';
import reviewReducer from './features/reviewSlice';
import paymentReducer from './features/paymentSlice';
import reportReducer from './features/reportSlice';

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
