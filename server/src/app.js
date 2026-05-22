import express from 'express'
import cors from 'cors'
import config from './config/index.js'
import healthRouter from './routes/health.js'

const app = express()

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  }),
)
app.use(express.json())

app.use('/api', healthRouter)

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `경로를 찾을 수 없습니다: ${req.method} ${req.path}`,
    },
  })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: '서버 오류가 발생했습니다.',
    },
  })
})

export default app
