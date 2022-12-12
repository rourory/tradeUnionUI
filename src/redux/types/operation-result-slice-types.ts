import { FetchingStatus } from "../../@types/fetchingStatus"
import { Violations } from "../../@types/globalTypes";



export type OperationResultDialogType = {
  operationResultDialogIsOpened: boolean;
  fetchStatus: FetchingStatus;
  violations: Violations | undefined;
}