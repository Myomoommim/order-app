import {
  ORDER_NEXT_ACTION,
  ORDER_STATUS_LABEL,
} from '../../constants/orderStatus'
import { formatOrderDisplay } from '../../utils/order'
import './OrderList.css'

function OrderList({ orders, onUpdateStatus, pendingOrderId = null }) {
  return (
    <section className="admin-section order-list-section">
      <h2 className="admin-section__title">주문 현황</h2>
      {orders.length === 0 ? (
        <p className="order-list__empty">접수된 주문이 없습니다</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => {
            const display = formatOrderDisplay(order)
            const action = ORDER_NEXT_ACTION[order.status]

            return (
              <li key={order.id} className="order-list__item">
                <div className="order-list__info">
                  <span className="order-list__date">{display.dateLabel}</span>
                  <span className="order-list__items">{display.itemsLabel}</span>
                  <span className="order-list__price">{display.priceLabel}</span>
                  <span className="order-list__status">
                    {ORDER_STATUS_LABEL[order.status]}
                  </span>
                </div>
                {action ? (
                  <button
                    type="button"
                    className="btn btn--primary order-list__action"
                    onClick={() => onUpdateStatus(order.id, action.next)}
                    disabled={pendingOrderId === order.id}
                  >
                    {pendingOrderId === order.id ? '처리 중...' : action.label}
                  </button>
                ) : null}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default OrderList
