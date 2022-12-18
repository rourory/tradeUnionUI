import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { NotificatorContentType, NotificatorType } from '../types/notificator-slice-types';

const initialState: NotificatorType = {
  notificatorIsOpened: false,
  content: {
    dialogTitle: '',
    dialogContentText: '',
  },
};

const notificatorSlice = createSlice({
  name: 'errorNotificator',
  initialState,
  reducers: {
    setNotificatorOpenedState(state, action: PayloadAction<boolean>) {
      state.notificatorIsOpened = action.payload;
    },
    setDialogContent(state, action: PayloadAction<NotificatorContentType>) {
      state.content.dialogContentText = action.payload.dialogContentText;
      state.content.dialogTitle = action.payload.dialogTitle;
    },
  },
});

export default notificatorSlice.reducer;
export const notificatorSelector = (state: RootState) => state.notificator;
export const notificatorContentSelector = (state: RootState) => state.notificator.content;
export const { setNotificatorOpenedState, setDialogContent } = notificatorSlice.actions;
