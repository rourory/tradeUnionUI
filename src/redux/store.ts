import { configureStore } from '@reduxjs/toolkit';
import personDetails from './slices/personDetailsSlice';
export const store = configureStore({
  reducer: {
    personDetails,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
