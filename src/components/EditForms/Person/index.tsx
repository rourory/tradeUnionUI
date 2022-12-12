import * as React from 'react';
import { Button, Dialog, AppBar, IconButton, Typography, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setOpenedConfirmDialog } from '../../../redux/slices/confirm-close-slice';
import ConfirmCloseDialog from '../ConfirmClose';
import { FetchingStatus } from '../../../@types/fetchingStatus';
import styles from '../../LoadingIndicator/customLoadingDiv.module.scss';
import Form, { GroupItem } from 'devextreme-react/form';
import { DateBox, SelectBox, TextArea, TextBox } from 'devextreme-react';
import CustomLoadingIndicator from '../../LoadingIndicator';
import {
  editPersonFormSelector,
  setData,
  setDataEqualsChangedData,
  setEditPersonDataDiffers,
  setOpened,
} from '../../../redux/slices/edit-peson-form-slice';
import { classificationsSelector } from '../../../redux/slices/classification-slice';
import Transition from '../Transition';
import { putQuery } from '../../../redux/utils/queries';
import { PersonEntityDataType } from '../../../@types/personTypes';
import OperationResultDialog from '../OprerationResult';
import {
  setOpenedOperationResultDialog,
  setOperationResultFetchStatus,
  setViolation,
} from '../../../redux/slices/operation-result-slice';
import { Violations } from '../../../@types/globalTypes';

type PersonEditFormType = {
  onUpdatingSuccess: () => void;
};

const PersonEditForm: React.FC<PersonEditFormType> = ({ onUpdatingSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, fetchStatus, opened, editPersonDataDiffers, validationError } =
    useSelector(editPersonFormSelector);
  const { maritalState, education } = useSelector(classificationsSelector);

  const renderContent = React.useCallback(
    (status: FetchingStatus): JSX.Element => {
      switch (status) {
        case FetchingStatus.LOADING:
          return (
            <div className={styles.indicator}>
              <CustomLoadingIndicator />
            </div>
          );
        case FetchingStatus.SUCCESS:
          return (
            <div
              className="form-container"
              style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
              <Form colCount={2} id="form">
                <GroupItem caption={'ФИО'}>
                  <TextBox
                    label="Имя"
                    value={data.firstName}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'firstName' }))
                    }
                  />
                  <TextBox
                    label="Фамилия"
                    value={data.lastName}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'lastName' }))
                    }
                  />
                  <TextBox
                    label="Отчество"
                    value={data.middleName}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'middleName' }))
                    }
                  />
                </GroupItem>
                <GroupItem caption={'Контакты'}>
                  <TextBox
                    label="Адрес"
                    value={data.address}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'address' }))
                    }
                  />
                  <TextBox
                    label="Место рождения"
                    value={data.birthPlace}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'birthPlace' }))
                    }
                  />
                  <TextBox
                    label="Место жительства"
                    value={data.livePlace}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'livePlace' }))
                    }
                  />
                  <TextBox
                    label="Адрес регистрации"
                    value={data.regPlace}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'regPlace' }))
                    }
                  />
                  <TextBox
                    label="Телефон"
                    value={data.phone}
                    onValueChanged={(e) => {
                      dispatch(setData({ value: e.value, fieldName: 'phone' }));
                    }}
                    mask="+375(XX)000-00-00"
                    maskRules={{ X: /[1-9]/ }}
                  />
                </GroupItem>
                <GroupItem caption={'Дополнительные сведения'}>
                  <DateBox
                    label="Дата рождения"
                    width="100%"
                    value={data.birthDate}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'birthDate' }))
                    }
                  />
                  <SelectBox
                    label="Образование"
                    items={education}
                    value={data.education}
                    displayExpr="name"
                    valueExpr="name"
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'education' }))
                    }
                  />
                  <SelectBox
                    label="Семейное положение"
                    value={data.maritalState}
                    items={maritalState}
                    displayExpr="name"
                    valueExpr="id"
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'maritalState' }))
                    }
                  />
                  <TextBox
                    label="Гражданство"
                    value={data.citizenship}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'citizenship' }))
                    }
                  />
                  <TextBox
                    label="Национальность"
                    value={data.nationality}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'nationality' }))
                    }
                  />
                </GroupItem>
                <GroupItem caption="Описание">
                  <TextArea
                    label="Комментарии"
                    height={90}
                    value={data.comment}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'comment' }))
                    }
                  />
                </GroupItem>
              </Form>
            </div>
          );
        case FetchingStatus.ERROR:
          return <>Ошибка загрузки</>;
        case FetchingStatus.VALIDATION_ERROR:
          return <>Ошибка загрузки</>;
      }
    },
    [data],
  );

  const handleClose = () => {
    editPersonDataDiffers ? dispatch(setOpenedConfirmDialog(true)) : dispatch(setOpened(false));
  };

  const onClickYes = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setOpenedConfirmDialog(false));
    dispatch(setOpened(false));
    dispatch(setEditPersonDataDiffers(false));
  };

  const onSaveClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setOpenedOperationResultDialog(true));
    await putQuery<PersonEntityDataType>('people', data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setOperationResultFetchStatus(FetchingStatus.SUCCESS));
          dispatch(setDataEqualsChangedData(res.data as PersonEntityDataType));
        } else if (res.status === 203) {
          dispatch(setOperationResultFetchStatus(FetchingStatus.VALIDATION_ERROR));
          dispatch(setViolation(res.data as Violations));
        }
      })
      .catch((err) => {
        dispatch(setOperationResultFetchStatus(FetchingStatus.ERROR));
      });
  };

  return (
    <Dialog fullScreen open={opened} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, display: { xs: 'none', md: 'flex' } }}
            variant="h6"
            component="div">
            Редактирование данныx
          </Typography>
          <Typography
            sx={{ ml: 2, flex: 1, display: { xs: 'flex', md: 'none' } }}
            variant="subtitle2"
            component="div">
            Редактирование
          </Typography>
          <Button
            autoFocus
            disabled={!editPersonDataDiffers && !validationError}
            onClick={(e) => onSaveClick(e)}
            color="inherit">
            Сохранить
          </Button>
        </Toolbar>
      </AppBar>
      {renderContent(fetchStatus)}
      <ConfirmCloseDialog onClickYes={onClickYes} />
      <OperationResultDialog
        successText="Данные успешно обновлены"
        errorText="Произошла ошибка обновления"
        onSuccess={() => onUpdatingSuccess()}
      />
    </Dialog>
  );
};

export default PersonEditForm;
