import * as React from 'react';
import { areIntervalsOverlapping, differenceInCalendarDays } from 'date-fns';
import { makeRandomDateRangeFromToday } from '../mocks/generateDates';
import { Bar } from '../Bar/Bar';
import { useTimelineContext } from '../useTimelineContext/useTimelineContext';
import * as styles from './Bars.styles';

export const Bars: React.FC = () => {
  const {
    timescale,
    startOfInterval,
    endOfInterval,
    eachDateOfTimescale,
  } = useTimelineContext();

  const timescaleInterval = {
    start: startOfInterval,
    end: endOfInterval,
  };

  const bars = Array(10)
    .fill(null)
    .map(() => makeRandomDateRangeFromToday());

  const totalDates = eachDateOfTimescale().length;

  const lookupPct = (startIndex, endIndex) => ({
    startPct: (startIndex / totalDates) * 100,
    endPct: (endIndex / totalDates) * 100,
  });

  return (
    <div css={styles.bars}>
      {bars.map((bar) => {
        console.log({ ...bar });
        return areIntervalsOverlapping(timescaleInterval, bar) ? (
          <Bar
            key={`${bar.start.toISOString()}:${bar.end.toISOString()}`}
            {...lookupPct(
              differenceInCalendarDays(bar.start, startOfInterval),
              differenceInCalendarDays(bar.end, startOfInterval)
            )}
          />
        ) : null;
      })}
    </div>
  );
};
