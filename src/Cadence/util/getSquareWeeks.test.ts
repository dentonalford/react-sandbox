import { startOfDay, eachDayOfInterval, isSameDay } from 'date-fns'
import { getSquareWeeks } from './getSquareWeeks'

describe('getSquareWeeks', () => {
  test('returns full week for single day interval', () => {
    const interval = {
      start: new Date(2022, 6, 12),
      end: new Date(2022, 6, 12),
    }
    const result = getSquareWeeks(interval, { weekStartsOn: 0 })
    const expected = eachDayOfInterval({
      start: startOfDay(new Date(2022, 6, 10)),
      end: startOfDay(new Date(2022, 6, 16)),
    })

    const expectedLength = 7
    expect(result).toHaveLength(expectedLength)
    for (let n = 0; n < expectedLength; n++) {
      expect(isSameDay(result[n], expected[n]))
    }
  })

  test('returns full week for partial week interval', () => {
    const interval = {
      start: new Date(2022, 6, 12),
      end: new Date(2022, 6, 14),
    }
    const result = getSquareWeeks(interval, { weekStartsOn: 0 })
    const expected = eachDayOfInterval({
      start: startOfDay(new Date(2022, 6, 10)),
      end: startOfDay(new Date(2022, 6, 16)),
    })

    const expectedLength = 7
    expect(result).toHaveLength(expectedLength)
    for (let n = 0; n < expectedLength; n++) {
      expect(isSameDay(result[n], expected[n]))
    }
  })

  test('returns two full weeks for multi week interval', () => {
    const interval = {
      start: new Date(2022, 6, 12),
      end: new Date(2022, 6, 20),
    }
    const result = getSquareWeeks(interval, { weekStartsOn: 0 })
    const expected = eachDayOfInterval({
      start: startOfDay(new Date(2022, 6, 10)),
      end: startOfDay(new Date(2022, 6, 23)),
    })

    const expectedLength = 14
    expect(result).toHaveLength(expectedLength)
    for (let n = 0; n < expectedLength; n++) {
      expect(isSameDay(result[n], expected[n]))
    }
  })

  test('returns two full weeks for full two week interval', () => {
    const interval = {
      start: new Date(2022, 6, 10),
      end: new Date(2022, 6, 23),
    }
    const result = getSquareWeeks(interval, { weekStartsOn: 0 })
    const expected = eachDayOfInterval({
      start: startOfDay(new Date(2022, 6, 10)),
      end: startOfDay(new Date(2022, 6, 23)),
    })

    const expectedLength = 14
    expect(result).toHaveLength(expectedLength)
    for (let n = 0; n < expectedLength; n++) {
      expect(isSameDay(result[n], expected[n]))
    }
  })

  test('respects weekStartsOn', () => {
    const interval = {
      start: new Date(2022, 6, 10),
      end: new Date(2022, 6, 23),
    }
    const result = getSquareWeeks(interval, { weekStartsOn: 1 })
    const expected = eachDayOfInterval({
      start: startOfDay(new Date(2022, 6, 4)),
      end: startOfDay(new Date(2022, 6, 24)),
    })

    const expectedLength = 21
    expect(result).toHaveLength(expectedLength)
    for (let n = 0; n < expectedLength; n++) {
      expect(isSameDay(result[n], expected[n]))
    }
  })
})
