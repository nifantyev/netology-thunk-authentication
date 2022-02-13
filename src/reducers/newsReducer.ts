import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getNews.pending, (state, action) => {
        state.loadingStatus = 'pending';
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.news = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loadingStatus = 'error';
      }),
});

export const getNews = createAsyncThunk(
  'news/getNewsStatus',
  async (arg, { getState, rejectWithValue }) => {
    const {
      auth: { token },
    } = getState() as { auth: { token: string } };
    if (token) {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/private/news`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        return rejectWithValue({
          message: response.statusText,
          unauthorized: true,
        });
      }
      const data = await response.json();
      return data;
    }
  }
);

export default newsSlice.reducer;
