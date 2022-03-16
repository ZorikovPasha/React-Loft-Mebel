export const makeQueryParametersFromStringArr = (arr: string[], type: string): string => {
  let query = '';
  let hasAll = false;

  query = arr.reduce((accum, value) => {
    if (value === 'all') {
      hasAll = true;
    }
    return accum + `&${type}=${value}`
  }, '');
  if (hasAll) {
    query = ''
  }
  return query;
};