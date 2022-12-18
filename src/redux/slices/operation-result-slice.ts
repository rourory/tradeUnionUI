import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../@types/fetchingStatus';
import { Violations } from '../../@types/globalTypes';
import { RootState } from '../store';
import { OperationResultDialogType } from '../types/operation-result-slice-types';

const initialState: OperationResultDialogType = {
  operationResultDialogIsOpened: false,
  operationResultfetchStatus: FetchingStatus.LOADING,
  violations: undefined,
};

const operationResultSlice = createSlice({
  name: 'operationResultDialog',
  initialState,
  reducers: {
    setOpenedOperationResultDialog(state, action: PayloadAction<boolean>) {
      state.operationResultDialogIsOpened = action.payload;
    },
    setOperationResultFetchStatus(state, action: PayloadAction<FetchingStatus>) {
      state.operationResultfetchStatus = action.payload;
    },
    setViolation(state, action: PayloadAction<Violations>) {
      state.violations = action.payload;
    },
  },
});

export default operationResultSlice.reducer;
export const operationResultDialogSelector = (state: RootState) => state.operationResult;
export const { setOpenedOperationResultDialog, setOperationResultFetchStatus, setViolation } =
  operationResultSlice.actions;
