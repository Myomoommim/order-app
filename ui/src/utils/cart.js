export function getOptionKey(optionIds) {
  return [...optionIds].sort().join(',')
}

export function getCartItemKey(menuId, optionIds) {
  return `${menuId}:${getOptionKey(optionIds)}`
}

export function calcUnitPrice(basePrice, selectedOptions) {
  return basePrice + selectedOptions.reduce((sum, opt) => sum + opt.price, 0)
}

export function buildCartItem(menu, selectedOptions) {
  const optionIds = selectedOptions.map((o) => o.id)
  const unitPrice = calcUnitPrice(menu.price, selectedOptions)

  return {
    key: getCartItemKey(menu.id, optionIds),
    menuId: menu.id,
    menuName: menu.name,
    options: selectedOptions,
    unitPrice,
    quantity: 1,
  }
}

export function addToCart(cart, newItem) {
  const existing = cart.find((item) => item.key === newItem.key)
  if (existing) {
    return cart.map((item) =>
      item.key === newItem.key
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    )
  }
  return [...cart, newItem]
}

export function getLineTotal(item) {
  return item.unitPrice * item.quantity
}

export function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + getLineTotal(item), 0)
}

export function formatCartLineName(item) {
  const optionPart =
    item.options.length > 0
      ? ` (${item.options.map((o) => o.name).join(', ')})`
      : ''
  return `${item.menuName}${optionPart}`
}

export function updateCartQuantity(cart, key, delta) {
  return cart
    .map((item) =>
      item.key === key
        ? { ...item, quantity: item.quantity + delta }
        : item,
    )
    .filter((item) => item.quantity > 0)
}
