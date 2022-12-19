/**
 * Метод занимается сохранением токена в localStorage и регистрацией времени сохранения
 * @param token - токен, передаваемый для сохранения в localStorage
 */
export const setTokenToLocalStorage = (token: string): void => {
  localStorage.setItem('trade_union_auth_token', token);
  localStorage.setItem('trade_union_auth_token_created', new Date().getTime().toString());
};

/**
 * Метод заниматся извлечением из localStorage ранее сохраненного токена. Если он был сохранен ранее чем час до его извлечения, возвращается undefined;
 * @returns токен или undefined
 */
export const getTokenFromLocalStorage = (): string | undefined => {
  const issueDateMilliseconds = new Number(localStorage.getItem('trade_union_auth_token_created'));
  if (new Date().getTime() - new Date(issueDateMilliseconds.valueOf()).getTime() <= 1671469204979)
    return localStorage.getItem('trade_union_auth_token')?.substring(7) || '';
  return undefined;
};
