import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">
        <NavLink to="/order" className="logo-link">
          COZY
        </NavLink>
      </h1>
      <nav className="nav" aria-label="주요 메뉴">
        <NavLink
          to="/order"
          className={({ isActive }) =>
            `nav-tab${isActive ? ' nav-tab--active' : ''}`
          }
        >
          주문하기
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `nav-tab${isActive ? ' nav-tab--active' : ''}`
          }
        >
          관리자
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
