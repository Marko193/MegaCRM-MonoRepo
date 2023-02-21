import dayjs from 'dayjs';

export const datesDifference = (startDate: string, endDate: string) => {
  const date1 = dayjs(startDate);
  const date2 = dayjs(endDate);

  const hours = date2.diff(date1, 'hours');
  const days = Math.floor(hours / 24);
  return days;
};
