import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
  Action,
  AnyAction,
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import authReducer, { AuthState } from '../reducers/authReducer';
import newsReducer, { NewsListState } from '../reducers/newsReducer';

interface AppState {
  auth: AuthState;
  news: NewsListState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  news: newsReducer,
});

const storage = localStorage;

const profile = storage.getItem('profile');

const initialStore = {
  auth: {
    token: storage.getItem('token'),
    profile: profile ? JSON.parse(profile) : null,
  } as AuthState,
};

const store: Store<AppState> = createStore(
  rootReducer,
  initialStore,
  applyMiddleware(thunk)
);

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
export default store;
