import {CHART_PATH} from '../../constants';
import {axiosInstance} from './axios';

export type ChartItemType = {
  d: number; //Date
  o: number;
  h: number;
  l: number;
  c: number; //Last Value
};

export type ChartListResponseType = {
  data: ChartItemType[];
};

export const getChart = (id: string): Promise<ChartListResponseType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.get(`${CHART_PATH}${id}`);
      const data = response.data as ChartListResponseType;

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
