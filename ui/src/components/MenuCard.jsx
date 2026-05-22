import { useState } from 'react'
import { formatPriceWithUsd } from '../utils/format'
import { buildCartItem } from '../utils/cart'
import './MenuCard.css'

const PLACEHOLDER_IMAGE = '/menu/placeholder.svg'

function MenuCard({ menu, onAddToCart }) {
  const [selectedOptionIds, setSelectedOptionIds] = useState([])
  const [imageSrc, setImageSrc] = useState(menu.imageUrl || PLACEHOLDER_IMAGE)
  const isSoldOut = menu.soldOut

  function toggleOption(optionId) {
    setSelectedOptionIds((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    )
  }

  function handleAdd() {
    if (isSoldOut) return
    const selectedOptions = menu.options.filter((opt) =>
      selectedOptionIds.includes(opt.id),
    )
    onAddToCart(buildCartItem(menu, selectedOptions))
    setSelectedOptionIds([])
  }

  return (
    <article
      className={`menu-card${isSoldOut ? ' menu-card--sold-out' : ''}`}
      aria-labelledby={`menu-name-${menu.id}`}
    >
      <div className="menu-card__image-wrap">
        <img
          src={imageSrc}
          alt={menu.name}
          className="menu-card__image"
          loading="lazy"
          onError={() => setImageSrc(PLACEHOLDER_IMAGE)}
        />
      </div>
      <h2 id={`menu-name-${menu.id}`} className="menu-card__name">
        {menu.name}
      </h2>
      <p className="menu-card__price">{formatPriceWithUsd(menu.price)}</p>
      <p className="menu-card__description">{menu.description}</p>
      {isSoldOut && <p className="menu-card__sold-out">품절</p>}
      {menu.options.length > 0 && (
        <ul className="menu-card__options">
          {menu.options.map((option) => {
            const optionInputId = `${menu.id}-${option.id}`
            return (
              <li key={option.id}>
                <label className="menu-card__option" htmlFor={optionInputId}>
                  <input
                    id={optionInputId}
                    type="checkbox"
                    checked={selectedOptionIds.includes(option.id)}
                    onChange={() => toggleOption(option.id)}
                    disabled={isSoldOut}
                  />
                  <span>
                    {option.name} ({option.price > 0 ? '+' : ''}
                    {formatPriceWithUsd(option.price)})
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      )}
      <button
        type="button"
        className="btn btn--primary menu-card__add"
        aria-label={`${menu.name} 장바구니에 담기`}
        onClick={handleAdd}
        disabled={isSoldOut}
      >
        {isSoldOut ? '품절' : '담기'}
      </button>
    </article>
  )
}

export default MenuCard
