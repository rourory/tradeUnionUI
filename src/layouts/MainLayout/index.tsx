import React from 'react';
import { Outlet } from 'react-router-dom';
import Toolbar from '../../components/Toolbar';
import SwipeableTemporaryDrawer from '../../components/Drawer';
import BottomNotificationBar from '../../components/BottomNotificationBar';

const MainLayout: React.FC = () => {
  return (
    <>
      <Toolbar />
      <SwipeableTemporaryDrawer />
      <Outlet />
      <BottomNotificationBar />
    </>
  );
};

export default MainLayout;
