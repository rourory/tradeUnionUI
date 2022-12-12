import { Entity } from "./globalTypes";

export type PersonDetailsAddressType = {
  data: {
    address: string | undefined;
    birthPlace: string | undefined;
    livePlace: string | undefined;
    regPlace: string | undefined;
  };
};

export type PersonDetailsMainType = {
  data: {
    education: string | undefined;
    phone: string | undefined;
    maritalState: number | undefined;
    citizenship: string | undefined;
    nationality: string | undefined;
  };
};

export type PersonDetailsCommentType = {
  data: {
    comment: string | undefined;
  };
};

export type PersonEntityDetails = {
  mainData: {
    id: number | undefined;
    lastName: string | undefined;
    firstName: string | undefined;
    middleName: string | undefined;
    birthDate: string | undefined;
    education: string | undefined;
    phone: string | undefined;
    maritalState: string | undefined;
    citizenship: string | undefined;
    nationality: string | undefined;
    comment: string | undefined;
    address: string | undefined;
    birthPlace: string | undefined;
    livePlace: string | undefined;
    regPlace: string | undefined;
  };
};

export interface PersonEntityDataType extends Entity {
  lastName: string | undefined;
  firstName: string | undefined;
  middleName: string | undefined;
  birthDate: string | undefined;
  education: string | undefined;
  phone: string | undefined;
  maritalState: number | undefined;
  citizenship: string | undefined;
  nationality: string | undefined;
  comment: string | undefined;
  address: string | undefined;
  birthPlace: string | undefined;
  livePlace: string | undefined;
  regPlace: string | undefined;
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
    maritalState: undefined,
    citizenship: '',
    nationality: '',
    comment: '',
  };
};