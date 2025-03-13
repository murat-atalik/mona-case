import {useCallback} from 'react';
import {snapshotSlicerActions} from '../store/slicers';
import {useAppDispatch} from './storeHooks';
import {getSnapshot} from '../network';

type useFetchSnapshotParams = {
  id: string;
};
export const useFetchSnapshot = (params: useFetchSnapshotParams) => {
  const {id} = params;
  const dispatch = useAppDispatch();

  const fetchSnapshot = useCallback(async () => {
    dispatch(snapshotSlicerActions.snapshot_requested({id}));
    try {
      const response = await getSnapshot(id);
      dispatch(snapshotSlicerActions.snapshot_success({id, response}));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'An unexpected error occurred';
      dispatch(
        snapshotSlicerActions.snapshot_failed({id, error: errorMessage}),
      );
    }
  }, [id, dispatch]);

  return {fetchSnapshot};
};
