/**
 * Принимает строку к формированию. Строка удаляет пробелы в начале и конце строки и делают первый символ в строке заглавным
 * @param name - строка, передаваемая к формированию
 * @returns сформированная строка
 */
export const formatNameToRightTemplate = (name: string): string => {
  let result = name.trim();
  const firstSymbol = result.charAt(0);
  return firstSymbol.toLocaleUpperCase() + result.slice(1, result.length).toLocaleLowerCase();
};
