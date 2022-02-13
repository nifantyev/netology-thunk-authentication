import { Action, AnyAction } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import authReducer, { AuthState } from '../reducers/authReducer';
import newsReducer from '../reducers/newsReducer';

const storage = localStorage;

const profile = storage.getItem('profile');

const preloadedState = {
  auth: {
    token: storage.getItem('token'),
    profile: profile ? JSON.parse(profile) : null,
  } as AuthState,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
  preloadedState,
  middleware: [thunk],
});

store.subscribe(() => {
  const token = store.getState().auth.token;
  if (token === null) {
    storage.removeItem('token');
  } else {
    storage.setItem('token', token);
  }
  const profile = store.getState().auth.profile;
  if (profile === null) {
    storage.removeItem('profile');
  } else {
    storage.setItem('profile', JSON.stringify(profile));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch &
  ThunkDispatch<RootState, null, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
