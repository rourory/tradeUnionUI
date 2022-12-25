import { isFieldValid } from './../validation/fieldValidator';
import { PersonEntityDataType } from './../../@types/personTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  PersonDatagridEditingBrokenRow,
  PersonDatagridEditingBrokenRows,
  PersonDatagridEditingChanges,
} from '../types/person-datagrid-editing-slice-types';

const initialState: PersonDatagridEditingBrokenRows = {
  brokenRows: [],
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
              (brokenRow) => brokenRow.keyOfRow === action.payload.changes[i].key,
            );

            //Если уже есть, то нужно добавить в существующий
            if (indexIfExists >= 0) {
              // brokenRows[indexIfExists];
              //Если нет, то можно добавить новый
            } else {
              const rowNumber: number | undefined = action.payload.rows.findIndex(
                (item) => item.id === action.payload.changes[i].key || undefined,
              );
              brokenRows.push({
                keyOfRow: action.payload.changes[i].key,
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
      console.log(brokenRows);
    },
  },
});

export default peopleDatagridEditingSlice.reducer;
export const personDetailsSelector = (state: RootState) => state.peopleDatagridEditing;
export const { setDataChanges } = peopleDatagridEditingSlice.actions;
