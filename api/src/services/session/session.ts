import { format } from 'date-fns'
import type {
  MutationResolvers,
  QueryResolvers,
  SessionRelationResolvers,
} from 'types/graphql'

import { ifAuthorized } from 'src/lib/auth'
import { db } from 'src/lib/db'

import { config } from './config'
import { constructSessions } from './session-format'

export const sessions: QueryResolvers['sessions'] = async (args) => {
  const endDate = args.endDate as Date
  const startDate = args.startDate as Date

  const sessions = await db.session.findMany({
    where: {
      date: {
        gte: format(startDate, config.format),
        lte: format(endDate, config.format),
      },
    },
    include: {
      studentUser: true,
    },
  })

  return constructSessions(sessions, startDate, endDate)
}

export const bookSession: MutationResolvers['bookSession'] = async (args) => {
  const { time } = args
  const date = format(args.date as Date, config.format)
  const { id: studentUserId } = context.currentUser

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

export const Session: SessionRelationResolvers = {
  studentUser: (_args, { root }) =>
    ifAuthorized(root.studentUserId === context.currentUser.id)(
      root.studentUserId &&
        db.user.findFirst({ where: { id: root.studentUserId } })
    ),
  studentUserId: (_args, { root }) =>
    ifAuthorized(root.studentUserId === context.currentUser.id)(
      root.studentUserId
    ),
}
