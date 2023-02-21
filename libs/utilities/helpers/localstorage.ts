export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item !== null ? item : ' ';
};
