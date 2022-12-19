import { UserData, UserDataResponce } from './../types/user-slice-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../@types/fetchingStatus';
import { RootState } from '../store';
import { Cridentials, User } from '../types/user-slice-types';
import { signInQuery } from '../utils/queries';
import { setTokenToLocalStorage } from '../utils/redux-utils';
import { ErrorWithMessage } from '../../@types/globalTypes';
import { NotificatorContentType } from '../types/notificator-slice-types';

const initialState: User = {
  user: undefined,
  userFetchStatus: FetchingStatus.SUCCESS,
  cridentials: {
    username: '',
    password: '',
  },
  notificator: {
    notificatorIsOpened: false,
    content: {
      dialogTitle: '',
      dialogContentText: '',
    },
  },
};

export const signIn = createAsyncThunk<UserDataResponce, Cridentials>(
  'user/signIn',
  async (cridentials: Cridentials, thunkApi) => {
    let status = 0;
    let response: any = undefined;
    await signInQuery(cridentials)
      .then((res) => {
        status = res.status;
        if (status !== 200) {
          response = res.data as ErrorWithMessage;
        } else {
          const { jwt_token } = res.data as UserDataResponce;
          setTokenToLocalStorage(jwt_token);
          response = res.data;
        }
      })
      .catch(async (err) => {
        response = { message: 'Неизвестная ошибка' };
      });
    if (status !== 200) {
      return thunkApi.rejectWithValue(response);
    } else {
      return response;
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData | undefined>) {
      state.user = action.payload;
    },
    setFetchStatus(state, action: PayloadAction<FetchingStatus>) {
      state.userFetchStatus = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.cridentials.username = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.cridentials.password = action.payload;
    },
    setOpenedNotificationSignUpDialod(state, action: PayloadAction<boolean>) {
      state.notificator.notificatorIsOpened = action.payload;
    },
    setNotificationContent(state, action: PayloadAction<NotificatorContentType>) {
      state.notificator.content = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, action) => {
      state.user = undefined;
      state.userFetchStatus = FetchingStatus.LOADING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.userFetchStatus = FetchingStatus.SUCCESS;
      state.user = action.payload.user;
      state.cridentials = { username: '', password: '' };
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.user = undefined;
      const { message } = action.payload as ErrorWithMessage;
      state.userFetchStatus = FetchingStatus.ERROR;
      state.notificator.content = { dialogTitle: 'Ошибка', dialogContentText: message };
      state.notificator.notificatorIsOpened = true;
    });
  },
});

export default userSlice.reducer;
export const userSelector = (state: RootState) => state.user;
export const userCridentialsSelector = (state: RootState) => state.user.cridentials;
export const userNotificationSignUpFormSelector = (state: RootState) => state.user.notificator;
export const userNotificationSignUpFormContentSelector = (state: RootState) =>
  state.user.notificator.content;
export const {
  setUser,
  setUsername,
  setPassword,
  setOpenedNotificationSignUpDialod,
  setNotificationContent,
} = userSlice.actions;
