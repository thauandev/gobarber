/* eslint-disable space-before-function-paren */
import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request {
  provider: string
  date: Date
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository
  // Recebe o repositório como uma variável do constructor
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ provider, date }: Request): Appointment {
    // Transforma a data em uma data com a hora inicial Ex: Toda a data que for 13 e alguma coisa vai ser 13:00
    const appointmentDate = startOfHour(date)

    /** Utiliza o metodo findByDate do repositório para verificar se já tem um agendamento criado na data */
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      date
    )

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
