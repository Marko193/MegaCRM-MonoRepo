export const clearLocalStorageKey = (key: string[]) =>
  key.forEach((k: string) => localStorage.removeItem(k));

export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item !== null ? item : ' ';
};
