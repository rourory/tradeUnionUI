import DataGrid, {
  Column,
  SearchPanel,
  FilterRow,
  GroupPanel,
  MasterDetail,
  Editing,
  Scrolling,
} from 'devextreme-react/data-grid';
import PersonDataDetails from '../PersonDataDetails';
import DataSource from 'devextreme/data/data_source';
import { Cancelable, EventInfo } from 'devextreme/events';
import dxDataGrid, { CellDblClickEvent, RowKeyInfo } from 'devextreme/ui/data_grid';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import React from 'react';
import { createStore } from '../../../devExpressUtil/createStore';
import { setFetchStatus } from '../../../redux/slices/person-details-slice';
import { FetchingStatus } from '../../../@types/fetchingStatus';
import {
  fetchByIdData,
  setOpened,
  setPersonEditFormFetchStatus,
} from '../../../redux/slices/edit-peson-form-slice';
import PersonEditForm from '../../EditForms/Person';
import { PersonEntityDataType } from '../../../@types/personTypes';
import { fetchClassificationsData, setHasErrors } from '../../../redux/slices/classification-slice';

const PersonData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dataGridHeight, setDataGridHeight] = React.useState(window.innerHeight - 88);

  /**
   * Метод позволяет ограничивать количество открытых вкладок дополнительной информации до одной
   */
  const rowExpanding = React.useCallback(
    (e: Cancelable & EventInfo<dxDataGrid<PersonEntityDataType, number>> & RowKeyInfo<number>) => {
      e.component.collapseAll(-1);
      dispatch(setFetchStatus(FetchingStatus.LOADING));
    },
    [],
  );

  /**
   * Метод управляет окном для редактирования данных
   */
  const openEditPersonDialog = (ev: CellDblClickEvent<PersonEntityDataType, number>) => {
    dispatch(setPersonEditFormFetchStatus(FetchingStatus.LOADING));
    dispatch(setHasErrors(false));
    dispatch(setOpened(true));
    setTimeout(() => {
      ev.data.id && dispatch(fetchByIdData(ev.data.id));
    }, 1000);
  };

  const rows = React.useMemo(() => new DataSource(createStore<PersonEntityDataType>('people')), []);

  /**
   * При рендере необходимо повесить на window listener, который будет определять размеры контетна внутри MainLayout (в данном случае компонента DataGrid)
   * и запрашивает у сервера информацию о классификаторах, используемых для редактирования данных в DataGrid
   */
  React.useEffect(() => {
    window.addEventListener('resize', () => setDataGridHeight(window.innerHeight - 88));
    dispatch(fetchClassificationsData());
  }, []);

  return (
    <>
      <DataGrid
        className={'dx-card wide-card'}
        dataSource={rows}
        allowColumnReordering
        allowColumnResizing
        hoverStateEnabled
        onRowExpanding={rowExpanding}
        showBorders={true}
        height={dataGridHeight}
        onCellDblClick={(e) => openEditPersonDialog(e)}
        loadPanel={{
          indicatorSrc: '/Loading.svg',
          showPane: false,
          text: 'Загрузка данных...',
        }}>
        <Editing
          mode="row"
          allowUpdating={true}
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
        <Scrolling mode="virtual" />
      </DataGrid>
      <PersonEditForm
        onUpdatingSuccess={() => {
          rows.reload();
        }}
      />
    </>
  );
};

export default PersonData;
