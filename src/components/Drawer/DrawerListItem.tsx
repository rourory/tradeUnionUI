import { ListItem, ListItemButton, ListItemText, SvgIcon } from '@mui/material';
import React from 'react';
import getIconByName from '../Icons/getIcon';
import { NavLink, useMatch, useLocation } from 'react-router-dom';

type DrawerListItemType = {
  text: string;
  iconName: string;
  link: string;
};

const DrawerListItem: React.FC<DrawerListItemType> = ({ text, iconName, link }) => {
  const location = useLocation();

  const getPropsForLink = (isActive: boolean): { color: string; textDecoration: string } => {
    if (text === 'Главная' && location.pathname === '/') {
      return { color: 'inherit', textDecoration: 'none' };
    } else if (text === 'Главная' && location.pathname !== '/') {
      return { color: 'GrayText', textDecoration: 'none' };
    } else {
      return isActive
        ? { color: 'inherit', textDecoration: 'none' }
        : { color: 'GrayText', textDecoration: 'none' };
    }
  };

  return (
    <>
      <NavLink to={link} style={({ isActive }) => getPropsForLink(isActive)}>
        <ListItem disablePadding>
          <ListItemButton>
            <SvgIcon component={getIconByName(iconName)} inheritViewBox />
            <ListItemText primary={text} sx={{ marginLeft: 4 }} />
          </ListItemButton>
        </ListItem>
      </NavLink>
    </>
  );
};

export default DrawerListItem;
