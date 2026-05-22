import 'dotenv/config'

function parseCorsOrigins(value) {
  return (value || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

const config = {
  port: Number(process.env.PORT) || 3000,
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN),
  databaseUrl: process.env.DATABASE_URL || '',
  nodeEnv: process.env.NODE_ENV || 'development',
}

export default config
