export const ORDER_STATUS = {
  RECEIVED: 'RECEIVED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
}

export const ORDER_STATUS_LABEL = {
  [ORDER_STATUS.RECEIVED]: '주문 접수',
  [ORDER_STATUS.IN_PROGRESS]: '제조 중',
  [ORDER_STATUS.COMPLETED]: '제조 완료',
}

export const ORDER_NEXT_ACTION = {
  [ORDER_STATUS.RECEIVED]: {
    label: '제조 시작',
    next: ORDER_STATUS.IN_PROGRESS,
  },
  [ORDER_STATUS.IN_PROGRESS]: {
    label: '제조 완료',
    next: ORDER_STATUS.COMPLETED,
  },
}
