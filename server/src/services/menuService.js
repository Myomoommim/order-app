import { getPool } from '../db/pool.js'
import { toShortOptionId } from '../utils/optionId.js'

export async function getMenusForOrder() {
  const pool = getPool()

  const menusResult = await pool.query(
    `SELECT id, name, description, price, image_url, stock
     FROM menus
     ORDER BY
       CASE
         WHEN id LIKE 'pistol-%' THEN 1
         WHEN id LIKE 'mg-%' THEN 2
         WHEN id LIKE 'rifle-%' THEN 3
         WHEN id LIKE 'ammo-%' THEN 4
         ELSE 5
       END,
       name`,
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

  const menus = menusResult.rows.map((row) => {
    let category = 'pistol'
    if (row.id.startsWith('mg-')) category = 'machinegun'
    if (row.id.startsWith('rifle-')) category = 'rifle'
    if (row.id.startsWith('ammo-')) category = 'ammo'

    return {
      id: row.id,
      category,
      name: row.name,
      description: row.description || '',
      price: row.price,
      imageUrl: row.image_url || null,
      soldOut: row.stock === 0,
      options: optionsByMenu[row.id] || [],
    }
  })

  return menus
}
