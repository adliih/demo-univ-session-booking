import type { Session } from '@prisma/client'

import { constructAvailableSessions } from './session-format'

describe('session-format', () => {
  describe('constructAvailableSessions', () => {
    it('should construct fully available when no booked session found', () => {
      const result = constructAvailableSessions(
        [],
        new Date(2023, 8, 11),
        new Date(2023, 8, 18)
      )
      const expected: Partial<Session>[] = [
        {
          date: '2023-09-14',
          time: '10:00',
          status: 'free',
        },
        {
          date: '2023-09-15',
          time: '10:00',
          status: 'free',
        },
      ]

      expect(result).toStrictEqual(expect.arrayContaining(expected))
    })
    it('should exclude booked session', () => {
      const result = constructAvailableSessions(
        [
          {
            date: '2023-09-14',
            time: '10:00',
          },
        ] as Partial<Session>[] as Session[],
        new Date(2023, 8, 11),
        new Date(2023, 8, 18)
      )
      const expected: Partial<Session>[] = [
        {
          date: '2023-09-15',
          time: '10:00',
          status: 'free',
        },
      ]

      expect(result).toStrictEqual(expect.arrayContaining(expected))
    })
  })
})
