import { FetchingStatus } from './../../../@types/fetchingStatus';
import { SignUpFormErrors } from './../../types/localStatesTypes/signUp-form-slice-types';
import { RootState } from '../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SignUpFormType,
  SignUpFormFields,
  SignUpFormFieldSetterType,
} from '../../types/localStatesTypes/signUp-form-slice-types';
import { isFieldValid } from '../../validation/fieldValidator';

const initialState: SignUpFormType = {
  signUpFetchStatus: FetchingStatus.SUCCESS,
  fields: {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  },
  errors: {
    firstNameError: false,
    lastNameError: false,
    usernameError: false,
    passwordError: false,
  },
};

const signUpForm = createSlice({
  name: 'signUpForm',
  initialState,
  reducers: {
    setFieldByName(state, action: PayloadAction<SignUpFormFieldSetterType>) {
      for (const key in state.fields) {
        if (key === action.payload.fieldName) {
          state.fields[key as keyof SignUpFormFields] = action.payload.value;
        }
      }
    },
    validateFieldByName(state, action: PayloadAction<SignUpFormFieldSetterType>) {
      for (const key in state.fields) {
        if (key === action.payload.fieldName) {
          state.errors[(key + 'Error') as keyof SignUpFormErrors] = !isFieldValid(
            key,
            action.payload.value,
          );
        }
      }
    },
    setFetchingStatus(state, action: PayloadAction<FetchingStatus>) {
      state.signUpFetchStatus = action.payload;
    },
  },
});

export default signUpForm.reducer;
export const signUpFormFieldSelector = (state: RootState) => state.signUpForm.fields;
export const signUpFormErrorsSelector = (state: RootState) => state.signUpForm.errors;
export const signUpFormSelector = (state: RootState) => state.signUpForm;
export const { setFieldByName, validateFieldByName, setFetchingStatus } = signUpForm.actions;
