export const getMaxDateAs18YearsAgo = (): Date => {
  return new Date(new Date().setFullYear(new Date().getFullYear() - 18));
};
