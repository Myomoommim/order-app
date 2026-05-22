import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { getMenusForOrder } from '../services/menuService.js'

const router = Router()

router.get(
  '/menus',
  asyncHandler(async (_req, res) => {
    const menus = await getMenusForOrder()
    res.json({ menus })
  }),
)

export default router
