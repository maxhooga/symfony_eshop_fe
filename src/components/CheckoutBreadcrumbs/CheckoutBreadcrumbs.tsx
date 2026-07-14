import { Link, useLocation } from 'react-router-dom'
import './CheckoutBreadcrumbs.css'

const STEPS = [
  { path: '/checkout', label: 'Košík' },
  { path: '/checkout/details', label: 'Údaje' },
  { path: '/checkout/shipping', label: 'Doprava a platba' },
] as const

export function CheckoutBreadcrumbs() {
  const location = useLocation()
  const activeIndex = STEPS.findIndex((step) => step.path === location.pathname)

  return (
    <nav className="checkout-breadcrumbs" aria-label="Průběh objednávky">
      <ol>
        {STEPS.map((step, index) => {
          const isActive = index === activeIndex
          const isCompleted = index < activeIndex

          return (
            <li
              key={step.path}
              className={[
                'checkout-breadcrumbs__item',
                isActive ? 'is-active' : '',
                isCompleted ? 'is-completed' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {isCompleted ? (
                <Link to={step.path}>{step.label}</Link>
              ) : (
                <span>{step.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
