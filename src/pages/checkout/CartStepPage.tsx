import { Link, useNavigate } from 'react-router-dom'
import { CartItemRow } from '../../components/CartItemRow/CartItemRow'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import { CheckoutBackLink } from './CheckoutLayout'

export function CartStepPage() {
  const navigate = useNavigate()
  const { cart, loading, error, updatingProductId, increaseQuantity, decreaseQuantity, removeItem } =
    useCart()

  const handleNext = () => {
    navigate('/checkout/details')
  }

  return (
    <>
      <header className="checkout__header">
        <h1>Košík</h1>
        <CheckoutBackLink to="/" label="← Zpět na produkty" />
      </header>

      {loading && <p className="checkout__status">Načítám košík…</p>}
      {error && <p className="checkout__status checkout__status--error">{error}</p>}

      {!loading && !error && cart && cart.items.length === 0 && (
        <div className="checkout__empty">
          <p>Košík je prázdný.</p>
          <Link to="/" className="checkout__cta">
            Prohlédnout produkty
          </Link>
        </div>
      )}

      {!loading && cart && cart.items.length > 0 && (
        <div className="checkout__content">
          <div className="checkout__table-wrap">
            <table className="checkout__table">
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
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <aside className="checkout__summary">
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
              <div className="checkout__summary-total">
                <dt>Celkem</dt>
                <dd>{formatPrice(cart.totalInCents)}</dd>
              </div>
            </dl>
            <div className="checkout__actions">
              <button type="button" className="checkout__btn checkout__btn--primary" onClick={handleNext}>
                Další
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
