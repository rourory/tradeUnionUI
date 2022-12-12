import { FetchingStatus } from "../../@types/fetchingStatus";
import { PersonEntityDataType } from "../../@types/personTypes";

export type EditPersonFormType = {
  opened: boolean;
  validationError: boolean;
  data: PersonEntityDataType;
  changedData: PersonEntityDataType;
  editPersonDataDiffers: boolean;
  fetchStatus: FetchingStatus;
};


export type UpdateDataField = {
  fieldName: keyof PersonEntityDataType;
  value: any;
}