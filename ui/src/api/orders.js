import { apiRequest } from './client.js'

export function createOrder(items) {
  return apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify({ items }),
  })
}

export function fetchOrder(orderId) {
  return apiRequest(`/orders/${orderId}`)
}
