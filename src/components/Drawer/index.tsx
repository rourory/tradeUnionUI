import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import DrawerListItem from './DrawerListItem';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { drawerSelector, setOpened } from '../../redux/slices/drawer-slice';
import { userSelector } from '../../redux/slices/user-slice';

const SwipeableTemporaryDrawer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { opened, items } = useSelector(drawerSelector);
  const { user } = useSelector(userSelector);
  const { mainItems, additionalItems, adminItems } = items;

  const toggleDrawer = (
    event: React.KeyboardEvent | React.MouseEvent | React.SyntheticEvent<{}, Event>,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch(setOpened(!opened));
  };

  const renderItemList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={(event) => toggleDrawer(event)}
      onKeyDown={(event) => toggleDrawer(event)}>
      {/**Список для администратора */}
      {user?.role === 'ROLE_ADMIN' && (
        <>
          <List>
            {adminItems.map((element) => (
              <DrawerListItem
                key={element.text}
                text={element.text}
                iconName={element.icon}
                link={element.link}
              />
            ))}
          </List>
          <Divider />
        </>
      )}

      {/** Главный список */}
      <List>
        {mainItems.map((element) => (
          <DrawerListItem
            key={element.text}
            text={element.text}
            iconName={element.icon}
            link={element.link}
          />
        ))}
      </List>

      {/** Разделитель */}
      <Divider />

      {/** Второстепенный список */}
      <List>
        {additionalItems.map((element) => (
          <DrawerListItem
            key={element.text}
            text={element.text}
            iconName={element.icon}
            link={element.link}
          />
        ))}
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={opened}
      onClose={(event) => toggleDrawer(event)}
      onOpen={(event) => toggleDrawer(event)}>
      {renderItemList()}
    </SwipeableDrawer>
  );
};

export default SwipeableTemporaryDrawer;
