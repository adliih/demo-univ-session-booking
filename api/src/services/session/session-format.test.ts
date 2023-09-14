import type { Session, User } from '@prisma/client'

import { constructSessions } from './session-format'

describe('session-format', () => {
  describe('constructSessions', () => {
    const deans = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ] as Partial<User>[] as User[]

    const startDate = new Date(2023, 8, 11)
    const endDate = new Date(2023, 8, 18)

    it('should construct fully available when no booked session found', () => {
      const result = constructSessions(deans, [], startDate, endDate)
      const expected: Partial<Session>[] = [
        {
          date: '2023-09-14',
          startTime: '10:00',
          endTime: '11:00',
          status: 'free',
          deanUserId: 1,
        },
        {
          date: '2023-09-14',
          startTime: '10:00',
          endTime: '11:00',
          status: 'free',
          deanUserId: 2,
        },
        {
          date: '2023-09-15',
          startTime: '10:00',
          endTime: '11:00',
          status: 'free',
          deanUserId: 1,
        },
        {
          date: '2023-09-15',
          startTime: '10:00',
          endTime: '11:00',
          status: 'free',
          deanUserId: 2,
        },
      ]

      expect(result).toStrictEqual(expect.arrayContaining(expected))
    })
    it('should exclude booked session', () => {
      const bookedSessions = [
        {
          date: '2023-09-14',
          startTime: '10:00',
          endTime: '11:00',
          status: 'booked',
          deanUserId: 2,
          studentUserId: 1,
        },
      ] as Partial<Session>[] as Session[]

      const result = constructSessions(
        deans,
        bookedSessions,
        startDate,
        endDate
      )
      const expected: Partial<Session>[] = [
        {
          date: '2023-09-14',
          startTime: '10:00',
          endTime: '11:00',
          status: 'free',
          deanUserId: 1,
        },
        {
          date: '2023-09-14',
          startTime: '10:00',
          endTime: '11:00',
          status: 'booked',
          deanUserId: 2,
          studentUserId: 1,
        },
        {
          date: '2023-09-15',
          startTime: '10:00',
          endTime: '11:00',
          status: 'free',
          deanUserId: 1,
        },
        {
          date: '2023-09-15',
          startTime: '10:00',
          endTime: '11:00',
          status: 'free',
          deanUserId: 2,
        },
      ]

      expect(result).toStrictEqual(expect.arrayContaining(expected))
    })
  })
})
