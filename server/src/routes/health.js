import { Router } from 'express'
import { testConnection } from '../db/pool.js'

const router = Router()

router.get('/health', async (_req, res) => {
  try {
    await testConnection()
    res.json({
      status: 'ok',
      service: 'order-app-server',
      database: 'connected',
    })
  } catch (err) {
    res.status(503).json({
      status: 'degraded',
      service: 'order-app-server',
      database: 'disconnected',
      error: err.message,
    })
  }
})

export default router
