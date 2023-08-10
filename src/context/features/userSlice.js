import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUser, setToken, clearSession } from '../../utils/auth';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: getUser(),
  target: '/dashboard',
  loading: false,
  error: null,
};

const login = createAsyncThunk(
  'user/login',
  async ({ email, password, callback }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });
      callback?.();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const register = createAsyncThunk(
  'user/register',
  async ({ email, password, callback }, { rejectWithValue }) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/users/', {
        email,
        password,
      });
      return callback;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTraget: (state, action) => {
      state.target = action.payload;
    },
    logout: (state) => {
      clearSession();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        setToken(action.payload?.token);
        state.user = jwtDecode(action.payload?.token);
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        action.payload?.();
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

export const { logout, setTraget } = userSlice.actions;
export { login, register };
