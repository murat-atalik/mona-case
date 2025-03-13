import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AsyncTask, Dictionary} from '../../utils';
import {NewsItemType, NewsListResponseType} from '../../network';

export type NewsItemModelDict = Dictionary<AsyncTask<NewsItemType[]>>;

const initialState = {} as NewsItemModelDict;

export const newsSlicer = createSlice({
  name: 'news',
  initialState,
  reducers: {
    news_requested: (state, action: PayloadAction<{id: string}>) => {
      try {
        const {payload} = action;
        const {id} = payload;
        const temp = {
          ...state?.[id],
          isLoading: true,
          error: undefined,
        };
        state[id] = temp;
      } catch (error) {
        const {payload} = action;
        const {id} = payload;
        const temp = {
          ...state?.[id],
          isInit: true,
          isLoading: false,
          error: error,
        };
        state[id] = temp;
        console.log('error', error);
      }
    },
    news_success: (
      state,
      action: PayloadAction<{id: string; response: NewsListResponseType}>,
    ) => {
      try {
        const {payload} = action;
        const {id, response} = payload;
        const temp = {
          ...state?.[id],
          isInit: true,
          isLoading: false,
          error: undefined,
          result: response.data,
        };
        state[id] = temp;
      } catch (error) {
        const {payload} = action;
        const {id} = payload;
        const temp = {
          ...state?.[id],
          isInit: true,
          isLoading: false,
          error: error,
        };
        state[id] = temp;
        console.log('error', error);
      }
    },
    news_failed: (
      state,
      action: PayloadAction<{id: string; error: string}>,
    ) => {
      try {
        const {payload} = action;
        const {id, error} = payload;
        const temp = {
          ...state?.[id],
          isInit: true,
          isLoading: false,
          error: error,
        };
        state[id] = temp;
        console.log('error', error);
      } catch (error) {
        const {payload} = action;
        const {id} = payload;
        const temp = {
          ...state?.[id],
          isInit: true,
          isLoading: false,
          error: error,
        };
        state[id] = temp;
        console.log('error', error);
      }
    },
  },
});

export const newsSlicerReducer = newsSlicer.reducer;
export const newsSlicerActions = newsSlicer.actions;
