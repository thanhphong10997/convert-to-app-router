import { describe, expect, test } from '@jest/globals'
import { formatDate, getPastTime } from '../date'

describe('test date function files', () => {
  describe('test getPastTime function', () => {
    const t = (key: string) => key

    test('should return recently', () => {
      const input = new Date(Date.now() - 1000 * 60 * 60) // 1 hour
      expect(getPastTime(input, t)).toBe('recently')
    })

    test('should return days', () => {
      const input = new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day
      expect(getPastTime(input, t)).toBe('1 days')
    })

    test('should return month', () => {
      const input = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 3) // 1 month
      expect(getPastTime(input, t)).toBe('3 month')
    })

    test('should return year', () => {
      const input = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 2) // 1 year
      expect(getPastTime(input, t)).toBe('2 year')
    })
  })

  describe('test formatDate function', () => {
    test('test default formatting', () => {
      const input = new Date('2025-03-08')
      expect(formatDate(input)).toBe('8/3/2025')
    })

    test('test custom formatting', () => {
      const input = new Date('2025-03-08')
      const formatting: any = { day: 'numeric', month: 'long', year: 'numeric' }
      expect(formatDate(input, formatting)).toBe('8 tháng 3, 2025')
    })
  })
})
