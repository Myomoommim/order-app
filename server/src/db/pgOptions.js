/** Render 등 클라우드 Postgres는 SSL 필요 */
export function getPgSsl(connectionString = '') {
  if (process.env.DATABASE_SSL === 'false') return undefined
  if (
    process.env.DATABASE_SSL === 'true' ||
    connectionString.includes('render.com') ||
    connectionString.includes('sslmode=require')
  ) {
    return { rejectUnauthorized: false }
  }
  return undefined
}

export function withPgSsl(connectionString, extra = {}) {
  const ssl = getPgSsl(connectionString)
  return ssl ? { connectionString, ssl, ...extra } : { connectionString, ...extra }
}
