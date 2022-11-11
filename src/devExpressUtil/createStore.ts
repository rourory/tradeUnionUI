import CustomStore from 'devextreme/data/custom_store';
import { fetchQuery } from '../redux/utils/queries';
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
    update(key, values) {
      console.log('UPDATE key: ', key, 'values: ', values);
    },
  });
}
