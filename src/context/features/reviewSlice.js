import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const response = await axios(getUser(false)).get('reviews/');
  return response.data;
});

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
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export default reviewSlice.reducer;

export { fetchReviews, createReview };
