import { format } from 'date-fns'
import type { MutationResolvers, QueryResolvers } from 'types/graphql'

import { RedwoodUser } from 'src/lib/auth'
import { db } from 'src/lib/db'

import { config } from './config'
import { constructAvailableSessions } from './session-format'

export const availableSessions: QueryResolvers['availableSessions'] = async (
  args
) => {
  let { endDate, startDate } = args
  endDate = endDate as Date
  startDate = startDate as Date

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

export const bookSession: MutationResolvers['bookSession'] = async (
  args,
  { context }
) => {
  const { time } = args
  const date = format(args.date as Date, config.format)
  const { id: studentUserId } = context.currentUser as RedwoodUser

  const isSlotAlreadyBooked = await db.session.count({
    where: {
      time,
      date,
      status: 'booked',
    },
  })

  if (isSlotAlreadyBooked) {
    throw new Error('Session already booked')
  }

  const session = await db.session.create({
    data: {
      date,
      time,
      status: 'booked',
      studentUserId,
    },
  })

  return session
}
