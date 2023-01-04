import { isFieldValid } from './../validation/fieldValidator';
import { PersonEntityDataType } from './../../@types/personTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  PersonDatagridEditingBrokenRow,
  PersonDatagridEditingBrokenRows,
  PersonDataGridEditingChange,
  PersonDatagridEditingChanges,
} from '../types/person-datagrid-editing-slice-types';

const initialState: PersonDatagridEditingBrokenRows = {
  brokenRows: [],
  changes: [],
  focusedRow: undefined,
};

const peopleDatagridEditingSlice = createSlice({
  name: 'peopleDatagridEditing',
  initialState,
  reducers: {
    setDataChanges(state, action: PayloadAction<PersonDatagridEditingChanges>) {
      let brokenRows: PersonDatagridEditingBrokenRow[] = [];
      //Для каждого элемета в массиве изменений
      for (let i = 0; i < action.payload.changes.length; i++) {
        //Перебираем все ключи объекта data: PersonEntityDataType
        for (const key in action.payload.changes[i].data) {
          //Если свойства объекта data невалидно
          if (
            !isFieldValid(
              key,
              action.payload.changes[i].data[key as keyof PersonEntityDataType]?.toString() || '',
            )
          ) {
            //Проверяем, нет ли уже объекта с этим ключем в массиве brokenRows
            const indexIfExists = brokenRows.findIndex(
              (brokenRow) => brokenRow.key === action.payload.changes[i].key,
            );
            //Если уже есть, то нужно добавить в существующий
            if (indexIfExists >= 0) {
              // brokenRows[indexIfExists];
              brokenRows[indexIfExists].values.push({
                columnName: key,
                value:
                  action.payload.changes[i].data[key as keyof PersonEntityDataType]?.toString() ||
                  '',
              });
              //Если нет, то можно добавить новый
            } else {
              const rowNumber: number = action.payload.rows.findIndex(
                (item) => item.id === action.payload.changes[i].key,
              );
              brokenRows.push({
                key: action.payload.changes[i].key,
                rowNumber: rowNumber,
                values: [
                  {
                    columnName: key,
                    value:
                      action.payload.changes[i].data[
                        key as keyof PersonEntityDataType
                      ]?.toString() || '',
                  },
                ],
              });
            }
          }
        }
      }
      state.brokenRows = brokenRows;
    },
    updateRowNumbers(state, action: PayloadAction<PersonEntityDataType[]>) {
      if (state.brokenRows.length > 0) {
        for (let i = 0; i < state.brokenRows.length; i++) {
          state.brokenRows[i].rowNumber = action.payload.findIndex(
            (item) => item.id === state.brokenRows[i].key,
          );
        }
      }
    },
    setChanges(state, action: PayloadAction<Array<PersonDataGridEditingChange>>) {
      state.changes = action.payload;
    },
    setFocusedRow(state, action: PayloadAction<number>) {
      state.focusedRow = action.payload;
    },
  },
});

export default peopleDatagridEditingSlice.reducer;
export const peopleDatagridEditingSelector = (state: RootState) => state.peopleDatagridEditing;
export const { setDataChanges, updateRowNumbers, setChanges, setFocusedRow } =
  peopleDatagridEditingSlice.actions;
