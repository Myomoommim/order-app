/** KRW → USD 표시용 (대략적 환율) */
export const USD_EXCHANGE_RATE = 1350

export function formatPrice(amount) {
  return `${amount.toLocaleString('ko-KR')}원`
}

export function formatUsd(amountKrw) {
  const usd = Math.round(amountKrw / USD_EXCHANGE_RATE)
  return `$${usd.toLocaleString('en-US')}`
}

export function formatPriceWithUsd(amount) {
  return `${formatPrice(amount)} (${formatUsd(amount)})`
}
