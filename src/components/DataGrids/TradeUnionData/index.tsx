import React from 'react';
import { DataGrid } from 'devextreme-react';
import DataSource from 'devextreme/data/data_source';
import {
  Column,
  Editing,
  FilterRow,
  GroupPanel,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
} from 'devextreme-react/data-grid';
import { createStore } from '../../../devExpressUtil/createStore';
import { TradeUnionEntityDataType } from '../../../redux/types/trade-union-slice-types';

const TradeUnionData: React.FC = () => {
  const rows = React.useMemo(
    () => new DataSource(createStore<TradeUnionEntityDataType>('unions')),
    [],
  );

  const [dataGridHeight, setDataGridHeight] = React.useState(window.innerHeight - 68);

  React.useEffect(() => {
    window.addEventListener('resize', () => setDataGridHeight(window.innerHeight - 88));
  }, []);

  return (
    <DataGrid
      className={'dx-card wide-card'}
      dataSource={rows}
      allowColumnReordering
      allowColumnResizing
      hoverStateEnabled
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
        allowAdding={true}
        allowDeleting={true}
        confirmDelete
        useIcons={true}
      />
      <Column dataField={'name'} caption={'Название'} dataType="string" hidingPriority={1} />
      <Column dataField={'city'} caption={'Город'} dataType="string" hidingPriority={2} />
      <Column dataField={'address'} caption={'Адрес'} dataType="string" hidingPriority={3} />
      <Scrolling rowRenderingMode="virtual"></Scrolling>
      <Paging defaultPageSize={10} />
      <Pager
        visible={true}
        allowedPageSizes={[10, 15, 'all']}
        displayMode={[
          { text: "Display Mode 'full'", value: 'full' },
          { text: "Display Mode 'compact'", value: 'compact' },
        ]}
        showPageSizeSelector={true}
        showInfo={true}
        showNavigationButtons={true}
      />
      <SearchPanel placeholder={'Поиск...'} visible={true} />
      <FilterRow visible={true} />
      <GroupPanel emptyPanelText="Переместите сюда колонки для группировки" visible={true} />
    </DataGrid>
  );
};

export default TradeUnionData;
