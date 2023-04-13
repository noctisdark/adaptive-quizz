export const concat = (array, item) => [...array, item];

export const extractIf = (array, predicate) => {
  const result = [[], []];
  for (const item of array)
    if (predicate(item)) result[1].push(item);
    else result[0].push(item);
  return result;
};

export const join = (array, other) => [...array, ...other];

export const deleteBy = (array, deleteBy) =>
  array.filter((item, index) => !deleteBy(item, index));

export const deleteById = (array, itemId) =>
  array.filter((item) => item.id !== itemId);

// index needs to be positive
export const deleteByIndex = (array, index) =>
  join(array.slice(0, index), array.slice(index + 1));

export const filterMap = (array, map, filter) => array.filter(filter).map(map);

export const replace = (array, replaceIf, replacement) =>
  array.map((item) => (replaceIf(item) ? replacement : item));

export const replaceById = (array, itemId, replacement) =>
  array.map((item) => (item.id === itemId ? replacement : item));

export const replaceByIndex = (array, itemIndex, replacement) =>
  array.map((item, index) => (index === itemIndex ? replacement : item));
