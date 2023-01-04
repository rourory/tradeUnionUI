import React from 'react';
import {
  peopleDatagridEditingSelector,
  setFocusedRow,
} from '../../../../redux/slices/person-datagrid-editing-slice';
import { useDispatch, useSelector } from 'react-redux';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AppDispatch } from '../../../../redux/store';

const PersonDatagridValidationErrorTreeView: React.FC = () => {
  const { brokenRows } = useSelector(peopleDatagridEditingSelector);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => console.log(brokenRows), [brokenRows]);

  return (
    <TreeView
      aria-label="violation_list"
      sx={{ height: 100, maxWidth: '100%', overflowY: 'auto' }}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}>
      {brokenRows.map((row) => {
        return (
          <TreeItem
            key={row.key}
            nodeId={row.key.toString()}
            label={`Номер строки: ${row.rowNumber + 1}. Ошибка в значении: ${row.values.map(
              (value, index) => ` ${index + 1}) "${value.value}"`,
            )}`}
            onClick={() => {
              dispatch(setFocusedRow(row.rowNumber));
            }}
          />
        );
      })}
    </TreeView>
  );
};

export default PersonDatagridValidationErrorTreeView;
