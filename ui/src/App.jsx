import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastProvider } from './context/ToastProvider.jsx'
import Header from './components/Header'
import Toast from './components/Toast'
import OrderPage from './pages/OrderPage'
import AdminPage from './pages/AdminPage'
import { INITIAL_INVENTORY } from './data/inventory'
import { createOrderFromCart } from './utils/order'
import { updateStock } from './utils/inventory'
import './App.css'

function AppContent() {
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
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/order" replace />} />
          <Route
            path="/order"
            element={<OrderPage onPlaceOrder={handlePlaceOrder} />}
          />
          <Route
            path="/admin"
            element={
              <AdminPage
                orders={orders}
                inventory={inventory}
                onUpdateStock={handleUpdateStock}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            }
          />
          <Route path="*" element={<Navigate to="/order" replace />} />
        </Routes>
      </main>
      <Toast />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
