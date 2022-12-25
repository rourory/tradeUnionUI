import * as React from 'react';
import { Button, Dialog, AppBar, IconButton, Typography, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setOpenedConfirmDialog } from '../../../redux/slices/confirm-close-slice';
import ConfirmCloseDialog from '../ConfirmClose';
import { FetchingStatus } from '../../../@types/fetchingStatus';
import styles from '../../LoadingIndicator/customLoadingDiv.module.scss';
import Form, { GroupItem, RangeRule, RequiredRule } from 'devextreme-react/form';
import { DateBox, SelectBox, TextArea, TextBox, ValidationGroup } from 'devextreme-react';
import CustomLoadingIndicator from '../../LoadingIndicator';
import {
  editPersonFormSelector,
  setData,
  setDataEqualsChangedData,
  setEditPersonDataDiffers,
  setOpened,
  addBorkenRuleByFieldName,
  removeBrokenRuleByFieldName,
  removeAllBrokenRules,
  checkEmptyFields,
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
import Validator, { CustomRule } from 'devextreme-react/validator';
import { isFieldValid } from '../../../redux/validation/fieldValidator';
import { ValidatedEvent } from 'devextreme/ui/validator';
import { UnvalidFieldType } from '../../../redux/types/edit-person-form-slice-types';
import { formatNameToRightTemplate } from '../../../redux/utils/stringOperations';
import { isAnyFieldEmpty } from './isAnyFieldEmpty';
import { getMaxDateAs18YearsAgo } from '../../../redux/utils/getMaxDate';

type PersonEditFormType = {
  onUpdatingSuccess: () => void;
};
const requiredFields: Array<keyof PersonEntityDataType> = [
  'lastName',
  'firstName',
  'birthDate',
  'maritalState',
];

const PersonEditForm: React.FC<PersonEditFormType> = ({ onUpdatingSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, fetchStatus, opened, editPersonDataDiffers, unvalidFields } =
    useSelector(editPersonFormSelector);
  const { maritalState, education } = useSelector(classificationsSelector);

  /**
   * Сопровождает работу всех подписавшихся валидаторов
   */
  const handleValidate = React.useCallback(
    (ev: ValidatedEvent, fieldName: keyof PersonEntityDataType) => {
      if (ev.isValid) {
        dispatch(
          removeBrokenRuleByFieldName({ fieldName: fieldName, message: '', value: ev.value }),
        );
      } else {
        dispatch(
          addBorkenRuleByFieldName({
            fieldName: fieldName,
            message: ev.brokenRule?.message || 'Ошибка',
            value: ev.value,
          }),
        );
      }
    },
    [],
  );

  /**
   * Обрабатывает нажатие на кнопку "Закрыть" формы редактирования
   */
  const handleClose = () => {
    if (editPersonDataDiffers) {
      dispatch(setOpenedConfirmDialog(true));
    } else {
      dispatch(setOpened(false));
      dispatch(removeAllBrokenRules());
    }
  };

  /**
   * Обрабатывает нажатие на кноку "Да" в диалоге закрытия окна без сохранения
   */
  const onClickYes = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setOpenedConfirmDialog(false));
    dispatch(setOpened(false));
    dispatch(setEditPersonDataDiffers(false));
  };

  /**
   * Обрабатывает нажатие на кнопку "Сохранить"
   * Перед сохранением вызывает метод {@link isAnyFieldEmpty}
   * для проверки пустых полей.
   */
  const onSaveClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isAnyFieldEmpty(data, requiredFields)) {
      dispatch(setOpenedOperationResultDialog(true));
      await putQuery<PersonEntityDataType>('people', data)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setOperationResultFetchStatus(FetchingStatus.SUCCESS));
            dispatch(setDataEqualsChangedData(res.data as PersonEntityDataType));
          } else if (res.status === 203) {
            dispatch(setOperationResultFetchStatus(FetchingStatus.VALIDATION_ERROR));
            dispatch(setViolation(res.data as Violations));
          } else {
            dispatch(setOperationResultFetchStatus(FetchingStatus.ERROR));
          }
        })
        .catch((err) => {
          dispatch(setOperationResultFetchStatus(FetchingStatus.ERROR));
        });
    } else {
      dispatch(checkEmptyFields(requiredFields));
    }
  };

  const getValidationErrorByFieldName = (
    unvalidFlds: UnvalidFieldType[],
    fldName: keyof PersonEntityDataType,
  ): UnvalidFieldType | undefined => unvalidFlds.find((field) => field.fieldName === fldName);

  /**
   * Генерирует поля для группы 'ФИО'
   * @param label - имя поля для пользователя
   * @param fldName - имя поля
   * @param required - флаг, указывающий, является ли поле обязательным для заполнения
   * @param maxLength - максимально допустимое количество символов в поле
   * @param format - флаг, указывающий на необходимость форматировать значение методом {@link formatNameToRightTemplate}
   * @returns поле
   */
  const renderGroupContent = React.useCallback(
    (
      label: string,
      fldName: keyof PersonEntityDataType,
      maxLength: number,
      required = true,
      format = true,
    ): JSX.Element => (
      <TextBox
        key={fldName}
        label={label}
        maxLength={maxLength}
        value={data[fldName as keyof PersonEntityDataType]?.toString()}
        isValid={getValidationErrorByFieldName(unvalidFields, fldName) ? false : true}
        validationError={getValidationErrorByFieldName(unvalidFields, fldName)}
        onValueChanged={(e) =>
          dispatch(
            setData({
              value: format ? formatNameToRightTemplate(e.value) : e.value,
              fieldName: fldName,
            }),
          )
        }>
        <Validator
          onValidated={(validatedInfo) => {
            handleValidate(validatedInfo, fldName);
          }}>
          {required && <RequiredRule message={'Заполните поле'} />}
          <CustomRule
            validationCallback={(e: any) =>
              isFieldValid(fldName, format ? formatNameToRightTemplate(e.value) : e.value)
            }
            message="Используйте символы русского алфавита"
          />
        </Validator>
      </TextBox>
    ),
    [data, unvalidFields],
  );
  /**
   * Возвращает поля формы
   */
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
              <Form showRequiredMark colCount={2} id="form">
                <GroupItem caption={'ФИО'}>
                  {[
                    {
                      fldName: 'firstName' as keyof PersonEntityDataType,
                      label: 'Имя',
                      required: true,
                    },
                    {
                      fldName: 'lastName' as keyof PersonEntityDataType,
                      label: 'Фамилия',
                      required: true,
                    },
                    {
                      fldName: 'middleName' as keyof PersonEntityDataType,
                      label: 'Отчество',
                      required: false,
                    },
                  ].map((value) =>
                    renderGroupContent(value.label, value.fldName, 14, value.required),
                  )}
                </GroupItem>
                <GroupItem caption={'Контакты'}>
                  {[
                    {
                      fldName: 'address' as keyof PersonEntityDataType,
                      label: 'Адрес',
                      required: false,
                    },
                    {
                      fldName: 'birthPlace' as keyof PersonEntityDataType,
                      label: 'Место рождения',
                      required: false,
                    },
                    {
                      fldName: 'livePlace' as keyof PersonEntityDataType,
                      label: 'Место жительства',
                      required: false,
                    },
                    {
                      fldName: 'regPlace' as keyof PersonEntityDataType,
                      label: 'Адрес регистрации',
                      required: false,
                    },
                  ].map((value) =>
                    renderGroupContent(value.label, value.fldName, 50, value.required, false),
                  )}
                  <TextBox
                    label="Телефон"
                    value={data.phone}
                    isValid={getValidationErrorByFieldName(unvalidFields, 'phone') ? false : true}
                    validationError={getValidationErrorByFieldName(unvalidFields, 'phone')}
                    onValueChanged={(e) => {
                      dispatch(setData({ value: e.value, fieldName: 'phone' }));
                    }}
                    mask="+375(XX)000-00-00"
                    maskRules={{ X: /[1-9]/ }}>
                    <Validator
                      onValidated={(validatedInfo) => {
                        handleValidate(validatedInfo, 'phone');
                      }}>
                      <CustomRule
                        validationCallback={(e: any) =>
                          isFieldValid('phone', formatNameToRightTemplate(e.value))
                        }
                        message="Используйте символы русского алфавита"
                      />
                    </Validator>
                  </TextBox>
                </GroupItem>
                <GroupItem caption={'Дополнительные сведения'}>
                  <DateBox
                    label="Дата рождения"
                    width="100%"
                    max={getMaxDateAs18YearsAgo()}
                    value={data.birthDate}
                    isValid={
                      getValidationErrorByFieldName(unvalidFields, 'birthDate') ? false : true
                    }
                    validationError={getValidationErrorByFieldName(unvalidFields, 'birthDate')}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'birthDate' }))
                    }>
                    <Validator
                      onValidated={(validatedInfo) => {
                        handleValidate(validatedInfo, 'birthDate');
                      }}>
                      <RequiredRule message={'Заполните поле'} />
                      <RangeRule
                        message={'Возраст должен быть не менее 18 лет'}
                        max={getMaxDateAs18YearsAgo().toLocaleDateString()}
                      />
                    </Validator>
                  </DateBox>
                  <SelectBox
                    label="Образование"
                    items={education}
                    value={data.education}
                    displayExpr="name"
                    valueExpr="name"
                    isValid={
                      getValidationErrorByFieldName(unvalidFields, 'education') ? false : true
                    }
                    validationError={getValidationErrorByFieldName(unvalidFields, 'education')}
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
                    isValid={
                      getValidationErrorByFieldName(unvalidFields, 'maritalState') ? false : true
                    }
                    validationError={getValidationErrorByFieldName(unvalidFields, 'maritalState')}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'maritalState' }))
                    }>
                    <Validator
                      onValidated={(validatedInfo) => {
                        handleValidate(validatedInfo, 'maritalState');
                      }}>
                      <RequiredRule message={'Выберите значение'} />
                    </Validator>
                  </SelectBox>
                  {[
                    {
                      fldName: 'citizenship' as keyof PersonEntityDataType,
                      label: 'Гражданство',
                      maxLength: 42,
                    },
                    {
                      fldName: 'nationality' as keyof PersonEntityDataType,
                      label: 'Национальность',
                      maxLength: 20,
                    },
                  ].map((value) => {
                    {
                      return renderGroupContent(
                        value.label,
                        value.fldName,
                        value.maxLength,
                        false,
                        false,
                      );
                    }
                  })}
                </GroupItem>
                <GroupItem caption="Описание">
                  <TextArea
                    label="Комментарии"
                    height={90}
                    maxLength={255}
                    value={data.comment}
                    isValid={getValidationErrorByFieldName(unvalidFields, 'comment') ? false : true}
                    validationError={getValidationErrorByFieldName(unvalidFields, 'comment')}
                    onValueChanged={(e) =>
                      dispatch(setData({ value: e.value, fieldName: 'comment' }))
                    }>
                    <Validator
                      onValidated={(validatedInfo) => {
                        handleValidate(validatedInfo, 'comment');
                      }}>
                      <CustomRule
                        validationCallback={(e: any) => isFieldValid('comment', e.value)}
                        message="Используйте символы русского алфавита"
                      />
                    </Validator>
                  </TextArea>
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
    [data, unvalidFields],
  );

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
            disabled={!editPersonDataDiffers || unvalidFields.length > 0}
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
