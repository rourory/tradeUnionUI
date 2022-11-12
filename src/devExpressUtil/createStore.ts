import {
  PersonEntityDataType,
  initializePersonEntityData,
} from './../redux/types/person-slice-types';
import CustomStore from 'devextreme/data/custom_store';
import { fetchQuery, putQuery } from '../redux/utils/queries';
import { setTokenToLocalStorage } from '../redux/utils/redux-utils';

export function createPeopleStore() {
  return new CustomStore({
    key: 'id',
    load: async function (loadOptions) {
      let data: any = [];
      await fetchQuery(`people`)
        .then((res) => {
          setTokenToLocalStorage(res.headers.authorization || '');
          data = res.data;
        })
        .catch((err) => console.log(err));
      return data;
    },
    /* @ts-ignore */
    insert(values) {
      return;
    },
    /* @ts-ignore */
    remove(key) {
      return;
    },
    /* @ts-ignore */
    update: async function (key, values) {
      // await putQuery('people', key, )
      const data: PersonEntityDataType = bindValuesToPersonDataTypeObject(key, values);
      console.log('UPDATE: ', data);
    },
  });
}

const bindValuesToPersonDataTypeObject = (key: number, values: any): PersonEntityDataType => {
  const data: PersonEntityDataType = initializePersonEntityData();

  const properties = Object.getOwnPropertyNames(values);
  properties.forEach((key) => {
    data[key] = values[key];
  });
  data.id = key;
  return data;
};
