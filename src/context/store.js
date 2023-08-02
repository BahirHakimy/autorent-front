import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import toastReducer from './features/toastSlice';
import carReducer from './features/carSlice';
import locationReducer from './features/locationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    car: carReducer,
    location: locationReducer,
  },
});
