import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

const initialState = {
  bookings: [],
  booking: null,
  bookingError: null,
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

const fetchBooking = createAsyncThunk(
  'booking/fetch',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).get(`bookings/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data?.detail);
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

const updateBookingStatus = createAsyncThunk(
  'booking/cancel',
  async (
    { id, status = 'canceled', callback, reject },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios(getUser(false)).patch(`bookings/${id}/`, {
        booking_status: status,
      });
      callback?.();
      return response.data;
    } catch (error) {
      reject?.();
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteBooking = createAsyncThunk(
  'booking/delete',
  async ({ id, callback, reject }, { rejectWithValue }) => {
    try {
      await axios(getUser(false)).delete(`bookings/${id}`);
      callback?.();
      return id;
    } catch (error) {
      reject?.();
      return rejectWithValue(error.response.data.detail);
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
      .addCase(fetchBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooking.rejected, (state, action) => {
        state.loading = false;
        state.bookingError = action.payload;
      })
      .addCase(fetchBooking.fulfilled, (state, action) => {
        state.booking = action.payload;
        state.loading = false;
        state.bookingError = null;
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
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload.id
        );
        state.bookings.push(action.payload);
        state.loading = false;
        state.errors = [];
      })
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload
        );
        state.loading = false;
        state.errors = [];
      });
  },
});

export default bookingSlice.reducer;
export const { selectCar } = bookingSlice.actions;
export {
  fetchBookings,
  fetchBooking,
  createBooking,
  updateBookingStatus,
  deleteBooking,
};
