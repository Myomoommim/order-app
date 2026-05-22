import { useState } from 'react'
import { MENUS } from '../data/menus'
import { addToCart, updateCartQuantity } from '../utils/cart'
import MenuCard from '../components/MenuCard'
import Cart from '../components/Cart'
import './OrderPage.css'

function OrderPage({ onPlaceOrder }) {
  const [cart, setCart] = useState([])

  function handleAddToCart(item) {
    setCart((prev) => addToCart(prev, item))
  }

  function handleUpdateQuantity(key, delta) {
    setCart((prev) => updateCartQuantity(prev, key, delta))
  }

  function handleOrder() {
    onPlaceOrder(cart)
    alert('주문이 접수되었습니다.')
    setCart([])
  }

  return (
    <div className="order-page">
      <section className="menu-section">
        <h2 className="menu-section__title">MENU</h2>
        <div className="menu-grid">
          {MENUS.map((menu) => (
            <MenuCard key={menu.id} menu={menu} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
      <Cart
        items={cart}
        onOrder={handleOrder}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  )
}

export default OrderPage
