import { FetchingStatus } from '../../@types/fetchingStatus';
import { Violations } from '../../@types/globalTypes';

export type OperationResultDialogType = {
  operationResultDialogIsOpened: boolean;
  operationResultfetchStatus: FetchingStatus;
  violations: Violations | undefined;
};
