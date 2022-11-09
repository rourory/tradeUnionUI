import axios from 'axios';
import { getTokenFromLocalStorage } from './redux-utils';
import { LOCAL_HOST } from '../../host';
import { PersonEntityDataType } from '../types/person-slice-types';
export const fetchQuery = async (table: string) => {
  let token: string = '';
  await getTokenFromLocalStorage()
    .then((res) => (token = res))
    .catch((err) => console.log(err));
  return axios.get<PersonEntityDataType>(LOCAL_HOST + table, {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export const fetchByIdQuery = async (table: string, id: number) => {
  let token: string = '';
  await getTokenFromLocalStorage()
    .then((res) => (token = res))
    .catch((err) => console.log(err));
  return axios.get<PersonEntityDataType>(LOCAL_HOST + table + '/' + id, {
    headers: { Authorization: 'Bearer ' + token },
  });
};
