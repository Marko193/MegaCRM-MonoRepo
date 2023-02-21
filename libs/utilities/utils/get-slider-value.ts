import dayjs from 'dayjs';

export const getSliderValue = (startDate: string, endDate: string) => {
  const start = dayjs(startDate).valueOf();
  const end = dayjs(endDate).valueOf();
  const currentDay = dayjs().valueOf();
  return ((currentDay - start) * 100) / (end - start);
};
