import { CssBaseline } from '@mui/material';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const BottomNotificationBar = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, height: 20 }}>
        <Toolbar>{/** A place for user custom components oh the bottom toolbar */}</Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default BottomNotificationBar;
