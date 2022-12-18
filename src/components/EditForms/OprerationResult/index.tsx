import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import Transition from '../Transition';
import {
  operationResultDialogSelector,
  setOpenedOperationResultDialog,
  setOperationResultFetchStatus,
} from '../../../redux/slices/operation-result-slice';
import { FetchingStatus } from '../../../@types/fetchingStatus';
import CustomLoadingIndicator from '../../LoadingIndicator';
import styles from '../../LoadingIndicator/customLoadingDiv.module.scss';
import renderViolationsList from './renderViolationList';

type OperationResult = {
  successText: string;
  errorText: string;
  onSuccess: () => void;
};

const OperationResultDialog: React.FC<OperationResult> = ({
  successText,
  errorText,
  onSuccess,
}) => {
  const { operationResultDialogIsOpened, operationResultfetchStatus, violations } = useSelector(
    operationResultDialogSelector,
  );

  const renderContent = (status: FetchingStatus) => {
    switch (status) {
      case FetchingStatus.LOADING:
        return (
          <div className={styles.indicator}>
            <CustomLoadingIndicator />
          </div>
        );
      case FetchingStatus.SUCCESS:
        onSuccess();
        return (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">{successText}</DialogContentText>
          </DialogContent>
        );
      case FetchingStatus.ERROR:
        return (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">{errorText}</DialogContentText>
          </DialogContent>
        );
      case FetchingStatus.VALIDATION_ERROR:
        return (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Ошибка валидации на сервере
            </DialogContentText>
            {violations && renderViolationsList(violations)}
          </DialogContent>
        );
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(setOperationResultFetchStatus(FetchingStatus.LOADING));
    dispatch(setOpenedOperationResultDialog(false));
  };

  return (
    <Dialog
      open={operationResultDialogIsOpened}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle>Уведомление</DialogTitle>
      {renderContent(operationResultfetchStatus)}
      <DialogActions>
        <Button onClick={(e) => handleClose()}>Ок</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OperationResultDialog;
