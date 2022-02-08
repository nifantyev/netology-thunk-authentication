import { NewsModel, ProfileModel } from '../models';
import { AsyncOperationStatus } from '../types';
import {
  CLEAR_AUTH_INFO,
  PUT_NEWS_LIST,
  SET_AUTH_ERROR,
  SET_AUTH_INFO,
  SET_AUTH_LOADING_STATUS,
  SET_NEWS_LIST_LOADING_STATUS,
} from './actionTypes';

export function setAuthInfo(token: string, profile: ProfileModel) {
  return { type: SET_AUTH_INFO, payload: { token, profile } };
}

export function clearAuthInfo() {
  return { type: CLEAR_AUTH_INFO };
}

export function setAuthLoadingStatus(status: AsyncOperationStatus) {
  return { type: SET_AUTH_LOADING_STATUS, payload: status };
}

export function setAuthError(error: string | null) {
  return { type: SET_AUTH_ERROR, payload: error };
}

export function putNewsList(news: NewsModel[]) {
  return { type: PUT_NEWS_LIST, payload: news };
}

export function setNewsListLoadingStatus(status: AsyncOperationStatus) {
  return { type: SET_NEWS_LIST_LOADING_STATUS, payload: status };
}
