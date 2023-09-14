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
  return config.deanAvailableTimesOfDay.map((time) => {
    const bookedSession = bookedSessions.find(
      (session) =>
        session.date === date &&
        session.time === time &&
        session.deanUserId === deanUserId
    )

    return bookedSession || { date, time, status: 'free', deanUserId }
  })
}
