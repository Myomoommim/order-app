/** Render 등 클라우드 Postgres는 SSL 필요 */
function isCloudPostgres(connectionString = '') {
  return (
    connectionString.includes('render.com') ||
    connectionString.includes('@dpg-') ||
    connectionString.includes('sslmode=require')
  )
}

export function getPgSsl(connectionString = '') {
  if (process.env.DATABASE_SSL === 'false') return undefined
  if (
    process.env.DATABASE_SSL === 'true' ||
    isCloudPostgres(connectionString) ||
    process.env.NODE_ENV === 'production'
  ) {
    return { rejectUnauthorized: false }
  }
  return undefined
}

export function isManagedPostgresUrl(connectionString = '') {
  return isCloudPostgres(connectionString)
}

export function withPgSsl(connectionString, extra = {}) {
  const ssl = getPgSsl(connectionString)
  return ssl ? { connectionString, ssl, ...extra } : { connectionString, ...extra }
}
