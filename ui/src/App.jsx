import { useState } from 'react'
import Header from './components/Header'
import OrderPage from './pages/OrderPage'
import AdminPage from './pages/AdminPage'
import { INITIAL_INVENTORY } from './data/inventory'
import { createOrderFromCart } from './utils/order'
import { updateStock } from './utils/inventory'
import './App.css'

function App() {
  const [page, setPage] = useState('order')
  const [orders, setOrders] = useState([])
  const [inventory, setInventory] = useState(INITIAL_INVENTORY)

  function handlePlaceOrder(cartItems) {
    const order = createOrderFromCart(cartItems)
    setOrders((prev) => [order, ...prev])
  }

  function handleUpdateOrderStatus(orderId, nextStatus) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: nextStatus } : order,
      ),
    )
  }

  function handleUpdateStock(menuId, delta) {
    setInventory((prev) => updateStock(prev, menuId, delta))
  }

  return (
    <div className="app">
      <Header activePage={page} onNavigate={setPage} />
      <main className="main">
        {page === 'order' ? (
          <OrderPage onPlaceOrder={handlePlaceOrder} />
        ) : (
          <AdminPage
            orders={orders}
            inventory={inventory}
            onUpdateStock={handleUpdateStock}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
      </main>
    </div>
  )
}

export default App
