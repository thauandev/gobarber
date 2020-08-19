/* eslint-disable space-before-function-paren */
import { isEqual } from 'date-fns'

import Appointment from '../models/Appointment'

interface CreateAppointmentDTO {
  provider: string
  date: Date
}

class AppointmentsRepository {
  // o Private informa que appointments so será acessível pela classe AppointmentRepository
  private appointments: Appointment[]

  constructor() {
    this.appointments = []
  }

  public all(): Appointment[] {
    return this.appointments
  }

  /** Recebe a data e retorna um appointment caso encontrar, se não retorna nulo.  */
  public findByDate(date: Date): Appointment | null {
    /** Procura no array de appointments se tem data igual a recebida na requisição.
      O metodo isEqual compara a data de cada appointment com a date da requisição para ver se são iguais.
  */
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    )

    return findAppointment || null
  }

  // o metodo publico é acessivel por fora da classe(ao contrário do private)
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    /** O uuid não é declarado porque esse tratamento foi feito no model de Appointment */
    const appointment = new Appointment({ provider, date })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository
