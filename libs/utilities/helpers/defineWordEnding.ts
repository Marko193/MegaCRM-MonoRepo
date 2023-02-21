export const defineWordEndingAfterNumber = (
  number: number,
  one: string,
  two: string,
  five: string,
  lang: string
) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (lang === 'day') {
    if (number === 1) {
      return one;
    }
  } else {
    if (n === 1) {
      return one;
    }
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};
