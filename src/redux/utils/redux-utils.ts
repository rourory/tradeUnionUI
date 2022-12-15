export const setTokenToLocalStorage = (token: string): void => {
  localStorage.setItem('trade_union_auth_token', token);
};

export const getTokenFromLocalStorage = (): string | undefined => {
  return localStorage.getItem('trade_union_auth_token')?.substring(7) || '';
};
