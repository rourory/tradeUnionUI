import { configureStore } from '@reduxjs/toolkit';
import personDetails from './slices/personDetailsSlice';
import personEditingData from './slices/personEditDataSlice';
export const store = configureStore({
  reducer: {
    personDetails,
    personEditingData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
