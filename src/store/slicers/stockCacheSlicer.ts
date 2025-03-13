import {createSlice} from '@reduxjs/toolkit';
import {Dictionary} from '../../utils';
import {StockListItemType} from '../../network';
import {stockListSlicerActions} from './stockListSlicer';

export type StockCacheItemModelDict = Dictionary<StockListItemType>;

const initialState = {} as StockCacheItemModelDict;

export const stockCacheSlicer = createSlice({
  name: 'stockCache',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      stockListSlicerActions.stock_list_success,
      (state, action) => {
        try {
          const {payload} = action;
          const {data} = payload;
          if (data) {
            data.forEach(item => {
              const currentItem = state[item.id];
              state[item.id] = {
                ...currentItem,
                ...item,
              };
            });
          }
        } catch (error) {
          console.log('error', error);
        }
      },
    );
  },
});

export const stockCacheSlicerReducer = stockCacheSlicer.reducer;
export const stockCacheSlicerActions = stockCacheSlicer.actions;
