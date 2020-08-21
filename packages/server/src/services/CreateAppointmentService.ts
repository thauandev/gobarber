/* eslint-disable space-before-function-paren */
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request {
  provider: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    // Transforma a data em uma data com a hora inicial Ex: Toda a data que for 13 e alguma coisa vai ser 13:00
    const appointmentDate = startOfHour(date)

    /** Utiliza o metodo findByDate do repositório para verificar se já tem um agendamento criado na data */
    const findAppointmentInSameDate = appointmentsRepository.findByDate(date)

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
