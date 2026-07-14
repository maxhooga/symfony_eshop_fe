import { Link } from 'react-router-dom'
import './Header.css'

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          E-SHOP
        </Link>

        <div className="header__search">
          <input
            type="search"
            className="header__search-input"
            placeholder="Hledat produkty..."
            disabled
            aria-label="Hledat produkty"
          />
        </div>

        <nav className="header__actions" aria-label="Uživatelské akce">
          <Link to="/checkout" className="header__icon-btn" aria-label="Košík">
            <CartIcon />
          </Link>
        </nav>
      </div>
    </header>
  )
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6h15l-1.5 9h-12L6 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 6 5 3H2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    </svg>
  )
}
