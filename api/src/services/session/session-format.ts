import type { Session } from '@prisma/client'
import { eachDayOfInterval, format, getDay } from 'date-fns'

import { config } from './config'

export const constructAvailableSessions = (
  bookedSession: Session[],
  startDate: Date,
  endDate: Date
) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate })
    //only include dean available days of week
    .filter((day) => config.deanAvailableDaysOfWeek.includes(getDay(day)))
    // format the date object
    .map((day) => format(day, config.format))
    // exclude the day where it is already booked
    .filter((day) => !bookedSession.some((session) => session.date === day))

  return days.flatMap(formatToAvailableSession)
}

const formatToAvailableSession = (date: string) => {
  return config.deanAvailableTimesOfDay.map((time) => ({
    date,
    time,
    status: 'free',
  }))
}
