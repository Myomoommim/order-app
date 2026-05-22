import { apiRequest } from './client.js'

export function fetchDashboard() {
  return apiRequest('/admin/dashboard')
}

export function fetchInventory() {
  return apiRequest('/admin/menus/stock')
}

export function updateInventory(menuId, delta) {
  return apiRequest(`/admin/menus/${menuId}/stock`, {
    method: 'PATCH',
    body: JSON.stringify({ delta }),
  })
}

export function fetchOrders() {
  return apiRequest('/admin/orders')
}

export function updateOrderStatus(orderId, status) {
  return apiRequest(`/admin/orders/${orderId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}
