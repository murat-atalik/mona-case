import {configureStore, Middleware} from '@reduxjs/toolkit';
import {
  chartGraphSlicerReducer,
  chartSlicerReducer,
  newsSlicerReducer,
  snapshotSlicerReducer,
  stockCacheSlicerReducer,
  stockListSlicerReducer,
} from './slicers';
import reactotron from '../../ReactotronConfig';

const middlewares: Middleware[] = [];
const customEnhancers = __DEV__
  ? [reactotron?.createEnhancer()].filter(v => v)
  : [];

export const store = configureStore({
  reducer: {
    stockList: stockListSlicerReducer,
    stockCache: stockCacheSlicerReducer,
    chart: chartSlicerReducer,
    snapshot: snapshotSlicerReducer,
    news: newsSlicerReducer,
    chartGraph: chartGraphSlicerReducer,
  },
  enhancers: (getDefaultEnhancers: any) =>
    getDefaultEnhancers().concat(customEnhancers),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
