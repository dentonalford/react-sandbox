import { addDays, startOfDay } from 'date-fns';

export const makeRandomDateRangeFromToday = (): { start: Date; end: Date } => {
  const baseDate = startOfDay(new Date());

  const start = addDays(baseDate, -1 * inclusiveRandomNumber(0, 7));
  const end = addDays(baseDate, inclusiveRandomNumber(0, 7));

  return { start, end };
};

const inclusiveRandomNumber = (min: number, max: number) => {
  const randomNum = Math.random() * (max - min) + min;
  return Math.round(randomNum);
};
