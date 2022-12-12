import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmCloseDialogSelector,
  setOpenedConfirmDialog,
} from '../../../redux/slices/confirm-close-slice';
import { AppDispatch } from '../../../redux/store';
import Transition from '../Transition';

type ConfirmCloseDialogType = {
  onClickYes: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ConfirmCloseDialog: React.FC<ConfirmCloseDialogType> = ({ onClickYes }) => {
  const { confirmDialogIsOpened } = useSelector(confirmCloseDialogSelector);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(setOpenedConfirmDialog(false));
  };

  return (
    <Dialog
      open={confirmDialogIsOpened}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle>{'Подтвердите действие'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Вы уверены, что хотите выйти из режима редактирования? Измененные данные не будут
          сохранены.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(setOpenedConfirmDialog(false))}>Нет</Button>
        <Button onClick={(e) => onClickYes(e)}>Да</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmCloseDialog;
