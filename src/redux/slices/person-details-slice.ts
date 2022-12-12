import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  PersonEntityType,
} from '../types/person-slice-types';
import { FetchingStatus } from '../../@types/fetchingStatus';
import { fetchByIdQuery } from '../utils/queries';
import { setTokenToLocalStorage } from '../utils/redux-utils';
import { initializePersonEntityData, PersonEntityDataType } from '../../@types/personTypes';

const initialState: PersonEntityType = {
  data: initializePersonEntityData(),
  fetchStatus: FetchingStatus.LOADING,
};

export const fetchByIdData = createAsyncThunk<PersonEntityDataType, number>(
  'personDetails/fetchByIdData',
  async (id: number, { rejectWithValue }) => {
    let status = 0;
    let response: PersonEntityDataType = initializePersonEntityData();
    await fetchByIdQuery<PersonEntityDataType>(`people`, id)
      .then((res) => {
        setTokenToLocalStorage(res.headers.authorization || '');
        response = res.data;
        status = res.status;
      })
      .catch((err) => {
        console.log(err);
      });
    if (status === 0 || (status < 200 && status >= 300)) {
      return rejectWithValue(response);
    }
    return response;
  },
);

const peopleDetailsSlice = createSlice({
  name: 'personDetails',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<PersonEntityType>) {
      state.data = action.payload.data;
    },
    setFetchStatus(state, action: PayloadAction<FetchingStatus>) {
      state.fetchStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchByIdData.pending, (state, action) => {
      state.data = initializePersonEntityData();
      state.fetchStatus = FetchingStatus.LOADING;
    });
    builder.addCase(fetchByIdData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.fetchStatus = FetchingStatus.SUCCESS;
    });
    builder.addCase(fetchByIdData.rejected, (state, action) => {
      state.data = initializePersonEntityData();
      state.fetchStatus = FetchingStatus.ERROR;
    });
  },
});

export default peopleDetailsSlice.reducer;
export const personDetailsSelector = (state: RootState) => state.personDetails;
export const { setData, setFetchStatus } = peopleDetailsSlice.actions;
