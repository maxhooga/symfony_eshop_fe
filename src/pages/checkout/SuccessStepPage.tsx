import { Link, Navigate } from 'react-router-dom'
import { useCheckout } from '../../context/CheckoutContext'
import { formatPrice } from '../../utils/formatPrice'

export function SuccessStepPage() {
  const { createdOrder, resetCheckout } = useCheckout()

  if (!createdOrder) {
    return <Navigate to="/checkout" replace />
  }

  return (
    <div className="checkout__success">
      <h1>Objednávka vytvořena</h1>
      <p>Děkujeme za nákup. Objednávku jsme úspěšně přijali.</p>
      <p className="checkout__success-order-id">Číslo objednávky: #{createdOrder.id}</p>
      <p>
        Celkem: <strong>{formatPrice(createdOrder.totalInCents)}</strong>
      </p>
      <Link
        to="/"
        className="checkout__cta"
        onClick={() => resetCheckout()}
      >
        Zpět do obchodu
      </Link>
    </div>
  )
}
