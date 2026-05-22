import app from './app.js'
import config from './config/index.js'
import { testConnection } from './db/pool.js'

async function start() {
  try {
    await testConnection()
    console.log('Database connected')
  } catch (err) {
    console.error('Database connection failed:', err.message)
    console.error('server/.env 의 DATABASE_URL을 확인하고 npm run db:init 을 실행하세요.')
    process.exit(1)
  }

  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`)
    console.log(`CORS origin: ${config.corsOrigin}`)
  })
}

start()
