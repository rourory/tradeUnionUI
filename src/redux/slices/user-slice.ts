import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchingStatus } from "../../@types/fetchingStatus";
import { RootState } from "../store";
import { Cridentials, User, UserEntity } from "../types/user-slice-types";
import { signInQuery } from "../utils/queries";
import { setTokenToLocalStorage } from "../utils/redux-utils";

const initialState: User = {
  user: undefined,
  fetchStatus: FetchingStatus.LOADING,
  errorMessage: '',
};


export const signIn = createAsyncThunk<UserEntity, Cridentials>(
  'user/SignIn',
  async ({ username, password }, { rejectWithValue }) => {
    let status = 0;
    let response: any = [];
    await signInQuery<UserEntity>({ username, password }).then((res) => {
      setTokenToLocalStorage(res.data.token || '');
      response = res.data;
      status = res.status;
    }).catch((err) => {
      console.log(err)
    })

    if (status === 0 || status === 203) {
      return rejectWithValue(response as string);
    }
    return response;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserEntity>) {
      state.user = action.payload;
    },
    setFetchStatus(state, action: PayloadAction<FetchingStatus>) {
      state.fetchStatus = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, action) => {
      state.user = undefined;
      state.errorMessage = '';
      state.fetchStatus = FetchingStatus.LOADING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errorMessage = '';
      setTokenToLocalStorage(action.payload.token)
      state.fetchStatus = FetchingStatus.SUCCESS;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.user = undefined;
      state.errorMessage = action.payload as string;
      state.fetchStatus = FetchingStatus.ERROR;
    });
  },
});

export default userSlice.reducer;
export const userSelector = (state: RootState) => state.user;
export const { setUser } = userSlice.actions;