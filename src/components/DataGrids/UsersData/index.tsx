import { DataGrid } from 'devextreme-react';
import { Column, Editing, FilterRow, Scrolling, SearchPanel } from 'devextreme-react/data-grid';
import DataSource from 'devextreme/data/data_source';
import { Cancelable, EventInfo } from 'devextreme/events';
import dxDataGrid, { RowKeyInfo } from 'devextreme/ui/data_grid';
import React from 'react';
import { useDispatch } from 'react-redux';
import { UserEntityDataType } from '../../../@types/userTypes';
import { createStore } from '../../../devExpressUtil/createStore';
import { AppDispatch } from '../../../redux/store';

export const UsersData = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [dataGridHeight, setDataGridHeight] = React.useState(window.innerHeight - 88);

  /**
   * Метод позволяет ограничивать количество открытых вкладок дополнительной информации до одной
   */
  const rowExpanding = React.useCallback(
    (e: Cancelable & EventInfo<dxDataGrid<UserEntityDataType, number>> & RowKeyInfo<number>) => {
      e.component.collapseAll(-1);
    },
    [],
  );

  const rows = React.useMemo(() => new DataSource(createStore<UserEntityDataType>('users')), []);

  /**
   * При рендере необходимо повесить на window listener, который будет определять размеры контетна внутри MainLayout (в данном случае компонента DataGrid)
   */
  React.useEffect(() => {
    window.addEventListener('resize', () => setDataGridHeight(window.innerHeight - 88));
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
        <Column dataField={'id'} caption={'Идентификатор'} dataType="number" hidingPriority={1} />
        <Column
          dataField={'username'}
          caption={'Имя пользователя'}
          dataType="string"
          hidingPriority={2}
        />
        <Column dataField={'role'} caption={'Роль'} dataType="string" hidingPriority={3} />
        <Column dataField={'firstName'} caption={'Имя'} dataType="string" hidingPriority={4} />
        <Column dataField={'lastName'} caption={'Фамилия'} dataType="string" hidingPriority={5} />
        <Column
          dataField={'created'}
          caption={'Создан'}
          dataType="date"
          hidingPriority={6}
          allowEditing={false}
        />
        <Column
          dataField={'updated'}
          caption={'Обновлен'}
          dataType="date"
          hidingPriority={7}
          allowEditing={false}
        />

        <SearchPanel placeholder={'Поиск...'} visible={true} />
        <FilterRow visible={true} />
        <Scrolling mode="virtual" />
      </DataGrid>
    </>
  );
};
