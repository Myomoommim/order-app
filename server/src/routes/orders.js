import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { createOrder, getOrderById } from '../services/orderService.js'

const router = Router()

router.post(
  '/orders',
  asyncHandler(async (req, res) => {
    const order = await createOrder(req.body.items)
    res.status(201).json({ order })
  }),
)

router.get(
  '/orders/:orderId',
  asyncHandler(async (req, res) => {
    const order = await getOrderById(req.params.orderId)
    res.json({ order })
  }),
)

export default router
