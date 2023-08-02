import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  results: [],
  query: '',
  locations: {
    pickup: {
      lat: null,
      lon: null,
    },
    dropoff: {
      lat: null,
      lon: null,
    },
  },
  loading: false,
  errors: [],
};

const searchLocation = createAsyncThunk(
  'location/search',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { query } = getState().location;
      const response = await axios.get(
        `https://geocode.maps.co/search?q=${query}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    reset: (state) => {
      state.query = '';
      state.results = [];
    },

    search: (state, action) => {
      state.query = action.payload;
    },

    setPickup: (state, action) => {
      state.locations.pickup = action.payload;
    },

    setDropoff: (state, action) => {
      state.locations.dropoff = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchLocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchLocation.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(searchLocation.fulfilled, (state, action) => {
      state.results = action.payload;
      state.loading = false;
      state.errors = null;
    });
  },
});

export default locationSlice.reducer;
export const { reset, search, setPickup, setDropoff } = locationSlice.actions;
export { searchLocation };
