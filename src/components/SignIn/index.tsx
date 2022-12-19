import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../Logo';
import AppLink from '../Link';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import { Cridentials } from '../../redux/types/user-slice-types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  setOpenedNotificationSignUpDialod,
  setPassword,
  setUsername,
  signIn,
  userCridentialsSelector,
  userNotificationSignUpFormContentSelector,
  userNotificationSignUpFormSelector,
  userSelector,
} from '../../redux/slices/user-slice';
import Copyright from '../SignUp/Copyright';
import { LoadingButton } from '@mui/lab';
import Notificator from '../Notificator';
import { FetchingStatus } from '../../@types/fetchingStatus';

const renderCarousel = () => {
  return (
    <CCarousel controls indicators transition="crossfade" interval={5000}>
      <CCarouselItem>
        <CImage className="d-block w-100" src="/img/cover1.png" alt="slide 1" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-100" src="/img/cover2.png" alt="slide 2" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-100" src="/img/cover3.png" alt="slide 3" />
      </CCarouselItem>
    </CCarousel>
  );
};

const theme = createTheme();

export default function SignInSide() {
  const dispatch = useDispatch<AppDispatch>();
  const { notificatorIsOpened } = useSelector(userNotificationSignUpFormSelector);
  const { dialogTitle, dialogContentText } = useSelector(userNotificationSignUpFormContentSelector);
  const { username, password } = useSelector(userCridentialsSelector);
  const { userFetchStatus } = useSelector(userSelector);
  /**
   * Метод занимается сокрытием компонента ErrorNotification
   */
  const handleErrorNotificatorClose = () => {
    dispatch(setOpenedNotificationSignUpDialod(false));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cridentials: Cridentials = {
      username: data.get('username')?.toString() || '',
      password: data.get('password')?.toString() || '',
    };
    await dispatch(signIn(cridentials));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t: any) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          {renderCarousel()}
        </Grid>
        <Grid item xs={12} sm={false} md={5} right="0" component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Logo height={130} />
            <Typography component="h1" variant="h4">
              Авторизация
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '75%', mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  value={username}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Имя пользователя"
                  name="username"
                  autoComplete="user-name"
                  autoFocus
                  onChange={(event) => dispatch(setUsername(event.target.value))}
                />
              </Grid>
              <TextField
                value={password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => dispatch(setPassword(event.target.value))}
              />
              <LoadingButton
                loading={userFetchStatus === FetchingStatus.LOADING}
                color={userFetchStatus === FetchingStatus.ERROR ? 'error' : 'info'}
                disabled={username === '' || password === ''}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Войти
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <AppLink to="#" color="blue" fontSize="14px" text="Забыли пароль?"></AppLink>
                </Grid>
                <Grid item>
                  <AppLink
                    to="/register"
                    color="blue"
                    fontSize="14px"
                    text="У вас еще нет аккаунта ? Зарегестрируйтесь!"
                  />
                </Grid>
              </Grid>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Notificator
        opened={notificatorIsOpened}
        dialogTitle={dialogTitle}
        dialogContentText={dialogContentText}
        handleClose={handleErrorNotificatorClose}
      />
    </ThemeProvider>
  );
}
