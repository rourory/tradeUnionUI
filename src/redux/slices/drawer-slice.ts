import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DrawerState, DrawerSimpleItem } from '../types/drawer-slice-types';

/**
 * Свойство icon содержит назване иконки, используемое компонентом DrawerListItem.
 * Иконки являются React компонентами, возвращающие svg иконку. Данные элементы располагаются в пути src/components/Icons
 */
const initialState: DrawerState = {
  opened: false,
  items: {
    adminItems: [{ text: 'Пользователи', icon: 'user', link: 'users' }],
    mainItems: [
      { text: 'Главная', icon: 'home', link: '/' },
      { text: 'Профсоюзы', icon: 'corporate', link: '/unions' },
      { text: 'Члены профсоюзов', icon: 'people', link: '/people' },
    ],
    additionalItems: [{ text: 'О нас', icon: 'about', link: '/about' }],
  },
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
    setAdminItems(state, action: PayloadAction<DrawerSimpleItem[]>) {
      state.items.adminItems = action.payload;
    },
  },
});

export default drawerSlice.reducer;
export const drawerSelector = (state: RootState) => state.drawer;
export const { setOpened, setMainItems, setAdditonalItems, setAdminItems } = drawerSlice.actions;
