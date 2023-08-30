import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

const initialState = {
  payments: [],
  hasNext: false,
  sortProp: null,
  currentPage: 1,
  payment: null,
  loading: false,
  error: null,
};

const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (page = 1) => {
    const response = await axios(getUser(false)).get(`payments/?page=${page}`);
    return response.data;
  }
);

const fetchPayment = createAsyncThunk(
  'payment/fetch',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).get(`payments/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data?.detail);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentSortProp: (state, action) => {
      state.sortProp = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.payments =
          state.currentPage === 1
            ? payload.results
            : [...state.payments, ...payload.results];
        state.hasNext = payload.has_next;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
export const { setCurrentPage, setPaymentSortProp } = paymentSlice.actions;
export { fetchPayments, fetchPayment };
