export function toFullOptionId(menuId, optionId) {
  return `${menuId}:${optionId}`
}

export function toShortOptionId(menuId, fullOptionId) {
  const prefix = `${menuId}:`
  if (fullOptionId.startsWith(prefix)) {
    return fullOptionId.slice(prefix.length)
  }
  return fullOptionId
}
