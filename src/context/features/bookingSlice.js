import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

const initialState = {
  bookings: [],
  loading: false,
  errors: [],
};

const fetchBookings = createAsyncThunk(
  'bookings/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).get('bookings/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const createBooking = createAsyncThunk(
  'booking/create',
  async ({ data, callback, reject }, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).post('bookings/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      callback?.(response.data['id']);
      return response.data;
    } catch (error) {
      reject?.(error.response.data?.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const cancelBooking = createAsyncThunk(
  'booking/cancel',
  async ({ id, callback, reject }, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).patch(`bookings/${id}/`, {
        booking_status: 'canceled',
      });
      callback?.();
      return response.data;
    } catch (error) {
      reject?.(error.response.data?.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
        state.errors = [];
      })
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.loading = false;
        state.errors = [];
      })
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload.id
        );
        state.bookings.push(action.payload);
        state.loading = false;
        state.errors = [];
      });
  },
});

export default bookingSlice.reducer;
export const { selectCar } = bookingSlice.actions;
export { fetchBookings, createBooking, cancelBooking };
