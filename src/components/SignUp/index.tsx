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
import { UserData, UserRegistrationData } from '../../redux/types/user-slice-types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  signUpFormFieldSelector,
  signUpFormErrorsSelector,
  setFieldByName,
  validateFieldByName,
  setFetchingStatus,
  signUpFormSelector,
} from '../../redux/slices/localStates/signUp-slice';
import { formatNameToRightTemplate } from '../../redux/utils/stringOperations';
import { SignUpFormFields } from '../../redux/types/localStatesTypes/signUp-form-slice-types';
import { Violations } from '../../@types/globalTypes';
import { signIn } from '../../redux/slices/user-slice';
import { signUp } from '../../redux/utils/queries';
import { LoadingButton } from '@mui/lab';
import { FetchingStatus } from '../../@types/fetchingStatus';

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
  const { lastName, firstName, username, password } = useSelector(signUpFormFieldSelector);
  const { firstNameError, lastNameError, usernameError, passwordError } =
    useSelector(signUpFormErrorsSelector);
  const { fetchStatus } = useSelector(signUpFormSelector);

  const handleChange = (changedField: string, changedValue: any, format = false) => {
    return dispatch(
      setFieldByName({
        fieldName: changedField as keyof SignUpFormFields,
        value: format ? formatNameToRightTemplate(changedValue) : changedValue,
      }),
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    dispatch(setFetchingStatus(FetchingStatus.LOADING));
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData: UserRegistrationData = {
      username: data.get('username')?.toString() || '',
      password: data.get('password')?.toString() || '',
      firstName: data.get('firstName')?.toString() || '',
      lastName: data.get('lastName')?.toString() || '',
    };
    await signUp(userData)
      .then((res) => {
        if (res.status === 200) {
          const returnedUserData = res.data as UserData;
          dispatch(setFetchingStatus(FetchingStatus.SUCCESS));
          dispatch(signIn({ username: returnedUserData.username, password: userData.password }));
        } else {
          dispatch(setFetchingStatus(FetchingStatus.ERROR));
          console.log('ERROR', res.data as Violations);
        }
      })
      .catch((err) => {
        dispatch(setFetchingStatus(FetchingStatus.ERROR));
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
                  error={firstNameError && firstName !== ''}
                  helperText={firstNameError && firstName !== '' && 'Исправьте значение'}
                  value={firstName}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstname"
                  label="Имя"
                  autoFocus
                  onBlur={(event) => {
                    firstName !== '' &&
                      firstName &&
                      handleChange(event.target.name, event.target.value, true) &&
                      dispatch(
                        validateFieldByName({
                          fieldName: event.target.name as keyof SignUpFormFields,
                          value: event.target.value,
                        }),
                      );
                  }}
                  onChange={(event) => handleChange(event.target.name, event.target.value, true)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={lastNameError && lastName !== ''}
                  helperText={lastNameError && 'Исправьте значение'}
                  value={lastName}
                  required
                  fullWidth
                  id="lastname"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="family-name"
                  onBlur={(event) => {
                    lastName !== '' &&
                      lastName &&
                      handleChange(event.target.name, event.target.value, true) &&
                      dispatch(
                        validateFieldByName({
                          fieldName: event.target.name as keyof SignUpFormFields,
                          value: event.target.value,
                        }),
                      );
                  }}
                  onChange={(event) => handleChange(event.target.name, event.target.value, true)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={usernameError}
                  helperText={usernameError && 'От 4 до 20 букв латинского алфавита и цифр'}
                  value={username}
                  required
                  fullWidth
                  id="username"
                  label="Имя пользователя"
                  name="username"
                  autoComplete="user-name"
                  onBlur={(event) =>
                    username !== '' &&
                    username &&
                    dispatch(
                      validateFieldByName({
                        fieldName: event.target.name as keyof SignUpFormFields,
                        value: event.target.value,
                      }),
                    )
                  }
                  onChange={(event) => handleChange(event.target.name, event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError}
                  helperText={passwordError && 'От 4 до 30 букв латинского алфавита и цифр'}
                  value={password}
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onBlur={(event) =>
                    password !== '' &&
                    password &&
                    dispatch(
                      validateFieldByName({
                        fieldName: event.target.name as keyof SignUpFormFields,
                        value: event.target.value,
                      }),
                    )
                  }
                  onChange={(event) => handleChange(event.target.name, event.target.value)}
                />
              </Grid>
            </Grid>
            <LoadingButton
              loading={fetchStatus === FetchingStatus.LOADING}
              color={fetchStatus === FetchingStatus.ERROR ? 'error' : 'info'}
              type="submit"
              disabled={
                firstNameError ||
                lastNameError ||
                usernameError ||
                passwordError ||
                firstName === '' ||
                lastName === '' ||
                username === '' ||
                password === ''
              }
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Отправить
            </LoadingButton>
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
