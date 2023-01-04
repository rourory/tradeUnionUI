import { PersonEntityDataType } from './../../@types/personTypes';
export type PersonDatagridEditingBrokenRows = {
  brokenRows: PersonDatagridEditingBrokenRow[];
  changes: PersonDataGridEditingChange[];
  focusedRow: number | undefined;
};

export type PersonDatagridEditingBrokenRow = {
  rowNumber: number;
  key: number;
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
