import pg from 'pg'
import config from '../config/index.js'

const { Pool } = pg

let pool

export function getPool() {
  if (!config.databaseUrl) {
    throw new Error('DATABASE_URL이 설정되지 않았습니다. server/.env 파일을 확인하세요.')
  }

  if (!pool) {
    pool = new Pool({
      connectionString: config.databaseUrl,
    })
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
