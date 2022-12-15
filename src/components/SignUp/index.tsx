import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import AppLink from '../Link';
import { signUp } from '../../redux/utils/queries';
import { UserData, UserRegistrationData } from '../../redux/types/user-slice-types';
import { setUser } from '../../redux/slices/user-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { Violations } from '../../@types/globalTypes';
import { signIn } from '../../redux/slices/user-slice';

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

export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData: UserRegistrationData = {
      username: data.get('username')?.toString() || '',
      password: data.get('password')?.toString() || '',
      firstName: data.get('firstname')?.toString() || '',
      lastName: data.get('lastname')?.toString() || '',
    };
    await signUp(userData)
      .then((res) => {
        if (res.status === 200) {
          const returnedUserData = res.data as UserData;
          dispatch(signIn({ username: returnedUserData.username, password: userData.password }));
        } else {
          console.log('ERROR', res.data as Violations);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Logo height={170} />
          <Typography component="h1" variant="h4">
            Регистрация
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="Имя"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Фамилия"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Имя пользователя"
                  name="username"
                  autoComplete="user-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Отправить
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <AppLink
                  to="/login"
                  color="blue"
                  fontSize="14px"
                  text="Уже есть аккаунт ? Войдите!"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
