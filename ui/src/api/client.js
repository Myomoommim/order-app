const API_BASE = import.meta.env.VITE_API_URL || '/api'

export class ApiError extends Error {
  constructor(code, message, status) {
    super(message)
    this.code = code
    this.status = status
  }
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = data.error || {}
    throw new ApiError(
      error.code || 'REQUEST_FAILED',
      error.message || '요청에 실패했습니다.',
      response.status,
    )
  }

  return data
}
