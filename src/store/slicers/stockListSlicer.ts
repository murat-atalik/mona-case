import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AsyncTask} from '../../utils';
import {
  StockListItemType,
  StockListResponseType,
} from '../../network/stockList';

export type StockListItemModelDict = {
  list: AsyncTask<StockListItemType[]>;
};

const initialState = {
  list: [],
} as StockListItemModelDict;

export const stockListSlicer = createSlice({
  name: 'stockList',
  initialState,
  reducers: {
    stock_list_requested: state => {
      try {
        state.list = {
          ...state.list,
          isLoading: true,
          error: undefined,
        };
      } catch (error) {
        state.list = {
          ...state.list,
          isInit: true,
          isLoading: false,
          error: error,
        };
        console.log('error', error);
      }
    },
    stock_list_success: (
      state,
      action: PayloadAction<StockListResponseType>,
    ) => {
      try {
        const result = action.payload;
        state.list = {
          ...state.list,
          isInit: true,
          isLoading: false,
          error: undefined,
          result: result.data,
        };
      } catch (error) {
        state.list = {
          ...state.list,
          isInit: true,
          isLoading: false,
          error: error,
        };
      }
    },
    stock_list_failed: (state, action: PayloadAction<{error: string}>) => {
      try {
        const error = action.payload;
        state.list = {
          ...state.list,
          isInit: true,
          isLoading: false,
          error: error,
        };
      } catch (error) {
        state.list = {
          ...state.list,
          isInit: true,
          isLoading: false,
          error: error,
        };
      }
    },
  },
});

export const stockListSlicerReducer = stockListSlicer.reducer;
export const stockListSlicerActions = stockListSlicer.actions;
