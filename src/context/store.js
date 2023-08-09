import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import toastReducer from './features/toastSlice';
import carReducer from './features/carSlice';
import searchReducer from './features/searchSlice';
import bookingReducer from './features/bookingSlice';
import reviewReducer from './features/reviewSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    car: carReducer,
    search: searchReducer,
    booking: bookingReducer,
    review: reviewReducer,
  },
});
