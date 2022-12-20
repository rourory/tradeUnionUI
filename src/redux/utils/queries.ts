import { UserData, UserRegistrationData, UserDataResponce } from './../types/user-slice-types';
import axios from 'axios';
import { getTokenFromLocalStorage } from './redux-utils';
import { LOCAL_HOST } from '../../constants';
import { Entity, ErrorWithMessage, Violations } from '../../@types/globalTypes';
import { Cridentials } from '../types/user-slice-types';

/**
 * Запрос списка сущностей в БД по следующему шаблону
 * http://hostname:8080/{table}/{id}/{subtable}
 * @param table - основная сущность
 * @param id - ключ основной сущности
 * @param subtable - зависимая сущность
 * @returns - запрошенные данные согласно заданному типу
 */
export async function fetchQuery<T extends Entity>(table: string, id?: number, subtable?: string) {
  let token: string | undefined = getTokenFromLocalStorage();
  return axios.get<T>(LOCAL_HOST + table + (id && subtable ? `/${id}/${subtable}` : ''), {
    headers: { Authorization: 'Bearer ' + token },
  });
}

/**
 * Запрос сущности в БД по ключу по следующему шаблону
 * http://hostname:8080/{table}/{id}/{subtable/subId}
 * @param table - основная сущность
 * @param id - ключ основной сущности
 * @param subtable - зависимая сущность
 * @param subId - ключ зависимой сущности
 * @returns - запрошенные данные согласно заданному типу
 */
export async function fetchByIdQuery<T extends Entity>(
  table: string,
  id: number,
  subtable?: string,
  subId?: number,
) {
  let token: string | undefined = getTokenFromLocalStorage();
  return axios.get<T>(
    LOCAL_HOST + table + '/' + id + (subId && subtable ? `/${subtable}/${subId}` : ''),
    {
      headers: { Authorization: 'Bearer ' + token },
    },
  );
}

/**
 * Метод обновления сущности в БД по следующему шаблону.
 * http://hostname:8080/{table}/{id/subtable OR data.id}
 * @param table - основная сущность
 * @param data - данные к обновлению
 * @param subtable - зависимая сущностьnpm
 * @param id - ключ основной сущности
 * @returns - обновленные данные
 */
export async function putQuery<T extends Entity>(
  table: string,
  data: T,
  subtable?: string,
  id?: number,
) {
  let token: string | undefined = getTokenFromLocalStorage();
  return axios.put<T | Violations>(
    LOCAL_HOST + table + '/' + (subtable && id ? `${id}/${subtable}` : `${data.id}`),
    { ...data },
    {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json;charset=utf-8',
      },
      data: 'string',
    },
  );
}

/**
 * Метод удаления сущности в БД по следующему шаблону.
 * http://hostname:8080/{table}{?id=id OR /id/subtable?id=subId}
 * @param table - основная сущность
 * @param id - ключ основной сущности
 * @param subtable - зависимая сущность
 * @param subId - ключ зависимой сущности
 * @returns boolean
 */
export async function deleteQuery<T extends Entity>(
  table: string,
  id: number,
  subtable?: string,
  subId?: number,
) {
  let token: string | undefined = getTokenFromLocalStorage();
  return axios.delete<T>(
    LOCAL_HOST + table + (subtable && subId ? `/${id}/${subtable}?id=${subId}` : `/?id=${id}`),
    {
      headers: { Authorization: 'Bearer ' + token },
    },
  );
}

/**
 * Метод добавления сущности в БД по следующему шаблону.
 * http://hostname:8080/{table}/{nothing OR id/subtable}
 * @param table - основная сущность
 * @param id - ключ основной сущности
 * @param subtable - зависимая сущность
 * @returns - добавленные данные
 */
export async function insertQuery<T extends Entity>(
  table: string,
  data: T,
  id?: number,
  subtable?: string,
) {
  let token: string | undefined = getTokenFromLocalStorage();
  return axios.post<T>(LOCAL_HOST + table + (id && subtable ? `/${id}/${subtable}` : ''), data, {
    headers: { Authorization: 'Bearer ' + token },
  });
}

/**
 * Метод отправки данных пользователя для регистрации.
 * @param data - данные пользователя
 * @returns - данные пользователя после регистрации, ошибки валидации или ошибку
 */
export function signUp(data: UserRegistrationData) {
  return axios.post<UserData | Violations | ErrorWithMessage>(
    LOCAL_HOST + 'auth/registration',
    data,
  );
}

/**
 * Метод отправки данных пользователя для авторизации.
 * @param username - имя пользователя
 * @param password - пароль
 * @returns - данные пользователя после регистрации или ошибку
 */
export function signInQuery({ username, password }: Cridentials) {
  return axios.post<UserDataResponce | ErrorWithMessage>(LOCAL_HOST + 'auth/login', {
    username,
    password,
  });
}

/**
 * Метод отправки данных пользователя для авторизации через токен.
 * @param token - токен пользователя
 * @returns - данные пользователя после регистрации или ошибку
 */
export function signInWithTokenQuery(token: string) {
  return axios.post<UserDataResponce | ErrorWithMessage>(
    LOCAL_HOST + 'auth/login_with_token',
    token,
  );
}
