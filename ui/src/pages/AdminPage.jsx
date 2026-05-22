import { getDashboardStats } from '../utils/order'
import AdminDashboard from '../components/admin/AdminDashboard'
import InventorySection from '../components/admin/InventorySection'
import OrderList from '../components/admin/OrderList'
import './AdminPage.css'

function AdminPage({ orders, inventory, onUpdateStock, onUpdateOrderStatus }) {
  const stats = getDashboardStats(orders)

  return (
    <div className="admin-page">
      <AdminDashboard stats={stats} />
      <InventorySection
        inventory={inventory}
        onUpdateStock={onUpdateStock}
      />
      <OrderList orders={orders} onUpdateStatus={onUpdateOrderStatus} />
    </div>
  )
}

export default AdminPage
