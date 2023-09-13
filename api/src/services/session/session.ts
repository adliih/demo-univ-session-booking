import { format } from 'date-fns'
import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

import { config } from './config'
import { constructAvailableSessions } from './session-format'

export const availableSessions: QueryResolvers['availableSessions'] =
  async (args: { startDate: Date; endDate: Date }) => {
    const { endDate, startDate } = args
    const bookedSession = await db.session.findMany({
      where: {
        date: {
          gte: format(startDate, config.format),
          lte: format(endDate, config.format),
        },
        status: 'booked',
      },
    })

    return constructAvailableSessions(bookedSession, startDate, endDate)
  }
export const bookSession = () => {}
