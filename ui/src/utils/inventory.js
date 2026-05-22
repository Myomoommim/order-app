export function getStockStatus(stock) {
  if (stock === 0) return { label: '품절', className: 'stock-status--soldout' }
  if (stock < 5) return { label: '주의', className: 'stock-status--warning' }
  return { label: '정상', className: 'stock-status--normal' }
}

export function updateStock(inventory, menuId, delta) {
  return inventory.map((item) =>
    item.menuId === menuId
      ? { ...item, stock: Math.max(0, item.stock + delta) }
      : item,
  )
}
