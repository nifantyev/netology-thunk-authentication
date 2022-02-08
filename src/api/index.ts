import { AppThunk } from '../store';
import { NewsModel, ProfileModel } from '../models';
import {
  clearAuthInfo,
  putNewsList,
  setAuthError,
  setAuthInfo,
  setAuthLoadingStatus,
  setNewsListLoadingStatus,
} from '../actions/actionCreators';

export function login(
  login: string,
  password: string
): AppThunk<Promise<void>> {
  return async function authenticateThunk(dispatch, getState) {
    try {
      dispatch(setAuthLoadingStatus('pending'));
      const authResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/auth`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login,
            password,
          }),
        }
      );
      if (!authResponse.ok) {
        if (authResponse.status === 400) {
          const { message } = await authResponse.json();
          dispatch(setAuthError(message));
        }
        throw new Error(authResponse.statusText);
      }

      dispatch(setAuthError(null));

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
        throw new Error(profileResponse.statusText);
      }

      const profile = (await profileResponse.json()) as ProfileModel;

      dispatch(setAuthInfo(token, profile));
    } catch (e) {
      dispatch(setAuthLoadingStatus('error'));
    }
  };
}

export function getNews(): AppThunk<Promise<void>> {
  return async function getNewsThunk(dispatch, getState) {
    try {
      const token = getState().auth.token;
      if (token) {
        dispatch(setNewsListLoadingStatus('pending'));
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/private/news`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            dispatch(clearAuthInfo());
          }
          throw new Error(response.statusText);
        }
        const data = (await response.json()) as NewsModel[];
        dispatch(putNewsList(data));
        dispatch(setNewsListLoadingStatus('success'));
      }
    } catch (e) {
      dispatch(setNewsListLoadingStatus('error'));
    }
  };
}
