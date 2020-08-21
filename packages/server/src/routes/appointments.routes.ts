import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentsService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

appointmentsRouter.get('/', (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = appointmentsRepository.find()

  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body

    /** Pega o date da requisição e transaforma ele num elemento date. */
    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentsService()

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider
    })

    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default appointmentsRouter
