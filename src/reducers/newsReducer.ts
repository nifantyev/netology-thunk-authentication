import { AnyAction } from 'redux';
import {
  PUT_NEWS_LIST,
  SET_NEWS_LIST_LOADING_STATUS,
} from '../actions/actionTypes';
import { NewsModel } from '../models';
import { AsyncOperationStatus } from '../types';

export interface NewsListState {
  loadingStatus: AsyncOperationStatus;
  news: NewsModel[];
}

const initialState = {
  loadingStatus: 'idle',
  news: [],
} as NewsListState;

export default function newsReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case PUT_NEWS_LIST:
      return { ...state, news: action.payload };
    case SET_NEWS_LIST_LOADING_STATUS:
      return { ...state, loadingStatus: action.payload };
    default:
      return state;
  }
}
