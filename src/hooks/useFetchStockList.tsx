import {useCallback} from 'react';
import {stockListSlicerActions} from '../store/slicers';
import {useAppDispatch} from './storeHooks';
import {getStockList} from '../network';

export const useFetchStockList = () => {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    dispatch(stockListSlicerActions.stock_list_requested());
    try {
      const response = await getStockList();
      dispatch(stockListSlicerActions.stock_list_success(response));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'An unexpected error occurred';
      dispatch(stockListSlicerActions.stock_list_failed({error: errorMessage}));
    }
  }, [dispatch]);

  return {fetchData};
};
