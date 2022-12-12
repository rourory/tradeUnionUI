import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DrawerState, DrawerSimpleItem } from '../types/drawer-slice-types';

const initialState: DrawerState = {
  opened: false,
  items: {
    mainItems: [
      { text: 'Главная', icon: 'home', link: '/' },
      { text: 'Профсоюзы', icon: 'corporate', link: '/unions' },
      { text: 'Члены профсоюзов', icon: 'people', link: '/people' },
    ],
    additionalItems: [

      { text: 'О нас', icon: 'about', link: '/about' },
    ],
  }
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setOpened(state, action: PayloadAction<boolean>) {
      state.opened = action.payload;
    },
    setMainItems(state, action: PayloadAction<DrawerSimpleItem[]>) {
      state.items.mainItems = action.payload;
    },
    setAdditonalItems(state, action: PayloadAction<DrawerSimpleItem[]>) {
      state.items.additionalItems = action.payload;
    },
  },
});

export default drawerSlice.reducer;
export const drawerSelector = (state: RootState) => state.drawer;
export const { setOpened, setMainItems, setAdditonalItems } = drawerSlice.actions;