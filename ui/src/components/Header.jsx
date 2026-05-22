import './Header.css'

function Header({ activePage, onNavigate }) {
  return (
    <header className="header">
      <h1 className="logo" onClick={() => onNavigate('order')}>
        COZY
      </h1>
      <nav className="nav">
        <button
          type="button"
          className={`nav-tab ${activePage === 'order' ? 'nav-tab--active' : ''}`}
          onClick={() => onNavigate('order')}
        >
          주문하기
        </button>
        <button
          type="button"
          className={`nav-tab ${activePage === 'admin' ? 'nav-tab--active' : ''}`}
          onClick={() => onNavigate('admin')}
        >
          관리자
        </button>
      </nav>
    </header>
  )
}

export default Header
