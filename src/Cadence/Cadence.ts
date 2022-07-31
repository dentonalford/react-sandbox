import {
  eachDayOfInterval,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns'

import { WeekStartsOn, Interval, Periods } from './types'

import { getSquareWeeks } from './util/getSquareWeeks'

type CadenceOptions = {
  /** Span of time covered by the interval */
  period?: Periods
  /** Target Date for the current interval */
  targetDate?: Date
  /** Index for the day of the week we consider the "start" */
  weekStartsOn?: WeekStartsOn
}

const DEFAULT_OPTIONS: Partial<CadenceOptions> = {
  period: Periods.week,
  targetDate: new Date(),
  weekStartsOn: 0,
}

type IntervalMethod = (date: number | Date) => Date

const getIntervalMethods = (
  period: CadenceOptions['period'],
  weekStartsOn: WeekStartsOn
): [IntervalMethod, IntervalMethod] => {
  switch (period) {
    case Periods.day:
      return [startOfDay, endOfDay]
    case Periods.week:
      return [
        (date) => startOfWeek(date, { weekStartsOn }),
        (date) => endOfWeek(date, { weekStartsOn }),
      ]
    case Periods.month:
      return [startOfMonth, endOfMonth]
    default:
      throw new Error('Unsupported period value!')
  }
}

export class Cadence {
  interval: Interval
  period: CadenceOptions['period']
  targetDate: CadenceOptions['targetDate']
  weekStartsOn: CadenceOptions['weekStartsOn']

  constructor(options: CadenceOptions) {
    this.weekStartsOn = options.weekStartsOn || DEFAULT_OPTIONS.weekStartsOn
    this.targetDate = startOfDay(
      options.targetDate || DEFAULT_OPTIONS.targetDate
    )
    this.period = options.period || DEFAULT_OPTIONS.period

    const [startOfInterval, endOfInterval] = getIntervalMethods(
      this.period,
      this.weekStartsOn
    )

    this.interval = {
      start: startOfInterval(this.targetDate),
      end: endOfInterval(this.targetDate),
    }
  }

  get intervalDays() {
    return eachDayOfInterval(this.interval)
  }

  get intervalWeeks() {
    return getSquareWeeks(this.interval, { weekStartsOn: this.weekStartsOn })
  }
}
