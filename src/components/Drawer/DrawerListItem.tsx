import { ListItem, ListItemButton, ListItemText, SvgIcon } from '@mui/material';
import React from 'react';
import getIconByName from '../Icons/getIcon';
import { Link } from 'react-router-dom';

type DrawerListItemType = {
  text: string;
  iconName: string;
  link: string;
};

const DrawerListItem: React.FC<DrawerListItemType> = ({ text, iconName, link }) => {
  return (
    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItem disablePadding>
        <ListItemButton>
          <SvgIcon component={getIconByName(iconName)} inheritViewBox />
          <ListItemText primary={text} sx={{ marginLeft: 4 }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default DrawerListItem;
