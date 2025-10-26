import { Knex } from 'knex'
import 'dotenv/config'

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

console.log(`**********************DB NAME: ${DB_HOST}`)
const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  migrations: {
    directory: './migrations',
  },
}

export default config
