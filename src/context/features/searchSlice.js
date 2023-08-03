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
      state.locations.distance = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { reset, search, setPickup, setDropoff, setDistance } =
  searchSlice.actions;
