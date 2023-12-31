import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import baseAxios from 'axios';
import { getUser, setToken, clearSession } from '../../utils/auth';
import jwtDecode from 'jwt-decode';
import { axios } from '../../utils/api';

const initialState = {
  user: getUser(),
  users: [],
  sortProp: null,
  fetchedUser: null,
  userErrors: {},
  target: '',
  loading: false,
  error: null,
};

const fetchUsers = createAsyncThunk(
  'users/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).get('users/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const fetchUser = createAsyncThunk(
  'user/fetch',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).get(`users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data?.detail);
    }
  }
);

const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, data, callback }, { rejectWithValue }) => {
    try {
      const response = await axios(getUser(false)).patch(`users/${id}/`, data);
      callback?.();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteUser = createAsyncThunk(
  'user/delete',
  async ({ id, callback }, { rejectWithValue }) => {
    try {
      await axios(getUser(false)).delete(`users/${id}`);
      callback?.();
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const login = createAsyncThunk(
  'user/login',
  async ({ email, password, callback }, { rejectWithValue }) => {
    try {
      const response = await baseAxios.post(
        `${import.meta.env.VITE_API_URL}login`,
        {
          email,
          password,
        }
      );
      response.data.is_admin ? callback?.('/admin') : callback?.();
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
      const response = await baseAxios.post(
        `${import.meta.env.VITE_API_URL}users/`,
        {
          email,
          password,
        }
      );
      callback?.();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSortProp: (state, action) => {
      state.sortProp = action.payload;
    },
    setTraget: (state, action) => {
      state.target = action.payload;
    },
    logout: () => {
      clearSession();
      window.location.replace('/');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchedUser = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
        state.userErrors = {};
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.userErrors = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.loading = false;
        state.error = null;
      })
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
        setToken(action.payload?.token);
        state.loading = false;
        state.userErrors = null;
        state.user = jwtDecode(action.payload?.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.userErrors = action.payload;
      });
  },
});

export default userSlice.reducer;

export const { logout, setTraget, setUserSortProp } = userSlice.actions;
export { fetchUsers, fetchUser, updateUser, deleteUser, login, register };
