import { FetchingStatus } from "../../@types/fetchingStatus"

export type UserData = {
  username: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  role: string | undefined,
}

export type UserEntity = {
  token: string,
  data: UserData,
}

export type User = {
  user: UserEntity | undefined,
  fetchStatus: FetchingStatus,
  errorMessage: string,
}

export type Cridentials = {
  username: string,
  password: string,
}