import { FetchingStatus } from '../../../@types/fetchingStatus';

export interface SignUpFormType {
  fetchStatus: FetchingStatus;
  fields: SignUpFormFields;
  errors: SignUpFormErrors;
}

export interface SignUpFormFields {
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  password: string | undefined;
}

export interface SignUpFormErrors {
  firstNameError: boolean | undefined;
  lastNameError: boolean | undefined;
  usernameError: boolean | undefined;
  passwordError: boolean | undefined;
}

export type SignUpFormFieldSetterType = {
  fieldName: keyof SignUpFormFields;
  value: any;
};

export type SignUpFormErrorsSetterType = {
  fieldName: keyof SignUpFormErrors;
  value: any;
};
