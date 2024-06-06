import React, { useState } from "react";

const useLocalStorage = (key) => {
  const [storage, setStorage] = useState(
    JSON.parse(localStorage.getItem(key)) || null
  );

  localStorage.setItem(key, JSON.stringify(storage));

  const getItem = (getKey) => {
    return JSON.parse(localStorage.getItem(getKey));
  };

  const removeItem = (removeKey) => {
    localStorage.removeItem(removeKey);
  };

  return { setStorage, getItem, removeItem };
};

export default useLocalStorage;
