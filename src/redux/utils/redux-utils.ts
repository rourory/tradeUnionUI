
export const setTokenToLocalStorage = (token: string): void => {
  localStorage.setItem('trade-union-auth-token', token);
};

export const getTokenFromLocalStorage = (): string | undefined => {
  return localStorage.getItem('trade-union-auth-token')?.substring(7);
};
