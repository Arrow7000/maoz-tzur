import { useState } from "react";

export function useLocalStorage(
  key: string,
  defaultValue?: string
): [string | undefined, (val?: string) => void] {
  const [stateValue, setStateValue] = useState(() => {
    return localStorage.getItem(key) || defaultValue;
  });

  const setter = (newValue?: string) => {
    setStateValue(newValue);

    newValue !== undefined
      ? localStorage.setItem(key, newValue)
      : localStorage.removeItem(key);
  };

  return [stateValue, setter];
}
