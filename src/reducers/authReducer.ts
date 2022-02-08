import { ProfileModel } from '../models';
import { AnyAction } from 'redux';
import {
  SET_AUTH_INFO,
  CLEAR_AUTH_INFO,
  SET_AUTH_LOADING_STATUS,
  SET_AUTH_ERROR,
} from '../actions/actionTypes';
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

export default function authReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_AUTH_INFO:
      const { token, profile } = action.payload;
      return { ...state, token, profile };
    case CLEAR_AUTH_INFO:
      return { ...state, token: null, profile: null };
    case SET_AUTH_LOADING_STATUS:
      return { ...state, loadingStatus: action.payload };
    case SET_AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
