import { RootState } from '../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  rendered: false,
};

const mainContentRender = createSlice({
  name: 'mainContentRender',
  initialState,
  reducers: {
    setRendered(state, action: PayloadAction<boolean>) {
      state.rendered = action.payload;
    },
  },
});

export default mainContentRender.reducer;
export const mainContentRenderSelector = (state: RootState) => state.mainContentRender;
export const { setRendered } = mainContentRender.actions;
