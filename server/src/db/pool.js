import pg from 'pg'
import config from '../config/index.js'
import { withPgSsl } from './pgOptions.js'

const { Pool } = pg

let pool

export function getPool() {
  if (!config.databaseUrl) {
    throw new Error('DATABASE_URL이 설정되지 않았습니다. server/.env 파일을 확인하세요.')
  }

  if (!pool) {
    pool = new Pool(withPgSsl(config.databaseUrl))
  }

  return pool
}

export async function testConnection() {
  const client = await getPool().connect()
  try {
    await client.query('SELECT 1')
    return true
  } finally {
    client.release()
  }
}

export async function closePool() {
  if (pool) {
    await pool.end()
    pool = undefined
  }
}
