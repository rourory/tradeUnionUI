import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchingStatus } from "../../@types/fetchingStatus";
import { initializePersonEntityData, PersonEntityDataType } from "../../@types/personTypes";
import { RootState } from "../store";
import { EditPersonFormType, UpdateDataField } from "../types/edit-person-form-slice-types";
import { fetchByIdQuery } from "../utils/queries";
import { setTokenToLocalStorage } from "../utils/redux-utils";

const initialState: EditPersonFormType = {
  opened: false,
  validationError: false,
  data: initializePersonEntityData(),
  changedData: initializePersonEntityData(),
  editPersonDataDiffers: false,
  fetchStatus: FetchingStatus.LOADING,
};


export const fetchByIdData = createAsyncThunk<PersonEntityDataType, number>(
  'editPersonForm/fetchByIdData',
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

const areDataObjectsEqual = (data: PersonEntityDataType, changedData: PersonEntityDataType) => {
  for (const key in data) {
    if (data[key as keyof PersonEntityDataType] !== changedData[key as keyof PersonEntityDataType]) {
      return false;
    }
  }
  return true;
}

const editPersonFormSlice = createSlice({
  name: 'editPersonForm',
  initialState,
  reducers: {
    setOpened(state, action: PayloadAction<boolean>) {
      state.opened = action.payload;
    },
    setEditPersonDataDiffers(state, action: PayloadAction<boolean>) {
      state.editPersonDataDiffers = action.payload;
    },
    setPersonEditFormFetchStatus(state, action: PayloadAction<FetchingStatus>) {
      state.fetchStatus = action.payload;
    },
    setData(state, action: PayloadAction<UpdateDataField>) {
      state.editPersonDataDiffers = false
      for (const key in state.data) {
        if (key === action.payload.fieldName) {
          state.data[key as keyof PersonEntityDataType] = action.payload.value
        }
      }
      state.editPersonDataDiffers = !areDataObjectsEqual(state.data, state.changedData);
    },
    setDataEqualsChangedData(state, action: PayloadAction<PersonEntityDataType>) {
      state.data = action.payload
      state.changedData = action.payload
      state.editPersonDataDiffers = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchByIdData.pending, (state, action) => {
      state.data = initializePersonEntityData();
      state.changedData = initializePersonEntityData();
      state.fetchStatus = FetchingStatus.LOADING;
    });
    builder.addCase(fetchByIdData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.changedData = action.payload;
      state.fetchStatus = FetchingStatus.SUCCESS;
    });
    builder.addCase(fetchByIdData.rejected, (state, action) => {
      state.data = initializePersonEntityData();
      state.changedData = initializePersonEntityData();
      state.fetchStatus = FetchingStatus.ERROR;
    });
  },
});

export default editPersonFormSlice.reducer;
export const editPersonFormSelector = (state: RootState) => state.editPersonForm;
export const {
  setData,
  setEditPersonDataDiffers,
  setPersonEditFormFetchStatus,
  setOpened,
  setDataEqualsChangedData,
} = editPersonFormSlice.actions;