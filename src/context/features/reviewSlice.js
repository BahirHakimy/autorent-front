import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

const initialState = {
  car: null,
  reviews: [],
  selfReview: false,
  loading: false,
  error: null,
};

const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const response = await axios(getUser(false)).get('reviews/');
  return response.data;
});

const fetchCarReviews = createAsyncThunk(
  'reviews/fetchCarReviews',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).post(
        'reviews/get_reviews/',
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

const createReview = createAsyncThunk(
  'reviews/createReview',
  async (review) => {
    const response = await axios(getUser(false)).post('reviews/', review);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCarReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCarReviews.fulfilled,
        (state, { payload: { data = [], self_review, car } }) => {
          state.loading = false;
          state.car = car;
          state.selfReview = self_review;
          state.reviews = data;
        }
      )
      .addCase(fetchCarReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.selfReview = action.payload;
        state.loading = false;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;

export { fetchReviews, fetchCarReviews, createReview };
