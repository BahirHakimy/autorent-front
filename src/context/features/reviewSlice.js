import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

const initialState = {
  car: null,
  reviews: [],
  review: null,
  hasNext: false,
  currentPage: 1,
  selfReview: false,
  loading: false,
  error: null,
};

const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (page = 1) => {
    const response = await axios(getUser(false)).get(`reviews/?page=${page}`);
    return response.data;
  }
);

const fetchReview = createAsyncThunk(
  'review/fetch',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).get(`reviews/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data?.detail);
    }
  }
);

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

const deleteReview = createAsyncThunk(
  'review/delete',
  async ({ id, callback, reject }, { rejectWithValue }) => {
    try {
      await axios(getUser(false)).delete(`reviews/${id}`);
      callback?.();
      return id;
    } catch (error) {
      reject?.();
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.reviews =
          state.currentPage === 1
            ? payload.results
            : [...state.reviews, ...payload.results];
        state.hasNext = payload.has_next;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload;
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
export const { setCurrentPage } = reviewSlice.actions;
export {
  fetchReviews,
  fetchReview,
  fetchCarReviews,
  createReview,
  deleteReview,
};
