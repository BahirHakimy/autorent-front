import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locations: {
    pickup: {
      lat: null,
      lon: null,
    },
    dropoff: {
      lat: null,
      lon: null,
    },
    distance: 0,
    pickup_location: '',
    dropoff_location: '',
    pickup_datetime: '',
    dropoff_datetime: '',
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPickup: (state, action) => {
      state.locations.pickup = action.payload;
    },

    setDropoff: (state, action) => {
      state.locations.dropoff = action.payload;
    },

    setDistance: (state, action) => {
      state.locations.distance = parseFloat(action.payload.toFixed(2));
    },
    setData: (state, action) => {
      state.locations = { ...state.locations, ...action.payload };
    },
  },
});

export default searchSlice.reducer;
export const { reset, search, setPickup, setDropoff, setDistance, setData } =
  searchSlice.actions;
