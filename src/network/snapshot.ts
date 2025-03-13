import {SNAPSHOT_PATH} from '../../constants';
import {axiosInstance} from './axios';

export type SnapshotItemType = {
  symbolId: string;
  code: string;
  close: number;
  dailyChangePercent: number;
  dateTime: number;
};

export type SnapshotResponseType = {
  data: SnapshotItemType;
};

export const getSnapshot = (id: string): Promise<SnapshotResponseType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.get(`${SNAPSHOT_PATH}${id}`);
      const data = response.data as SnapshotResponseType;

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
