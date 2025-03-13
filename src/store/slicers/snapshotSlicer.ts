import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AsyncTask, Dictionary} from '../../utils';
import {SnapshotItemType, SnapshotResponseType} from '../../network';

export type SnapshotItemModelDict = Dictionary<AsyncTask<SnapshotItemType>>;

const initialState = {} as SnapshotItemModelDict;

export const snapshotSlicer = createSlice({
  name: 'snapshot',
  initialState,
  reducers: {
    snapshot_requested: (state, action: PayloadAction<{id: string}>) => {
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
    snapshot_success: (
      state,
      action: PayloadAction<{id: string; response: SnapshotResponseType}>,
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
    snapshot_failed: (
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

export const snapshotSlicerReducer = snapshotSlicer.reducer;
export const snapshotSlicerActions = snapshotSlicer.actions;
