/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export const sortStrings = (arr, param = 'asc') => {
  const sorted = [...arr];

  return sorted.sort((strA, strB) => compareStr(strA, strB, param));
};

const compareStr = (strA, strB, param) => {
  return param === 'asc'
    ? strA.localeCompare(strB, 'ru-en', { caseFirst: 'upper' })
    : strB.localeCompare(strA, 'ru-en', { caseFirst: 'upper' });
};
