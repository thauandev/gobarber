import { createConnection } from 'typeorm'

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'gostack_gobarber',
  entities: ['../models/*.ts'],
  synchronize: true,
  logging: false
})
