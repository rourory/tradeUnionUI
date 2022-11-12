export enum FetchingStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PObjectKeys {
  [key: string]: any;
}
export interface PersonEntityDataType extends PObjectKeys {
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
  comment: string | undefined;
  address: string | null | undefined;
  birthPlace: string | null | undefined;
  livePlace: string | null | undefined;
  regPlace: string | null | undefined;
}

export const initializePersonEntityData = (): PersonEntityDataType => {
  return {
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
};

export type PersonEntityType = {
  data: PersonEntityDataType;
  fetchStatus: FetchingStatus;
};
