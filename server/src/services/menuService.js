import { getPool } from '../db/pool.js'
import { toShortOptionId } from '../utils/optionId.js'

export async function getMenusForOrder() {
  const pool = getPool()

  const menusResult = await pool.query(
    `SELECT id, name, description, price, image_url, stock
     FROM menus
     ORDER BY name`,
  )

  const optionsResult = await pool.query(
    `SELECT id, menu_id, name, price FROM options ORDER BY menu_id, name`,
  )

  const optionsByMenu = optionsResult.rows.reduce((acc, row) => {
    if (!acc[row.menu_id]) acc[row.menu_id] = []
    acc[row.menu_id].push({
      id: toShortOptionId(row.menu_id, row.id),
      name: row.name,
      price: row.price,
    })
    return acc
  }, {})

  const menus = menusResult.rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description || '',
    price: row.price,
    imageUrl: row.image_url,
    soldOut: row.stock === 0,
    options: optionsByMenu[row.id] || [],
  }))

  return menus
}
