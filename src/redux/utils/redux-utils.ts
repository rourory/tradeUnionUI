import { temporaryAuthenticate } from './temporary';

export const setTokenToLocalStorage = (token: string): void => {
  localStorage.setItem('trade-union-auth-token', token);
};

export const getTokenFromLocalStorage = async (): Promise<string> => {
  let token = localStorage.getItem('trade-union-auth-token')?.substring(7) || '';
  if (token === '') {
    await temporaryAuthenticate()
      .then((result) => (token = result))
      .catch((err) => 'AUTH ERROR: ' + err);
  } else {
  }
  return token;
};
