import { TreeItem, TreeView } from '@mui/lab';
import { Violations } from '../../../@types/globalTypes';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const renderViolationsList = (violations: Violations): JSX.Element => {
  let key = 0;
  return (
    <TreeView
      aria-label="violation_list"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
      {violations.violations.map((violation, violationIndex) => (
        <TreeItem key={key++} nodeId={violationIndex.toString()} label={violation.attribute}>
          {violation.messages.map((message) => (
            <TreeItem
              key={key++}
              nodeId={(violationIndex + 1 * violationIndex + 20).toString()}
              label={message}
            />
          ))}
        </TreeItem>
      ))}
    </TreeView>
  );
};

export default renderViolationsList;
