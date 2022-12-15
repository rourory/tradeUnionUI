import { FetchingStatus } from '../../@types/fetchingStatus';

export type UserDataResponce = {
  user: UserData;
  jwt_token: string;
};

export type UserData = {
  username: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type User = {
  user: UserData | undefined;
  fetchStatus: FetchingStatus;
  errorMessage: string;
};

export type Cridentials = {
  username: string;
  password: string;
};

export type UserRegistrationData = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};
