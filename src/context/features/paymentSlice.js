import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

const initialState = {
  payments: [],
  payment: null,
  loading: false,
  error: null,
};

const fetchPayments = createAsyncThunk('payments/fetchPayments', async () => {
  const response = await axios(getUser(false)).get('payments/');
  return response.data;
});

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
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

export { fetchPayments, fetchPayment };
