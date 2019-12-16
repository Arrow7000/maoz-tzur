import { useState } from "react";
import moment from "moment";

export function getInOrderOfPreference<T, V>(
  data: T[],
  itemMatches: (item: T, value: V) => boolean,
  ...preferredVals: V[]
): T | null {
  return preferredVals.reduce((last: T | null, preferredValue: V) => {
    if (last) {
      return last;
    } else {
      const found = data.find(item => itemMatches(item, preferredValue));
      return found ?? null;
    }
  }, null);
}

export function useLocalStorage(
  key: string,
  defaultValue?: string
): [string | undefined, (val: string) => void] {
  const value = localStorage.getItem(key) || defaultValue;

  const [stateValue, setStateValue] = useState(value);

  const setter = (newValue: string) => {
    localStorage.setItem(key, newValue);
  };

  if (stateValue) setter(stateValue);

  return [stateValue, setter];
}

export const pluralise = (n: number) => (n === 1 ? "" : "s");

export const momentDay = (date: Date | string) => moment(date).startOf("day");
