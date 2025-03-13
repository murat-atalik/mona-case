import {NEWS_PATH} from '../../constants';
import {axiosInstance} from './axios';

export type NewsItemType = {
  date: number;
  header: string;
  summary?: string;
  content: string;
  relatedSymbols: string[];
};

export type NewsListResponseType = {
  data: NewsItemType[];
};

export const getNews = (id: string): Promise<NewsListResponseType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.get(`${NEWS_PATH}${id}`);
      const data = response.data as NewsListResponseType;

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
