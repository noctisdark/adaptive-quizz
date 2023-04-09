import { useState } from "react";

export const getLocal = (key, then = null) =>
  then ? then(localStorage.getItem(key)) : localStorage.getItem(key);

export const deleteLocal = (key) => localStorage.removeItem(key);
export const saveLocal = (key, newValue, how) =>
  localStorage.setItem(key, how ? how(newValue) : newValue);

export const useLocalStorage = (
  key,
  { then = null, invalidateIf = () => false }
) => {
  let savedValue = getLocal(key, then);
  if (invalidateIf(savedValue)) {
    deleteLocal(key);
    savedValue = null;
  }

  const [data, setData] = useState(savedValue);
  const setAndSaveData = (newData) => {
    saveLocal(key, newData);
    setData(newData);
  };

  return [data, setAndSaveData];
};
