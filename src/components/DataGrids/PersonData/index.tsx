import DataGrid, {
  Column,
  SearchPanel,
  FilterRow,
  GroupPanel,
  MasterDetail,
  Scrolling,
  CustomRule,
  RequiredRule,
  Editing,
} from 'devextreme-react/data-grid';
import PersonDataDetails from '../PersonDataDetails';
import DataSource from 'devextreme/data/data_source';
import { Cancelable, EventInfo } from 'devextreme/events';
import dxDataGrid, { CellDblClickEvent, RowKeyInfo } from 'devextreme/ui/data_grid';
import { AppDispatch } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
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
import { userSelector } from '../../../redux/slices/user-slice';
import { isFieldValid } from '../../../redux/validation/fieldValidator';
import { getMaxDateAs18YearsAgo } from '../../../redux/utils/getMaxDate';
import {
  setChanges,
  setDataChanges,
  updateRowNumbers,
} from '../../../redux/slices/person-datagrid-editing-slice';
import { PersonDataGridEditingChange } from '../../../redux/types/person-datagrid-editing-slice-types';
import PersonDatagridValidationErrorTreeView from './PersonValidationErrorTreeView';

const PersonData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dataGridHeight, setDataGridHeight] = React.useState(window.innerHeight - 188);
  const { user } = useSelector(userSelector);
  // const { changes } = useSelector(peopleDatagridEditingSelector);
  const rows = React.useMemo(() => new DataSource(createStore<PersonEntityDataType>('people')), []);

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
    if (user?.role === 'ROLE_ADMIN') {
      dispatch(setPersonEditFormFetchStatus(FetchingStatus.LOADING));
      dispatch(setHasErrors(false));
      dispatch(setOpened(true));
      setTimeout(() => {
        ev.data.id && dispatch(fetchByIdData(ev.data.id));
      }, 1000);
    }
  };

  /**
   * При рендере необходимо повесить на window listener, который будет определять размеры контетна внутри MainLayout (в данном случае компонента DataGrid)
   * и запрашивает у сервера информацию о классификаторах, используемых для редактирования данных в DataGrid
   */
  React.useEffect(() => {
    window.addEventListener('resize', () => setDataGridHeight(window.innerHeight - 188));
    dispatch(fetchClassificationsData());
  }, []);

  const onChangesChangeHandle = React.useCallback(
    (changes: Array<PersonDataGridEditingChange>, data: DataSource<any, any>) => {
      if (changes.length > 0) {
        dispatch(setChanges(changes));
        dispatch(setDataChanges({ changes: changes, rows: data.items() }));
      }
    },
    [],
  );

  return (
    <>
      <DataGrid
        // editing={{
        //   mode: 'batch',
        //   allowUpdating: true,
        //   allowDeleting: true,
        //   allowAdding: true,
        //   confirmDelete: true,
        //   useIcons: true,
        //   changes: [{ data: { firstName: 'dadad', lastName: '213233' }, type: 'update', key: 28 }],
        // }}
        highlightChanges
        className={'dx-card wide-card'}
        dataSource={rows}
        allowColumnReordering
        allowColumnResizing
        onRowExpanding={rowExpanding}
        showBorders={true}
        repaintChangesOnly
        height={dataGridHeight}
        onEditingStart={(e) => console.log(e)}
        onCellDblClick={(e) => openEditPersonDialog(e)}
        loadPanel={{
          indicatorSrc: '/Loading.svg',
          showPane: false,
          text: 'Загрузка данных...',
        }}>
        {user?.role === 'ROLE_ADMIN' && (
          <Editing
            onChangesChange={(e) => {
              onChangesChangeHandle(e, rows);
            }}
            mode="batch"
            allowUpdating
            allowDeleting
            allowAdding
            confirmDelete
            useIcons={true}
            texts={{ editRow: (e: any) => console.log(e) }}
          />
        )}

        {user?.role === 'ROLE_ADMIN' && (
          <MasterDetail enabled={true} component={PersonDataDetails} />
        )}
        {user?.role === 'ROLE_ADMIN' && (
          <PersonEditForm
            onUpdatingSuccess={() => {
              rows.reload();
            }}
          />
        )}
        <Column
          onSelectedFilterOperationChange={(e) => {
            console.log(123);
          }}
          showEditorAlways={true}
          dataField={'lastName'}
          caption={'Фамилия'}
          dataType="string"
          hidingPriority={1}>
          <CustomRule
            validationCallback={(e: any) => isFieldValid('lastName', e.value)}
            message={'Используейте символы русского алфавита'}
          />
          <RequiredRule message={'Заполните поле'} />
        </Column>
        <Column dataField={'firstName'} caption={'Имя'} dataType="string" hidingPriority={2}>
          <CustomRule
            validationCallback={(e: any) => isFieldValid('firstName', e.value)}
            message={'Используейте символы русского алфавита'}
          />
          <RequiredRule message={'Заполните поле'} />
        </Column>
        <Column dataField={'middleName'} caption={'Отчество'} dataType="string" hidingPriority={3}>
          <CustomRule
            validationCallback={(e: any) => isFieldValid('middleName', e.value)}
            message={'Используейте символы русского алфавита'}
          />
        </Column>
        <Column
          dataField={'birthDate'}
          editorOptions={{ max: getMaxDateAs18YearsAgo() }}
          caption={'Дата рождения'}
          dataType="date"
          hidingPriority={4}>
          <RequiredRule message={'Заполните поле'} />
        </Column>

        <SearchPanel
          onTextChange={() => dispatch(updateRowNumbers(rows.items()))}
          placeholder={'Поиск...'}
          visible={true}
        />
        <FilterRow visible={true} />
        <GroupPanel emptyPanelText="Переместите сюда колонки для группировки" visible={true} />
        <Scrolling mode="virtual" />
      </DataGrid>
      <PersonDatagridValidationErrorTreeView />
    </>
  );
};

export default PersonData;
