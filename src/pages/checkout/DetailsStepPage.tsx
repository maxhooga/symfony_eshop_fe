import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCheckout } from '../../context/CheckoutContext'
import type { CustomerDetails } from '../../types/checkout'
import { useCart } from '../../hooks/useCart'
import { CheckoutBackLink } from './CheckoutLayout'

type FormErrors = Partial<Record<keyof CustomerDetails, string>>

function validateCustomer(customer: CustomerDetails): FormErrors {
  const errors: FormErrors = {}

  if (!customer.firstName.trim()) errors.firstName = 'Jméno je povinné.'
  if (!customer.lastName.trim()) errors.lastName = 'Příjmení je povinné.'
  if (!customer.phone.trim()) errors.phone = 'Telefon je povinný.'
  if (customer.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
    errors.email = 'Zadej platný e-mail.'
  }
  if (!customer.street.trim()) errors.street = 'Ulice je povinná.'
  if (!customer.city.trim()) errors.city = 'Město je povinné.'
  if (!customer.postalCode.trim()) errors.postalCode = 'PSČ je povinné.'

  return errors
}

export function DetailsStepPage() {
  const navigate = useNavigate()
  const { customer, updateCustomer } = useCheckout()
  const { cart, loading } = useCart()
  const [errors, setErrors] = useState<FormErrors>({})

  if (!loading && cart && cart.items.length === 0) {
    return <Navigate to="/checkout" replace />
  }

  const handleChange = (field: keyof CustomerDetails, value: string) => {
    updateCustomer({ [field]: value })
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const validationErrors = validateCustomer(customer)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    navigate('/checkout/shipping')
  }

  return (
    <>
      <header className="checkout__header">
        <h1>Dodací údaje</h1>
        <CheckoutBackLink to="/checkout" label="← Zpět do košíku" />
      </header>

      <div className="checkout__main-panel">
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <div className="checkout__form-row">
            <div className="checkout__field">
              <label htmlFor="firstName">Jméno</label>
              <input
                id="firstName"
                value={customer.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                autoComplete="given-name"
              />
              {errors.firstName && <span className="checkout__field-error">{errors.firstName}</span>}
            </div>
            <div className="checkout__field">
              <label htmlFor="lastName">Příjmení</label>
              <input
                id="lastName"
                value={customer.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                autoComplete="family-name"
              />
              {errors.lastName && <span className="checkout__field-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="checkout__form-row">
            <div className="checkout__field">
              <label htmlFor="email">E-mail (volitelný)</label>
              <input
                id="email"
                type="email"
                value={customer.email}
                onChange={(e) => handleChange('email', e.target.value)}
                autoComplete="email"
              />
              {errors.email && <span className="checkout__field-error">{errors.email}</span>}
            </div>
            <div className="checkout__field">
              <label htmlFor="phone">Telefon</label>
              <input
                id="phone"
                type="tel"
                value={customer.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                autoComplete="tel"
              />
              {errors.phone && <span className="checkout__field-error">{errors.phone}</span>}
            </div>
          </div>

          <div className="checkout__field">
            <label htmlFor="street">Ulice a číslo popisné</label>
            <input
              id="street"
              value={customer.street}
              onChange={(e) => handleChange('street', e.target.value)}
              autoComplete="street-address"
            />
            {errors.street && <span className="checkout__field-error">{errors.street}</span>}
          </div>

          <div className="checkout__form-row">
            <div className="checkout__field">
              <label htmlFor="city">Město</label>
              <input
                id="city"
                value={customer.city}
                onChange={(e) => handleChange('city', e.target.value)}
                autoComplete="address-level2"
              />
              {errors.city && <span className="checkout__field-error">{errors.city}</span>}
            </div>
            <div className="checkout__field">
              <label htmlFor="postalCode">PSČ</label>
              <input
                id="postalCode"
                value={customer.postalCode}
                onChange={(e) => handleChange('postalCode', e.target.value)}
                autoComplete="postal-code"
              />
              {errors.postalCode && <span className="checkout__field-error">{errors.postalCode}</span>}
            </div>
          </div>

          <div className="checkout__actions">
            <button type="submit" className="checkout__btn checkout__btn--primary">
              Další
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
