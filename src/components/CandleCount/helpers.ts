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
