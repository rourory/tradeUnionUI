import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Transition from '../EditForms/Transition';

type NotificatorPropsType = {
  dialogTitle: string;
  dialogContentText: string;
  opened: boolean;
  handleClose: () => void;
};

const Notificator: React.FC<NotificatorPropsType> = ({
  dialogTitle,
  dialogContentText,
  opened,
  handleClose,
}) => {
  return (
    <Dialog
      open={opened}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {dialogContentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Хорошо</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Notificator;
