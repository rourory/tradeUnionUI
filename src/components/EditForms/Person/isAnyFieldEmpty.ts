import { PersonEntityDataType } from '../../../@types/personTypes';

/**
 * Проверяет все пустые значения полей формы
 * @returns true, если хотя бы одно поле является пустым
 */
export const isAnyFieldEmpty = (
  personData: PersonEntityDataType,
  reqFlds: Array<keyof PersonEntityDataType>,
): boolean => {
  for (const value of reqFlds) {
    if (
      personData[value as keyof PersonEntityDataType] === '' ||
      personData[value as keyof PersonEntityDataType] === null ||
      personData[value as keyof PersonEntityDataType] === 0
    )
      return true;
  }
  return false;
};
