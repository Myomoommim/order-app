import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'
import 'dotenv/config'
import { parseDatabaseUrl } from '../src/db/parseDatabaseUrl.js'
import { withPgSsl } from '../src/db/pgOptions.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbDir = path.join(__dirname, '../src/db')

async function readSql(filename) {
  return fs.readFile(path.join(dbDir, filename), 'utf8')
}

async function ensureDatabase(adminUrl, database) {
  const client = new pg.Client(withPgSsl(adminUrl))
  await client.connect()

  try {
    const exists = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [database],
    )

    if (exists.rowCount === 0) {
      await client.query(`CREATE DATABASE ${database}`)
      console.log(`데이터베이스 생성: ${database}`)
    } else {
      console.log(`데이터베이스 이미 존재: ${database}`)
    }
  } finally {
    await client.end()
  }
}

async function runSqlFile(connectionString, filename) {
  const sql = await readSql(filename)
  const client = new pg.Client(withPgSsl(connectionString))
  await client.connect()

  try {
    await client.query(sql)
    console.log(`${filename} 적용 완료`)
  } finally {
    await client.end()
  }
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL이 없습니다. server/.env 파일을 확인하세요.')
  }

  const { database, adminUrl, appUrl } = parseDatabaseUrl(databaseUrl)

  console.log('PostgreSQL 초기화 시작...')
  const isManagedCloud = databaseUrl.includes('render.com')
  if (!isManagedCloud) {
    await ensureDatabase(adminUrl, database)
  } else {
    console.log(`관리형 DB 사용 — 생성 단계 생략: ${database}`)
  }
  await runSqlFile(appUrl, 'schema.sql')
  await runSqlFile(appUrl, 'seed.sql')
  console.log('PostgreSQL 초기화 완료')
}

main().catch((err) => {
  console.error('DB 초기화 실패:', err.message)
  process.exit(1)
})
