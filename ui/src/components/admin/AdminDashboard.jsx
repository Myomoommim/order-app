import './AdminDashboard.css'

const STAT_ITEMS = [
  { key: 'total', label: '총 주문' },
  { key: 'received', label: '주문 접수' },
  { key: 'inProgress', label: '배송 중' },
  { key: 'completed', label: '배송 완료' },
]

function AdminDashboard({ stats }) {
  return (
    <section className="admin-section admin-dashboard">
      <h2 className="admin-section__title">관리자 대시보드</h2>
      <div className="admin-dashboard__grid">
        {STAT_ITEMS.map(({ key, label }) => (
          <div key={key} className="admin-dashboard__card">
            <span className="admin-dashboard__label">{label}</span>
            <span className="admin-dashboard__value">{stats[key]}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AdminDashboard
