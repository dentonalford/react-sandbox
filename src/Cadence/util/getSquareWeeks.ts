import type { Interval, WeekStartsOn } from '../types'
import { eachWeekOfInterval, eachDayOfInterval, endOfWeek } from 'date-fns'

type GetSquareWeeks = (
  interval: Interval,
  options: { weekStartsOn: WeekStartsOn }
) => Array<Date>

/**
 * Utility function to get "squared" weeks - any partial week within
 * the interval based on the `weekStartsOn` setting will be filled out
 * to the start or end of the week.
 *
 * e.g.
 *  for an interval from Tu 05 to Mo 11, and a weekStartsOn of Sunday
 *  [Su 03, Mo 04, Tu 05, We 06, Th 07, Fr 08, Sa 09,
 *   Su 10, Mo 11, Tu 12, We 13, Th 14, Fr 15, Sa 17]
 */
export const getSquareWeeks: GetSquareWeeks = (interval, { weekStartsOn }) => {
  const weekStartDates = eachWeekOfInterval(interval, { weekStartsOn })

  return weekStartDates.reduce<Array<Date>>((acc, weekStart) => {
    const weekDays = eachDayOfInterval({
      start: weekStart,
      end: endOfWeek(weekStart, { weekStartsOn }),
    })
    return [...acc, ...weekDays]
  }, [])
}
