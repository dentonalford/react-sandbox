import * as React from 'react'
import { eachDayOfInterval, format, startOfWeek, endOfWeek } from 'date-fns'
import { Cadence } from '../Cadence'
import { Periods, WeekStartsOn } from '../types'

type IntervalDaysProps = {
  period: Periods
  weekStartsOn: WeekStartsOn
}

export const IntervalDays: React.VFC<IntervalDaysProps> = ({
  period,
  weekStartsOn,
}) => {
  const cadence = React.useMemo(
    () =>
      new Cadence({
        period,
        weekStartsOn,
      }),
    [period, weekStartsOn]
  )

  const daysOfWeek = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn }),
    end: endOfWeek(new Date(), { weekStartsOn }),
  })

  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
      }}
    >
      {daysOfWeek.map((day) => (
        <div>{format(day, 'EEEEEE')}</div>
      ))}
      {cadence.intervalDays.map((day) => (
        <div>{format(day, 'MM-dd')}</div>
      ))}
    </div>
  )
}