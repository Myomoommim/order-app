import express from 'express'
import cors from 'cors'
import config from './config/index.js'
import { AppError } from './utils/AppError.js'
import healthRouter from './routes/health.js'
import menusRouter from './routes/menus.js'
import ordersRouter from './routes/orders.js'
import adminRouter from './routes/admin.js'

const app = express()

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  }),
)
app.use(express.json())

app.use('/api', healthRouter)
app.use('/api', menusRouter)
app.use('/api', ordersRouter)
app.use('/api', adminRouter)

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `경로를 찾을 수 없습니다: ${req.method} ${req.path}`,
    },
  })
})

app.use((err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { code: err.code, message: err.message },
    })
  }

  console.error(err)
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: '서버 오류가 발생했습니다.',
    },
  })
})

export default app
