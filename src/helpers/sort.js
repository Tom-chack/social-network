export const sortByAsc = (arr, k) =>
  arr.concat().sort((a, b) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0));

export const sortByDesc = (arr, k) =>
  arr.concat().sort((a, b) => (a[k] < b[k] ? 1 : a[k] > b[k] ? -1 : 0));
