import { Router } from 'express'
import { uuid } from 'uuidv4'
import { startOfHour, parseISO, isEqual } from 'date-fns'

import Appointment from '../models/Appointment'

const appointmentsRouter = Router()

const appointments: Appointment[] = []

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  /** Pega o date da requisição e transaforma ele num elemento date com a hora inicial. */
  const parsedDate = startOfHour(parseISO(date))

  /** Procura no array de appointments se tem data igual a recebida na requisição.
      O metodo isEqual compara a data de cada appointment com a date da requisição para ver se são iguais.
  */
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date)
  )

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' })
  }

  /** O uuid não é declarado porque esse tratamento foi feito no model de Appointment */
  const appointment = new Appointment(provider, parsedDate)

  appointments.push(appointment)

  return response.json(appointment)
})

export default appointmentsRouter
