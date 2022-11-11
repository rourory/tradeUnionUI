import DataGrid, {
  Column,
  SearchPanel,
  FilterRow,
  GroupPanel,
  Paging,
  Pager,
  MasterDetail,
  Editing,
} from 'devextreme-react/data-grid';
import PersonDataDetails from '../PersonDataDetails';
import DataSource from 'devextreme/data/data_source';
import { Cancelable, EventInfo } from 'devextreme/events';
import dxDataGrid, { RowKeyInfo } from 'devextreme/ui/data_grid';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import React from 'react';
import { createPeopleStore } from '../../devExpressUtil/createStore';
import { setFetchStatus } from '../../redux/slices/personDetailsSlice';
import { FetchingStatus } from '../../redux/types/person-slice-types';

const Content = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rowExpanding = (e: Cancelable & EventInfo<dxDataGrid<any, any>> & RowKeyInfo<any>) => {
    e.component.collapseAll(-1);
    dispatch(setFetchStatus(FetchingStatus.LOADING));
  };
  const rows = React.useMemo(() => new DataSource(createPeopleStore()), []);

  return (
    <>
      <h2 className={'content-block'}>Информация: </h2>
      <DataGrid
        className={'dx-card wide-card'}
        dataSource={rows}
        allowColumnReordering
        allowColumnResizing
        hoverStateEnabled
        onRowExpanding={rowExpanding}
        showBorders={true}>
        <Editing
          mode="row"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          confirmDelete
          useIcons={true}
        />
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
