import { ORDER_STATUS } from '../constants/orderStatus.js'
import { getPool } from '../db/pool.js'
import { AppError } from '../utils/AppError.js'
import { toFullOptionId } from '../utils/optionId.js'

function mapOrderItemRows(itemRows, optionRows) {
  const optionsByItem = optionRows.reduce((acc, row) => {
    if (!acc[row.order_item_id]) acc[row.order_item_id] = []
    acc[row.order_item_id].push({
      name: row.option_name,
      price: row.option_price,
    })
    return acc
  }, {})

  return itemRows.map((row) => ({
    menuId: row.menu_id,
    menuName: row.menu_name,
    quantity: row.quantity,
    unitPrice: row.unit_price,
    lineTotal: row.line_total,
    options: optionsByItem[row.id] || [],
  }))
}

function formatOrder(orderRow, items) {
  return {
    id: orderRow.id,
    orderedAt: orderRow.ordered_at,
    createdAt: orderRow.ordered_at,
    status: orderRow.status,
    totalAmount: orderRow.total_amount,
    items,
  }
}

async function loadOrderById(client, orderId) {
  const orderResult = await client.query(
    `SELECT id, ordered_at, status, total_amount FROM orders WHERE id = $1`,
    [orderId],
  )

  if (orderResult.rowCount === 0) {
    throw new AppError(404, 'ORDER_NOT_FOUND', '주문을 찾을 수 없습니다.')
  }

  const itemsResult = await client.query(
    `SELECT id, menu_id, menu_name, quantity, unit_price, line_total
     FROM order_items WHERE order_id = $1`,
    [orderId],
  )

  const itemIds = itemsResult.rows.map((r) => r.id)
  let optionRows = []

  if (itemIds.length > 0) {
    const optionsResult = await client.query(
      `SELECT order_item_id, option_name, option_price
       FROM order_item_options
       WHERE order_item_id = ANY($1::uuid[])`,
      [itemIds],
    )
    optionRows = optionsResult.rows
  }

  return formatOrder(orderResult.rows[0], mapOrderItemRows(itemsResult.rows, optionRows))
}

export async function getOrderById(orderId) {
  const pool = getPool()
  const client = await pool.connect()
  try {
    return await loadOrderById(client, orderId)
  } finally {
    client.release()
  }
}

export async function createOrder(itemsInput) {
  if (!Array.isArray(itemsInput) || itemsInput.length === 0) {
    throw new AppError(400, 'INVALID_ITEMS', '주문 항목이 없습니다.')
  }

  const pool = getPool()
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const lineItems = []

    for (const input of itemsInput) {
      const { menuId, quantity, optionIds = [] } = input

      if (!menuId || !quantity || quantity < 1) {
        throw new AppError(400, 'INVALID_ITEM', '잘못된 주문 항목입니다.')
      }

      const menuResult = await client.query(
        `SELECT id, name, price, stock FROM menus WHERE id = $1 FOR UPDATE`,
        [menuId],
      )

      if (menuResult.rowCount === 0) {
        throw new AppError(400, 'MENU_NOT_FOUND', `메뉴를 찾을 수 없습니다: ${menuId}`)
      }

      const menu = menuResult.rows[0]

      if (menu.stock < quantity) {
        throw new AppError(
          409,
          'INSUFFICIENT_STOCK',
          `${menu.name} 재고가 부족합니다. (현재 ${menu.stock}개)`,
        )
      }

      let optionsTotal = 0
      const selectedOptions = []

      for (const optionId of optionIds) {
        const fullOptionId = toFullOptionId(menuId, optionId)
        const optionResult = await client.query(
          `SELECT id, name, price FROM options WHERE id = $1 AND menu_id = $2`,
          [fullOptionId, menuId],
        )

        if (optionResult.rowCount === 0) {
          throw new AppError(400, 'OPTION_NOT_FOUND', `옵션을 찾을 수 없습니다: ${optionId}`)
        }

        const option = optionResult.rows[0]
        optionsTotal += option.price
        selectedOptions.push(option)
      }

      const unitPrice = menu.price + optionsTotal
      const lineTotal = unitPrice * quantity

      lineItems.push({
        menu,
        quantity,
        unitPrice,
        lineTotal,
        selectedOptions,
      })
    }

    const totalAmount = lineItems.reduce((sum, item) => sum + item.lineTotal, 0)

    const orderResult = await client.query(
      `INSERT INTO orders (status, total_amount)
       VALUES ($1, $2)
       RETURNING id, ordered_at, status, total_amount`,
      [ORDER_STATUS.RECEIVED, totalAmount],
    )

    const order = orderResult.rows[0]

    for (const line of lineItems) {
      const itemResult = await client.query(
        `INSERT INTO order_items
          (order_id, menu_id, menu_name, quantity, unit_price, line_total)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          order.id,
          line.menu.id,
          line.menu.name,
          line.quantity,
          line.unitPrice,
          line.lineTotal,
        ],
      )

      const orderItemId = itemResult.rows[0].id

      for (const option of line.selectedOptions) {
        await client.query(
          `INSERT INTO order_item_options
            (order_item_id, option_id, option_name, option_price)
           VALUES ($1, $2, $3, $4)`,
          [orderItemId, option.id, option.name, option.price],
        )
      }

      await client.query(
        `UPDATE menus SET stock = stock - $1, updated_at = NOW() WHERE id = $2`,
        [line.quantity, line.menu.id],
      )
    }

    await client.query('COMMIT')

    return loadOrderById(client, order.id)
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

export async function getOrders(statusFilter) {
  const pool = getPool()
  let query = `SELECT id, ordered_at, status, total_amount FROM orders`
  const params = []

  if (statusFilter) {
    query += ` WHERE status = $1`
    params.push(statusFilter)
  }

  query += ` ORDER BY ordered_at DESC`

  const ordersResult = await pool.query(query, params)
  const orders = []

  for (const row of ordersResult.rows) {
    const itemsResult = await pool.query(
      `SELECT id, menu_id, menu_name, quantity, unit_price, line_total
       FROM order_items WHERE order_id = $1`,
      [row.id],
    )

    const itemIds = itemsResult.rows.map((r) => r.id)
    let optionRows = []

    if (itemIds.length > 0) {
      const optionsResult = await pool.query(
        `SELECT order_item_id, option_name, option_price
         FROM order_item_options WHERE order_item_id = ANY($1::uuid[])`,
        [itemIds],
      )
      optionRows = optionsResult.rows
    }

    orders.push(formatOrder(row, mapOrderItemRows(itemsResult.rows, optionRows)))
  }

  return orders
}
