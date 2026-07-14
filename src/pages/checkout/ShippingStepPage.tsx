import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { createOrder } from '../../api/orders'
import { useCheckout } from '../../context/CheckoutContext'
import { useCart } from '../../hooks/useCart'
import { SHIPPING_OPTIONS, getShippingOption } from '../../types/checkout'
import type { ShippingMethod } from '../../types/checkout'
import { formatPrice } from '../../utils/formatPrice'
import { CheckoutBackLink } from './CheckoutLayout'

function isCustomerComplete(customer: ReturnType<typeof useCheckout>['customer']): boolean {
  return (
    customer.firstName.trim() !== '' &&
    customer.lastName.trim() !== '' &&
    customer.phone.trim() !== '' &&
    customer.street.trim() !== '' &&
    customer.city.trim() !== '' &&
    customer.postalCode.trim() !== ''
  )
}

export function ShippingStepPage() {
  const navigate = useNavigate()
  const { customer, shippingMethod, setShippingMethod, setCreatedOrder } = useCheckout()
  const { cart, loading } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!loading && cart && cart.items.length === 0) {
    return <Navigate to="/checkout" replace />
  }

  if (!isCustomerComplete(customer)) {
    return <Navigate to="/checkout/details" replace />
  }

  const selectedShipping = shippingMethod ? getShippingOption(shippingMethod) : null
  const shippingPrice = selectedShipping?.priceInCents ?? 0
  const goodsTotal = cart?.totalInCents ?? 0
  const orderTotal = goodsTotal + shippingPrice

  const handlePay = async () => {
    if (!shippingMethod) {
      setError('Vyber způsob dopravy.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const order = await createOrder({
        mobile: customer.phone.trim(),
        email: customer.email.trim() || null,
        street: `${customer.firstName.trim()} ${customer.lastName.trim()}, ${customer.street.trim()}`,
        city: customer.city.trim(),
        postalCode: customer.postalCode.trim(),
      })

      setCreatedOrder(order)
      navigate('/checkout/success')
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.detail ?? err.response?.data?.message
        setError(typeof message === 'string' ? message : 'Nepodařilo se vytvořit objednávku.')
      } else {
        setError('Něco se pokazilo.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <header className="checkout__header">
        <h1>Doprava a platba</h1>
        <CheckoutBackLink to="/checkout/details" label="← Zpět na údaje" />
      </header>

      <div className="checkout__content">
        <section className="checkout__main-panel">
          <h2>Způsob dopravy</h2>
          <div className="checkout__shipping-list">
            {SHIPPING_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`checkout__shipping-option${shippingMethod === option.id ? ' is-selected' : ''}`}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={shippingMethod === option.id}
                  onChange={() => {
                    setShippingMethod(option.id as ShippingMethod)
                    setError(null)
                  }}
                />
                <div className="checkout__shipping-label">
                  <strong>{option.label}</strong>
                  <span>{option.description}</span>
                </div>
                <span className="checkout__shipping-price">
                  {option.priceInCents === 0 ? 'Zdarma' : formatPrice(option.priceInCents)}
                </span>
              </label>
            ))}
          </div>

          {error && <p className="checkout__status checkout__status--error">{error}</p>}

          <div className="checkout__actions">
            <button
              type="button"
              className="checkout__btn checkout__btn--primary"
              onClick={handlePay}
              disabled={submitting || !shippingMethod}
            >
              {submitting ? 'Zpracovávám…' : 'Zaplatit'}
            </button>
          </div>
        </section>

        <aside className="checkout__summary">
          <h2>Shrnutí objednávky</h2>
          <dl>
            <div>
              <dt>Zboží</dt>
              <dd>{formatPrice(goodsTotal)}</dd>
            </div>
            <div>
              <dt>Doprava</dt>
              <dd>{selectedShipping ? (shippingPrice === 0 ? 'Zdarma' : formatPrice(shippingPrice)) : '—'}</dd>
            </div>
            <div className="checkout__summary-total">
              <dt>Celkem k úhradě</dt>
              <dd>{formatPrice(orderTotal)}</dd>
            </div>
          </dl>
          <p style={{ margin: '1rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {customer.firstName} {customer.lastName}
            <br />
            {customer.street}, {customer.postalCode} {customer.city}
            <br />
            {customer.phone}
          </p>
        </aside>
      </div>
    </>
  )
}
