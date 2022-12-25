export const isFieldValid = (fieldName: string, value: string): boolean => {
  let regexp;
  switch (fieldName) {
    case 'firstName':
      regexp = /^(?=[А-ЩЭ-Я][а-я]{1,14}$)/;
      return regexp.test(value);
    case 'lastName':
      regexp = /^(?=[А-ЩЭ-Я][а-я]{1,14}$)/;
      return regexp.test(value);
    case 'middleName':
      regexp = /^(?=[А-ЩЭ-Я][а-я]{1,14}$)|^$/;
      return regexp.test(value);
    case 'username':
      regexp = /^(?=[A-Za-z\d]{4,20}$)/;
      return regexp.test(value);
    case 'password':
      regexp = /^(?=[A-Za-z\d]{4,30}$)/;
      return regexp.test(value);
    case 'address':
      regexp = /^(?=[\dА-Яа-я-.,\s]{1,50}$)|^$/;
      return regexp.test(value);
    case 'birthPlace':
      regexp = /^(?=[\dА-Яа-я-.,\s]{1,50}$)|^$/;
      return regexp.test(value);
    case 'livePlace':
      regexp = /^(?=[\dА-Яа-я-.,\s]{1,50}$)|^$/;
      return regexp.test(value);
    case 'regPlace':
      regexp = /^(?=[\dА-Яа-я-.,\s]{1,50}$)|^$/;
      return regexp.test(value);
    case 'phone':
      regexp = /^(17|29|33|44)\d{7}$/;
      return regexp.test(value);
    case 'education':
      regexp = /([А-Яа-я-.\d\(\)]{1,40})|^$/;
      return true;
    case 'birthDate':
      return true;
    case 'maritalState':
      regexp = /\d/;
      return regexp.test(value);
    case 'citizenship':
      regexp = /(([А-Яа-я-]{2,20}\s?){1,2})|^$/;
      return regexp.test(value);
    case 'nationality':
      regexp = /([А-Яа-я-]{2,20}\s?)|^$/;
      return regexp.test(value);
    case 'comment':
      regexp = /([А-Яа-я-/.\d\(\)]{1,255})|^$/;
      return regexp.test(value);
    default:
      return false;
  }
};
