import {useCallback} from 'react';
import {chartSlicerActions} from '../store/slicers';
import {useAppDispatch} from './storeHooks';
import {getChart} from '../network';

type useFetchChartParams = {
  id: string;
};
export const useFetchChart = (params: useFetchChartParams) => {
  const {id} = params;

  const dispatch = useAppDispatch();

  const fetchChart = useCallback(async () => {
    dispatch(chartSlicerActions.chart_requested({id}));
    try {
      const response = await getChart(id);
      dispatch(chartSlicerActions.chart_success({id, response}));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'An unexpected error occurred';
      dispatch(chartSlicerActions.chart_failed({id, error: errorMessage}));
    }
  }, [dispatch, id]);

  return {fetchChart};
};
