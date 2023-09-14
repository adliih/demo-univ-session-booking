import type { Session, User } from '@prisma/client'
import { eachDayOfInterval, format, getDay } from 'date-fns'

import { config } from './config'

export const constructSessions = (
  deans: User[],
  bookedSession: Session[],
  startDate: Date,
  endDate: Date
) => {
  return (
    eachDayOfInterval({ start: startDate, end: endDate })
      //only include dean available days of week
      .filter((day) => config.deanAvailableDaysOfWeek.includes(getDay(day)))
      // format the date object
      .map((day) => format(day, config.format))
      .flatMap((day) => toSessionForEachDean(day, deans))
      .flatMap(({ date, deanUserId }) =>
        toSession(bookedSession, date, deanUserId)
      )
      .sort(sortByDateTimeThenDean)
  )
}

const toSessionForEachDean = (date: string, deans: User[]) => {
  return deans.map((dean) => ({
    date,
    deanUserId: dean.id,
  }))
}

const toSession = (
  bookedSessions: Session[],
  date: string,
  deanUserId: number
) => {
  return config.deanAvailableTimesOfDay.map(({ startTime, endTime }) => {
    const bookedSession = bookedSessions.find(
      (session) =>
        session.date === date &&
        session.startTime === startTime &&
        session.endTime === endTime &&
        session.deanUserId === deanUserId
    )

    return (
      bookedSession || { date, startTime, endTime, status: 'free', deanUserId }
    )
  })
}

const sortByDateTimeThenDean = (
  a: {
    date: string
    startTime: string
    deanUserId: number
  },
  b: {
    date: string
    startTime: string
    deanUserId: number
  }
) => {
  if (a.date < b.date) {
    return -1
  } else if (a.date > b.date) {
    return 1
  }

  if (a.startTime < a.startTime) {
    return -1
  } else if (a.startTime > b.startTime) {
    return 1
  }

  if (a.deanUserId < b.deanUserId) {
    return -1
  } else if (a.deanUserId > b.deanUserId) {
    return 1
  }

  return 0
}
