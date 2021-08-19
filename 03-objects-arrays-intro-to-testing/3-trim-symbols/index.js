/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let cnt = 0;
  return string.split('').reduce((acc, item, i) => {
    if (size === 0) {
      return '';
    }
    if (item === string[i - 1]) {
      cnt++;
      return cnt >= size ? acc : acc + item;
    } else {
      cnt = 0;
      return acc + item;
    }
  }, '');
}
