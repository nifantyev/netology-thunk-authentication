import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileModel } from '../models';
import { AsyncOperationStatus } from '../types';

export interface AuthState {
  loadingStatus: AsyncOperationStatus;
  error: string | null;
  token: string | null;
  profile: ProfileModel | null;
}

const initialState = {
  loadingStatus: 'idle',
  error: null,
  token: null,
  profile: null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthInfo: (
      state,
      action: PayloadAction<{ token: string; profile: ProfileModel }>
    ) => {
      state.token = action.payload.token;
      state.profile = action.payload.profile;
    },
    clearAuthInfo: (state, action: PayloadAction) => {
      state.token = null;
      state.profile = null;
    },
    setAuthLoadingStatus: (
      state,
      action: PayloadAction<AsyncOperationStatus>
    ) => {
      state.loadingStatus = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAuthInfo,
  clearAuthInfo,
  setAuthLoadingStatus,
  setAuthError,
} = authSlice.actions;

export default authSlice.reducer;
