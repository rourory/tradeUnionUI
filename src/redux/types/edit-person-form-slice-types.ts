import { FetchingStatus } from '../../@types/fetchingStatus';
import { PersonEntityDataType } from '../../@types/personTypes';

export type EditPersonFormType = {
  opened: boolean;
  data: PersonEntityDataType;
  changedData: PersonEntityDataType;
  editPersonDataDiffers: boolean;
  unvalidFields: Array<UnvalidFieldType>;
  fetchStatus: FetchingStatus;
};

export type UpdatePersonFormTypeDataField = {
  fieldName: keyof PersonEntityDataType;
  value: any;
};

export type UnvalidFieldType = {
  fieldName: keyof PersonEntityDataType;
  message: string;
  value: any;
};
