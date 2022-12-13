import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import AppLink from '../Link';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="http://localhost:3000/">Trade Unions</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={false} md={7}>
          <CCarousel controls indicators transition="crossfade" interval={2000}>
            <CCarouselItem key="item1">
              <CImage className="d-block w-100" src="/img/cover1.png" alt="slide 1" key="slide1" />
            </CCarouselItem>
            <CCarouselItem key="item2">
              <CImage className="d-block w-100" src="/img/cover2.png" alt="slide 2" key="slide2" />
            </CCarouselItem>
            <CCarouselItem key="item3">
              <CImage className="d-block w-100" src="/img/cover3.png" alt="slide 3" key="slide3" />
            </CCarouselItem>
          </CCarousel>
        </Grid>
        <Grid item xs={12} sm={false} md={5} component={Paper} elevation={6} square>
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Имя пользователя"
                  name="userName"
                  autoComplete="user-name"
                  autoFocus
                />
              </Grid>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Запомнить меня"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Войти
              </Button>
              <Grid container>
                <Grid item xs>
                  <AppLink to="#" color="inherit" fontSize="14px" text="Забыли пароль?"></AppLink>
                </Grid>
                <Grid item>
                  <AppLink
                    to="/register"
                    color="inherit"
                    fontSize="14px"
                    text="У вас еще нет аккаунта? Зарегестрируйтесь!"
                  />
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
