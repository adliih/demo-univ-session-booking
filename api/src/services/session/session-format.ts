import type { Session } from '@prisma/client'
import { eachDayOfInterval, format, getDay } from 'date-fns'

import { config } from './config'

export const constructSessions = (
  bookedSession: Session[],
  startDate: Date,
  endDate: Date
) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate })
    //only include dean available days of week
    .filter((day) => config.deanAvailableDaysOfWeek.includes(getDay(day)))
    // format the date object
    .map((day) => format(day, config.format))

  return days.flatMap((day) => toSession(bookedSession, day))
}

const toSession = (bookedSessions: Session[], date: string) => {
  return config.deanAvailableTimesOfDay.map((time) => {
    const bookedSession = bookedSessions.find(
      (session) => session.date === date && session.time === time
    )

    return bookedSession || { date, time, status: 'free' }
  })
}
