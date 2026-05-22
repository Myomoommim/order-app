export function parseDatabaseUrl(databaseUrl) {
  const url = new URL(databaseUrl)
  const database = url.pathname.replace(/^\//, '')

  if (!database) {
    throw new Error('DATABASE_URL에 데이터베이스 이름이 없습니다.')
  }

  url.pathname = '/postgres'

  return {
    database,
    adminUrl: url.toString(),
    appUrl: databaseUrl,
  }
}
