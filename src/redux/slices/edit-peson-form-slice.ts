import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../@types/fetchingStatus';
import { initializePersonEntityData, PersonEntityDataType } from '../../@types/personTypes';
import { RootState } from '../store';
import {
  EditPersonFormType,
  UnvalidFieldType,
  UpdatePersonFormTypeDataField,
} from '../types/edit-person-form-slice-types';
import { fetchByIdQuery } from '../utils/queries';
import { setTokenToLocalStorage } from '../utils/redux-utils';

const initialState: EditPersonFormType = {
  opened: false,
  data: initializePersonEntityData(),
  changedData: initializePersonEntityData(),
  editPersonDataDiffers: false,
  unvalidFields: [],
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
      .catch((err) => {});
    if (status === 0 || (status < 200 && status >= 300)) {
      return rejectWithValue(response);
    }
    return response;
  },
);

const isDataObjectsEqual = (data: PersonEntityDataType, changedData: PersonEntityDataType) => {
  for (const key in data) {
    if (
      data[key as keyof PersonEntityDataType] !== changedData[key as keyof PersonEntityDataType]
    ) {
      return false;
    }
  }
  return true;
};

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
    setData(state, action: PayloadAction<UpdatePersonFormTypeDataField>) {
      state.editPersonDataDiffers = false;
      for (const key in state.data) {
        if (key === action.payload.fieldName) {
          state.data[key as keyof PersonEntityDataType] = action.payload.value;
        }
      }
      state.editPersonDataDiffers = !isDataObjectsEqual(state.data, state.changedData);
    },
    setDataEqualsChangedData(state, action: PayloadAction<PersonEntityDataType>) {
      state.data = action.payload;
      state.changedData = action.payload;
      state.editPersonDataDiffers = false;
    },
    addBorkenRuleByFieldName(state, action: PayloadAction<UnvalidFieldType>) {
      let replaced = false;
      for (const key in state.changedData) {
        if (key === action.payload.fieldName) {
          // 1) Если в массиве нарушенных правил уже есть нарушенные правила
          if (state.unvalidFields.length > 0) {
            //Тогда перебираем все нарушенные поля на случай, если такое поле уже есть в массиве
            state.unvalidFields.map((field, index) => {
              // 2) Если такое поле уже есть, то заменяем его значение на более приоритеное
              if (field.fieldName === action.payload.fieldName) {
                const { message, value } = state.unvalidFields[index];
                /**
                 * Смена объекта в массиве под выбранным индексом будет означать изменение самого массива,
                 * что будет вызвать бесконечный рендер компонента, использующего данное состояние, поэтому
                 * неоходимо проверить, не имеет ли уже существующий объект такие же свойства
                 */
                if (message !== action.payload.message || value !== action.payload.value) {
                  state.unvalidFields[index] = action.payload;
                  replaced = true;
                } else {
                  replaced = true;
                }
              }
            });

            // 2) Если такого поля нет, добавляем в конец массива
            if (!replaced) {
              state.unvalidFields = [...state.unvalidFields, action.payload];
            }

            //1) Если массиве нарушенных парвил пуст
          } else {
            state.unvalidFields = [action.payload];
          }
        }
      }
    },
    removeBrokenRuleByFieldName(state, action: PayloadAction<UnvalidFieldType>) {
      for (const key in state.changedData) {
        if (key === action.payload.fieldName) {
          state.unvalidFields.map((value, index) => {
            if (value.fieldName === action.payload.fieldName) {
              state.unvalidFields = [
                ...state.unvalidFields.slice(0, index),
                ...state.unvalidFields.slice(index + 1, state.unvalidFields.length),
              ];
            }
          });
        }
      }
    },
    removeAllBrokenRules(state) {
      state.unvalidFields = [];
    },
    //Этот метод можно вызывать только при сабмите (активное состояние кнопки есть гарантия отсутствия ошибок)
    checkEmptyFields(state, action: PayloadAction<Array<keyof PersonEntityDataType>>) {
      for (const key of action.payload) {
        if (
          state.data[key as keyof PersonEntityDataType] === '' ||
          state.data[key as keyof PersonEntityDataType] === null ||
          state.data[key as keyof PersonEntityDataType] === 0
        ) {
          state.unvalidFields = [
            ...state.unvalidFields,
            { fieldName: key as keyof PersonEntityDataType, message: 'Заполните поле', value: '' },
          ];
        }
      }
    },
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
  addBorkenRuleByFieldName,
  removeBrokenRuleByFieldName,
  removeAllBrokenRules,
  checkEmptyFields,
} = editPersonFormSlice.actions;
