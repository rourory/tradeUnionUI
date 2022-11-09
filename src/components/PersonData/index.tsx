import DataGrid, {
  Column,
  SearchPanel,
  FilterRow,
  GroupPanel,
  Paging,
  Pager,
  MasterDetail,
  Editing,
  Form,
  Popup,
} from 'devextreme-react/data-grid';
import PersonDataDetails from '../PersonDataDetails';
import CustomStore from 'devextreme/data/custom_store';
import { fetchQuery } from '../../redux/utils/queries';
import { setTokenToLocalStorage } from '../../redux/utils/redux-utils';
import DataSource from 'devextreme/data/data_source';
import { Cancelable, EventInfo } from 'devextreme/events';
import dxDataGrid, { RowKeyInfo } from 'devextreme/ui/data_grid';
import { Item } from 'devextreme-react/form';
import { personEditDataSelector, fetchByIdData } from '../../redux/slices/personEditDataSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {} from 'react-redux';

const Content = () => {
  const changingData = useSelector(personEditDataSelector);
  const dispatch = useDispatch<AppDispatch>();
  const rowExpanding = (e: Cancelable & EventInfo<dxDataGrid<any, any>> & RowKeyInfo<any>) => {
    e.component.collapseAll(-1);
  };

  const store = new CustomStore({
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
      return;
    },
  });

  const data = new DataSource(store);

  return (
    <>
      <h2 className={'content-block'}>Информация: </h2>
      <DataGrid
        className={'dx-card wide-card'}
        dataSource={data}
        allowColumnReordering
        allowColumnResizing
        hoverStateEnabled
        onRowExpanding={rowExpanding}
        showBorders={true}
        onEditingStart={(e) => {
          dispatch(fetchByIdData(e.data.id));
        }}>
        {/* ________________________________________________________________________________ */}
        <Editing mode="popup" allowUpdating={true} allowAdding={true} allowDeleting={true}>
          <Popup title="Введите данные" showTitle={true} width={700} height={525} />
          <Form formData={changingData.data} key={changingData.data.id}>
            <Item itemType="group" caption={'Основная информация'} colCount={2} colSpan={2}>
              <Item dataField="firstName" />
              <Item dataField="lastName" />
              <Item dataField="middleName" />
              <Item dataField="birthDate" />
              <Item dataField="address" title={'123'} />
            </Item>
          </Form>
        </Editing>
        {/* ________________________________________________________________________________ */}
        <Column dataField={'lastName'} caption={'Фамилия'} dataType="string" hidingPriority={1} />
        <Column dataField={'firstName'} caption={'Имя'} dataType="string" hidingPriority={2} />
        <Column
          dataField={'middleName'}
          caption={'Отчество'}
          dataType="string"
          hidingPriority={3}
        />
        <Column
          dataField={'birthDate'}
          caption={'Дата рождения'}
          dataType="date"
          hidingPriority={4}
        />
        <SearchPanel placeholder={'Поиск...'} visible={true} />
        <FilterRow visible={true} />
        <GroupPanel emptyPanelText="Переместите сюда колонки для группировки" visible={true} />
        <MasterDetail enabled={true} component={PersonDataDetails} />
        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          allowedPageSizes={[5, 10, 15, 20]}
          displayMode={'full'}
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
        />
      </DataGrid>
    </>
  );
};

export default Content;
