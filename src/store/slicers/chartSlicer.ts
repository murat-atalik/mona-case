import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AsyncTask, Dictionary} from '../../utils';
import {ChartItemType, ChartListResponseType} from '../../network';

export type ChartItemModelDict = Dictionary<AsyncTask<ChartItemType[]>>;

const initialState = {} as ChartItemModelDict;

export const chartSlicer = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    chart_requested: (state, action: PayloadAction<{id: string}>) => {
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
    chart_success: (
      state,
      action: PayloadAction<{id: string; response: ChartListResponseType}>,
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
    chart_failed: (
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

export const chartSlicerReducer = chartSlicer.reducer;
export const chartSlicerActions = chartSlicer.actions;
