import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

const initialState = {
  cars: [],
  availableCars: [],
  selectedCar: null,
  loading: false,
  errors: [],
};

const fetchCars = createAsyncThunk(
  'cars/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).get('cars/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const fetchAvailableCars = createAsyncThunk(
  'cars/fetchAvailble',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).post('cars/search/', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const createCar = createAsyncThunk(
  'cars/create',
  async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).post('cars/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      callback?.();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const updateCar = createAsyncThunk(
  'cars/update',
  async ({ id, data, callback }, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).patch(`cars/${id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      callback?.();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteCar = createAsyncThunk(
  'cars/delete',
  async ({ id, callback }, { rejectWithValue }) => {
    try {
      await axios(getUser(false)).delete(`cars/${id}`);
      callback?.();
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    selectCar: (state, action) => {
      state.selectedCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCars.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCars.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.cars = action.payload;
      state.loading = false;
      state.errors = null;
    });
    builder.addCase(fetchAvailableCars.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAvailableCars.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(fetchAvailableCars.fulfilled, (state, action) => {
      state.availableCars = action.payload;
      state.loading = false;
      state.errors = null;
    });
    builder.addCase(createCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCar.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(createCar.fulfilled, (state, action) => {
      state.cars.push(action.payload);
      state.loading = false;
      state.errors = null;
    });
    builder.addCase(deleteCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCar.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
      state.loading = false;
      state.errors = null;
    });
  },
});

export default carSlice.reducer;
export const { selectCar } = carSlice.actions;
export { fetchCars, fetchAvailableCars, createCar, updateCar, deleteCar };
