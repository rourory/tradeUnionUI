import DataSource from 'devextreme/data/data_source';
import { PersonEntityDataType } from './../../@types/personTypes';
export type PersonDatagridEditingBrokenRows = {
  brokenRows: PersonDatagridEditingBrokenRow[];
};

export type PersonDatagridEditingBrokenRow = {
  rowNumber: number | undefined;
  keyOfRow: number;
  values: PersonDatagridEditingBrokenValue[];
};

type PersonDatagridEditingBrokenValue = {
  columnName: string;
  value: string;
};

export type PersonDatagridEditingChanges = {
  changes: Array<PersonDataGridEditingChange>;
  rows: PersonEntityDataType[];
};

export type PersonDataGridEditingChange = {
  data: PersonEntityDataType;
  key: number;
  type: string;
};
