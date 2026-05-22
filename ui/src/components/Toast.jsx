import { useEffect } from 'react'
import { useToast } from '../hooks/useToast'
import './Toast.css'

const AUTO_DISMISS_MS = 3000

function Toast() {
  const { toast, hideToast } = useToast()

  useEffect(() => {
    if (!toast) return undefined

    const timer = setTimeout(hideToast, AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [toast, hideToast])

  if (!toast) return null

  return (
    <div
      className={`toast toast--${toast.type}`}
      role="status"
      aria-live="polite"
    >
      <p className="toast__message">{toast.message}</p>
      <button
        type="button"
        className="toast__close"
        aria-label="알림 닫기"
        onClick={hideToast}
      >
        ×
      </button>
    </div>
  )
}

export default Toast
