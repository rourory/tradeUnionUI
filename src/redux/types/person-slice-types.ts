export enum FetchingStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type PersonEntityDataType = {
  id: number | undefined;
  lastName: string | undefined;
  firstName: string | undefined;
  middleName: string | undefined;
  birthDate: string | undefined;
  education: string | null | undefined;
  phone: string | null | undefined;
  maritalState: string | undefined;
  citizenship: string | null | undefined;
  nationality: string | null | undefined;
  comment: string | null | undefined;
  address: string | null | undefined;
  birthPlace: string | null | undefined;
  livePlace: string | null | undefined;
  regPlace: string | null | undefined;
};

export type PersonEntityType = {
  data: PersonEntityDataType;
  fetchStatus: FetchingStatus;
};
