// Adapted from here: https://www.geeksforgeeks.org/reactjs-uselocalstorage-custom-hook/

import { useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    const defaultObject = { epoch: null, data: defaultValue };
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultObject));
        return defaultObject;
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultObject));
      return defaultObject;
    }
  });
  const setLocalStorageStateValue = (valueOrFn) => {
    let newObject = { epoch: Date.now(), data: null };
    if (typeof valueOrFn === "function") {
      const fn = valueOrFn;
      newObject.data = fn(localStorageValue);
    } else {
      newObject.data = valueOrFn;
    }
    localStorage.setItem(key, JSON.stringify(newObject));
    setLocalStorageValue(newObject);
  };
  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
