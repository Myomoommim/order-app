import { useEffect, useState } from 'react'
import { fetchMenus } from '../api/menus'
import { createOrder } from '../api/orders'
import { ApiError } from '../api/client'
import { addToCart, updateCartQuantity } from '../utils/cart'
import { useToast } from '../hooks/useToast'
import MenuCard from '../components/MenuCard'
import Cart from '../components/Cart'
import './OrderPage.css'

function cartToOrderItems(cart) {
  return cart.map((item) => ({
    menuId: item.menuId,
    quantity: item.quantity,
    optionIds: item.options.map((opt) => opt.id),
  }))
}

function OrderPage() {
  const [menus, setMenus] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [ordering, setOrdering] = useState(false)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  useEffect(() => {
    loadMenus()
  }, [])

  async function loadMenus() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchMenus()
      setMenus(data.menus)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '메뉴를 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }

  function handleAddToCart(item) {
    setCart((prev) => addToCart(prev, item))
  }

  function handleUpdateQuantity(key, delta) {
    setCart((prev) => updateCartQuantity(prev, key, delta))
  }

  async function handleOrder() {
    setOrdering(true)
    try {
      await createOrder(cartToOrderItems(cart))
      showToast('주문이 접수되었습니다.', 'success')
      setCart([])
      await loadMenus()
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : '주문에 실패했습니다.'
      showToast(message, 'warning')
    } finally {
      setOrdering(false)
    }
  }

  return (
    <div className="order-page">
      <section className="menu-section">
        <h2 className="menu-section__title">MENU</h2>
        {loading && <p className="order-page__message">메뉴를 불러오는 중...</p>}
        {error && (
          <p className="order-page__message order-page__message--error">
            {error}
            <button type="button" className="order-page__retry" onClick={loadMenus}>
              다시 시도
            </button>
          </p>
        )}
        {!loading && !error && (
          <div className="menu-grid">
            {menus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </section>
      <Cart
        items={cart}
        onOrder={handleOrder}
        onUpdateQuantity={handleUpdateQuantity}
        ordering={ordering}
      />
    </div>
  )
}

export default OrderPage
