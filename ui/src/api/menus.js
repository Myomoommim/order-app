import { apiRequest } from './client.js'

export function fetchMenus() {
  return apiRequest('/menus')
}
