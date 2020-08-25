/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/** Quando coloca o Entity em cima da classe quer dizer que classe é um parametro
que está passando para a entidade  */
@Entity('users')
class User {
  /** Coluna da primarykey id */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Coluna de nome */
  @Column()
  name: string;

  /** Coluna email */
  @Column()
  email: string;

  /** Coluna password */
  @Column()
  password: string;

  /** Coluna created_at */
  @CreateDateColumn()
  created_at: Date;

  /** Coluna updated_at */
  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
