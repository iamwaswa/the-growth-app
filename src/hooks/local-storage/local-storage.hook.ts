"use client";

import { useEffectEvent, useLayoutEffect, useState } from "react";

export function useLocalStorage<TStoredValue>(
  key: string,
  initialValue: TStoredValue,
) {
  const [storedValue, setStoredValue] = useState<TStoredValue>(initialValue);

  const loadLocalStorageValue = useEffectEvent(() => {
    let value: TStoredValue;

    if (typeof window === "undefined") {
      value = initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      value = item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      value = initialValue;
    }

    setStoredValue(value);
  });

  useLayoutEffect(() => {
    loadLocalStorageValue();
  }, []);

  function setValue(
    updaterOrUpdatedValue: TStoredValue | ((val: TStoredValue) => TStoredValue),
  ) {
    const valueToStore =
      updaterOrUpdatedValue instanceof Function
        ? updaterOrUpdatedValue(storedValue)
        : updaterOrUpdatedValue;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  }

  return [storedValue, setValue] as const;
}
