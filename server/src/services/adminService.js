import { ORDER_STATUS, STATUS_TRANSITIONS } from '../constants/orderStatus.js'
import { getPool } from '../db/pool.js'
import { AppError } from '../utils/AppError.js'
import { getOrders } from './orderService.js'

export async function getDashboardStats() {
  const pool = getPool()
  const result = await pool.query(
    `SELECT
      COUNT(*) FILTER (WHERE status != $1)::int AS total,
      COUNT(*) FILTER (WHERE status = $2)::int AS received,
      COUNT(*) FILTER (WHERE status = $3)::int AS in_progress,
      COUNT(*) FILTER (WHERE status = $4)::int AS completed
     FROM orders`,
    [
      ORDER_STATUS.COMPLETED,
      ORDER_STATUS.RECEIVED,
      ORDER_STATUS.IN_PROGRESS,
      ORDER_STATUS.COMPLETED,
    ],
  )

  const row = result.rows[0]
  return {
    total: row.total,
    received: row.received,
    inProgress: row.in_progress,
    completed: row.completed,
  }
}

export async function getInventory() {
  const pool = getPool()
  const result = await pool.query(
    `SELECT id, name, stock FROM menus ORDER BY name`,
  )

  return result.rows.map((row) => ({
    menuId: row.id,
    menuName: row.name,
    stock: row.stock,
  }))
}

export async function updateMenuStock(menuId, delta) {
  if (typeof delta !== 'number' || delta === 0) {
    throw new AppError(400, 'INVALID_DELTA', '재고 변경 값이 올바르지 않습니다.')
  }

  const pool = getPool()
  const result = await pool.query(
    `UPDATE menus
     SET stock = GREATEST(0, stock + $1), updated_at = NOW()
     WHERE id = $2
     RETURNING id, name, stock`,
    [delta, menuId],
  )

  if (result.rowCount === 0) {
    throw new AppError(404, 'MENU_NOT_FOUND', '메뉴를 찾을 수 없습니다.')
  }

  const row = result.rows[0]
  return {
    menuId: row.id,
    menuName: row.name,
    stock: row.stock,
  }
}

export async function updateOrderStatus(orderId, nextStatus) {
  const pool = getPool()
  const current = await pool.query(
    `SELECT id, status FROM orders WHERE id = $1`,
    [orderId],
  )

  if (current.rowCount === 0) {
    throw new AppError(404, 'ORDER_NOT_FOUND', '주문을 찾을 수 없습니다.')
  }

  const currentStatus = current.rows[0].status
  const allowedNext = STATUS_TRANSITIONS[currentStatus]

  if (allowedNext !== nextStatus) {
    throw new AppError(
      400,
      'INVALID_STATUS_TRANSITION',
      `현재 상태(${currentStatus})에서 ${nextStatus}(으)로 변경할 수 없습니다.`,
    )
  }

  await pool.query(
    `UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2`,
    [nextStatus, orderId],
  )

  const orders = await getOrders()
  return orders.find((o) => o.id === orderId)
}

export { getOrders as getAdminOrders }
