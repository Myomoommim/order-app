import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import {
  getAdminOrders,
  getDashboardStats,
  getInventory,
  updateMenuStock,
  updateOrderStatus,
} from '../services/adminService.js'

const router = Router()

router.get(
  '/admin/dashboard',
  asyncHandler(async (_req, res) => {
    const stats = await getDashboardStats()
    res.json(stats)
  }),
)

router.get(
  '/admin/menus/stock',
  asyncHandler(async (_req, res) => {
    const inventory = await getInventory()
    res.json({ inventory })
  }),
)

router.patch(
  '/admin/menus/:menuId/stock',
  asyncHandler(async (req, res) => {
    const item = await updateMenuStock(req.params.menuId, req.body.delta)
    res.json({ item })
  }),
)

router.get(
  '/admin/orders',
  asyncHandler(async (req, res) => {
    const orders = await getAdminOrders(req.query.status)
    res.json({ orders })
  }),
)

router.patch(
  '/admin/orders/:orderId/status',
  asyncHandler(async (req, res) => {
    const order = await updateOrderStatus(req.params.orderId, req.body.status)
    res.json({ order })
  }),
)

export default router
