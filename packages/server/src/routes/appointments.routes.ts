import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  /** Pega o date da requisição e transaforma ele num elemento date com a hora inicial. */
  const parsedDate = startOfHour(parseISO(date))

  /** Utiliza o metodo findByDate do repositório para verificar se já tem um agendamento criado na data */
  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate
  )

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' })
  }

  const appointment = appointmentsRepository.create(provider, parsedDate)

  return response.json(appointment)
})

export default appointmentsRouter
