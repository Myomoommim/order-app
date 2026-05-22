import { getStockStatus } from '../../utils/inventory'
import './InventorySection.css'

function InventorySection({ inventory, onUpdateStock }) {
  return (
    <section className="admin-section inventory-section">
      <h2 className="admin-section__title">재고 현황</h2>
      <div className="inventory-grid">
        {inventory.map((item) => {
          const status = getStockStatus(item.stock)
          return (
            <article key={item.menuId} className="inventory-card">
              <h3 className="inventory-card__name">{item.menuName}</h3>
              <p className="inventory-card__stock">
                {item.stock}개
                <span className={`stock-status ${status.className}`}>
                  {status.label}
                </span>
              </p>
              <div className="inventory-card__controls">
                <button
                  type="button"
                  className="inventory-card__btn"
                  aria-label={`${item.menuName} 재고 줄이기`}
                  onClick={() => onUpdateStock(item.menuId, -1)}
                  disabled={item.stock === 0}
                >
                  -
                </button>
                <button
                  type="button"
                  className="inventory-card__btn"
                  aria-label={`${item.menuName} 재고 늘리기`}
                  onClick={() => onUpdateStock(item.menuId, 1)}
                >
                  +
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default InventorySection
