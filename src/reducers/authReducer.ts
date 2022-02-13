import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ProfileModel } from '../models';
import { AsyncOperationStatus } from '../types';

export interface AuthState {
  loadingStatus: AsyncOperationStatus;
  token: string | null;
  profile: ProfileModel | null;
}

const initialState = {
  loadingStatus: 'idle',
  token: null,
  profile: null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthInfo: (state, action: PayloadAction) => {
      state.token = null;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state, action) => {
        state.loadingStatus = 'pending';
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.token = action.payload.token;
        state.profile = action.payload.profile;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.loadingStatus = 'idle';
      })
      .addMatcher(
        (action) => isRejectedWithValue(action) && action.payload.unauthorized,
        (state, action) => {
          state.token = null;
          state.profile = null;
        }
      );
  },
});

export const authenticate = createAsyncThunk(
  'auth/authenticateStatus',
  async (arg: { login: string; password: string }, { rejectWithValue }) => {
    const authResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: arg.login,
        password: arg.password,
      }),
    });
    if (!authResponse.ok) {
      return rejectWithValue({ message: 'Ошибка при аутентификации' });
    }
    const { token } = await authResponse.json();
    const profileResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/private/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!profileResponse.ok) {
      return rejectWithValue({ message: 'Ошибка при аутентификации' });
    }

    const profile = await profileResponse.json()!;
    return { token, profile };
  }
);

export const { clearAuthInfo } = authSlice.actions;

export default authSlice.reducer;
