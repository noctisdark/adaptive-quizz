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
  const [, setValue] = useState();
  const invalidate = () => {
    deleteLocal(key);
    setValue(null);
  };

  // avoid setting state immediately
  if (invalidateIf(savedValue)) {
    deleteLocal(key);
    savedValue = null;
  }

  const setAndSaveValue = (newValue) => {
    saveLocal(key, newValue);
    setValue(newValue);
  };

  return [savedValue, setAndSaveValue, invalidate];
};
