import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  FetchingStatus,
  PersonEntityDataType,
  PersonEntityType,
} from '../types/person-slice-types';
import { fetchByIdQuery } from '../utils/queries';
import { setTokenToLocalStorage } from '../utils/redux-utils';

// const defaultValues ={}

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
  'personDetails/fetchByIdData',
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

const peopleDetailsSlice = createSlice({
  name: 'personDetails',
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

export default peopleDetailsSlice.reducer;
export const personDetailsSelector = (state: RootState) => state.personDetails;
export const { setData } = peopleDetailsSlice.actions;
