export const isFieldValid = (fieldName: string, value: string): boolean => {
  let regexp;
  switch (fieldName) {
    case 'firstName':
      regexp = /^(?=[А-ЩЭ-Я][а-я]{1,14}$)/;
      return regexp.test(value);
    case 'lastName':
      regexp = /^(?=[А-ЩЭ-Я][а-я]{1,14}$)/;
      return regexp.test(value);
    case 'username':
      regexp = /^(?=[A-Za-z\d]{4,20}$)/;
      return regexp.test(value);
    case 'password':
      regexp = /^(?=[A-Za-z\d]{4,30}$)/;
      return regexp.test(value);

    default:
      return false;
  }
};
