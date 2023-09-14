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

  const deans = await db.user.findMany({
    where: { roles: { some: { type: 'dean' } } },
  })

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

  return constructSessions(deans, sessions, startDate, endDate)
}

export const bookSession: MutationResolvers['bookSession'] = async (args) => {
  const { startTime, endTime, deanUserId } = args
  const date = format(args.date as Date, config.format)
  const { id: studentUserId } = context.currentUser

  // validate the deanUserId should be exist as user with dean role
  await db.user.findFirstOrThrow({
    where: { id: deanUserId, roles: { some: { type: 'dean' } } },
  })

  const isSlotAlreadyBooked = await db.session.count({
    where: {
      startTime,
      endTime,
      date,
      deanUserId,
      status: 'booked',
    },
  })

  if (isSlotAlreadyBooked) {
    throw new Error('Session already booked')
  }

  const session = await db.session.create({
    data: {
      date,
      startTime,
      endTime,
      deanUserId,
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
  deanUser: (_args, { root }) => {
    if (!root.deanUserId) {
      return
    }
    return db.user.findFirst({ where: { id: root.deanUserId } })
  },
}
