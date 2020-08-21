/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

/** Quando coloca o Entity em cima da classe quer dizer que classe é um parametro
que está passando para a entidade  */
@Entity('appointments')
class Appointment {
  /** Coluna da primarykey id */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /** Coluna de provider */
  @Column()
  provider: string

  /** Coluna date */
  @Column('time with time zone')
  date: Date

  /** Coluna created_at */
  @CreateDateColumn()
  created_at: Date

  /** Coluna updated_at */
  @UpdateDateColumn()
  updated_ate: Date
}

export default Appointment
