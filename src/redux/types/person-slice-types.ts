import { FetchingStatus } from "../../@types/fetchingStatus";
import { PersonEntityDataType } from "../../@types/personTypes";

export type PersonEntityType = {
  data: PersonEntityDataType;
  fetchStatus: FetchingStatus;
};
