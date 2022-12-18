import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Logo from '../Logo';
import AppLink from '../Link';
import Notificator from '../Notificator';
import OperationResultDialog from '../EditForms/OprerationResult';
import { ErrorWithMessage, Violations } from '../../@types/globalTypes';
import { FetchingStatus } from '../../@types/fetchingStatus';
import { SignUpFormFields } from '../../redux/types/localStatesTypes/signUp-form-slice-types';
import { UserData, UserRegistrationData } from '../../redux/types/user-slice-types';
import { formatNameToRightTemplate } from '../../redux/utils/stringOperations';
import { signUp } from '../../redux/utils/queries';
import { AppDispatch } from '../../redux/store';
import { signIn } from '../../redux/slices/user-slice';
import {
  signUpFormFieldSelector,
  signUpFormErrorsSelector,
  setFieldByName,
  validateFieldByName,
  setFetchingStatus,
  signUpFormSelector,
} from '../../redux/slices/localStates/signUp-slice';
import {
  notificatorContentSelector,
  notificatorSelector,
  setDialogContent,
  setNotificatorOpenedState,
} from '../../redux/slices/notificator-slice';
import {
  setOpenedOperationResultDialog,
  setOperationResultFetchStatus,
  setViolation,
} from '../../redux/slices/operation-result-slice';
import Copyright from './Copyright';

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const { lastName, firstName, username, password } = useSelector(signUpFormFieldSelector);
  const { firstNameError, lastNameError, usernameError, passwordError } =
    useSelector(signUpFormErrorsSelector);
  const { signUpFetchStatus } = useSelector(signUpFormSelector);
  const { notificatorIsOpened: errorNotificatorIsOpened } = useSelector(notificatorSelector);
  const { dialogTitle, dialogContentText } = useSelector(notificatorContentSelector);

  /**
   * Метод слушает изменяемые поля в форме
   * @param changedField - имя изменяемого поля
   * @param changedValue - изменяемое значение
   * @param format - флаг, регулирующий необходимость форматирования значения методом {@method formatNameToRightTemplate}
   * @returns void
   */
  const handleChange = (changedField: string, changedValue: any, format = false) => {
    return dispatch(
      setFieldByName({
        fieldName: changedField as keyof SignUpFormFields,
        value: format ? formatNameToRightTemplate(changedValue) : changedValue,
      }),
    );
  };

  /**
   * Метод занимается обратокой события React.FocusEvent генерируемого тестовыми полями в методе onBlur
   * @param event - событие React.FocusEvent
   * @param value - значение поля для обработки
   * @param needToChange - флаг, определяющий необходимость обработки форматируемого значения. Если значение не нужно форматировать методом {@method formatNameToRightTemplate}, необходимо передать в метод false соответствующим параметром.
   */
  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    value: string,
    needToChange = true,
  ) => {
    if (needToChange) handleChange(event.target.name, event.target.value, true);
    dispatch(
      validateFieldByName({
        fieldName: event.target.name as keyof SignUpFormFields,
        value: needToChange ? formatNameToRightTemplate(value) : value,
      }),
    );
  };

  /**
   * Метод занимается сокрытием компонента ErrorNotification
   */
  const handleErrorNotificatorClose = () => {
    dispatch(setNotificatorOpenedState(false));
  };

  /**
   * Метод занимается обработкой ошибок (кроме ошибок валидации на сервере) при отправке формы для регистрации.
   * Вызывает отображение компонента ErrorNoificator и его содержимым.
   * @param error строка или объект с информацией об ошибке
   */
  const unknownError = (error: any) => {
    dispatch(setFetchingStatus(FetchingStatus.ERROR));
    dispatch(
      setDialogContent({
        dialogTitle: 'Ошибка',
        dialogContentText: `Непредвиденная ошибка на сервере (${error})`,
      }),
    );
    dispatch(setNotificatorOpenedState(true));
  };

  /**
   * Метод занимается обработкой ошиьок валидации на сервере при отправке формы регистрации.
   * Вызывает отбражение компоненте OperationResult с его содержимым
   * @param violations объекта типа Viloations содержащии информацию об ошибках валидации на сервере
   */
  const serverValidationError = (violations: Violations) => {
    dispatch(setFetchingStatus(FetchingStatus.ERROR));
    dispatch(setOperationResultFetchStatus(FetchingStatus.VALIDATION_ERROR));
    dispatch(setOpenedOperationResultDialog(true));
    dispatch(setViolation(violations));
  };

  /**
   * Метод занимается обработкой успешного сценария регистрации пользователя.
   * @param username - имя пользователя
   * @param password - пароль пользователя
   */
  const successRegistration = (username: string, password: string) => {
    dispatch(setFetchingStatus(FetchingStatus.SUCCESS));
    dispatch(
      setDialogContent({
        dialogTitle: 'Поздравляем',
        dialogContentText:
          'Вы успешно зарегестрировались на сайте. Вы будуте автоматически перенапрвлены на главную страницу через пару секунд.',
      }),
    );
    dispatch(setNotificatorOpenedState(true));
    setTimeout(() => {
      dispatch(setNotificatorOpenedState(false));
      dispatch(signIn({ username: username, password: password }));
    }, 4000);
  };

  /**
   * Метод занимается отправкой формы для регистрации
   * @param event - событие, вызваемое командой submit. Создержит данные формы
   */
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
          const returnedData = res.data as UserData;
          successRegistration(returnedData.username, userData.password);
        } else if (res.status === 208) {
          //Пользователь с таким именем уже существует
          const { message } = res.data as ErrorWithMessage;
          dispatch(setFetchingStatus(FetchingStatus.ERROR));
          dispatch(setDialogContent({ dialogTitle: 'Ошибка', dialogContentText: message }));
          dispatch(setNotificatorOpenedState(true));
        } else if (res.status === 203) {
          serverValidationError(res.data as Violations);
        } else {
          unknownError('');
        }
      })
      .catch((err) => {
        unknownError(err);
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
                    firstName !== '' && firstName && handleBlur(event, firstName);
                  }}
                  onChange={(event) => handleChange(event.target.name, event.target.value)}
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
                    lastName !== '' && lastName && handleBlur(event, lastName);
                  }}
                  onChange={(event) => handleChange(event.target.name, event.target.value)}
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
                    username !== '' && username && handleBlur(event, username, false)
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
                    password !== '' && password && handleBlur(event, password, false)
                  }
                  onChange={(event) => handleChange(event.target.name, event.target.value)}
                />
              </Grid>
            </Grid>
            <LoadingButton
              loading={signUpFetchStatus === FetchingStatus.LOADING}
              color={signUpFetchStatus === FetchingStatus.ERROR ? 'error' : 'info'}
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
        <Copyright />
      </Container>
      <Notificator
        opened={errorNotificatorIsOpened}
        dialogTitle={dialogTitle}
        dialogContentText={dialogContentText}
        handleClose={handleErrorNotificatorClose}
      />
      <OperationResultDialog
        successText="Пользователь успешно зарегестрирован"
        errorText="Ошибки валидации на сервере"
        onSuccess={() => {}}
      />
    </ThemeProvider>
  );
}
