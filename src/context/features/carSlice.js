import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

const initialState = {
  cars: [],
  car: null,
  carError: null,
  availableCars: [],
  selectedCar: null,
  updating: false,
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

const fetchCar = createAsyncThunk(
  'car/fetch',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).get(`cars/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data?.detail);
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
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(fetchCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCar.rejected, (state, action) => {
        state.loading = false;
        state.carError = action.payload;
      })
      .addCase(fetchCar.fulfilled, (state, action) => {
        state.car = action.payload;
        state.loading = false;
        state.carError = null;
      })
      .addCase(fetchAvailableCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailableCars.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(fetchAvailableCars.fulfilled, (state, action) => {
        state.availableCars = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(createCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCar.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
        state.loading = false;
        state.errors = null;
      })
      .addCase(updateCar.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.updating = false;
        state.errors = action.payload;
      })
      .addCase(updateCar.fulfilled, (state) => {
        state.updating = false;
        state.errors = null;
      })
      .addCase(deleteCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car.id !== action.payload);
        state.loading = false;
        state.errors = null;
      });
  },
});

export default carSlice.reducer;
export const { selectCar } = carSlice.actions;
export {
  fetchCars,
  fetchCar,
  fetchAvailableCars,
  createCar,
  updateCar,
  deleteCar,
};
