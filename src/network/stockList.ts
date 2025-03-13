import {STOCK_LIST_PATH} from '../../constants';
import {axiosInstance} from './axios';

export type StockListItemType = {
  id: string;
  code: string;
  desc: string;
  decimal: number;
  type: string;
  logo: string;
  currencyPrefix: string;
};

export type StockListResponseType = {
  data: StockListItemType[];
};

export const getStockList = (): Promise<StockListResponseType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.get(STOCK_LIST_PATH);
      const data = response.data as StockListResponseType;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
