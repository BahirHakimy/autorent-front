import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

const initialState = {
  report: {
    total_payments: 0,
    bookings_this_month: 0,
    total_customers: 0,
    total_cars: 0,
    bookings_per_month: {},
    bookings_per_car_type: {},
    bookings_states: {},
    ratings_per_car_type: {},
  },
  loading: false,
  error: null,
};

const fetchReport = createAsyncThunk(
  'report/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).get('bookings/get_report/');

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.error || error.response.message
      );
    }
  }
);

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.report = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export default reportSlice.reducer;
export { fetchReport };
