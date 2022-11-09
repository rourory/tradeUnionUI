import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  FetchingStatus,
  PersonEntityDataType,
  PersonEntityType,
} from '../types/person-slice-types';
import { fetchByIdQuery } from '../utils/queries';
import { setTokenToLocalStorage } from '../utils/redux-utils';

const initialState: PersonEntityType = {
  data: {
    id: undefined,
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    education: '',
    address: '',
    phone: '',
    birthPlace: '',
    livePlace: '',
    regPlace: '',
    maritalState: '',
    citizenship: '',
    nationality: '',
    comment: '',
  },
  fetchStatus: FetchingStatus.LOADING,
};

export const fetchByIdData = createAsyncThunk<PersonEntityDataType, number>(
  'personEditData/fetchByIdData',
  async (id: number) => {
    let response: PersonEntityDataType = {
      id: undefined,
      lastName: '',
      firstName: '',
      middleName: '',
      birthDate: '',
      education: '',
      address: '',
      phone: '',
      birthPlace: '',
      livePlace: '',
      regPlace: '',
      maritalState: '',
      citizenship: '',
      nationality: '',
      comment: '',
    };
    await fetchByIdQuery(`people`, id)
      .then((res) => {
        setTokenToLocalStorage(res.headers.authorization || '');
        response = res.data;
      })
      .catch((err) => console.log(err));
    return response;
  },
);

const personEditDataSlice = createSlice({
  name: 'personEditData',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<PersonEntityType>) {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchByIdData.pending, (state, action) => {
      state.data = {
        id: undefined,
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
        education: '',
        address: '',
        phone: '',
        birthPlace: '',
        livePlace: '',
        regPlace: '',
        maritalState: '',
        citizenship: '',
        nationality: '',
        comment: '',
      };
      state.fetchStatus = FetchingStatus.LOADING;
    });
    builder.addCase(fetchByIdData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.fetchStatus = FetchingStatus.SUCCESS;
    });
    builder.addCase(fetchByIdData.rejected, (state, action) => {
      state.data = {
        id: undefined,
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
        education: '',
        address: '',
        phone: '',
        birthPlace: '',
        livePlace: '',
        regPlace: '',
        maritalState: '',
        citizenship: '',
        nationality: '',
        comment: '',
      };
      state.fetchStatus = FetchingStatus.ERROR;
    });
  },
});

export default personEditDataSlice.reducer;
export const personEditDataSelector = (state: RootState) => state.personEditingData;
export const { setData } = personEditDataSlice.actions;
