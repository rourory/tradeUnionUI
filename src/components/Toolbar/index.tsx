import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HideOnScroll from './hideOnScroll';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setOpened } from '../../redux/slices/drawer-slice';
import { Divider } from '@mui/material';
import { setUser, userSelector } from '../../redux/slices/user-slice';
import AppLink from '../Link';

// const pages = ['Главная'];
const settings = ['Профиль', 'Избранное', 'Заметки'];

const ResponsiveAppBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(userSelector);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(setOpened(true));
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    dispatch(setUser(undefined));
    localStorage.removeItem('trade_union_auth_token');
    localStorage.removeItem('trade_union_auth_token_created');
  };

  return (
    <HideOnScroll>
      <AppBar position="sticky" sx={{ height: 68 }}>
        <Container maxWidth="xl" fixed sx={{ marginLeft: 1, maxWidth: '95% !important' }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/** Кнопка для Drawer */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>

            {/** Заголовок в широком формате (display xs:none)*/}
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                marginLeft: 1,
                display: { xs: 'flex', md: 'flex' },
                fontFamily: 'roboto',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              TRADE UNIONS
            </Typography>

            {/** Кнопки навигации */}
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 2 }}>
              {pages.map((page) => (
                <Button key={page} sx={{ my: 2, color: 'white', display: 'block' }}>
                  <AppLink
                    to="/"
                    key={page}
                    text={page}
                    color={'inherit'}
                    fontSize="12px"></AppLink>
                </Button>
              ))}
            </Box> */}

            {/** Кнопка профиля пользователя */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Открыть настройки">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.lastName || 'USERNAME'} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem key={'exit'} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => logout()}>
                    Выйти
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};
export default ResponsiveAppBar;
