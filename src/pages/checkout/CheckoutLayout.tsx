import { Link, Navigate, Outlet } from 'react-router-dom'
import { CheckoutProvider } from '../../context/CheckoutContext'
import { CheckoutBreadcrumbs } from '../../components/CheckoutBreadcrumbs/CheckoutBreadcrumbs'
import '../checkout/checkout.css'

export function CheckoutLayout() {
  return (
    <CheckoutProvider>
      <main className="checkout">
        <CheckoutBreadcrumbs />
        <Outlet />
      </main>
    </CheckoutProvider>
  )
}

export function CheckoutBackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="checkout__back">
      {label}
    </Link>
  )
}

export function CheckoutEmptyRedirect() {
  return <Navigate to="/checkout" replace />
}
