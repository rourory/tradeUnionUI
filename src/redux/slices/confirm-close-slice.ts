import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ConfirmDialogType } from "../types/confirm-close-slice-types";

const initialState: ConfirmDialogType = {
  confirmDialogIsOpened: false
};


const confirmCloseSlice = createSlice({
  name: 'confirmCloseDialog',
  initialState,
  reducers: {
    setOpenedConfirmDialog(state, action: PayloadAction<boolean>) {
      state.confirmDialogIsOpened = action.payload;
    },
  },
});

export default confirmCloseSlice.reducer;
export const confirmCloseDialogSelector = (state: RootState) => state.confirmClose;
export const { setOpenedConfirmDialog } = confirmCloseSlice.actions;