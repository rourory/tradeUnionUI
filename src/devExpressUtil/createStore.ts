import CustomStore from 'devextreme/data/custom_store';
import {
  fetchQuery,
  putQuery,
  fetchByIdQuery,
  deleteQuery,
  insertQuery,
} from '../redux/utils/queries';
import { setTokenToLocalStorage } from '../redux/utils/redux-utils';
import { Entity } from '../@types/globalTypes';
/**
 * Принимает на вход сущность-наследника интерфейса Entity и значения, необходимые к обновлению ее свойств. Возвращает готовый объект с переданными значениями.
 * @param changingEntity - сущность, свойства которой необходимо обновить
 * @param values - объект свойств с их значениями
 * @returns - объект-наследник интрефейса Entity со значениями его свойств из объекта value
 */
function updateValuesOfEntityDataTypeObject<T extends Entity>(changingEntity: T, values: any): T {
  const properties = Object.getOwnPropertyNames(values);
  properties.forEach((key) => {
    changingEntity[key as keyof T] = values[key];
  });

  return changingEntity;
}

/**
 * @param table - сущность
 * @returns объект store для использования в компоненте DataGrid (вариант c основной сущностью сущностью)
 */
export function createStore<T extends Entity>(table: string) {
  return new CustomStore({
    key: 'id',
    load: async function (loadOptions) {
      let data: any = [];
      await fetchQuery<T>(table)
        .then((res) => {
          setTokenToLocalStorage(res.headers.authorization || '');
          data = res.data;
        })
        .catch((err) => console.log(err));
      return data;
    },
    insert: async function (values) {
      await insertQuery<T>(table, values as T)
        .then((res) => {
          setTokenToLocalStorage(res.headers.authorization || '');
        })
        .catch((err) => console.log(err));
    },
    remove: async function (key) {
      await deleteQuery<T>(table, key)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    update: async function (key, values) {
      await fetchByIdQuery<T>(table, key)
        .then(async (res) => {
          const returnedData: T = updateValuesOfEntityDataTypeObject(res.data, values);

          await putQuery<T>(table, returnedData)
            .then((res) => {
              setTokenToLocalStorage(res.headers.authorization || '');
            })
            .catch((err) => console.log(123, err));
        })
        .catch((err) => console.log(err));
    },
  });
}
/**
 * @param table - основная сущность
 * @param id - ключ основной сущности
 * @param subtable - зависимая сущность
 * @returns объект store для использования в компоненте DataGrid (вариант с зависимой сущностью)
 */
export function createStoreForSubtable<T extends Entity>(
  table: string,
  id: number,
  subtable?: string,
) {
  return new CustomStore({
    key: 'id',
    load: async function (loadOptions) {
      let data: any = [];
      await fetchQuery<T>(table, id, subtable)
        .then((res) => {
          setTokenToLocalStorage(res.headers.authorization || '');
          data = res.data;
        })
        .catch((err) => console.log(err));
      return data;
    },
    insert: async function (values) {
      await insertQuery<T>(table, values as T, id, subtable)
        .then((res) => {
          setTokenToLocalStorage(res.headers.authorization || '');
        })
        .catch((err) => console.log(err));
    },
    remove: async function (key) {
      await deleteQuery<T>(table, id, subtable, key)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    update: async function (key, values) {
      await fetchByIdQuery<T>(table, id, subtable, key)
        .then(async (res) => {
          const returnedData: T = updateValuesOfEntityDataTypeObject(res.data, values);

          await putQuery<T>(table, returnedData, subtable, id)
            .then((res) => {
              setTokenToLocalStorage(res.headers.authorization || '');
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
  });
}
