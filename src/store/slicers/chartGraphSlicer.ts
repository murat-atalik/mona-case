import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChartDataItem} from '../../components';

type ChartGraphType = {
  lastPoint?: ChartDataItem;
};
const initialState = {} as ChartGraphType;

export const chartGraphSlicer = createSlice({
  name: 'chartGraph',
  initialState,
  reducers: {
    set_chart_graph: (state, action: PayloadAction<{data?: ChartDataItem}>) => {
      try {
        const {payload} = action;
        state.lastPoint = payload.data;
      } catch (error) {
        state.lastPoint = undefined;
        console.log('error', error);
      }
    },
  },
});

export const chartGraphSlicerReducer = chartGraphSlicer.reducer;
export const chartGraphSlicerActions = chartGraphSlicer.actions;
