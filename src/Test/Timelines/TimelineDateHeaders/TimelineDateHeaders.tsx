import * as React from 'react';
import format from 'date-fns/format';
import { useTimelineContext } from '../useTimelineContext/useTimelineContext';
import { Timescale } from '../useTimelineContext/timescale';
import * as styles from './TimelineDateHeaders.styles';

export const TimelineDateHeaders: React.FC = () => {
  const { eachDateOfTimescale, timescale } = useTimelineContext();

  const dates = eachDateOfTimescale();

  console.log({ dates });

  const monthAbbrev = 'MMM';
  const dayAbbrev = 'EEE';
  const dayOfMonth = 'd';

  const formatForTimescale = {
    [Timescale.week]: `${dayAbbrev} ${dayOfMonth}`,
    [Timescale.month]: `${dayOfMonth}`,
    [Timescale.quarter]: `${monthAbbrev} ${dayOfMonth}`,
    [Timescale.year]: `${monthAbbrev}`,
  }[timescale];

  const datesInInterval = dates.length;

  return (
    <table css={styles.table()}>
      <thead>
        <tr>
          {dates.map((date) => (
            <th
              css={styles.th({ datesInInterval })}
              key={'header-' + date.toISOString()}
            >
              {format(date, formatForTimescale)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {dates.map((date) => (
            <td
              key={'body-' + date.toISOString()}
              css={styles.td({ datesInInterval })}
            />
          ))}
        </tr>
      </tbody>
    </table>
  );
};
