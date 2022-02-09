import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    putNewsList: (state, action: PayloadAction<NewsModel[]>) => {
      state.news = action.payload;
    },
    setNewsListLoadingStatus: (
      state,
      action: PayloadAction<AsyncOperationStatus>
    ) => {
      state.loadingStatus = action.payload;
    },
  },
});

export const { putNewsList, setNewsListLoadingStatus } = newsSlice.actions;

export default newsSlice.reducer;
