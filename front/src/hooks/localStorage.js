import { useState } from "react";

export const getLocalJSON = (key) => JSON.parse(localStorage.getItem(key));
export const saveLocalJSON = (key, newValue) =>
  localStorage.setItem(key, JSON.stringify(newValue));


export const useLocalStorage = (key) => {
  const [data, setData] = useState(getLocalJSON(key));
  const setAndSaveData = (newData) => {
    saveLocalJSON(key, newData);
    setData(newData);
  };

  return [data, setAndSaveData];
};