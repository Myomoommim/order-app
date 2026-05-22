import { ORDER_STATUS } from '../constants/orderStatus'
import { getCartTotal, getLineTotal } from './cart'
import { formatPriceWithUsd } from './format'

export function formatOrderDate(isoString) {
  const date = new Date(isoString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${month}월 ${day}일 ${hours}:${minutes}`
}

export function formatOrderItemLine(item) {
  const optionPart =
    item.options.length > 0
      ? ` (${item.options.map((o) => o.name).join(', ')})`
      : ''
  return `${item.menuName}${optionPart} x ${item.quantity}`
}

export function formatOrderItemsSummary(items) {
  return items.map(formatOrderItemLine).join(', ')
}

export function createOrderFromCart(cartItems) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
    items: cartItems.map((item) => ({
      menuId: item.menuId,
      menuName: item.menuName,
      options: item.options,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: getLineTotal(item),
    })),
    totalAmount: getCartTotal(cartItems),
    status: ORDER_STATUS.RECEIVED,
  }
}

export function getDashboardStats(orders) {
  const activeCount = orders.filter(
    (o) => o.status !== ORDER_STATUS.COMPLETED,
  ).length

  return {
    total: activeCount,
    received: orders.filter((o) => o.status === ORDER_STATUS.RECEIVED).length,
    inProgress: orders.filter((o) => o.status === ORDER_STATUS.IN_PROGRESS)
      .length,
    completed: orders.filter((o) => o.status === ORDER_STATUS.COMPLETED).length,
  }
}

export function formatOrderDisplay(order) {
  return {
    dateLabel: formatOrderDate(order.createdAt),
    itemsLabel: formatOrderItemsSummary(order.items),
    priceLabel: formatPriceWithUsd(order.totalAmount),
  }
}
