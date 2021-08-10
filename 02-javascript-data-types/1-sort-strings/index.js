/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export const sortStrings = (arr, param = 'asc') => {
    const sorted = [...arr];
    return param === 'asc' ? sorted.sort(compareStr) : sorted.sort(compareStr).reverse();
};

const compareStr = (strA, strB) => {
    if (strA.toLowerCase() === strB.toLowerCase()) {
        if (!checkUpperCase(strA, strB)) {
            return -1;
        } else {
            return 0;
        }
    } else {
        return strA.localeCompare(strB);
    }
};

const checkUpperCase = (strA, strB) => strA[0] === strB[0].toLowerCase();
