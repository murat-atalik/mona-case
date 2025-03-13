import {useCallback} from 'react';
import {newsSlicerActions} from '../store/slicers';
import {useAppDispatch} from './storeHooks';
import {getNews} from '../network';

type useFetchNewsParams = {
  id: string;
};
export const useFetchNews = (params: useFetchNewsParams) => {
  const {id} = params;
  const dispatch = useAppDispatch();

  const fetchNews = useCallback(async () => {
    dispatch(newsSlicerActions.news_requested({id}));
    try {
      const response = await getNews(id);
      dispatch(newsSlicerActions.news_success({id, response}));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'An unexpected error occurred';
      dispatch(newsSlicerActions.news_failed({id, error: errorMessage}));
    }
  }, [dispatch, id]);

  return {fetchNews};
};
