import { useCallback, useEffect, useState } from 'react'
import {
  fetchDashboard,
  fetchInventory,
  fetchOrders,
  updateInventory,
  updateOrderStatus,
} from '../api/admin'
import { ApiError } from '../api/client'
import { useToast } from '../hooks/useToast'
import AdminDashboard from '../components/admin/AdminDashboard'
import InventorySection from '../components/admin/InventorySection'
import OrderList from '../components/admin/OrderList'
import './AdminPage.css'

function AdminPage() {
  const [stats, setStats] = useState({
    total: 0,
    received: 0,
    inProgress: 0,
    completed: 0,
  })
  const [inventory, setInventory] = useState([])
  const [orders, setOrders] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pendingStockId, setPendingStockId] = useState(null)
  const [pendingOrderId, setPendingOrderId] = useState(null)
  const { showToast } = useToast()

  const loadAdminData = useCallback(async () => {
    setError(null)
    try {
      const [dashboard, stock, ordersData] = await Promise.all([
        fetchDashboard(),
        fetchInventory(),
        fetchOrders(),
      ])
      setStats(dashboard)
      setInventory(stock.inventory)
      setOrders(ordersData.orders)
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : '관리자 데이터를 불러오지 못했습니다.',
      )
    }
  }, [])

  useEffect(() => {
    async function init() {
      setInitialLoading(true)
      await loadAdminData()
      setInitialLoading(false)
    }
    init()
  }, [loadAdminData])

  async function refreshDashboard() {
    const dashboard = await fetchDashboard()
    setStats(dashboard)
  }

  async function handleUpdateStock(menuId, delta) {
    setPendingStockId(menuId)
    try {
      const { item } = await updateInventory(menuId, delta)
      setInventory((prev) =>
        prev.map((row) => (row.menuId === menuId ? item : row)),
      )
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.message : '재고 변경에 실패했습니다.',
        'warning',
      )
    } finally {
      setPendingStockId(null)
    }
  }

  async function handleUpdateOrderStatus(orderId, nextStatus) {
    setPendingOrderId(orderId)
    try {
      const { order } = await updateOrderStatus(orderId, nextStatus)
      setOrders((prev) => prev.map((row) => (row.id === orderId ? order : row)))
      await refreshDashboard()
      showToast('주문 상태가 변경되었습니다.', 'success')
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.message : '상태 변경에 실패했습니다.',
        'warning',
      )
    } finally {
      setPendingOrderId(null)
    }
  }

  if (initialLoading) {
    return <p className="admin-page__message">데이터를 불러오는 중...</p>
  }

  if (error) {
    return (
      <p className="admin-page__message admin-page__message--error">
        {error}
        <button
          type="button"
          className="admin-page__retry"
          onClick={() => {
            setInitialLoading(true)
            loadAdminData().finally(() => setInitialLoading(false))
          }}
        >
          다시 시도
        </button>
      </p>
    )
  }

  return (
    <div className="admin-page">
      <AdminDashboard stats={stats} />
      <InventorySection
        inventory={inventory}
        onUpdateStock={handleUpdateStock}
        pendingMenuId={pendingStockId}
      />
      <OrderList
        orders={orders}
        onUpdateStatus={handleUpdateOrderStatus}
        pendingOrderId={pendingOrderId}
      />
    </div>
  )
}

export default AdminPage
