import { useToast } from '../hooks/useToast'
import { formatPrice } from '../utils/format'
import {
  formatCartLineName,
  getCartTotal,
  getLineTotal,
} from '../utils/cart'
import './Cart.css'

function Cart({ items, onOrder, onUpdateQuantity }) {
  const { showToast } = useToast()
  const total = getCartTotal(items)
  const isEmpty = items.length === 0

  function handleOrder() {
    if (isEmpty) {
      showToast('담은 메뉴가 없습니다.', 'warning')
      return
    }
    onOrder()
  }

  return (
    <section className="cart" aria-labelledby="cart-title">
      <h2 id="cart-title" className="cart__title">
        장바구니
      </h2>
      <div className="cart__body">
        <div className="cart__items">
          {isEmpty ? (
            <p className="cart__empty">장바구니가 비어 있습니다</p>
          ) : (
            <ul className="cart__list">
              {items.map((item) => {
                const lineName = formatCartLineName(item)
                return (
                  <li key={item.key} className="cart__line">
                    <span className="cart__line-name">{lineName}</span>
                    <div className="cart__qty">
                      <button
                        type="button"
                        className="cart__qty-btn"
                        aria-label={`${lineName} 수량 줄이기`}
                        onClick={() => onUpdateQuantity(item.key, -1)}
                      >
                        -
                      </button>
                      <span
                        className="cart__qty-value"
                        aria-label={`${lineName} 수량`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="cart__qty-btn"
                        aria-label={`${lineName} 수량 늘리기`}
                        onClick={() => onUpdateQuantity(item.key, 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="cart__line-price">
                      {formatPrice(getLineTotal(item))}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="cart__summary">
          <p className="cart__total">
            총 금액 <strong>{formatPrice(total)}</strong>
          </p>
          <button
            type="button"
            className="btn btn--primary btn--large cart__order"
            onClick={handleOrder}
            disabled={isEmpty}
          >
            주문하기
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cart
