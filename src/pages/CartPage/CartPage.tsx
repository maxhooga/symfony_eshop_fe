import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getCart, removeCartItem, updateCartItemQuantity } from '../../api/cart'
import { CartItemRow } from '../../components/CartItemRow/CartItemRow'
import type { Cart } from '../../types/cart'
import { formatPrice } from '../../utils/formatPrice'
import './CartPage.css'

export function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingProductId, setUpdatingProductId] = useState<number | null>(null)

  const loadCart = useCallback(async () => {
    const data = await getCart()
    setCart(data)
    return data
  }, [])

  useEffect(() => {
    let cancelled = false

    loadCart()
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
  }, [loadCart])

  const handleCartUpdate = async (productId: number, action: () => Promise<Cart>) => {
    setUpdatingProductId(productId)
    setError(null)

    try {
      const updated = await action()
      setCart(updated)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError('Nepodařilo se upravit košík.')
      } else {
        setError('Něco se pokazilo.')
      }
    } finally {
      setUpdatingProductId(null)
    }
  }

  const handleIncrease = (productId: number) => {
    const item = cart?.items.find((entry) => entry.productId === productId)
    if (!item) {
      return
    }

    void handleCartUpdate(productId, () => updateCartItemQuantity(productId, item.quantity + 1))
  }

  const handleDecrease = (productId: number) => {
    const item = cart?.items.find((entry) => entry.productId === productId)
    if (!item) {
      return
    }

    if (item.quantity <= 1) {
      void handleCartUpdate(productId, () => removeCartItem(productId))
      return
    }

    void handleCartUpdate(productId, () => updateCartItemQuantity(productId, item.quantity - 1))
  }

  const handleRemove = (productId: number) => {
    void handleCartUpdate(productId, () => removeCartItem(productId))
  }

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

      {!loading && cart && cart.items.length > 0 && (
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
                  <CartItemRow
                    key={item.productId}
                    item={item}
                    disabled={updatingProductId !== null}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
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
