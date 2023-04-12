export const replace = (array, replaceIf, replacement) =>
  array.map((item) => (replaceIf(item) ? replacement : item));

export const replaceById = (array, itemId, replacement) =>
  array.map((item) => (item.id === itemId ? replacement : item));

export const replaceByIndex = (array, itemIndex, replacement) =>
  array.map((item, index) => (index === itemIndex ? replacement : item));

// index needs to be positive
export const deleteIndex = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];