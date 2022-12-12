import DataGrid, {
  Column,
  Editing,
  FilterRow,
  GroupPanel,
  Lookup,
  Scrolling,
} from 'devextreme-react/data-grid';
import { DropDownOptions } from 'devextreme-react/lookup';
import DataSource from 'devextreme/data/data_source';
import React from 'react';
import { createStoreForSubtable } from '../../../../devExpressUtil/createStore';
import { tradeUnionSelector, fetchData } from '../../../../redux/slices/trade-unions-slice';
import { PaymentEntityDataType } from '../../../../redux/types/payments-slice-types';
import { AppDispatch } from '../../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

type PaymentsProps = {
  id: number;
};

export const Payments: React.FC<PaymentsProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(tradeUnionSelector);

  React.useEffect(() => {
    dispatch(fetchData());
  }, []);

  const rows = React.useMemo(
    () => new DataSource(createStoreForSubtable<PaymentEntityDataType>('people', id, 'payments')),
    [],
  );

  return (
    <DataGrid
      className={'dx-card wide-card'}
      dataSource={rows}
      allowColumnReordering
      allowColumnResizing
      hoverStateEnabled
      showBorders={true}
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
      <Column dataField={'finished'} caption={'Дата'} dataType="date" hidingPriority={1} />
      <Column dataField={'tradeUnionId'} caption={'Профсоюз'} dataType="string" hidingPriority={2}>
        <Lookup dataSource={data} displayExpr="name" valueExpr="id">
          <DropDownOptions hideOnOutsideClick={true} showTitle={false} />
        </Lookup>
      </Column>
      <Scrolling rowRenderingMode="virtual"></Scrolling>
      <FilterRow visible={true} />
      <GroupPanel emptyPanelText="Переместите сюда колонки для группировки" visible={true} />
    </DataGrid>
  );
};
