import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getCart } from '../../api/cart'
import { CartItemRow } from '../../components/CartItemRow/CartItemRow'
import type { Cart } from '../../types/cart'
import { formatPrice } from '../../utils/formatPrice'
import './CartPage.css'

export function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    getCart()
      .then((data) => {
        if (!cancelled) {
          setCart(data)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          if (axios.isAxiosError(err)) {
            setError('Nepodařilo se načíst košík. Běží backend?')
          } else {
            setError('Něco se pokazilo.')
          }
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="cart-page">
      <header className="cart-page__header">
        <h1>Košík</h1>
        <Link to="/" className="cart-page__back">
          ← Zpět na produkty
        </Link>
      </header>

      {loading && <p className="cart-page__status">Načítám košík…</p>}
      {error && <p className="cart-page__status cart-page__status--error">{error}</p>}

      {!loading && !error && cart && cart.items.length === 0 && (
        <div className="cart-page__empty">
          <p>Košík je prázdný.</p>
          <Link to="/" className="cart-page__cta">
            Prohlédnout produkty
          </Link>
        </div>
      )}

      {!loading && !error && cart && cart.items.length > 0 && (
        <div className="cart-page__content">
          <div className="cart-page__table-wrap">
            <table className="cart-page__table">
              <thead>
                <tr>
                  <th>Produkt</th>
                  <th>Cena / ks</th>
                  <th>Množství</th>
                  <th>Celkem</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <CartItemRow key={item.productId} item={item} />
                ))}
              </tbody>
            </table>
          </div>

          <aside className="cart-page__summary">
            <h2>Shrnutí</h2>
            <dl>
              <div>
                <dt>Počet produktů</dt>
                <dd>{cart.productCount}</dd>
              </div>
              <div>
                <dt>Počet kusů</dt>
                <dd>{cart.itemCount}</dd>
              </div>
              <div className="cart-page__summary-total">
                <dt>Celkem</dt>
                <dd>{formatPrice(cart.totalInCents)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      )}
    </main>
  )
}
